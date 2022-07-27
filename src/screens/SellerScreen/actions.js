import { useState, useEffect } from 'react'
import { mutateClients } from '../../Hooks'

const data = {
  nombre: '',
  direccion: '',
  correo: '',
  rut: '',
  notas: '',
  telefono: '',
  path: true
}
const Action = () => {
  const { mutate, error } = mutateClients()
  const [values, setValues] = useState(data)

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error creando o editando al cliente', {
        variant: 'error'
      })
    }
  }, [error])
  const { nombre, correo, telefono, rut, direccion, notas } = values || {}
  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value
    })
  }
  const saveData = () => {
    mutate(values)
  }
  return {
    values,
    nombre,
    correo,
    telefono,
    rut,
    direccion,
    notas,
    saveData,
    handleChange,
    setValues
  }
}

export default Action
