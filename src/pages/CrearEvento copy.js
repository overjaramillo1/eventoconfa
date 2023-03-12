import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./form.css";


export default function MyFormV1(props) {
  const [datos, setDatos] = useState({
    cedula: props.data,
    cedulap: "",
    nombre: "",
    edad: "",
    tipoA: "",
    genero: "",
  });
  const [res, setRes] = useState();
console.log("<h2> {props.data} </h2>"+props.data)
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // setDatos((datos) => ({ ...datos, [name]: value }));
    setDatos({ ...datos, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   // console.log( {parentToChild})
    console.log(
      "enviando datos...cedula" +
        datos.cedula +
        " cedulap : " +
        datos.cedulap +
        " nombre : " +
        datos.nombre +
        "edad  : " +
        datos.edad +
        "tipoA :  " +
        datos.tipoA +
        " genero : " +
        datos.genero
    );
  //http://consultacajas.confamiliares.com:8888/eventoNavidad/rest/evento/metodo3?documento=222&documentoPadre=222&nombre=OIJA&tipo=C&nivel1=DIRECCION&nivel2=DIRECCION&nivel3=DIRECCION&area=TECNOLOGIA&genero=Femenino&edad=5
    fetch(
      `http://consultacajas.confamiliares.com:8888/eventoNavidad/rest/evento/metodo3?documento=${datos.cedula}&documentoPadre=${datos.cedulap}&nombre=${datos.nombre}&tipo=${datos.tipoA}&nivel1=DIRECCION&nivel2=DIRECCION&nivel3=DIRECCION&area=TECNOLOGIA&genero=${datos.genero}&edad=${datos.edad}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.respuesta) {
          setRes("Registro ingresado con exito✔️");
        }else{
           setRes("❌Error al ingresar "+data.mensaje);
        }
      });
      
  };

  return (
    <div>
      <form className="row" onSubmit={handleSubmit}>
        <label>
          
          <div className="col-md-3">
          Ingrese cedula:<input
              type="text"
              placeholder="Nombre"
              name="cedula"
              className="form-control"
              value={datos.cedula || ""}
              onChange={handleChange}
            />
          </div>
        </label>
        <br />
        <label>
          Ingrese cedula padre:
          <input
            type="text"
            name="cedulap"
            value={datos.cedulap || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ingrese nombre:
          <input
            type="text"
            name="nombre"
            value={datos.nombre || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ingrese edad:
          <input
            type="number"
            name="edad"
            value={datos.edad || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>Seleccione: </label>
        <select name="tipoA" onChange={handleChange} value={datos.tipoA}>
          <option value="">Tipo asistente.</option>
          <option value="A">ACOMPAÑANTE</option>
          <option value="C">COLABORADOR</option>
          <option value="H1">HIJOS 0 - 12 AÑOS</option>
          <option value="H2">HIJOS 13 - 18 AÑOS</option>
          <option value="I">INDEPENDIENTE</option>
          <option value="J">CONSEJERO</option>
          <option value="P">PENSIONADO</option>
        </select>


      
        <label>Seleccione: </label>
        <select name="genero" onChange={handleChange} value={datos.genero}>
          <option value="">Genero</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>


      
        <label>   
          <h1>{res}</h1>
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
