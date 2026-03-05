// src/app/router.jsx (o Routes.jsx)
import React from "react";
import Inicio from "./pages/Inicio";
import Ejercicio2 from "./pages/Ejercicio2";
import Ejercicio3 from "./pages/Ejercicio3";
import Ejercicio4 from "./pages/Ejercicio4";
import Ejercicio5 from "./pages/Ejercicio5";
// 1. Importamos el nuevo componente
import Laboratorio1 from "./pages/Laboratorio1"; 
import Laboratorio2 from "./pages/Laboratorio2";
import Laboratorio3 from "./pages/Laboratorio3";
import Laboratorio4 from "./pages/Laboratorio4";
import Laboratorio5 from "./pages/Laboratorio5";
import Laboratorio6 from "./pages/Laboratorio6";

const routes = [
  { path: "/", element: <Inicio />, index: true },
  { path: "ejercicio2", element: <Ejercicio2 /> },
  { path: "ejercicio3", element: <Ejercicio3 /> },
  { path: "ejercicio4", element: <Ejercicio4 /> },
  { path: "ejercicio5", element: <Ejercicio5 /> },
  // 2. Agregamos la ruta con el nuevo nombre
  { path: "laboratorio1", element: <Laboratorio1 /> },
  { path: "laboratorio2", element: <Laboratorio2 /> },
  { path: "laboratorio3", element: <Laboratorio3 /> },
  { path: "laboratorio4", element: <Laboratorio4 /> },
  { path: "laboratorio5", element: <Laboratorio5 /> },
  { path: "laboratorio6", element: <Laboratorio6 /> },
  
];

export default routes;