import { getEntry, getExit, getSale, destroySale } from '../../Hooks'
import { useLocation } from '../../Hooks'
export const Actions = () => {
  const { data: allEntry, isLoading: getLoading } = getEntry()
  const { data: allExit, isLoading: Loading } = getExit()
  const { data: allSale, isLoading: LoadingSale } = getSale()
  const { destroy, isLoading: destroyIsLoading } = destroySale()
  const { path } = useLocation()
  const screen = {
    '/inventory/history/entry': allEntry,
    '/inventory/history/exit': allExit,
    '/seller/history': allSale
  }
  console.log(allSale)
  return {
    data: screen[path],
    isLoading: getLoading || Loading || LoadingSale || destroyIsLoading,
    path,
    destroy
  }
}
