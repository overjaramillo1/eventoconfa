import React, {useRef, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Grid from "@mui/material/Grid";

export default function RegistrarUso() {
  const [asistentesJson, setAsistentesJson] = useState([]);
  const itemAsistenteSelecc = useRef();
  const [nombre, setNombre] = useState("");
  const [beneficios, setBeneficios] = useState([]);
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const  [asistSeleccionado, setAsistSeleccionado] = useState("");


  //cargar al iniciar
  useEffect(() => {
    console.time("t1i");
    const getAsistentes = async () => {
      const response = await fetch(
        "http://consultacajas.confamiliares.com:8888/eventoNavidad/rest/evento/metodo6"
      );
      const data = await response.json();
      setAsistentesJson(data);
      console.log('data :>> ', data[0].documento);
      console.log('data :>> ', data[0].nombre);
    };
    getAsistentes();
    console.timeEnd("t1i");
  }, []);

  const beneTablaSelecc = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };



  var columns = [];
  columns = [
    {
      name: "idBeneficio",
      selector: (row) => row.idBeneficio,
    },
    {
      name: "nombre",
      selector: (row) => row.nombre,
    },
    {
      name: "estado",
      selector: (row) => row.estado,
    },
  ];

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
    
    console.log("itemAsistenteSelecc>>" + itemAsistenteSelecc.current.value);
    var objSele = asistentesJson.find(
      (c) => c.nombre === itemAsistenteSelecc.current.value
    );
    console.log("con objSele 2 :>> ", objSele);
    console.log("con objSele documento :>> ", objSele.documento);
  
    fetch(
      `http://consultacajas.confamiliares.com:8888/eventoNavidad/rest/evento/metodo1?documento=${objSele.documento}`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("buscarXDocumento res::", res);
        setAsistSeleccionado(res);
console.log('res.beneficios :>> ', typeof(res.beneficios));
        res.beneficios.forEach(element => {
          console.log('res.beneficios :>> ', res.beneficios);
        });

        if (res.beneficios.length > 0) {
         
          setBeneficios(res.beneficios);
          setNombre(res.nombre+" - "+ res.documento);
        }
        console.log("buscarXDocumento asistSeleccionado::"+ asistSeleccionado);
        console.log("buscarXDocumento asistSeleccionado::"+ asistSeleccionado.documento);
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
            Ingrese Asistente
            <input
              list="listaAsis"
              name="asiste"
              ref={itemAsistenteSelecc}
              onClick={(e) => {
                itemAsistenteSelecc.current.value = "";
              }}
            />
          </label>
          <datalist id="listaAsis">
            {asistentesJson.map((item, index) => {
              return <option key={index} value={item.nombre} />;
            })}
          </datalist>
        </div>

        <Grid item xs={12}>
          <input onClick={buscarXDocumento} type="submit" value="Buscar" />
          <input onClick={limpiar} type="submit" value="Limpiar" />
        </Grid>

        <h1>{nombre}</h1>
        <div style={{ height: 400, width: "100%" }}>
          <DataTable
            title="Beneficios disponibles"
            columns={columns}
            data={beneficios}
            selectableRows
            onSelectedRowsChange={beneTablaSelecc}
            clearSelectedRows={toggledClearRows}
          />
        </div>
      </form>

      <Grid item xs={12}>
        <input
          onClick={registrarEntrega}
          type="submit"
          value="Registrar entrega"
        />
      </Grid>
    </>
  );
}
