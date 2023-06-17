export const useNotion = () => {
  const database = useState('database', () => null)
  const pages = useState('pages', () => null)
  const page = useState('page', () => null)

  async function getDatabase (id) {
    if (!database.value) {
      database.value = await $fetch('/api/_notion/database', { params: { databaseId: id } })
    }

    return database.value
  }

  async function getPages (id) {
    if (!pages.value) {
      const { results } = await $fetch('/api/_notion/pages', { params: { databaseId: id } })
      pages.value = results.map(page => ({
        ...page,
        title: getBlockTitle(page),
        url: page.url.split('https://www.notion.so')[1]
      }))
    }

    return pages.value
  }

  async function getPage (id) {
    page.value = pages.value?.find(block => block.id === idToUuid(id))
    if (!page.value) {
      page.value = await $fetch('/api/_notion/page', { params: { pageId: id } })
      pages.value.push(page.value)
    }

    return page.value
  }

  function getPageTags (block) {
    return block?.properties?.['标签'].multi_select
  }

  async function getBlocks (id) {
    return await $fetch('/api/_notion/blocks', { params: { blockId: id } })
  }

  function getBlockTitle (block) {
    return block?.properties?.['名称'].title[0].plain_text
  }

  function getBlockCover (block) {
    return block?.cover?.[block.cover.type].url
  }

  function getBlockIcon (block) {
    return block?.icon?.emoji
  }

  function idToUuid (id) {
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`
  }

  return {
    database,
    pages,
    page,
    getDatabase,
    getPages,
    getPage,
    getPageTags,
    getBlocks,
    getBlockTitle,
    getBlockCover,
    getBlockIcon
  }
}
