/* eslint-disable no-console */
import { Octokit } from '@octokit/core'
import { Base64 } from 'js-base64'
import matter from 'gray-matter'

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

  if (contents) {
    const { data } = matter(Base64.decode(contents.content))
    console.log(data, 2)

    syncData = Object.assign(data, { title, date: new Date(data.date || date).toISOString() })
  } else {
    syncData = { title, date }
  }

  const frontmatter = Object.keys(syncData).map(key => `${key}: ${syncData[key]}`).join('\n')
  const content = `---\n${frontmatter}\n---\n\n${body}`

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
