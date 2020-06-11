export function errorMessage(error: any) {
  return error.response?.data?.message ?? 'Check your internet connection'
}
