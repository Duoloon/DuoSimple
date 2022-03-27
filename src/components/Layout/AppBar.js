import { Add } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { Box, Typography, Button, Divider, styled } from '@mui/material'
import { useLocation } from '../../Hooks'
import { titles } from '../../variables'
import { read, utils } from 'xlsx'
import { useSnackbar } from 'notistack'

const Input = styled('input')({
  display: 'none'
})
export const AppBar = ({ action, saveData }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { path, setPath } = useLocation()
  const [excel, setExcel] = useState(null)
  const handleChange = async e => {
    const file = e.target.files[0]
    const data = await file.arrayBuffer()
    /* data is an ArrayBuffer */
    setExcel(data)
  }

  useEffect(() => {
    if (excel) {
      try {
        const workbook = read(excel)
        const workbookSheets = workbook.SheetNames
        const sheet = workbookSheets[0]
        const dataExcel = utils.sheet_to_json(workbook.Sheets[sheet])
        saveData({ data: dataExcel })
      } catch (error) {
        enqueueSnackbar('Error Insertando los datos del excel', {
          variant: 'error'
        })
      }
      setExcel(null)
    }
  }, [excel])
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          padding: 3
        }}
      >
        <Typography
          variant="h5"
          color="primary"
          fontWeight={'bold'}
          gutterBottom
          component="div"
        >
          {titles[path]}
        </Typography>
        {path === '/' ? (
          <>
            <Button
              sx={{ marginLeft: 'auto' }}
              color="primary"
              onClick={() => {
                setPath(path + 'inventory/entry')
              }}
              variant="contained"
            >
              Entrada al inventario
            </Button>
            <Button
              sx={{ marginLeft: 3 }}
              color="primary"
              onClick={() => {
                setPath(path + 'inventory/history/entry')
              }}
              variant="outlined"
            >
              Historial de Entrada
            </Button>
            <Button
              sx={{ marginLeft: 3 }}
              color="primary"
              onClick={() => {
                setPath(path + 'inventory/exit')
              }}
              variant="contained"
            >
              Salida del inventario
            </Button>
            <Button
              sx={{ marginLeft: 3 }}
              color="primary"
              onClick={() => {
                setPath(path + 'inventory/history/exit')
              }}
              variant="outlined"
            >
              Historial de salida
            </Button>
          </>
        ) : path === '/inventory/history/entry' ||
          path === '/inventory/history/exit' ||
          path === '/setting' ? null : (
          <>
            <label
              htmlFor="contained-button-file"
              style={{ marginLeft: 'auto' }}
            >
              <Input
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleChange}
              />
              <Button variant="outlined" component="span">
                Importar Excel
              </Button>
            </label>
            <Button
              sx={{ marginLeft: 3 }}
              onClick={() => {
                setPath(path + '/create')
                action(true)
              }}
              variant="contained"
            >
              <Add />
              Agregar
            </Button>
          </>
        )}
      </Box>
      <Divider />
    </>
  )
}
