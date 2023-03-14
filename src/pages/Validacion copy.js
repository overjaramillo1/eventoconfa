import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

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
    console.log('milise ini :>> ', milliseconds1);
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
          var seg=(milliseconds2-milliseconds1)/1000;
          setFoto(
            <label className="labelCC">
              *Documento encontrado: {data.respuesta}--
               Estado:{data.detalle}--
               Tiempo consulta:{seg}
            </label>
          );
          setCc(data.respuesta);

         
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
      <div>
        {" "}
        <p className="a">Validación facial y Estado animo</p>
      </div>
      <br></br>
      <div className="validacion">
        <table className="center">
          <thead>
            <tr>
              <th>
                {" "}
                <Webcam
                  className="cam"
                  audio={false}
                  height={300}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={480}
                />{" "}
              </th>
              <th>
                {" "}
                {imgTake && <img width={200} height={150} src={imgTake} />}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="outer">
                  <div class="inner">
                    <button onClick={capture} className="btnFoto">
                      Tomar foto
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <div className="outer">
                  <div class="inner">
                    <button onClick={limpiar} className="btnFoto">
                      Nuevo/limpiar
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h1>{foto} </h1>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
