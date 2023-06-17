import fetch from 'node-fetch'

export default defineEventHandler(async (_event) => {
  const res = await fetch('https://starlong.notion.site/api/v3/loadCachedPageChunk', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      page: {
        id: 'a8542f6f-39af-4b1e-b174-4c268db31da9'
      },
      limit: 30,
      cursor: {
        stack: []
      },
      chunkNumber: 0,
      verticalColumns: false
    })
  })

  return res.json()
})
