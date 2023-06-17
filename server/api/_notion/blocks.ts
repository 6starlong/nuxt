import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default defineEventHandler(async (event: any) => {
  const query = getQuery(event)
  const response = await notion.blocks.children.list({
    block_id: query.blockId as string
  })

  return response.results
})
