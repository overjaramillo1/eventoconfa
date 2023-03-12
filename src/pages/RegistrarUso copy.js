import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function RegistrarUso() {
  const [datas, setDatas] = useState([]);
  const [cc, setCC] = useState("");
  const [nombre, setNombre] = useState("");
  const [beneficios, setBeneficios] = useState([]);
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [dataJson, setDataJson] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [nombreSelec, setNombreSelec] = useState([]);


  const handleChangeX = (event, value) => setNombreSelec(value);



  
  useEffect( async () => {
    console.log("useEffect :>> ");
    const fetchData = async () => {
      const { datasets } = fetch(
        `http://127.0.0.1:9090/eventoNavidad/rest/evento/metodo6`
      )
        .then((response) => response.json())
        .then((res) => {
          console.log("length", res.length);
          setDataJson(res);
       //  console.log("dataJson" + dataJson.length);

          
        })
        .catch((error) => console.log("error", error));
      
    };
    fetchData();

  }, []);



  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
    
  };

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    console.log("handleClearRows---setSelectedRows", selectedRows);
    console.log("handleClearRows--->", selectedRows[0]);
    selectedRows.forEach((e) => {
      console.log("e :>> ", e.idBeneficio);
      console.log("e :>> ", e.nombre);
      console.log("eE :>> ", e.estado);
    });

    console.log("handleClearRows", toggledClearRows);
    setToggleClearRows(!toggledClearRows);
    console.log("handleClearRows", toggledClearRows);
  };

  var columns = [];
  columns = [
    {
      name: "idBeneficio",
      selector: "idBeneficio",
    },
    {
      name: "nombre",
      selector: "nombre",
    },
    {
      name: "estado",
      selector: "estado",
    },
  ];

  const limpiar = (event) => {
    event.preventDefault();
    setCC("");
    setNombre("");
    setBeneficios([]);
    setSelectedRows(false);
    setToggleClearRows(false);
    columns = [];
  };

  // console.log("selectedOptions"+selectedOptions);
    //// `http://consultacajas.confamiliares.com:8888/eventoNavidad/rest/evento/metodo1?documento=${cc}`
  const buscarXDocumento = (event) => {
    event.preventDefault();

    console.log("nombre"+nombreSelec.nombre);
    console.log("id"+nombreSelec.id_asistente);
    console.log("doc"+nombreSelec.documento);


    fetch(
      `http://127.0.0.1:9090/eventoNavidad/rest/evento/metodo1?documento=${nombreSelec.documento}`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("buscarXDocumento length::", res.beneficios.length);
        if (res.beneficios.length > 0) {
          setBeneficios(res.beneficios);
          setNombre(res.nombre);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <form>
        <div>
          {" "}
          <label>
            Ingrese CC o nombre:
            <input
              id="cc"
              name="cc"
              type="text"
              value={cc}
              onChange={(e) => setCC(e.target.value)}
            />
          </label>
        </div>


        <Autocomplete
        id="free-solo-demo"
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        disableClearable
        options={dataJson}
        getOptionLabel={(option) => ` ${option.nombre}`}
        onChange={handleChangeX}
        //   onChange={(a, b) => console.log(b)}
        renderInput={(params) => (
            <TextField
          
              {...params}
              label="Buscar"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
    
      />

   
        <input onClick={limpiar} type="submit" value="Limpiar" />

        <div style={{ height: 400, width: "100%" }}>
          <DataTable
            title="Beneficios disponibles"
            columns={columns}
            data={beneficios}
            selectableRows
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggledClearRows}
          />
        </div>
      </form>

      <div>
      <input onClick={buscarXDocumento} type="submit" value="Buscar" />
        <input
          onClick={handleClearRows}
          type="submit"
          value="Registrar entrega"
        />
      </div>
     
    </>
  );
}
