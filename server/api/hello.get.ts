export default defineEventHandler((event: any) => {
  // 使用查询参数处理请求
  const { name = 'World' } = useQuery(event)

  return `Hello ${name}!`
})
