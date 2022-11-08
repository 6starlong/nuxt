import { Octokit } from '@octokit/core'
import { Base64 } from 'js-base64'
/**
 * Nitro Bug：https://github.com/nuxt/framework/issues/7105
 * 不同的模块引入共同的包时，nitro 构建 server 会尝试使用最新版本。
 * 这导致 gray-matter 所使用的 js-yaml 版本出现兼容问题。
 * 使用支持 js-yaml 最新版本的 @gr2m/gray-matter 代替 gray-matter。
 * */
import matter from '@gr2m/gray-matter'

const { GITHUB_TOKEN } = process.env
const { request } = new Octokit({ auth: GITHUB_TOKEN })

const owner = '6starlong'
const repo = 'nuxt-app'
const branch = 'main'
const AUTHOR = {
  name: 'Starlong',
  email: 'starlong.lu@gmail.com'
}

export default defineEventHandler(async (event: any) => {
  try {
    console.info('Sync start! 🤺🤺🤺')

    const { data } = await useBody(event)
    await run(data)

    return { data }
  } catch (error) {
    console.error('Sync failed! 🌋🌋🌋')
    return Promise.reject(error)
  }
})

// GITHUB REST API https://docs.github.com/cn/rest
async function run (syncData: any) {
  if (!syncData.slug) {
    return Promise.reject(new Error('slug does not exist!'))
  }

  const { title, slug, body, created_at: date, word_count: wordCount } = syncData
  const path = `content/posts/${slug}.md`
  const reference = `cms/posts/${slug}`

  const { data: contents }: any = await request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    path
  }).catch(() => ({ data: undefined }))

  const metaData = contents ? matter(Base64.decode(contents.content)).data : {}
  const frontmatter = Object.assign(metaData, {
    title,
    date: new Date(metaData.date || date).toISOString(),
    duration: `${Math.round(wordCount / 300)}min`
  })
  const content = matter!
    .stringify(body, frontmatter)
    .replace(/date: '(.*)'/, 'date: $1')
    .replace(/\n---\n(\S+)/, '\n---\n\n$1')
    .replace(/<a name=".{5}"><\/a>\n(.*)\n/g, '\n$1\n\n')
    .replace(/\n\n+/g, '\n\n')
    .replace(/\*\*(\S+)(\s+)\*\*/g, '**$1** ')
    .replace(/(\S+)\n```([^\n])/g, '$1\n\n```$2')
    .replace(/```\n(\S+)/g, '```\n\n$1')

  const { data: blob } = await request('POST /repos/{owner}/{repo}/git/blobs', {
    owner,
    repo,
    content: Base64.encode(content),
    encoding: 'base64'
  })

  const { data: baseBranch } = await request('GET /repos/{owner}/{repo}/branches/{branch}', {
    owner,
    repo,
    branch
  })

  const { data: trees } = await request('POST /repos/{owner}/{repo}/git/trees', {
    owner,
    repo,
    base_tree: baseBranch.commit.sha,
    tree: [{
      path,
      mode: '100644',
      type: 'blob',
      sha: blob.sha
    }]
  })

  const message = !contents
    ? 'feat(sync): new blog post'
    : 'chore(sync): update blog post'

  const { data: commits } = await request('POST /repos/{owner}/{repo}/git/commits', {
    owner,
    repo,
    author: { ...AUTHOR },
    message,
    parents: [baseBranch.commit.sha],
    tree: trees.sha
  })

  const { data: refs } = await request('GET /repos/{owner}/{repo}/git/refs/heads/{ref}', {
    owner,
    repo,
    ref: reference
  }).catch(() => ({ data: undefined }))

  if (refs) {
    await request('POST /repos/{owner}/{repo}/git/refs/heads/{ref}', {
      owner,
      repo,
      ref: reference,
      sha: commits.sha,
      force: true
    })
  } else {
    await request('POST /repos/{owner}/{repo}/git/refs', {
      owner,
      repo,
      ref: `refs/heads/${reference}`,
      sha: commits.sha
    })
  }

  const { data: pulls } = await request('GET /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
    base: branch,
    state: 'open'
  })

  if (!pulls.some(i => i.head.ref === `${reference}`)) {
    const { data: pull } = await request('POST /repos/{owner}/{repo}/pulls', {
      owner,
      repo,
      base: branch,
      body: '由语雀同步至 Netlify CMS',
      head: `6starlong:${reference}`,
      title: message
    })

    await request('POST /repos/{owner}/{repo}/issues/{number}/labels', {
      owner,
      repo,
      number: pull.number,
      labels: ['netlify-cms/pending_review']
    })
  }

  console.info('Sync succeeded! 🎉🎉🎉')
}
