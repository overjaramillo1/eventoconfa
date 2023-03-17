import React from "react";


import { IoSettingsOutline,IoCheckboxOutline } from 'react-icons/io5'
import { IoIosPersonAdd } from "react-icons/io";



export const SidebarData = [
  {
    title: "Login",
    path: "/",
    icon: <IoIosPersonAdd/>,
    cName: "nav-text"
  },
  {
    title: "Signup",
    path: "/signup",
    icon: <IoIosPersonAdd/>,
    cName: "nav-text"
  },
  {
    title: "Validacion",
    path: "/validacion",
    icon: <IoIosPersonAdd/>,
    cName: "nav-text"
  },
  {
    title: "Registrar Asistencia",
    path: "/validarFacialEvento",
    icon: <IoCheckboxOutline />,
    cName: "nav-text"
  },
  {
    title: "Registrar Uso",
    path: "/registrarUso",
    icon: <IoCheckboxOutline />,
    cName: "nav-text"
  },
  {
    title: "CrearEvento",
    path: "/crearEvento",
    icon: <IoSettingsOutline />,
    cName: "nav-text"
  },
  {
    title: "Cargar Asistentes",
    path: "/cargarAsistentes",
    icon: <IoSettingsOutline />,
    cName: "nav-text"
  },
  {
    title: "FaceDetectionx",
    path: "/faceDetectionx",
    icon: <IoSettingsOutline />,
    cName: "nav-text"
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoSettingsOutline />,
    cName: "nav-text"
  },
  {
    title: "Registrar Asistencia Capa",
    path: "/RegistrarAsistencia",
    icon: <IoSettingsOutline />,
    cName: "nav-text"
  },
  {
    title: "Consultar Asambleista",
    path: "/ConsultarAsambleista",
    icon: <IoSettingsOutline />,
    cName: "nav-text"
  }

  
];
