import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { persistState, getPersistedState } from '../../utils'

const dolarAtom = atom(getPersistedState('dolar') ?? 0)
const useDolar = () => {
  const [dolar, setDolar] = useAtom(dolarAtom)

  useEffect(() => persistState('dolar', dolar), [dolar])

  return {
    dolar,
    setDolar
  }
}

export { useDolar }
