import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { GetVencer } from '../../services/GetProducts';
import Postpromociones from '../../services/Promociones/PostPromociones'
import Autenticacion from '../Autenticacion';
import { UploadFile } from '../../Firebase/config';
import { Alert } from 'react-bootstrap'
import emailjs from '@emailjs/browser';




function Principal() {
  Autenticacion()
  console.log("Aquie esta la funcion de autenticacio",Autenticacion);
  
    const[Productos, setProductos]= useState([])
    const [alertas, setalerta]= useState([])
    const [datosModal, setModal] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [Fecha_inicio, setFechaInicio]= useState("")
    const [Fecha_fin, setFechaFin]= useState("")
    const[id_producto, setIdproducto]= useState("")
    const[descuento, setDescuento]= useState(0)
    const [Precio, setPrecio]= useState(0)
    const [Precio_total, setPrecioTotal]= useState("")
    const [url_imagen, setFile]= useState("")
    const [alert, setAlert]= useState({show: false, message: '', variant: ''})
    
    const navigate= useNavigate();

    useEffect(()=>{
        const ObtenerProductos = async()=>{
            const ProductosVnecer= await GetVencer()
            setProductos(ProductosVnecer);

            const alertasGeneradas = ProductosVnecer.map(producto => { //Recorro el array pronto a vencer donde estan los productos pronto a vencer
                const fechaVencimiento = new Date(producto.Fecha_vencimiento); // convierto la fecha de vencimiento en un objeto y le añado date para trabajar en el
                const hoy = new Date();
                const diasRestantes = (fechaVencimiento - hoy) / (1000 * 3600 * 24); //calculo la diferencia entre la fecha de vencimiento y la actual
                if (diasRestantes <=0) {
                  EnviarNotificacion(producto);
                }
                return { // Y creo un objeto alerta lo cual cada producto pronto a vencer crea un objeto con sus atributos
                    id: producto.id,
                    nombre: producto.Nombre_producto,
                    diasRestantes,
                    alerta: diasRestantes <= 15 && diasRestantes > 0

                };
            });
            setalerta(alertasGeneradas.filter(alerta => alerta.alerta));
        }
        
        ObtenerProductos()
    },[])
    async function EnviarNotificacion(producto) {
      const templateParams = {
        nombre_producto: producto.Nombre_producto,
        fecha_vencimiento: producto.Fecha_vencimiento,
        email_administrador: "jeffryandre1234@gmail.com" // pongo esto mi correo
      };
    
      try {
        await emailjs.send(
          'service_bflcyx9', // Reemplazo el Service ID
          'template_x3ozmn8', // Reemplazo el Template ID
          templateParams,
          'tMD2iG4ioZstSyWsK' // Reemplazo el Public Key
        );
        console.log('Correo enviado con éxito!');
      } catch (error) {
        console.error('Error al enviar el correo:', error);
      }
    }
    // async function ObtenerId(id) {
    //   const Id = await GetVencer()
    //   setIdproducto(Id)
    // }
    console.log('este es el id del producto',id_producto);
    

    function AbrirModal(product) {
      setModal(product);
      setIdproducto(product.id);
      setPrecio(Precio_total)
      setAbrirModal(true);
      setDescuento("")
      setPrecioTotal(product.Precio)
    }
    
    // useEffect(()=>{
    //   console.log("Precio_total calculado:", Precio_total)
    // },[descuento, Precio])
    
    //Calcula el descuento
    function calcularDescuento(descuento, precio) { //descuento representa el porcentaje de descuento a aplicar
      if (isNaN(precio) || isNaN(descuento)) { //Valido si precio o descuento no son numeros validos
        console.error("Valores inválidos:", { descuento, precio });
        setPrecioTotal(0);
        return;
      }
      const descuentoPorcentaje = descuento / 100; //Convierto el porcentaje del descuento en valor decimal
      const PrecioConDescuento = precio - (precio * descuentoPorcentaje); //calculo el monto del descuento y resto el descuento
      setPrecioTotal(PrecioConDescuento > 0 ? PrecioConDescuento.toFixed(2) : 0); 
    }

    //Devuelve el precio total con el descuento calculado
    function descuentoCalculado(event){
      const nuevoDescuento = parseFloat(event.target.value); //obtengo los datos actual del campo y lo almaceno en la variable nuevo descuento
      setDescuento(nuevoDescuento);
      calcularDescuento(nuevoDescuento, parseFloat(datosModal.Precio)); //llamo la funcion calcular descuento, procesa los valores
                                                                //Y da el resultado de precio total y actualiza el estado de precio total
    }
    
    console.log(datosModal.Precio);
    
    async function AñadirPromocion() {//Creo una funcion añadir promocion
      try {
        await Postpromociones(id_producto, Fecha_inicio, Fecha_fin, descuento, Precio_total, url_imagen)
        setAlert({show: true, message: '¡Promocion creada exitosamente!'})
        
        
      } catch (error) {
        console.log('Error al crear la promocion', error);
        setAlert({show: true, message: 'Error al crear la promocion', variant: 'danger'})
        
      }
   
    }

    const CerrarSesion=()=>{
      localStorage.clear()
      navigate('/login')
      
    }
    const CargarImagen= async(e)=>{
      const file = e.target.files[0]
      setFile(file)
      if (file) {
        const resultado= await UploadFile(file);
        setFile(resultado)
      }
      
    }
  return (
    <div>
        <aside className="sidebar">
        <h2 className="sidebar-title">Sistema de Gestión de Inventario</h2>
        <nav className="sidebar-nav">
        <Link  className="sidebar-link" to='/principal'>Lista de productos</Link>
        <Link to='/addcategoria' className="sidebar-link">Categoria</Link>
          <Link  className="sidebar-link" to='/añadir' >Añadir productos</Link>
          <Link  className="sidebar-link" to='/principal/adminV'>Productos a vencer</Link>
          <Link  to="/promociones" className="sidebar-link">Promociones</Link>
          <Link  to='/visualizacion/venta' className="sidebar-link">Pedidos</Link>

           <Link to="/reportes" className="sidebar-link">Reports</Link>
          <p className="sidebar-link" ><button onClick={CerrarSesion}>Cerrar Sesion</button></p>

          <a href="#systemManagement" className="sidebar-link">System Management</a>
        </nav>
      </aside>
        <div className=' Alerta'>
            {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                  {alert.message}
                </Alert>
              )}  
            </div>
      <div className="productos-vencer">
    <h1 className="titulo">Productos disponibles para promociones</h1>
    <div className='tabla-contenedor-vencer'>

    <table className="tabla-productos-vencer">
        <thead>
            <tr className="encabezado-tabla">
                <th className="columna-nombre">Nombre del Producto</th>
                <th className="columna-fecha">Fecha de Vencimiento</th>
                <th className="columna-cantidad">Cantidad</th>
                <th className="columna-dias">Días Restantes</th>
                <th>Accion</th>
            </tr>
        </thead>
        <tbody>
               {Productos.map(product => {
                // Filtrar las alertas correspondientes al producto actual
                const alertasProducto = alertas.filter(alerta => alerta.id === product.id);

                return (
                    <tr key={product.id} className="fila-producto">
                        <td className="dato-nombre">{product.Nombre_producto}</td>
                        <td className="dato-fecha">{product.Fecha_vencimiento}</td>
                        <td className="dato-cantidad">{product.Cantidad}</td>
                        <td className="dato-alerta">
                            {alertasProducto.length > 0 ? (
                                alertasProducto.map(alerta => (
                                    <span key={alerta.id} className="alerta">
                                        Vence en {Math.round(alerta.diasRestantes)} días
                                    </span>
                                ))
                            ) : (
                                <p className="no-alerta">Sin alertas de vencimiento</p>
                            )}
                        </td>
                        <td>
                            <button className='' onClick={() => AbrirModal(product)}>Crear promoción</button>
                        </td>
                    </tr>
                );
            })} 
        </tbody>
    </table>
    </div>
</div>
{abrirModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Agregar promoción</h5>
                <button type="button" className="close" onClick={() => setAbrirModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="modalNombre" className="form-label">ID Producto</label>
                  <input
                    type="null"
                    className="form-control"
                    id="modalNombre"
                    value={id_producto}
                    onChange={(e) => setIdproducto({...datosModal})}
                    readOnly // Hace que el campo no sea editable.

                  />
                </div>
                <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="modalNombre" className="form-label">Precio Anterior</label>
                  <input
                    type="number  "
                    className="form-control"
                    id="modalNombre"
                    value={datosModal.Precio}
                    onChange={(e) => setPrecio({...datosModal})}
                    readOnly // Hace que el campo no sea editable
                  />
                 </div>
                <div className="mb-3">
                  <label htmlFor="modalDescripcion" className="form-label">Fecha de inicio</label>
                  <input
                    type="date"
                    className="form-control"
                    id="modalDescripcion"
                    value={Fecha_inicio || ''}
                    onChange={(e) => setFechaInicio(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Fecha finalización</label>
                  <input
                    type="date"
                    className="form-control"
                    id="modalPrecio"
                    value={Fecha_fin || ''}
                    onChange={(e) => setFechaFin(e.target.value )}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Descuento(%)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="modalPrecio"
                    value={descuento}
                    onChange={descuentoCalculado}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Precio Total</label>
                  <input
                    type="number"
                    className="form-control"
                    id="modalPrecio"
                    min={"0"}
                    value={Precio_total}
                    readOnly
                  />
                   <div className="mb-3">
                  <label htmlFor="modalPrecio" className="form-label">Imagen Producto</label>
                  <input
                    type="file"
                    className="form-control"
                    id="modalPrecio"
                    
                    onChange={CargarImagen}
                  />
                </div>
                </div>
               
              
             
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAbrirModal(false)}>Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={AñadirPromocion}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
     

    </div>
  )
}

export default Principal