import React, { useRef, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Grid from "@mui/material/Grid";
import Webcam from "react-webcam";
import { Divider } from "@mui/material";

export default function ConsultarAsambleista() {
  const [asistentesJson, setAsistentesJson] = useState([]);
  const itemAsistenteSelecc = useRef();
  const [nombre, setNombre] = useState("");
  const [beneficios, setBeneficios] = useState([]);
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [asistSeleccionado, setAsistSeleccionado] = useState("");
  const [docuAsamblea, setDocuAsamblea] = useState("");
  const docuAsamblei = useRef();
  const [asamRespuesta, setAsamRespuesta] = useState("");
  const [empresas, setEmpresas] = useState("");
  var arrEmp = [];
  const [arrEmpr, setArrEmpr] = useState([]);
  const [imgTake, setimgTake] = React.useState(null);
  const webcamRef = React.useRef(null);
  const [visible, setVisible] = useState(false);
  const [imgDocuBarra, setimgDocuBarra] = React.useState(null);
  var columns = [];
  columns = [
    {
      name: "nombreEmpresa",
      selector: (row) => row.nombreEmpresa,
    },
  ];

  const capture = React.useCallback((event) => {
    event.preventDefault();
    const imageSrc = webcamRef.current.getScreenshot();
    var strImage = imageSrc.replace(/^data:image\/[a-z]+;base64,/, "");
    if (imgTake === null) {
      setimgTake(imageSrc);
    } else {
      setimgDocuBarra(imageSrc);
    }
  });

  const limpiar = (event) => {
    event.preventDefault();
    setNombre("");
    setBeneficios([]);
    setSelectedRows(false);
    setToggleClearRows(false);
    columns = [];
    setAsistSeleccionado([]);
  };

  /// `http://consultacajas.confamiliares.com:8888/eventoNavidad/rest/evento/metodo1?documento=${cc}`
  const buscarXDocumento = (event) => {
    event.preventDefault();
    console.log("docuAsamblei :>> ", docuAsamblei.current.value);

    /*  var objSele = asistentesJson.find(
      (c) => c.nombre === itemAsistenteSelecc.current.value
    );
*/
    //ConsultarAsambleista
    //https://app.confa.co:8332/asambleaWSRest/rest/asamblea/consultaHabilitado/30276838
    //https://app.confa.co:8332/asambleaWSRest/rest/asamblea/consultaHabilitado/'+docuAsamblea

    var requestOptions = {
      method: "GET",
    };
    var url =
      "https://app.confa.co:8332/asambleaWSRest/rest/asamblea/consultaHabilitado/" +
      docuAsamblei.current.value;
    console.log("url :>> ", url);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        var codigoRetorno = res.codigo;
        console.log("res::", res);
        console.log("codigoRetorno::", codigoRetorno);
        setAsamRespuesta(res);

        setBeneficios(res.empresas);
        setArrEmpr(arrEmp);
        console.log("arrEmp ", arrEmp.toString);
        if (res.codigo === 1) {
          res.empresas.forEach((e) => {
            console.log("res.no em:>> ", e.nombreEmpresa);
            arrEmp.push(e.nombreEmpresa);
          });
          setNombre(res.nombreAsambleista);
          setEmpresas(res.empresas);
          setVisible(true);
        } else if (res.codigo === 0) {
          setNombre("No existe datos para el documento ingresado");
          setVisible(false);
        }
        console.log("buscarXDocumento asistSeleccionado::" + asistSeleccionado);
        console.log(
          "buscarXDocumento asistSeleccionado::" + asistSeleccionado.documento
        );
      })
      .catch((error) => console.log("error", error));
  };

  const registrarEntrega = () => {
    selectedRows.forEach((e) => {
      console.log("e :>> ", e.nombre);
      console.log("eE :>> ", e.estado);
    });

    setToggleClearRows(!toggledClearRows);
    console.log("registrarEntrega--asistSeleccionado :>> ", asistSeleccionado);
  };

  return (
    <>
      <form>
        <div>
          <label>
            Ingrese Cedula de Asambleista
            <input
              name="docuAsamblei"
              ref={docuAsamblei}
              onClick={(e) => {
                docuAsamblei.current.value = "";
              }}
            />
          </label>
        </div>
        <Grid item xs={12}>
          <div className="divbtxn">
            <input onClick={buscarXDocumento} type="submit" value="Buscar" />
            <input onClick={limpiar} type="submit" value="Limpiar" />
          </div>
        </Grid>
      </form>

      <h1>{nombre}</h1>
      {visible && (
        <form>
          <div>
            <Grid container spacing={3}>
              <div>
                <ul>
                  {arrEmpr.map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </div>
              <Divider></Divider>
              <Grid xs={12}>
                <label>
                  Ingrese email
                  <input name="email" />
                </label>
              </Grid>
              <Grid xs={12}>
                <h1>Tomar foto del documento por cada lado</h1>
              </Grid>

              <Grid xs="auto">
                <Webcam
                  className="cam"
                  audio={false}
                  height={120}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={200}
                />
              </Grid>
              <Grid xs="3">
                {imgTake && <img width={150} height={100} src={imgTake} />}
              </Grid>
              <Grid xs="3">
                {imgDocuBarra && (
                  <img width={150} height={100} src={imgDocuBarra} />
                )}
              </Grid>
        
                <Grid xs={6}>
                  <button onClick={capture} className="btnFoto">
                    Tomar foto.
                  </button>
                </Grid>
                <Grid xs={6}>
                  <button onClick={limpiar} className="btnFoto">
                    Nuevo/limpiar
                  </button>
                </Grid>
              
         
            </Grid>
          
       
            {" "}
            <div className="divbtxn"></div>
            <Grid item xs={12}>
              <input
                onClick={registrarEntrega}
                type="submit"
                value="Realizar Inscripción"
              />
            </Grid>
          </div>
        </form>
      )}
    </>
  );
}
