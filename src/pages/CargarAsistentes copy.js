import { useState, useEffect, useRef } from "react";
import "./form.css";
import Papa from "papaparse";

export default function CargarAsistentes() {
  const [eventos, setEventos] = useState([]);
  const itemAsistenteSelecc = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    var token = localStorage.getItem("tk");
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    console.time("t1i");
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
    console.timeEnd("t1i");
  }, []);

  const [datos, setDatos] = useState({
    id: "",
    nombre: "",
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
    console.log("guardar asistentes :>> ");
  };

  const cargarEventos = () => {
    console.log(itemAsistenteSelecc.current.value);
  };

  const [file, setFile] = useState();

  function handleCargarArchivo(event) {
    console.log(event.target.files);

    var reader = new FileReader();
    
    reader.addEventListener('load', function (e) {
      var r = e.target.result;
      console.log("r :>> ", r);
      let array = r.split(",", 3); 

console.log(array); // ["The","big","question"]
    });
    
    reader.readAsBinaryString(event.target.files[0]);

  
    console.log("archivo :>> ", event);
    const name = event.target.name;
    const value = event.target.files;
    console.log("archivo :>> ", name);
    console.log("archivo :>> ", value);
    setFile(event.target.files[0]);
  }

  const handleChangexx = ({ target: { files } }) => {
    file = files[0];
  };
  
  const importCSV = () => {
    let updates = [];
    console.log(file, "file");
    Papa.parse(file, {
      delimiter: ",",
      chunkSize: 3,
      header: false,
      complete: function(responses) {
        console.log(responses.data.length, responses);
      }
    });
  };

  return (
    <div>
      <form className="row" onSubmit={handleSubmit}>
        <label>
          Seleccione Evento:
          <input
            list="listaeve"
            name="eve"
            ref={itemAsistenteSelecc}
            onClick={(e) => {
              itemAsistenteSelecc.current.value = "";
            }}
          />
        </label>
        <datalist id="listaeve">
          {eventos.map((item, index) => {
            return <option key={index} value={item.nombre} />;
          })}
        </datalist>



        <div className="App">
        <h1>Cargar archivo de asistentes</h1>
      <input type="file" onChange={handleChangexx} />
      <button onClick={importCSV}>Click Me</button>
    </div>

        <h1>Cargar archivo de asistentes</h1>
        <input type="file" onChange={handleCargarArchivo} />
        <button type="submit">Upload</button>

        <label>
          <h1>{res}</h1>
        </label>
        <input type="submit" />
      </form>
      <input onClick={cargarEventos} type="submit" value="cargarEventos" />
    </div>
  );
}
