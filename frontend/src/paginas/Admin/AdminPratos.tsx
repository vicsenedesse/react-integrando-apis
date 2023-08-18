import React, { useEffect, useState } from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'
import http from '../../http'
import IPrato from '../../interfaces/IPrato'

export default function AdminPratos() {
    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(res => setPratos(res.data))
    }, [])

    const excluir = (prato: IPrato) => {
        http.delete(`pratos/${prato.id}/`)
            .then(res => {
                const listaPrato = pratos.filter(it => it.id !== prato.id);
                setPratos([...listaPrato]);
            })
    }

  return (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Tag</TableCell>
                    <TableCell>Imagem</TableCell>
                    <TableCell>Editar</TableCell>
                    <TableCell>Excluir</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {pratos.map(prato =>
                    <TableRow key={prato.id}>
                        <TableCell>{prato.nome}</TableCell>
                        <TableCell>{prato.tag}</TableCell>
                        <TableCell>
                            [ <a href={prato.nome} 
                                target='_blank' 
                                rel="noreferrer">
                                    ver imagem
                                </a> ]
                        </TableCell>
                        <TableCell>
                            [ <Link to={`/admin/prato/${prato.id}`}>editar</Link> ]
                        </TableCell>
                        <TableCell>
                            <Button 
                                variant='outlined' 
                                color='error'
                                onClick={() => excluir(prato)}>
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
