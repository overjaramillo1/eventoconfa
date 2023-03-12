import React, { useState, useEffect, useRef } from "react";



export default function ValidarEvento(props) {
  console.log("ValidarEvento>>>" + props.cc);
  const [cc, setCc] = useState(props.cedula);
  const [input, setInput] = useState(props?.cedula ?? '');
  const [nombre, setNombre] = useState("");
  const [beneficios, setBeneficios] = useState([]);

  console.log("props>>>" + props.cedula);

  //setName(props.cc);
  const buscarXDocumento = async (event) => {
    event.preventDefault();
    console.log("consu:>"+event.cc)

    fetch(
      `http://consultacajas.confamiliares.com:8888/eventoNavidad/rest/evento/metodo1?documento=${cc}`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setBeneficios(res.beneficios);
        res.beneficios.forEach((e) => {
          console.log("e>>", e.idBeneficio + "e>>" + e.nombre);
        });

        setNombre(res.nombre);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <form>
        <div>
          {" "}
          <label>
            <hr></hr>
            Ingrese CC buscar Validar Evento::
            <input
              id="cc"
              name="cc"
              type="text"
              value={props.cedula}     
            />
          </label>
          <br></br>
        </div>

        <div className="center">
          <h1>Datos encontrados.</h1>
          <label style={{ color: "blue" }}>Nombre: {nombre} </label>
          <table className="center" style={{ border: 1, textalign: "center" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
            {beneficios.map((e) => (
              <tr>
                <td>{e.idBeneficio}</td>
                <td>{e.nombre}</td>
                <td>{e.estado}</td>
              </tr>
            ))}
          </table>
        </div>

        <br></br>
        <input onClick={buscarXDocumento} type="submit" value="Buscar x CC" />
      </form>
    </>
  );
}
