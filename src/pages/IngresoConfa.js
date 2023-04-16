import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  useRadioGroup,
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
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Select, MenuItem } from '@material-ui/core';


export default function Validacion() {
  const [foto, setFoto] = useState();
  const webcamRef = React.useRef(null);
  const [imgTake, setimgTake] = React.useState(null);
  const [data, setData] = useState("");
  const [cc, setCc] = useState("");
  const canvasRef = useRef(null);
  const [time, setTime] = useState();
  const [selectedOptionTipo, setSelectedOptionTipo] = useState('');
  const [selectedOptionSede, setSelectedOptionSede] = useState('');
  const [datos, setDatos] = useState({
    tipo:"",
  });
  const [value, setValue] = React.useState('Versalles');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  /*CAPTURAR*************************** */

  const capture = React.useCallback(() => {
    var milliseconds1 = new Date().getTime();
    console.log("milise ini :>> ", milliseconds1);
    // const ctx = canvasRef.current.getContext("2d");
    //   drawRect('', ctx);

    const imageSrc = webcamRef.current.getScreenshot();
    var strImage = imageSrc.replace(/^data:image\/[a-z]+;base64,/, "");
    setimgTake(imageSrc);
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "xeEL1271YK2pW0W8vgMAAmV7ML7AAmwaQZ9FTW00",
      },
      body: JSON.stringify({
        imageBase64: imageSrc.replace(/^data:image\/[a-z]+;base64,/, ""),
        atributos:'si'
      }),
    };
    //produccion
//https://4uw28yccb8.execute-api.us-east-1.amazonaws.com/PD/identificarb64ccsenti 
//pruebas imgdata
//https://ssz3in99qf.execute-api.us-east-1.amazonaws.com/py/validacionfacialc2  //da3j0LYdK46bGLzs67oCK1X23imFczh79e9XwbIy
    fetch(
      "https://4uw28yccb8.execute-api.us-east-1.amazonaws.com/PD/identificarb64ccsenti",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("----"+JSON.stringify(data));
        if (data.cc != null) {
          setCc(data.cc);
          var milliseconds2 = new Date().getTime();
          var seg = (milliseconds2 - milliseconds1) / 1000;
          setFoto(
            <label className="labelCC">
              *Documento:{data.cc}
            </label>
            //|Estado:{data.sentimiento}|Tiempo:{seg}
          );
        } else {
          setFoto(
            <label className="labelCC">
              **No se pudo reconer el rostro: {data.respuesta}
            </label>
          );
        }
      })
      .catch((error) => console.log("error", error));
  });
  /*END CAPTURAR*************************** */
const handleOptionChangeTipo = (event) => {
    setSelectedOptionTipo(event.target.value);
  };

  const handleOptionChangeSede = (event) => {
    setSelectedOptionSede(event.target.value);
  }; 

  const registrarIngreso=(event)=>{
    console.log('event :>> ', event);
    console.log('cc :>> ', cc);
    console.log('selectedOptionTipo :>> ',selectedOptionTipo);
    console.log('selectedOptionSede :>> ',selectedOptionSede);
  }
  function limpiar() {
    setFoto(null);
    setimgTake(null);
    setCc(null);
  }

  return (
 
       <div className="validacion">
              
          <Card>
            <CardContent>
              <h4>Validación facial y registro ingreso</h4>
              <Webcam
              className="cam"
              audio={false}
              height={250}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={430}
            />
             <CardActions>
                <Button  onClick={capture}  variant="contained" color="primary">
                Tomar foto.
              </Button >
                <Button  onClick={limpiar} variant="contained" color="secondary">
                  Nuevo/limpiar
              </Button >
            </CardActions>
            </CardContent>
            <CardContent>
              <Grid container spacing={2}>
                <Grid >
                  {imgTake && <img width={100} height={75} src={imgTake} />}
                </Grid>
                <Grid >
                {foto}
                </Grid>
              </Grid>
            </CardContent>



         <Grid container spacing={2}>
         
          <CardContent>
          <FormControl component="fieldset">
              <FormLabel component="legend">Tipo:</FormLabel>
              <RadioGroup row  aria-label="option" name="option" value={selectedOptionTipo} onChange={handleOptionChangeTipo}>
                <FormControlLabel value="Ingreso" control={<Radio />} label="Ingreso" />
                <FormControlLabel value="Salida" control={<Radio />} label="Salida" />
              </RadioGroup>
              </FormControl>   
          </CardContent>  
          <CardContent>
              <FormControl component="fieldset">
              <FormLabel component="legend">Sede Ingreso:</FormLabel>
             <Select value={value} onChange={handleOptionChangeSede}>
              <MenuItem value="Versalles">Versalles</MenuItem>
              <MenuItem value="San Marcel">San Marcel</MenuItem>
              <MenuItem value="GYM Versalles">GYM Versalles</MenuItem>
              <MenuItem value="San Marcel">San Marcel</MenuItem>
            </Select>
            </FormControl>
        </CardContent>  
        </Grid>
         
       
        <CardActions>
          <Button variant="contained" onClick={registrarIngreso}  color="primary"  className="btnFoto"> 
          Registrar
          </Button>
        </CardActions>
       
           
      </Card>
      </div>

  
  );
}
