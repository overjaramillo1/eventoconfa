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
  var fileInput = null;
  const [file, setFile] = useState(null);
  const [filename, SetFilename] = useState("");
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("file... :>> ", file);
    console.log("file.name.. :>> ", file.name);
    const formData = new FormData();
    //{mode:'cors'}
  //  f, {
    //  fetch("https://4geirpp1m2.execute-api.us-east-1.amazonaws.com/pd/subir", {
      //fetch("https://doq6msba36.execute-api.us-east-1.amazonaws.com/PD/upload", {
      //  fetch("https://h3c4knbj64.execute-api.us-east-1.amazonaws.com/pyy/subir", {
       fetch(" https://doq6msba36.execute-api.us-east-1.amazonaws.com/PD/upload", {
         
      method: "POST",
      body: file,
      
      headers: {
        "Content-Type": "multipart/form-data",
        "sistema":"MPC",
        "bucket":"confaanexospy/MPC/beneficios/postulaciones",
        "filename":file.name
        
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
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

        <label>Cargar Archivo-21--ok</label>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <div style={{ height: 300, width: "80%" }}></div>
        <h1>{res}</h1>
        <input type="submit" value="Cargar archivo 22 ok" />
      </div>
    </form>
  );
}
