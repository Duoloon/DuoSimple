import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Stack,
  IconButton,
  Typography,
  Divider,
  Modal,
  FormControlLabel,
  Switch
} from '@mui/material'
import { AppBar } from '../../components'
import {
  getClients,
  getProducts,
  useDolar,
  mutateSale,
  useCart
} from '../../Hooks'
import { Scrollbars } from 'react-custom-scrollbars'
import { ListCard, CardProduct, Search } from '../../components'
import { useSnackbar } from 'notistack'
import React, { useState, useRef, useEffect } from 'react'
import { Delete, PersonAdd } from '@mui/icons-material'
import scanner from './scanner.mp3'
import { paymentMethods } from '../../variables'

const View = ({
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
}) => {
  const audio = new Audio(scanner)
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const scannerRef = useRef()
  const { product, setProduct } = useCart()
  const [method, setMethod] = useState('Punto de venta')
  const [client, setClient] = useState('Negocio')
  const [dolares, setDolares] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [switchs, setSwitch] = useState(true)
  const { data: allClients } = getClients()
  const { dolar } = useDolar()
  const { data: allProduct } = getProducts()
  const { mutate, error } = mutateSale()
  const handleClose = () => setOpen(false)
  const handleClose1 = () => setOpen1(false)

  const emptyList = () => {
    setProduct([])
    enqueueSnackbar('Se borro la lista', {
      variant: 'success'
    })
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error creando la factura', {
        variant: 'error'
      })
    }
  }, [error])

  const save = () => {
    saveData()
    setOpen1(false)
    setOpen(true)
  }
  const addProducList = (code, prop) => {
    const resultado = allProduct.find(item => item[prop] === code)
    if (resultado) {
      const res = product.find(item => item[prop] === resultado[prop])
      var newData
      if (res) {
        newData = product.map(item => {
          if (item[prop] === res[prop]) {
            item['cantidad'] = item['cantidad'] + 1
            return item
          }
          return item
        })
      } else {
        newData = [
          ...product,
          {
            nombre: resultado.nombre,
            precio: resultado.precio,
            id: resultado.id,
            codebar: resultado.codebar,
            cantidad: 1
          }
        ]
      }
      setProduct(newData)
    } else {
      enqueueSnackbar('Producto no registrado', {
        variant: 'error'
      })
    }
  }

  const operationQuantity = (index, props, operation) => {
    const newData = product.map((item, key) => {
      if (key === index) {
        if (operation === 'suma') {
          item[props] = parseInt(item[props], 10) + 1
        } else {
          if (item[props] > 1) item[props] = parseInt(item[props], 10) - 1
          else setProduct([])
        }
        return item
      }
      return item
    })
    setProduct(newData)
  }
  const removeProducList = position => {
    const newData = [
      ...product.slice(0, position),
      ...product.slice(position + 1)
    ]
    setProduct(newData)
  }

  const SubTotal = () => {
    var total = 0
    product.map(item => {
      total += item['cantidad'] * item['precio']
    })
    return total
  }
  const total = () => {
    const val = discount / 100
    const iva = SubTotal() * 0.16
    const sub = SubTotal() + iva
    const res = sub * val
    return sub - res
  }
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      }}
    >
      <AppBar />
      <Box sx={{ height: '88%', width: '100%', padding: 3 }}>
        <Stack direction="row" sx={{ height: '100%' }} spacing={2}>
          <Box sx={{ width: '70%', height: '100%' }}>
            <Box
              sx={{
                borderRadius: 2,
                width: '100%',
                height: '100%',
                border: '1px solid #131B4F',
                padding: 3
              }}
            >
              {/*  */}
              <Scrollbars
                renderTrackHorizontal={props => (
                  <Box
                    {...props}
                    sx={{ display: 'none' }}
                    className="track-horizontal"
                  />
                )}
                style={{
                  height: '100%',
                  overflowX: 'hidden'
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridAutoColumns: 'minmax(15rem, auto)',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(11rem, 1fr))'
                  }}
                >
                  {allProduct.map((item, key) => (
                    <Box key={key}>
                      <CardProduct
                        item={item}
                        add={() => addProducList(item?.codebar, 'codebar')}
                      />
                    </Box>
                  ))}
                </Box>
              </Scrollbars>
            </Box>
          </Box>
          <Box sx={{ width: '30%', height: '100%' }}>
            <Box
              sx={{
                borderRadius: 2,
                width: '100%',
                height: '100%',
                border: '1px solid #131B4F',
                padding: 3
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <TextField
                  id="escaner"
                  label="Escanear"
                  size="small"
                  variant="outlined"
                  sx={{ width: '140px', marginLeft: 1 }}
                  inputRef={scannerRef}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      var code = e.target.value
                      addProducList(code, 'codebar')
                      scannerRef.current.value = ''
                    }
                  }}
                  autoFocus
                  onChange={async () => {
                    audio.currentTime = 0
                    await audio
                      .play()
                      .then(() => {
                        console.log('audio played auto')
                      })
                      .catch(error => {
                        console.log(error)
                      })
                  }}
                />

                <Autocomplete
                  disablePortal
                  id="search"
                  getOptionLabel={item => item.nombre}
                  options={allProduct}
                  size="small"
                  sx={{ width: '200px', marginLeft: 1 }}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      var code = e.target.value
                      addProducList(code, 'nombre')
                    }
                  }}
                  renderInput={params => (
                    <TextField {...params} label="Buscar por nombre" />
                  )}
                />

                <IconButton color="error" onClick={emptyList}>
                  <Delete />
                </IconButton>
              </Box>

              <Box sx={{ marginTop: 2 }} />

              <Scrollbars
                renderTrackHorizontal={props => (
                  <Box
                    {...props}
                    sx={{ display: 'none' }}
                    className="track-horizontal"
                  />
                )}
                style={{
                  height: '58%',
                  overflowX: 'hidden'
                }}
              >
                {product.map((item, key) => (
                  <ListCard
                    key={key}
                    id={key}
                    title={item?.nombre}
                    price={item?.precio}
                    cantidad={item?.cantidad}
                    update={false}
                    destroy={() => removeProducList(key)}
                    operationQuantity={operationQuantity}
                    setProduct={setProduct}
                    product={product}
                  />
                ))}
              </Scrollbars>

              <Box sx={{ marginTop: 2 }} />

              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: 'text.secondary' }}>
                  Sub-Total
                </Typography>
                <Typography
                  sx={{ color: 'text.secondary', marginLeft: 'auto' }}
                >
                  {'$ ' + SubTotal()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: 'text.secondary' }}>
                  IVA (16%)
                </Typography>
                <Typography
                  sx={{ color: 'text.secondary', marginLeft: 'auto' }}
                >
                  {'$ ' + SubTotal() * 0.16}
                </Typography>
              </Box>
              <Box sx={{ marginTop: 1 }} />

              <Divider />
              <Box sx={{ marginTop: 1 }} />

              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
                <Typography sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>
                  {'$ ' + (SubTotal() * 0.16 + SubTotal()).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold' }}>Total en Bs</Typography>
                <Typography
                  sx={{ color: 'text.secondary', marginLeft: 'auto' }}
                >
                  {'Bs ' +
                    ((SubTotal() * 0.16 + SubTotal()) * dolar).toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                // disabled={isLoading}
                sx={{ marginTop: 1, width: '100%' }}
              >
                Procesar Venta
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ color: 'text.secondary' }}>Cliente:</Typography>
          <Box sx={{ marginTop: 1, display: 'flex' }}>
            <Autocomplete
              disablePortal
              id="search"
              getOptionLabel={item => item.nombre}
              options={allClients}
              size="small"
              fullWidth
              onChange={(event, newValue) => {
                setClient(newValue?.id)
              }}
              renderInput={params => (
                <TextField {...params} label="Buscar por nombre" />
              )}
              noOptionsText={'Sin Opciones'}
            />
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false)
                setOpen1(true)
              }}
            >
              <PersonAdd />
            </Button>
          </Box>

          <Box sx={{ marginTop: 1 }} />

          <Typography sx={{ color: 'text.secondary' }}>
            Metodos de Pagos:
          </Typography>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent="center"
            alignItems="center"
          >
            {paymentMethods.map((item, key) => (
              <Box
                key={key}
                borderRadius={2}
                p={2}
                marginX={1}
                marginY={1}
                border={'1px solid #075BA4'}
                height={'80px'}
                width={'80px'}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                onClick={() => setMethod(item)}
                bgcolor={item === method ? '#075BA4' : null}
                sx={{ cursor: 'pointer' }}
              >
                <Typography
                  sx={{
                    color: item === method ? 'white' : '#075BA4',
                    textAlign: 'center'
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
          {method === 'BS / Dolares' && (
            <Box>
              <Box sx={{ marginTop: 1 }} />
              <Typography sx={{ color: 'text.secondary' }}>
                BS y dolares:
              </Typography>

              <Box sx={{ marginTop: 1 }} />

              <TextField
                id="dolars"
                label="Ingrese Dolares"
                size="small"
                value={dolares}
                onChange={e => setDolares(e.target.value)}
                fullWidth
                variant="outlined"
              />
              <Box sx={{ marginTop: 1 }} />

              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: 'text.secondary' }}>
                  Total a pagar en Bs
                </Typography>
                <Typography
                  sx={{ color: 'text.secondary', marginLeft: 'auto' }}
                >
                  {'Bs ' + ((total() - dolares) * dolar).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ marginTop: 1 }} />
          <Typography sx={{ color: 'text.secondary' }}>
            Descuento (opcional):
          </Typography>
          <Box sx={{ marginTop: 1 }} />

          <TextField
            id="Descuento"
            label="Descuento"
            size="small"
            value={discount}
            onChange={e => setDiscount(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Box sx={{ marginTop: 1 }} />

          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
            <Typography sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>
              {'$ ' + total().toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ color: 'text.secondary' }}>
              Total en Bs
            </Typography>
            <Typography sx={{ color: 'text.secondary', marginLeft: 'auto' }}>
              {'Bs ' + (total() * dolar).toFixed(2)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              mutate({
                productos: product,
                metodo_de_pago: method,
                descuento: discount,
                cliente: client,
                iva: (SubTotal() * 0.16).toFixed(2),
                sub_total: SubTotal().toFixed(2),
                total: total().toFixed(2),
                tasa: dolar
              })
            }}
            // disabled={isLoading}
            sx={{ marginTop: 1, width: '100%' }}
          >
            Facturar
          </Button>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title1"
        aria-describedby="modal-modal-description1"
      >
        <Box sx={style}>
          <Typography variant="h6" component="div">
            Datos del cliente:
          </Typography>
          <Box sx={{ marginTop: 2 }} />
          <TextField
            id="nombre"
            label="Nombre"
            variant="outlined"
            value={nombre}
            onChange={handleChange('nombre')}
            fullWidth
          />
          <Box sx={{ marginTop: 2 }} />
          <TextField
            id="correo"
            label="correo"
            type={'email'}
            value={correo}
            variant="outlined"
            onChange={handleChange('correo')}
            fullWidth
          />
          <Box sx={{ marginTop: 2 }} />

          <TextField
            id="rut"
            label="Rut"
            value={rut}
            onChange={handleChange('rut')}
            variant="outlined"
            fullWidth
          />
          <Box sx={{ marginTop: 2 }} />

          <TextField
            id="telefono"
            label="Télefono"
            value={telefono}
            variant="outlined"
            onChange={handleChange('telefono')}
            fullWidth
          />
          <Box sx={{ marginTop: 2 }} />
          <FormControlLabel
            control={
              <Switch
                checked={switchs}
                onChange={() => setSwitch(!switchs)}
                name="gilad"
              />
            }
            label={switchs ? 'Autocompletado Activo' : 'Texto Activo'}
          />
          <Box sx={{ marginTop: 2 }} />

          {switchs ? (
            <Search setData={setValues} data={values} />
          ) : (
            <TextField
              id="direccion"
              label="Dirección"
              value={direccion}
              onChange={handleChange('direccion')}
              fullWidth
              variant="outlined"
            />
          )}

          <Box sx={{ marginTop: 2 }} />

          <TextField
            id="notas"
            label="Notas"
            value={notas}
            onChange={handleChange('notas')}
            fullWidth
            variant="outlined"
          />
          <Box sx={{ marginTop: 2 }} />

          <Button variant="contained" fullWidth color="primary" onClick={save}>
            Crear
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default View
