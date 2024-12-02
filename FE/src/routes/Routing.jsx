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


function Routing() {
  return (
    <div>
        <Router>

            <Routes>
                <Route path='/' element={<PLogin/>}></Route>
                <Route path='/Registro' element={<PregistroUser/>}></Route>
                <Route path='/Principal' element={<ProtectAdmin><PPrincipal/></ProtectAdmin>}></Route>
                <Route path='/añadir' element={<ProtectAdmin><PañadirProducto/></ProtectAdmin>}></Route>
                <Route path='/vencimiento' element={<ProtectAdmin><Ppvencimiento/></ProtectAdmin>}></Route>
                <Route path='/promociones' element={<ProtectAdmin><Ppromociones/></ProtectAdmin>}></Route>
                <Route path='/principal/adminV' element={<ProtectAdmin><PprincipalAdminVenta/></ProtectAdmin>}></Route>




            </Routes>


        </Router>


    </div>
  )
}

export default Routing