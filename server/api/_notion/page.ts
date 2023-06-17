import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default defineEventHandler(async (event: any) => {
  const query = getQuery(event)
  const response = await notion.pages.retrieve({ page_id: query.pageId as string })

  return { ...response }
})
