import React from "react";
import "./styles.css";
import Navbar from "./compenents/Navbar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// PAGES
import Validacion from "./pages/Validacion";
import CrearEvento from "./pages/CrearEvento";
import ValidarFacialEvento from "./pages/ValidarFacialEvento";
import RegistrarUso from "./pages/RegistrarUso";
import Signup from "./pages/Signup";
import Login from './pages/Login';
import CargarAsistentes from './pages/CargarAsistentes';
import FaceDetectionx from './pages/FaceDetection';
import RegistrarAsistencia from "./pages/RegistrarAsistencia";
import CargarArchivo from "./pages/CargarArchivo";
import ConsultarAsambleista from "./pages/ConsultarAsambleista";


export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
        <Route path="/" exact component={Login} />
         <Route path="/signup"  component={Signup} />
          <Route path="/validacion"  component={Validacion} />
          <Route path="/crearEvento" component={CrearEvento} />
          <Route path="/validarFacialEvento" component={ValidarFacialEvento} />
          <Route path="/RegistrarUso" component={RegistrarUso} />
          <Route path="/cargarAsistentes" component={CargarAsistentes} />
          <Route path="/faceDetectionx" component={FaceDetectionx} />
          <Route path="/RegistrarAsistencia" component={RegistrarAsistencia} />
          <Route path="/ConsultarAsambleista" component={ConsultarAsambleista} />
          <Route path="/CargarArchivo" component={CargarArchivo} />
          
          
        </Switch>
      </Router>
    </div>
  );
}

