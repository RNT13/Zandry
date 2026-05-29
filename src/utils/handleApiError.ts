/* eslint-disable @typescript-eslint/no-explicit-any */

import { RTKQueryError } from '@/types/types'

export const handleApiError = (error: any): string => {
  const fallbackMessage = 'Ocorreu um erro inesperado. Tente novamente.'

  // Se não for um erro do RTK Query (ex: erro de rede/CORS)
  if (!error || !error.status) {
    return error?.message || fallbackMessage
  }

  const apiError = error as RTKQueryError
  const data = apiError.data

  // 1. Verifica se existe a propriedade 'message' amigável que definimos na View
  if (data?.message && typeof data.message === 'string') {
    return data.message
  }

  // 2. Verifica se o Django enviou 'detail' (padrão do DRF para 401, 403, 404)
  if (data?.detail && typeof data.detail === 'string') {
    return data.detail
  }

  // 3. Se houver um objeto de erros por campo (ex: { owner: { email: [...] } })
  // Vamos pegar recursivamente a primeira mensagem encontrada
  if (data?.errors || (data?.message && typeof data.message === 'object')) {
    const errorSource = data.errors || data.message
    return getFirstError(errorSource) || fallbackMessage
  }

  return fallbackMessage
}

/**
 * Função auxiliar para extrair a primeira string de erro de um objeto aninhado
 */
function getFirstError(obj: any): string | null {
  if (typeof obj === 'string') return obj
  if (Array.isArray(obj)) return getFirstError(obj[0])
  if (typeof obj === 'object' && obj !== null) {
    const firstKey = Object.keys(obj)[0]
    return getFirstError(obj[firstKey])
  }
  return null
}
