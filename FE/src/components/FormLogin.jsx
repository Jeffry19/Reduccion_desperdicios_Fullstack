import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import token from '../services/token';
import GetUsuario2 from '../services/GetUsuario';

function FormLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({ show: false, message: '', severity: 'error' });
    const navigate = useNavigate();

    const BuscarAdmin = async (username) => {
        try {
            const usuarios = await GetUsuario2();
            const usuario = usuarios.find(user => user.username === username);
            if (usuario && usuario.is_staff) {
                localStorage.setItem('Autenticado', 'Admin');
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error al encontrar admin', error);
            return false;
        }
    };

    const IniciarSesion = async (event) => {
        event.preventDefault();
        if (username === '' || password === '') {
            setAlert({ show: true, message: '¡Rellena todos los espacios!', severity: 'error' });
            return;
        }
        try {
            const esAdmin = await BuscarAdmin(username);
            await token(username, password);
            setAlert({ show: true, message: esAdmin ? '¡Bienvenido Administrador!' : '¡Bienvenido Cliente!', severity: 'success' });
            setTimeout(() => {
                navigate(esAdmin ? '/principal' : '/visualizacion/promociones');
            }, 2000);
        } catch (error) {
            console.log('Ocurrió un error', error);
            setAlert({ show: true, message: '¡No se encontró usuario registrado!', severity: 'error' });
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Iniciar Sesión
                </Typography>
                {alert.show && (
                    <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, show: false })}>
                        {alert.message}
                    </Alert>
                )}
                <form onSubmit={IniciarSesion}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre Usuario"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contraseña"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Iniciar Sesión
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    ¿No tienes una cuenta?{' '}
                    <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/registro')}>
                        Regístrate
                    </span>
                </Typography>
            </Paper>
        </Container>
    );
}

export default FormLogin;
