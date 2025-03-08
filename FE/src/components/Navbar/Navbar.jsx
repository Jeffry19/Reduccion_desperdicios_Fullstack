import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap'; // Mantenemos Alert de React-Bootstrap
import LoginButton from '../LoginButton'; // Mantenemos LoginButton
import BotonPerfil from '../BotonPerfil/BotonPerfil'; // Mantenemos BotonPerfil
import { GetProducts } from "../../services/GetProducts";
import GetPromociones from "../../services/Promociones/GetPromociones";
import Modal from "../Modal/Modal";

function Navbar({ carrito, isLogin, setCarrito, CerrarSesion, setAlert, alert }) {
  const [abrirModal, setAbrirModal] = React.useState(false); // Controla la apertura y cierre de un modal.
  const [LitaPromociones, setListaPromociones] = React.useState([]); // Almacena las promociones disponibles.
  const navigate = useNavigate(); // Hook para la navegación entre rutas.
  const [ListaProductos, setProducto] = React.useState([]); // Almacena la lista de productos disponibles.
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

  React.useEffect(() => {
    // Función para obtener las promociones desde el backend.
    async function ObtenerPromociones() {
      const Promociones = await GetPromociones(); // Llama a la función GetPromociones.
      setListaPromociones(Promociones); // Actualiza el estado con las promociones obtenidas.
    }

    // Función para obtener los productos desde el backend.
    const ObtenerProductos = async () => {
      const Productos = await GetProducts(); // Llama a la función GetProducts.
      setProducto(Productos); // Actualiza el estado con los productos obtenidos.
    };

    // Recupera el token almacenado en el localStorage.
    const TokenCodigo = localStorage.getItem("access-token");

    // Verifica si el token no está presente.
    if (!TokenCodigo) {
      console.log("No se encontró token en la sesión");
    }

    try {
      // Si hay un token, se establece que el usuario ha iniciado sesión.
      if (TokenCodigo) {
        setIsLogin(true); // Asegúrate de que setIsLogin esté definido.
      }

      // Decodifica el token para obtener información del usuario.
      const tokenDecifrado = jwtDecode(TokenCodigo);
      localStorage.setItem("Id_user", tokenDecifrado.user_id); // Almacena el ID del usuario en el localStorage.
      console.log(tokenDecifrado);
    } catch (error) {
      console.log("ERROR al decodificar el token", error); // Muestra un error si no se pudo decodificar el token.
    }

    // Función para limpiar el localStorage después de cierto tiempo.
    const EliminarLocal = () => {
      setTimeout(() => {
        localStorage.clear(); // Limpia el almacenamiento local después de 200 segundos.
      }, 200000);
    };

    // Recupera el carrito almacenado en el localStorage.
    const carritoGuardado = JSON.parse(
      localStorage.getItem("CarritoSelecccionado")
    );
    if (carritoGuardado) {
      setCarrito(carritoGuardado); // Si hay un carrito guardado, se carga en el estado.
    }

    // Llamadas a las funciones para obtener datos y limpiar el localStorage.
    ObtenerPromociones();
    EliminarLocal();
    ObtenerProductos();
  }, []);

  // Función para eliminar un producto del carrito por su ID.
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id)); // Filtra y elimina el producto con el ID especificado.
    setAlert({
      show: true,
      message: "Producto Eliminado del carrito de compras",
      variant: "warning",
    });
  };

  // Función para actualizar la cantidad de un producto en el carrito.
  const actualizarCantidad = (id, tipo, nuevaCantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id && item.tipo === tipo
          ? { ...item, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 0 } // Actualiza la cantidad si es mayor a 0.
          : item
      )
    );
  };

  // Calcula el subtotal del carrito.
  const subtotal = carrito.reduce(
    (acc, item) =>
      acc + item.cantidad * item.Precio_total ||
      acc + item.cantidad * item.Precio,
    0
  );

  // Función para manejar el proceso de compra.
  const ManejarCarrito = () => {
    const id_cliente = localStorage.getItem("Id_user"); // Recupera el ID del usuario.
    if (!id_cliente) {
      setAlert({
        show: true,
        message: "Debes Iniciar sesión para continuar la compra",
        variant: "warning",
      });
      return; // Si no hay ID, muestra una alerta y detiene el proceso.
    }
    localStorage.setItem(
      "CarritoSelecccionado",
      JSON.stringify(carrito, subtotal)
    ); // Guarda el carrito en el localStorage.
    navigate("/confirmar/compra"); // Redirige a la página de confirmación de compra.
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                <Typography textAlign="center">Página Principal</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/acercade">
                <Typography textAlign="center">Acerca de nosotros</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/contactenos">
                <Typography textAlign="center">Contáctenos</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link}
              to="/acercade"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Acerca de nosotros
            </Button>
            <Button
              component={Link}
              to="/contactenos"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Contáctenos
            </Button>
            {isLogin ? (
              <Button
                onClick={CerrarSesion}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Cerrar Sesión
              </Button>
            ) : (
                <Button   sx={{ my: 2, color: 'white', display: 'block' }}> 
                 <LoginButton />
                 </Button>
             
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* Botón de Ingreso o Cerrar Sesión */}
           

            {/* Botón del carrito */}
            <Tooltip title="Carrito de compras">
              <IconButton onClick={() => setAbrirModal(true)} sx={{ p: 0, color: 'white' }}>
                <ShoppingCartIcon />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({carrito.length})
                </Typography>
              </IconButton>
            </Tooltip>

            {/* Botón de perfil */}
            <Tooltip title="Perfil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
                <BotonPerfil />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>

      {/* Modal del carrito */}
      <Modal
        isOpen={abrirModal}
        onClose={() => setAbrirModal(false)}
      >
        <h2 className="cart-title">Mi carrito</h2>
        <button
          className="empty-cart-button"
          onClick={() => setCarrito([])}
        >
          Vaciar carrito
        </button>
        <div className="cart-items">
          {carrito.length === 0 ? (
            <p className="empty-cart-message">¡Tu carrito está vacío!</p>
          ) : (
            carrito.map((item) => (
              <div key={`${item.id}-${item.tipo}`} className="carrito-item">
                <img
                  src={item.url_imagen || item.Imagen_Producto}
                  className="promotion-image"
                />
                <p className="cart-item-name">
                  {item.tipo === "promocion" ? "Promocion" : "Producto"}
                  {item.Nombre_producto || item.id_producto.Nombre_producto}
                </p>
                <p className="cart-item-price">
                  ₡ {item.Precio_total || item.Precio}
                </p>
                <div className="cart-quantity-control">
                  <button
                    className="quantity-button decrease"
                    onClick={() =>
                      actualizarCantidad(
                        item.id,
                        item.tipo,
                        item.cantidad - 1
                      )
                    }
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.cantidad}</span>
                  <button
                    className="quantity-button increase"
                    onClick={() =>
                      actualizarCantidad(
                        item.id,
                        item.tipo,
                        item.cantidad + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-item-button"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-summary">
          <p className="cart-subtotal">
            <span>Subtotal:</span> ₡ {subtotal.toFixed(2)}
          </p>
          <p className="cart-total">
            <span>Total:</span> ₡ {subtotal.toFixed(2)}
          </p>
          <button onClick={ManejarCarrito} className="checkout-button">
            Continuar con la compra
          </button>
        </div>
      </Modal>

      {/* Alert de React-Bootstrap */}
     
    </AppBar>
  );
}

export default Navbar;