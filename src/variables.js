import { atom } from 'jotai'
export const listArticles = atom([])
export const PERSISTOR_KEYS = {
  user: 'user',
  auth: 'auth',
  list: 'list',
  billIds: 'billids'
}

export const titles = {
  '/': 'Inventario',
  '/client': 'Clientes',
  '/product': 'Productos',
  '/supplier': 'Proveedor',
  '/inventory/history/entry': 'Historial de Entrada',
  '/inventory/history/exit': 'Historial de salida',
  '/setting': 'Ajustes',
  
}
