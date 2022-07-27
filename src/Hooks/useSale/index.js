import { useMutation, useQuery, useQueryClient } from 'react-query'
import request from '../../api'
import { useSnackbar } from 'notistack'
import { useLocation } from '../useLocation'

export const getSale = () => {
  const { isLoading, data, error } = useQuery('/api/venta', () =>
    request.sale.get()
  )
  return {
    isLoading,
    data: data?.data || [],
    error
  }
}

export const mutateSale = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload => request.sale.post(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Factura Creada con exito`, {
            variant: 'success'
          })
          setPath('/seller')
          setTimeout(() => {
            window.location.reload(true)
          }, 3000)
        }
      }
    }
  )
  return {
    isLoading,
    error,
    mutate
  }
}

export const destroySale = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    mutate: destroy,
    isLoading,
    error
  } = useMutation(payload => request.sale.deleteS(payload), {
    onSuccess: data => {
      if (data?.data) {
        enqueueSnackbar(`Factura Elimina con exito`, {
          variant: 'success'
        })
        setTimeout(() => {
          window.location.reload(true)
        }, 3000)
      }
    }
  })

  return {
    isLoading,
    error,
    destroy
  }
}
