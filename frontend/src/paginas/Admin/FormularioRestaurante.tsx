import { AppBar, Box, Button, Container, Link, Paper, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import IRestaurante from '../../interfaces/IRestaurante';
import http from '../../http';

export default function FormularioRestaurante() {
    const [nomeRestaurante, setNomeRestaurante] = useState('')
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(res => {
                    setNomeRestaurante(res.data.nome)
                })
        }
    }, [])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
            .then(() => {
                alert("Restaurante atualizado com sucesso!")
            })}
        else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
            .then(() => {
                alert("Restaurante cadastrado com sucesso!")
            })
        }
    }

  return (
    <>
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", flexGrow: 1}}>
            <Typography component="h1" variant="h6">Formulário Restaurantes</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={onSubmit}>
                <TextField 
                    value={nomeRestaurante}
                    id="standard-basic" 
                    label="Nome do Restaurante" 
                    variant="standard" 
                    onChange={event => setNomeRestaurante(event.target.value)}
                    fullWidth
                    required
                />
                <Button 
                    type="submit"
                    variant="outlined"
                    fullWidth
                    sx={{marginTop: 1}}>
                    Salvar
                </Button>
            </Box>
        </Box>
    </>
  )
}
