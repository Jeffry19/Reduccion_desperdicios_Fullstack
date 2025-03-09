import React from 'react'
import BotonPerfil from '../BotonPerfil/BotonPerfil'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Imagen4 from '../../img/Imagen4.jpg'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';


const pages = [
  
  { name: 'Acerca de nosotros', path: '/acercade' },
  { name: 'Contactenos', path: '/contactenos' }
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function AcercaNosotros() {


   const [anchorElNav, setAnchorElNav] = React.useState(null);
        const [anchorElUser, setAnchorElUser] = React.useState(null);
      
        const handleOpenNavMenu = (event) => {
          setAnchorElNav(event.currentTarget);
        };
        const handleOpenUserMenu = (event) => {
          setAnchorElUser(event.currentTarget);
        };
        const handleCloseNavMenu = () => {
          setAnchorElNav(null);
        };
        const handleCloseUserMenu = () => {
          setAnchorElUser(null);
        };

  return (
    <div>
      

            <AppBar position="static" color="primary">
          <Container maxWidth="xl">
            <Toolbar>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleOpenNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ textDecoration: 'none', color: 'white', ml: 2 }}
                  >
                    LOGO
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                  {pages.map((page) => (
                    <Button key={page.name} component={Link} to={page.path} color="inherit">
                      {page.name}
                    </Button>
                  ))}
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                      {<BotonPerfil/>}
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
            </Toolbar>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography component={Link} to={page.path} sx={{ textDecoration: 'none', color: 'inherit' }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Container>
        </AppBar>

    <div className='acerca-nosotros'>
<img src={Imagen4} alt="" />
<p className='Texto-Acerca de nostros'>Acerca de Nosotros

En Nuestra Tienda, nos enfocamos en ofrecerte productos de alta calidad a precios accesibles, acompañados de increíbles promociones. Pensamos en tu comodidad, por eso aceptamos métodos de pago seguros y prácticos como Sinpe Móvil y PayPal.

Nuestro compromiso es brindarte la mejor experiencia de compra, siempre priorizando tus necesidades y garantizando satisfacción en cada pedido.

¡Compra fácil, ahorra más y descubre todo lo que tenemos para ti!</p>


</div>
<div className="vision-container">
  <div className="vision-content">
    <h2 className="vision-title">Nuestra Visión</h2>
    <p className="vision-text">
      En <strong>Nuestra Tienda</strong>, aspiramos a ser la primera opción para nuestros clientes, 
      ofreciendo productos de alta calidad, precios accesibles y promociones atractivas. Nos esforzamos 
      por crear una experiencia de compra cómoda, rápida y segura, adaptándonos a las necesidades de un mercado en constante evolución.
    </p>
    <p className="vision-text">
      Queremos ser reconocidos no solo por nuestros productos, sino también por nuestro compromiso con la satisfacción del cliente, 
      brindando un servicio excepcional y métodos de pago modernos como <strong>Sinpe Móvil</strong> y <strong>PayPal</strong>.
    </p>
    <p className="vision-highlight">
      ¡Nuestra misión es superar tus expectativas y convertirnos en tu aliado de confianza para tus compras diarias!
    </p>
  </div>
</div>
<div className="testimonio-container">
  <div className="testimonio-content">
    <h2 className="testimonio-title">Testimonio</h2>
    <p className="testimonio-text">
      "Desde que descubrí <strong>Esta Tienda</strong>, mis compras han sido más fáciles y accesibles. 
      Los productos siempre llegan en perfecto estado, y las promociones me permiten ahorrar mucho. 
      Además, la opción de pagar con <strong>Sinpe Móvil</strong> ha hecho todo el proceso mucho más rápido y seguro."
    </p>
    <p className="testimonio-author">- María Fernández, Cliente Satisfecha</p>
  </div>
</div>


    <div>
    <Footer/>
    </div>
    
    </div>
  )
}

export default AcercaNosotros