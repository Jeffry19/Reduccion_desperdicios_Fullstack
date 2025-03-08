import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PostUsuarios from '../services/PostUsuario';

function RegistroUser() {
    const [first_name, setPrimerNombre] = useState('');
    const [last_name, setApellido] = useState('');
    const [username, setNombre] = useState('');
    const [email, setCorreo] = useState('');
    const [password, setContraseña] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!first_name || !last_name || !username || !email || !password) {
            alert('Por favor llena todos los espacios');
            return;
        }
        
        try {
            await PostUsuarios(first_name, last_name, username, email, password, false);
            alert('Se registró con éxito');
            setTimeout(() => navigate('/login'), 2500);
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Registro
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Primer Nombre"
                                variant="outlined"
                                value={first_name}
                                onChange={(e) => setPrimerNombre(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Apellido"
                                variant="outlined"
                                value={last_name}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre Usuario"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Correo Electrónico"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contraseña"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Registrar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    ¿Ya tienes una cuenta?{' '}
                    <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/login')}>
                        Iniciar sesión
                    </span>
                </Typography>
            </Paper>
        </Container>
    );
}

export default RegistroUser;
