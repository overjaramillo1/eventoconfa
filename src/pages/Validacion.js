import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function Validacion() {
  const [foto, setFoto] = useState();
  const webcamRef = React.useRef(null);
  const [imgTake, setimgTake] = React.useState(null);
  const [data, setData] = useState('');

  /*CAPTURAR*************************** */
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    var strImage = imageSrc.replace(/^data:image\/[a-z]+;base64,/, "");
    setimgTake(imageSrc);


    var token = localStorage.getItem("tk");


    
    var requestOptions = {
      method: "POST",
      headers: {
        "Authorization":  token,
      },
      body: JSON.stringify({
        imgdata: imageSrc.replace(/^data:image\/[a-z]+;base64,/, ""),
      }),
    };
//"https://ssz3in99qf.execute-api.us-east-1.amazonaws.com/py/validacionfacialc2",
    fetch(
      "https://v9vo4svefd.execute-api.us-east-1.amazonaws.com/prod/",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.respuesta!=null){
        setFoto(<label className="labelCC">Documento encontrado:** {data.respuesta}</label>);
        setData(data.respuesta);
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
}

  return (
<div>

  
    <div >  <p className="a">Validación facial Lambdaxxx</p></div>

    <div className="validacion">

      
        <Webcam
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
    <div  className="divbtn"> <button onClick={capture} className="btnFoto">Tomar foto</button>    </div>
    <div  className="divbtn"> <button onClick={limpiar} className="btnFoto">Nuevo/limpiar</button>    </div>
          
    <br></br>{foto}
   

    </div>
  );
}
