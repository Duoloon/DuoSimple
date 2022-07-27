import React, { useState, forwardRef } from 'react'
import {
  Box,
  Divider,
  Button,
  Dialog,
  Typography,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  TextField,
  Switch,
  FormControlLabel
} from '@mui/material'
import { AppBar } from '../../components'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid'
import { Delete, WhatsApp } from '@mui/icons-material'
import Slide from '@mui/material/Slide'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const HistoryView = ({ data, isLoading, path, destroy }) => {
  const columnsEntry = [
    {
      field: 'proveedor',
      headerName: 'Nombre Proveedor',
      width: 150,
      valueGetter: ({ row }) => row.Proveedor?.nombre
    },
    {
      field: 'rut',
      headerName: 'Rut Proveedor',
      width: 150,
      valueGetter: ({ row }) => row.Proveedor?.rut
    },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'productos',
      headerName: 'Producto',
      width: 150,
      valueGetter: ({ row }) => row.Productos[0]?.nombre
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      type: 'number',
      width: 150,
      valueGetter: ({ row }) => row.Productos[0]?.Entrada_Producto?.cantidad
    },
    { field: 'nota', headerName: 'Notas', width: 150 },
    { field: 'date', headerName: 'Fecha', width: 150 }
  ]
  const columnsExit = [
    {
      field: 'cliente',
      headerName: 'Nombre Cliente',
      width: 150,
      valueGetter: ({ row }) => row.Cliente?.nombre
    },
    {
      field: 'rut',
      headerName: 'Rut Cliente',
      width: 150,
      valueGetter: ({ row }) => row.Cliente?.rut
    },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'productos',
      headerName: 'Producto',
      width: 150,
      valueGetter: ({ row }) => row.Productos[0]?.nombre
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      type: 'number',
      width: 150,
      valueGetter: ({ row }) => row.Productos[0]?.Salida_Producto?.cantidad
    },
    { field: 'nota', headerName: 'Notas', width: 150 },
    { field: 'date', headerName: 'Fecha', width: 150 }
  ]
  const columnsSale = [
    { field: 'ClienteId', headerName: 'Cliente ID', width: 150 },
    {
      field: 'productos',
      headerName: 'Productos',
      width: 150,
      valueGetter: ({ row }) => row.Productos.map(item => item.nombre)
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      type: 'number',
      width: 150,
      valueGetter: ({ row }) =>
        row.Productos.map(item => item.Ventas_Producto.cantidad)
    },
    { field: 'metodo_de_pago', headerName: 'Metodo de Pago', width: 150 },
    {
      field: 'iva',
      headerName: 'IVA',
      type: 'number',
      width: 150,
      valueGetter: ({ row }) => `$ ${row.iva}`
    },
    {
      field: 'sub_total',
      headerName: 'Sub-Total',
      width: 150,
      valueGetter: ({ row }) => `$ ${row.sub_total}`
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 150,
      valueGetter: ({ row }) => `$ ${row.total}`
    },
    { field: 'descuento', headerName: 'Descuento', width: 150 },
    { field: 'createdAt', headerName: 'Fecha', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<WhatsApp color="success" />}
            label="Edit"
            onClick={() => console.log(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete color="error" />}
            label="Delete"
            onClick={() => {
              destroy(id)
            }}
            color="inherit"
          />
        ]
      }
    }
  ]
  const screen = {
    '/inventory/history/entry': columnsEntry,
    '/inventory/history/exit': columnsExit,
    '/seller/history': columnsSale
  }
  const datos = {
    rows: data,
    columns: screen[path]
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
        <DataGrid
          {...datos}
          loading={isLoading}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}

export default HistoryView
