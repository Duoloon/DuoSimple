import './style.css'
import { Box } from '@mui/material'
import carstore from './342.jpg'
export const CardProduct = ({ item, add }) => {
  const { nombre, descripcion, precio, codebar } = item
  return (
    <Box className="container page-wrapper">
      <Box className="page-inner">
        <Box className="row">
          <Box className="el-wrapper">
            <Box className="box-up">
              <img className="img" src={carstore} alt="" />
              <Box className="img-info">
                <Box className="info-inner">
                  <span className="p-name">{nombre}</span>
                  <span className="p-company">{codebar}</span>
                </Box>
                <Box className="a-size">{descripcion}</Box>
              </Box>
            </Box>

            <Box className="box-down">
              <Box className="h-bg">
                <Box className="h-bg-inner"></Box>
              </Box>

              <Box
                component="a"
                className="cart"
                href="#"
                onClick={() => add()}
              >
                <span className="price">${precio}</span>
                <span className="add-to-cart">
                  <span className="txt">Agregar</span>
                </span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
