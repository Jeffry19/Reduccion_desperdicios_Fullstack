import React, { useEffect, useState } from "react";
import "../../css/VisualizacionPromociones.css";
import Modal from "../Modal/Modal";
import { json, Link, useNavigate } from "react-router-dom";
import GetPromociones from "../../services/Promociones/GetPromociones";
import { Alert } from "react-bootstrap";

import LoginButton from "../LoginButton";
import { jwtDecode } from "jwt-decode";
import Enlatados from "../../img/Enlatados.png";
import Carnes from "../../img/Carnes.png";
import Lacteos from "../../img/Lacteos.png";
import Imagen1 from "../../img/Imagen1.jpg";
import { GetProducts } from "../../services/GetProducts";
import BotonPerfil from "../BotonPerfil/BotonPerfil";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";


function PromocionesVisuali() {
  // Definición de estados
  const [LitaPromociones, setListaPromociones] = useState([]); // Almacena las promociones disponibles.
  const [abrirModal, setAbrirModal] = useState(false); // Controla la apertura y cierre de un modal.
  const [carrito, setCarrito] = useState([]); // Almacena los productos añadidos al carrito.
  const navigate = useNavigate(); // Hook para la navegación entre rutas.
  const [isLogin, setIsLogin] = useState(false); // Verifica si el usuario ha iniciado sesión.
  const [ListaProductos, setProducto] = useState([]); // Almacena la lista de productos disponibles.
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" }); // Almacena información para mostrar alertas.

  // Hook useEffect que se ejecuta al montar el componente.
  useEffect(() => {
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
        setIsLogin(true);
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
  }, []); // El array vacío asegura que se ejecute solo al montar el componente.

  // Función para agregar un producto al carrito.
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      // Actualiza el estado del carrito.
      // Busca si el producto ya existe en el carrito.
      const existe = prevCarrito.find(
        (item) => item.id === producto.id && item.tipo === producto.tipo
      );
      if (existe) {
        setAlert({
          show: true,
          message: "Producto Agregado al carrito de compras",
        });

        // Si el producto ya existe, incrementa su cantidad.
        return prevCarrito.map((item) =>
          item.id === producto.id && item.tipo === producto.tipo
            ? { ...item, cantidad: item.cantidad + 1 } // Copia el objeto y aumenta la cantidad.
            : item
        );
      } else {
        setAlert({
          show: true,
          message: "Producto Agregado al carrito de compras",
        });
        // Si no existe, lo agrega al carrito con cantidad inicial de 1.
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  console.log(carrito); // Muestra el contenido del carrito en consola.

  // Función para cerrar sesión.
  function CerrarSesion() {
    localStorage.clear(); // Limpia el almacenamiento local.
    window.location.reload(); // Recarga la página.
    navigate("/"); // Redirige a la página principal.
  }

  return (
    <div>
          <div>
      {/* Usamos el componente Navbar */}
      <Navbar 
        carrito={carrito}
        setAbrirModal={setAbrirModal}
        setIsLogin={setIsLogin}
        setCarrito={setCarrito} 
        isLogin={isLogin}
        CerrarSesion={CerrarSesion}
        alert={alert}
        setAlert={setAlert}
      />
      
      {/* Resto de tu código sigue aquí */}
      
    </div>
      <div className=" Alerta">
        {alert.show && (
          <Alert
            variant={alert.variant}
            onClose={() => setAlert({ ...alert, show: false })}
            dismissible
          >
            {alert.message}
          </Alert>
        )}
      </div>
      <img src={Imagen1} alt="" className="Imagen-bienvenida" />

      <div className="bienvenida-container">
        <h1 className="bienvenida-titulo">¡Bienvenidos a Nuestra Tienda!</h1>
      </div>
      <br />
      <br />
      <br />
      <div className="Texto-bienvenida">
        <p className="bienvenida-texto">
          Descubre ofertas increíbles y productos seleccionados cuidadosamente
          para ti.
          <span className="bienvenida-resalta">
            ¡Calidad y frescura garantizada!
          </span>
        </p>
        <p className="bienvenida-texto">
          Aprovecha nuestras promociones exclusivas y llena tu carrito con
          productos irresistibles.
        </p>
        <p className="bienvenida-texto">
          ¡No esperes más, explora nuestro catálogo hoy mismo!
        </p>
      </div>

      {/* Sección de categorías destacadas */}
      <div className="highlighted-categories">
        <h2>Categorías destacadas</h2>
        <br />
        <br />
        <div className="categories-container">
          <div className="category-card">
            <div className="category-icon">
              <img
                src="https://info.megasuper.com/categorias/Abarrotes.png"
                alt=""
              />
            </div>
            <Link to="/abarrotes">
              <p className="category-name">Abarrotes</p>
            </Link>
          </div>

          <div className="category-card">
            <div className="category-icon">
              <img src={Enlatados} alt="" />
            </div>
            <Link to="/enlatados">
              <p className="category-name">Enlatados</p>
            </Link>
          </div>

          <div className="category-card">
            <div className="category-icon">
              <img src={Carnes} alt="" />
            </div>
            <Link to="/carnes">
              <p className="category-name">Carnes</p>
            </Link>
          </div>
          <div className="category-card">
            <div className="category-icon">
              <img src={Lacteos} alt="" />
            </div>
            <Link to="/lacteos">
              <p className="category-name">Lacteos</p>
            </Link>
          </div>
        </div>
      </div>

      {/*CARRTAS DE LAS PROMOCIONES  */}
      <div className="promotions-container">
        <div className="promotions-container">
          <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
            <h1 className="promotions-title">Promociones</h1>
            <div className="promotions-sections1">
              {LitaPromociones.map((Promo) => (
                <div className="promotion-item1" key={Promo.id}>
                  <div className="promocion-card21">
                    <div className="promocion-card-header1">
                      {Promo.url_imagen && (
                        <img
                          src={Promo.url_imagen}
                          alt={Promo.id_producto.Nombre_producto}
                          className="promotion-image"
                        />
                      )}
                    </div>
                    <div className="promocion-card-body">
                      <p className="promotion-name">
                        {Promo.id_producto.Nombre_producto}
                      </p>
                      <p className="promotion-discount">
                        Ahorro:{" "}
                        <span className="discount-percentage">
                          {Promo.Descuento}%
                        </span>
                      </p>
                      <span className="old-price">
                        CRC {Promo.id_producto.Precio}
                      </span>

                      <p className="promotion-price">
                        <span className="current-price">
                          CRC {Promo.Precio_total}
                        </span>
                      </p>
                      <button
                        className="add-to-cart-promocion"
                        onClick={() =>
                          agregarAlCarrito({ ...Promo, tipo: "promocion" })
                        }
                      >
                        Agregar 🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="promotions-container">
        <div
          className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5"
          id="Contenedor-productos-disponibles"
        >
          <h1 className="promotions-title">Productos Disponibles</h1>
          <div className="promotions-sections1">
            {ListaProductos.map((prod) => (
              <div className="productos-item" key={prod.id}>
                <div className="producto-card2">
                  <div className="producto-card2-header">
                    {prod.Imagen_Producto && (
                      <img
                        src={prod.Imagen_Producto}
                        alt={prod.Nombre_producto}
                        className="promotion-image"
                      />
                    )}
                  </div>
                  <div className="promotion-card-body">
                    <p className="producto-card2-name">
                      {prod.Nombre_producto}
                    </p>
                    <p className="promotion-price">
                      <span className="current-price">CRC {prod.Precio}</span>
                    </p>
                    <button
                      className="add-to-cart-product"
                      onClick={() =>
                        agregarAlCarrito({ ...prod, tipo: "producto" })
                      }
                    >
                      Agregar 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PromocionesVisuali;
