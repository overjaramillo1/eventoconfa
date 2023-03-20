import { useState, useEffect, useRef } from "react";
import "./form.css";
import DataTable from "react-data-table-component";
import Papa from "papaparse";
import axios from "axios";

export default function CargarArchivo() {
  const [eventos, setEventos] = useState([]);
  const itemEventoSelecc = useRef();
  const [asistentes, setAsistentes] = useState([]);
  const [res, setRes] = useState();
  var formData = new FormData();
  var fileInput=null;
  const [file, setFile] = useState(null);
  const [filename, SetFilename] = useState("");
  /*useEffect(() => {
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
*/



const enviarArchivo = async () => {

    const formData = new FormData();
    formData.append('File', file);
    console.log('file ***:>> ', file);

    try {
   const res=   await  fetch('https://doq6msba36.execute-api.us-east-1.amazonaws.com/PY/upload', 
    {
      method: 'POST',
      headers: {
        filename: 'prueba.pdf',
        bucket:'confaanexospy/MPC/beneficios/postulaciones',
        sistema:'MPC'
      },
      body: file
    })
    const actualData = await res.json();
    console.log(actualData);

      
  } catch (error) {
      console.log('error :>> ', error);
  }


};


  
  const handleCargarArchivo = async ({ target: { files } }) => {

    try {

      const fileInput = document.querySelector('input[type="file"]');
  
      const formData = new FormData();
    formData.append("file", file);


      fetch('https://doq6msba36.execute-api.us-east-1.amazonaws.com/PY/upload', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          filename: file,
          bucket:'confaanexospy/MPC/beneficios/postulaciones',
          sistema:'MPC'
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    } catch (error) {
      console.log('error :>> ', error);
  }





    console.log('files :>> ',formData );
    file = files[0];
    let results;
    Papa.parse(file, {
      delimiter: ",",

      header: true,
      complete: function (responses) {
        results = responses.data;
        file=results;
        console.log('91:>>'+responses.data.length, responses);
        setAsistentes(responses.data);
      },
    });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
   // formData.append("filename", name);
   
    const resp = await axios.post('https://doq6msba36.execute-api.us-east-1.amazonaws.com/PY/upload', formData, {
      headers: {
        "Content-Type": "application/json",
        bucket:'confaanexospy/MPC/beneficios/postulaciones',
        sistema:'MPC'
      },
      
    });
    console.log(resp.status)
  };

  return (
<form  onSubmit={handleSubmit} >
      <div>
        <label>
          Nombre Archivo
          <input
            list="nomarc"
            name="eve"
            ref={itemEventoSelecc}
            onClick={(e) => {
              itemEventoSelecc.current.value = "";
            }}
          />
        </label>


        <label>Cargar Archivo</label>
      
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <div style={{ height: 300, width: "80%" }}>

        </div>
        <h1>{res}</h1>
        <input type="submit" value="Cargar archivo" onClick={enviarArchivo} />
      </div>
      </form>
  );
}
