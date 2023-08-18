import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IRestaurante from '../../interfaces/IRestaurante';
import http from '../../http';
import ITags from '../../interfaces/ITags';

export default function FormularioPratos() {
    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tags, setTags] = useState<ITags[]>([])
    const [tag, setTag] = useState('')
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState('')
    const [imagem, setImagem] = useState<File|null>(null)
    // const parametros = useParams();

    useEffect(() => {
        http.get<{tags: ITags[]}>(`tags/`)
            .then(res => {
                setTags(res.data.tags)
            })
        http.get<IRestaurante[]>('restaurantes/')
            .then(res => {
                setRestaurantes(res.data)
            })
    }, [])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nome', nomePrato);
        formData.append('descricao', descricao);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);
        imagem && formData.append('imagem', imagem);

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }).then(res => {
            setNomePrato('')
            setRestaurante('')
            setTag('')
            setDescricao('')
            setImagem(null)
            alert('Prato cadastrado com sucesse!')
        }).catch(erro => console.log(erro))

    }

    const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImagem(event.target.files[0])
        } else { setImagem(null) }
    }

  return (
    <>
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", flexGrow: 1}}>
            <Typography component="h1" variant="h6">Formulário Pratos</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={onSubmit}>
                <TextField 
                    value={nomePrato}
                    id="standard-basic" 
                    label="Nome do Prato" 
                    variant="standard" 
                    onChange={event => setNomePrato(event.target.value)}
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField 
                    value={descricao}
                    id="standard-basic" 
                    label="Descricao do Prato" 
                    variant="standard" 
                    onChange={event => setDescricao(event.target.value)}
                    fullWidth
                    required
                    margin="dense"
                />
                <FormControl margin='dense' fullWidth >
                    <InputLabel id='select-tag'>Tag</InputLabel>
                    <Select 
                    variant="standard"
                    labelId='select-tag' 
                    value={tag} 
                    onChange={event => setTag(event.target.value)}>
                        {tags.map(tag => 
                            <MenuItem key={tag.id} value={tag.value}>
                                {tag.value}
                            </MenuItem>    
                        )}
                    </Select>

                </FormControl>
                <FormControl margin='dense' fullWidth >
                    <InputLabel id='select-restaurante'>Restaurante</InputLabel>
                    <Select 
                    variant="standard"
                    labelId='select-restaurante' 
                    value={restaurante} 
                    onChange={event => setRestaurante(event.target.value)}>
                        {restaurantes.map(rest => 
                            <MenuItem key={rest.id} value={rest.id}>
                                {rest.nome}
                            </MenuItem>    
                        )}
                    </Select>
                </FormControl>
                <input type='file'
                        onChange={selecionarArquivo}>
                </input>
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
