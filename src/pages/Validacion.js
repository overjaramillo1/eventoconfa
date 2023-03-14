import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
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

export default function Validacion() {
  const [foto, setFoto] = useState();
  const webcamRef = React.useRef(null);
  const [imgTake, setimgTake] = React.useState(null);
  const [data, setData] = useState("");
  const [cc, setCc] = useState("");
  const canvasRef = useRef(null);
  const [time, setTime] = useState();
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
        "x-api-key": "da3j0LYdK46bGLzs67oCK1X23imFczh79e9XwbIy",
      },
      body: JSON.stringify({
        imgdata: imageSrc.replace(/^data:image\/[a-z]+;base64,/, ""),
      }),
    };

    fetch(
      "https://ssz3in99qf.execute-api.us-east-1.amazonaws.com/py/validacionfacialc2",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.respuesta != null) {
          var milliseconds2 = new Date().getTime();
          var seg = (milliseconds2 - milliseconds1) / 1000;
          setFoto(
            <label className="labelCC">
              *Documento encontrado: {data.respuesta}-- Estado:{data.detalle}--
              Tiempo consulta:{seg}
            </label>
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

  function limpiar() {
    setFoto(null);
    setimgTake(null);
    setCc(null);
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p className="a">Validación facial y registro ingreso</p>
              <div className="validacion">
                <Webcam
                  className="cam"
                  audio={false}
                  height={300}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={480}
                />
              
              </div>


      <div className="divbtn">
    
        <button onClick={capture} className="btnFoto">
          Tomar foto.
        </button>
        <button onClick={limpiar} className="btnFoto">
          Nuevo/limpiar
        </button>
        {imgTake && <img width={150} height={100} src={imgTake} />}
      </div>
 
     
      <br></br>
      {foto}

      </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
