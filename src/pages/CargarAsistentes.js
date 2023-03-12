import { useState, useEffect, useRef } from "react";
import "./form.css";
import DataTable from "react-data-table-component";
import Papa from "papaparse";

export default function CargarAsistentes() {
  const [eventos, setEventos] = useState([]);
  const itemEventoSelecc = useRef();
  const [asistentes, setAsistentes] = useState([]);
  const [res, setRes] = useState();

  useEffect(() => {
    var token = localStorage.getItem("tk");
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    const getAsistentes = async () => {
      const response = await fetch(
        "https://xua8seev0d.execute-api.us-east-1.amazonaws.com/py/items",
        requestOptions
      );
      const data = await response.json();
      setEventos(Object.values(data.Items));
      console.log("data :>> ", data);
    };
    getAsistentes();
  }, []);

  const registrarAsistentesEvento = (event) => {
    event.preventDefault();
    console.log(itemEventoSelecc.current.value);
    console.log("itemEventoSelecc>>" + itemEventoSelecc.current.value);
    var objSele = eventos.find(
      (c) => c.nombre === itemEventoSelecc.current.value
    );
    console.log("con objSele 2 :>> ", objSele);
    console.log("con objSele documento :>> ", objSele.id);


    console.log(asistentes);
    setRes("registrado");
  };

  let file = null;
  const handleCargarArchivo = ({ target: { files } }) => {
    file = files[0];
    let results;
    Papa.parse(file, {
      delimiter: ",",

      header: true,
      complete: function (responses) {
        results = responses.data;
        console.log(responses.data.length, responses);
        setAsistentes(responses.data);
      },
    });
  };
  var columns = [];
  columns = [
    {
      name: "Cedula",
      selector: (row) => row.cedula,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
    },
  ];

  return (
    <form onSubmit={registrarAsistentesEvento}>
      <div>
        <label>
          Seleccione Evento:
          <input
            list="listaeve"
            name="eve"
            ref={itemEventoSelecc}
            onClick={(e) => {
              itemEventoSelecc.current.value = "";
            }}
          />
        </label>
        <datalist id="listaeve">
          {eventos.map((item, index) => {
            return <option key={index} value={item.nombre} />;
          })}
        </datalist>

        <label>Cargar asistentes</label>
        <input type="file" onChange={handleCargarArchivo} />
        <div style={{ height: 300, width: "80%" }}>
          <DataTable
            title="Beneficios disponibles"
            columns={columns}
            data={asistentes}
          />
        </div>
        <h1>{res}</h1>
        <input type="submit" value="Registrar Asistentes por Evento" />
      </div>
    </form>
  );
}
