export default defineEventHandler(async (event: any) => {
  // 使用正文处理请求
  const body = await useBody(event)

  return { body }
})
