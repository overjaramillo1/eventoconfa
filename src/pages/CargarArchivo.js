import { useState, useEffect, useRef } from "react";
import "./form.css";
import {
  Avatar,
  CardActions,
  Alert,
  Item,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Link from '@mui/material/Link';

export default function CargarArchivo() {
  
  
  const [res, setRes] = useState();
  const [filed, setFiled] = useState(null);
  const [file, setFile] = useState(null);
  const [datos, setDatos] = useState({
    nomarc: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // setDatos((datos) => ({ ...datos, [name]: value }));
    setDatos({ ...datos, [event.target.name]: event.target.value });
  };
  
  const handleClick = () => {
    const text = atob(filed);//
    const blob = new Blob([text], { type: 'text/plain' });  
    const link = document.createElement('a');
    link.download = 'archivo.txt';
    link.href = window.URL.createObjectURL(blob);
    link.click();

  }

  const bajar = () => {

    console.log("bajar...")
    var requestOptions = {
      method: "GET",
    };

    fetch(
      "https://6rorbbfaeb.execute-api.us-east-1.amazonaws.com/py/download",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('RES>'+JSON.stringify(data));
//        console.log('body :>> ', data.body);
        setFiled(data.body);
      })
      .catch((error) => console.log("error", error));

  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("nomarc... :>> ",  datos.nomarc);
    console.log("file.name.. :>> ", file.name);
    
    fetch("https://doq6msba36.execute-api.us-east-1.amazonaws.com/PD/upload", {     
      method: "POST",
      body: file,
      headers: {
        "Content-Type": "multipart/form-data",
        "sistema":"MPC",
        "bucket":"confaanexospy/MPC/beneficios/postulaciones",
        "filename": file.name
        
      },
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);

        if(data.statusCode===200 && data.body.respuestaGuardar==='ok' ){
          setRes('Almacenado con exito>>> ' +data.body.rutaGuardado);
          console.log('ruta>>'+data.body.rutaGuardado);
        }else{
          setRes('Error' +data.statusCode);
        }
        
      })
      .catch((err) => console.error(err));
     
  };

  return (
    <>
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre Archivo
          <input
              type="text"
              placeholder="Nombre"
              name="nomarc"
              value={datos.nomarc || ""}
              onChange={handleChange}
            />
        </label>

        <label>Cargar Archivo-21--ok</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      
        <h1>{res}</h1>
        <input type="submit" value="Cargar archivo 22 ok" />
      </div>
      <div>
        <label>{res}</label>
        </div>
      
    </form>
    <Card>
        <CardContent>
          <Grid container >
            <Grid item xs={2}>
    <div>
    <input type="submit" value="bajar" onClick={bajar}/>
    <a href="#" onClick={handleClick}>var</a>
    <Link
        component="button"
        variant="body2"
        onClick={handleClick}
      >
        ver archivo
      </Link>
    </div>
    </Grid>
    </Grid>
    </CardContent>
    </Card>
    </div>
    </>
  );
}
