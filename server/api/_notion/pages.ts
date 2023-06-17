import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export default defineEventHandler(async (event: any) => {
  const query = getQuery(event)
  const response = await notion.databases.query({
    database_id: query.databaseId as string,
    page_size: 30
  })

  return { ...response }
})
