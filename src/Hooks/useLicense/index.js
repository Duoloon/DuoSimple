import { useMutation, useQuery, useQueryClient } from 'react-query'
import request from '../../api'
import { useSnackbar } from 'notistack'
import { useLocation } from '../useLocation'

export const getLicense = () => {
  const { isLoading, data, error } = useQuery('/api/License', () =>
    request.license.get()
  )
  return {
    isLoading,
    data: data?.data || [],
    error
  }
}

export const mutateLicense = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { mutate, isLoading, error } = useMutation(
    payload =>
     request.license.post(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Licencia ${data?.message}`, {
            variant: 'success'
          })
        //   setPath('/history')
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

export const destroyLicense = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    mutate: destroy,
    isLoading,
    error
  } = useMutation(payload => request.license.deleteC(payload), {
    onSuccess: data => {
      if (data?.data) {
        enqueueSnackbar(`Licencia ${data?.message}`, {
          variant: 'success'
        })
      }
    }
  })

  return {
    isLoading,
    error,
    destroy
  }
}
