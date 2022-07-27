import { Box, Typography, IconButton, TextField } from '@mui/material'
import { Delete, Add, Remove } from '@mui/icons-material'

export const ListItem = ({
  title,
  price,
  cantidad,
  operationQuantity,
  destroy,
  id,
  update
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        borderRadius: 2,
        backgroundColor: '#EDEFF3',
        marginBottom: '4px'
      }}
    >
      <Typography variant="subtitle1" sx={{ width: '100px' }} component="div">
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ marginLeft: 'auto', width: '150px' }}
        component="div"
      >
        Precio: {price}
      </Typography>
      <Box sx={{ marginLeft: 'auto' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={() => operationQuantity(id, 'cantidad', 'resta')}
        >
          <Remove />
        </IconButton>
        <TextField
          label="Cantidad"
          size="small"
          sx={{ width: '80px', marginLeft: 'auto' }}
          disabled={true}
          value={cantidad}
          variant="outlined"
        />
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={() => operationQuantity(id, 'cantidad', 'suma')}
          sx={{ marginLeft: 'auto' }}
        >
          <Add />
        </IconButton>
      </Box>

      <IconButton
        edge="start"
        color="inherit"
        disabled={update}
        sx={{ marginLeft: 'auto' }}
        aria-label="close"
        onClick={destroy}
      >
        <Delete />
      </IconButton>
    </Box>
  )
}

export const ListCard = ({
  title,
  price,
  cantidad,
  operationQuantity,
  destroy,
  id,
  update,
  product,
  setProduct
}) => {
  const handleCantidad = value => {
    const newData = product.map((item, key) => {
      if (key === id) {
        item['cantidad'] = value
        return item
      }
      return item
    })
    setProduct(newData)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        borderRadius: 2,
        backgroundColor: '#EDEFF3',
        marginBottom: '4px'
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ width: '100px', marginLeft: '5px', fontWeight: 'bold' }}
        component="div"
      >
        {title}
      </Typography>
      <Box
        sx={{ display: 'table-column', textAlign: 'center', width: '150px' }}
      >
        <Box
          sx={{
            display: 'flex',
            padding: '3px'
          }}
        >
          <Typography variant="subtitle1" component="div">
            Precio:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ marginLeft: 'auto' }}
            color="red"
            component="div"
          >
            {price}
          </Typography>
        </Box>

        <Box
          sx={{
            marginLeft: 'auto',
            border: '1px solid #075BA4',
            borderRadius: 2,
            display: 'flex',
            padding: '2px'
          }}
        >
          <IconButton
            color="primary"
            sx={{ marginLeft: '3px' }}
            onClick={() => operationQuantity(id, 'cantidad', 'resta')}
          >
            <Remove />
          </IconButton>

          <input
            value={cantidad}
            type={'number'}
            onChange={e => handleCantidad(e.target.value)}
            style={{
              marginLeft: 'auto',
              textAlign: 'center',
              width: '60px',
              backgroundColor: 'transparent',
              border: 'none'
            }}
          />

          <IconButton
            color="primary"
            onClick={() => operationQuantity(id, 'cantidad', 'suma')}
            sx={{ marginLeft: 'auto' }}
          >
            <Add />
          </IconButton>
        </Box>
      </Box>

      <IconButton
        edge="start"
        color="error"
        disabled={update}
        sx={{ marginLeft: 'auto' }}
        aria-label="close"
        onClick={destroy}
      >
        <Delete />
      </IconButton>
    </Box>
  )
}
