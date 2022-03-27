import React, { useState, useEffect } from 'react'
import { format } from 'rut.js'
import { getLicense, mutateLicense } from '../../Hooks'
import { useSnackbar } from 'notistack'

const data = {
  licenseKey: ''
}
export const Actions = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState(data)
  const { data: allLicencia, isLoading: getLoading } = getLicense()
  const { mutate, isLoading: Loading, error } = mutateLicense()

  useEffect(() => {
    if (allLicencia) {
      setValues(allLicencia[0])
    }
  }, [allLicencia])

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error creando o editando la licencia', {
        variant: 'error'
      })
    }
  }, [error])

  const { licenseKey } = values || {}

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value
    })
  }
  const saveData = () => {
    mutate(values)
  }
  console.log(allLicencia)
  return {
    isLicense: allLicencia[0]?.id ? true : false,
    licenseKey,
    isLoading: getLoading || Loading,
    // error,
    handleChange,
    saveData
  }
}
