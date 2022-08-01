import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { persistState, getPersistedState } from '../../utils'

const productAtom = atom(getPersistedState('cart') ?? [])
const useCart = () => {
  const [product, setProduct] = useAtom(productAtom)

  useEffect(() => persistState('cart', product), [product])

  return {
    product, setProduct
  }
}

export { useCart }
