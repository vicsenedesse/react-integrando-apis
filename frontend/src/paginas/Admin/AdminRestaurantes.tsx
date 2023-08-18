import React, { useEffect, useState } from 'react'
import IRestaurante from '../../interfaces/IRestaurante'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'
import http from '../../http'

export default function AdminRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(res => setRestaurantes(res.data))
    }, [])

    const excluir = (rest: IRestaurante) => {
        http.delete(`restaurantes/${rest.id}/`)
            .then(res => {
                const listaRest = restaurantes.filter(it => it.id !== rest.id);
                setRestaurantes([...listaRest]);
            })
    }

  return (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Editar</TableCell>
                    <TableCell>Excluir</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {restaurantes.map(rest =>
                    <TableRow key={rest.id}>
                        <TableCell>{rest.nome}</TableCell>
                        <TableCell>
                            [ <Link to={`/admin/restaurantes/${rest.id}`}>editar</Link> ]
                        </TableCell>
                        <TableCell>
                            <Button 
                                variant='outlined' 
                                color='error'
                                onClick={() => excluir(rest)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </TableContainer>
  )
}
