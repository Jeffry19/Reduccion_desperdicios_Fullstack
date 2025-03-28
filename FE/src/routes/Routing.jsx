import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PregistroUser from '../pages/PregistroUser';
import PLogin from '../pages/PLogin';
import PPrincipal from '../pages/PPrincipal';
import PañadirProducto from '../pages/PañadirProducto';
import Ppvencimiento from '../pages/Ppvencimiento';
import Ppromociones from '../pages/AdminVenta/Ppromociones';
import PprincipalAdminVenta from '../pages/AdminVenta/PprincipalAdminVenta';
import ProtectAdmin from '../../ProtectAdmin';
import PFile from '../pages/PFile';
import Carrito from '../components/CarritoCompras/Carrito';
import PVisualizacionPromociones from '../pages/Visualizacion_Promociones/PVisualizacionPromociones';
import PConfirmar from '../pages/Confirmar_CompraPage/PConfirmar';
import PVisualizacionVenta from '../pages/PVisualizacion-Compras/PVisualizacionVenta';
import PAñadirCategoria from '../pages/PCategoria/PAñadirCategoria';
import PReportes from '../pages/PReportes/PReportes';
import PPerfil from '../pages/PVisualizacionPerfil/PPerfil';
import PHistorialCompras from '../pages/PHistorialCompras/PHistorialCompras';

import PLacteos from '../pages/CategoriasP/PLacteos'
import PCarnes from '../pages/CategoriasP/PCarnes'
import PEnlatados from '../pages/CategoriasP/PEnlatados'
import PAbarrotes from '../pages/CategoriasP/PAbarrotes'
import PContactenos from '../pages/PContactenos/PContactenos';
import Autenticacion from '../components/Autenticacion';
import PPayPal from '../pages/PPayPal/PPayPal';
import AcercaNosotros from '../components/AcercaNosotros/AcercaNosotros';
function Routing() {
  return (
    <div>
        <Router>

            <Routes>
                <Route path='/' element={<PVisualizacionPromociones/>}></Route>
                <Route path='/login' element={<PLogin/>}></Route>
                <Route path='/Registro' element={<PregistroUser/>}></Route>
                <Route path='/Principal' element={<ProtectAdmin><PPrincipal/></ProtectAdmin>}></Route>
                <Route path='/añadir' element={<ProtectAdmin><PañadirProducto/></ProtectAdmin>}></Route>
                <Route path='/vencimiento' element={<ProtectAdmin><Ppvencimiento/></ProtectAdmin>}></Route>
                <Route path='/promociones' element={<ProtectAdmin><Ppromociones/></ProtectAdmin>}></Route>
                <Route path='/principal/adminV' element={<ProtectAdmin><PprincipalAdminVenta/></ProtectAdmin>}></Route>
                <Route path='/visualizacion/venta' element={<PVisualizacionVenta/>}></Route>
                <Route path='/addcategoria' element={<ProtectAdmin><PAñadirCategoria/></ProtectAdmin>}></Route>
                <Route path='/reportes' element={<ProtectAdmin><PReportes/></ProtectAdmin>}></Route>


                <Route path='/paypal' element={<PPayPal/>}></Route>

                
                <Route path='/carrito' element={<Carrito/>}></Route>
                <Route path='/visualizacion/promociones' element={<PVisualizacionPromociones/>}></Route>
                <Route path='/confirmar/compra' element={<PConfirmar/>}></Route>
                <Route path='/enlatados' element={<PEnlatados/>}></Route>
                <Route path='/abarrotes' element={<PAbarrotes/>}></Route>
                <Route path='/lacteos' element={<PLacteos/>}></Route>
                <Route path='/carnes' element={<PCarnes/>}></Route>
                <Route path='/perfil' element={<PPerfil/>}></Route>
                <Route path='/historial/compras' element={<PHistorialCompras/>}></Route>
                <Route path='/contactenos' element={<PContactenos/>}></Route>
                <Route path='/acercade' element={<AcercaNosotros/>}></Route>











                <Route path='/file' element={<PFile/>}></Route>




            </Routes>


        </Router>


    </div>
  )
}

export default Routing