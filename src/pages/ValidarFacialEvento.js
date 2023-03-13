import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import ValidarEvento from "./ValidarEvento";
import { drawRect } from "./utilities";

export default function ValidarFacialEvento() {
  const [foto, setFoto] = useState();
  const webcamRef = React.useRef(null);
  const [imgTake, setimgTake] = React.useState(null);
  const [cc, setCc] = useState('');
  const canvasRef = useRef(null);

  /*CAPTURAR*************************** */
  const capture = React.useCallback(() => {
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
        if(data.respuesta!=null){
        setFoto(<label className="labelCC">Documento encontrado: {data.respuesta}</label>);
        setCc(data.respuesta);
      }else{
        setFoto(<label className="labelCC">No se pudo reconer el rostro: {data.respuesta}</label>);
      }
      })
      .catch((error) => console.log("error", error));
      
  });
/*END CAPTURAR*************************** */

function limpiar(){
  setFoto(null);
  setimgTake(null);
  setCc(null);
  
}

  return (
<div>

  
    <div >  <p className="a">Validación facial y registro ingreso</p></div>

    <div className="validacion">

      
        <Webcam className="cam"
          audio={false}
          height={300}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={480}
        />  {imgTake && (
          <img width={200} height={150}
            src={imgTake}
          />
        )}
       
    </div>

    <canvas
          ref={canvasRef}
          screenshotFormat="image/jpeg"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 440,
            height: 380,
            border: 2,
          }}
          
        />
    <div  className="divbtxn"> 
    <button onClick={capture} className="btnFoto">Tomar foto.</button>  
    <button onClick={limpiar} className="btnFoto">Nuevo/limpiar</button>{foto} 
    </div>

        

    </div>
  );
}
