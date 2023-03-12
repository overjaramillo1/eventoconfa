import { useState } from "react";
import "./form.css";


export default function CrearEvento() {
  const [datos, setDatos] = useState({
    id:"",
    nombre:"",
    fecha: "",
    descripcion: "",
    estado: "",
    tipo: "",
  });
  const [res, setRes] = useState();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    setDatos({ ...datos, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   // console.log( {parentToChild})
    var id=String(Math.floor(Math.random() * 100));;
    console.log("id"+id);
    console.log(
      "enviando datos...nombre" +
        datos.nombre +
        " fecha : " +
        datos.fecha +
        " descripcion : " +
        datos.descripcion +
        "estado  : " +
        datos.estado +
        "tipo :  " +
        datos.tipo
    );
    datos.id=id;
    //Authorization
    var token = localStorage.getItem('tk');
// 'x-api-key': "da3j0LYdK46bGLzs67oCK1X23imFczh79e9XwbIy"
    var requestOptions = {
      method: "PUT",
      headers: {
        "Authorization": token,
      },
      body: JSON.stringify(datos),
    };
//EventoApiv2 (xua8seev0d)

  //  fetch('https://xua8seev0d.execute-api.us-east-1.amazonaws.com/py',requestOptions) post
  //https://xua8seev0d.execute-api.us-east-1.amazonaws.com/py/items put
  fetch('https://xua8seev0d.execute-api.us-east-1.amazonaws.com/py/items',requestOptions)
  
      .then((response) => response.json())
      .then((data) => {
        console.log("respu>", data);
        if (data) {
          setRes("Registro ingresado con exito✔️");
        }else{
           setRes("❌Error al ingresar "+data);
        }
      });
      
  };

  return (
    <div>
      <form className="row" onSubmit={handleSubmit}>
        <label>
          <h1>Crear Evento</h1>
          <div className="col-md-3">
          Nombre evento:<input
              type="text"
              placeholder="Nombre evento"
              name="nombre"
              className="form-control"
              value={datos.nombre || ""}
              onChange={handleChange}
            />
          </div>
        </label>
        <br />
        <label>
          Descripción evento:
          <input
            type="textarea"
            name="descripcion"
            value={datos.descripcion || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ingrese fecha:
          <input
            type="date"
            name="fecha"
            value={datos.fecha || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ingrese estado:
          <input
            type="text"
            name="estado"
            value={datos.estado || ""}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>Seleccione: </label>
        <select name="tipo" onChange={handleChange} value={datos.tipo}>
        <option value="">Tipo</option>
          <option value="Virtual">Virtual</option>
          <option value="Presencial">Presencial</option>
        </select>
      
        <label>   
          <h1>{res}</h1>
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
