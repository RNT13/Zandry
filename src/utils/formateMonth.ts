export const formatMonth = (month: number) => {
  const date = new Date(2024, month - 1) // mês começa em 0
  return date.toLocaleDateString('pt-BR', { month: 'long' })
}
