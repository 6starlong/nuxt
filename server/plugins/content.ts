import { resolve } from 'path'
import { spawn } from 'cross-spawn'

export default defineNitroPlugin((nitroApp: any) => {
  nitroApp.hooks.hook('content:file:afterParse', async (file: any) => {
    if (file._id.endsWith('.md')) {
      // 添加基于 Git 的最后更新时间到 Content
      file.lastUpdated = await getGitTimestamp(resolve(`content/${file._file}`))
    }
  })
})

function getGitTimestamp (file: string) {
  return new Promise<number>((resolve, reject) => {
    const child = spawn('git', ['log', '-1', '--pretty="%ci"', file])
    let output = ''
    child.stdout.on('data', d => (output += String(d)))
    child.on('close', () => {
      resolve(+new Date(output))
    })
    child.on('error', reject)
  })
}
