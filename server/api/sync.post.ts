/* eslint-disable no-console */
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
const AUTHOR = {
  name: 'Starlong',
  email: 'starlong.lu@gmail.com'
}

export default defineEventHandler(async (event: any) => {
  try {
    console.info('Sync start! 🤺🤺🤺')

    // 使用正文处理请求
    const { data } = await useBody(event)
    await run(data)

    return { data }
  } catch (error) {
    console.error('Sync failed! 🌋🌋🌋')
    return Promise.reject(error)
  }
})

async function run (syncData: any) {
  if (!syncData.slug) {
    return Promise.reject(new Error('slug does not exist!'))
  }

  const { title, slug, body, created_at: date } = syncData
  const path = `content/posts/${slug}.md`

  const { data: contents }: any = await request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    path
  }).catch(() => ({ data: undefined }))

  const metaData = contents ? matter(Base64.decode(contents.content)).data : {}
  const frontmatter = Object.assign(metaData, { title, date: new Date(metaData.date || date).toISOString() })
  const content = matter!.stringify(body, frontmatter)

  await request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    path,
    sha: contents?.sha || null,
    message: !contents
      ? `feat(sync): create ${path}`
      : `chore(sync): update ${path}`,
    committer: { ...AUTHOR },
    content: Base64.encode(content)
  })

  console.info(content)
  console.info('Sync succeeded! 🎉🎉🎉')
}
