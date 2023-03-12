import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";

export default function RegistrarUso() {
  const [nombre, setNombre] = useState("");
  const [beneficios, setBeneficios] = useState([]);
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [dataJson, setDataJson] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [nombreSelec, setNombreSelec] = useState([]);
  const [registrar, setRegistrar] = useState();
  const handleChangeX = (event, value) => setNombreSelec(value);
  const item_name_ref=useRef();


  useEffect( async () => {
    const url="http://127.0.0.1:9090/eventoNavidad/rest/evento/metodo6";
    const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setDataJson(json);
          console.log(json.length);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
  }, []);

  const listaCambio = (event, value) => console.log('> ', item_name_ref);


  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const registrarEntrega = () => {


    
    console.log("registrarEntrega---setSelectedRows", selectedRows);
    console.log("registrarEntrega--->", selectedRows[0]);
    selectedRows.forEach((e) => {
      console.log("e :>> ", e.idBeneficio);
      console.log("e :>> ", e.nombre);
      console.log("eE :>> ", e.estado);
    });

    console.log("registrarEntrega", toggledClearRows);
    setToggleClearRows(!toggledClearRows);
    console.log("registrarEntrega", toggledClearRows);
    console.log('nombreSelec :>> ', nombreSelec);
    console.log("nombre" + nombreSelec.nombre);
    console.log("id" + nombreSelec.id_asistente);
    console.log("doc" + nombreSelec.documento);
    setRegistrar(true);
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
    setNombre("");
    setBeneficios([]);
    setSelectedRows(false);
    setToggleClearRows(false);
    columns = [];
    setNombreSelec("");
  };

  // console.log("selectedOptions"+selectedOptions);
/// `http://consultacajas.confamiliares.com:8888/eventoNavidad/rest/evento/metodo1?documento=${cc}`
  const buscarXDocumento = (event) => {
    event.preventDefault();
    console.log("list" + item_name_ref.current.value);

    const country = dataJson.find((c) => c.nombrePadre === item_name_ref.current.value);
    console.log('con :>> ', country);
    console.log('con :>> ', country.documento);

    console.log("nombre" + nombreSelec.nombre);
    console.log("id" + nombreSelec.id_asistente);
    console.log("doc" + nombreSelec.documento);

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
        <Autocomplete
          id="free-solo-demo"
          disableClearable
          handleHomeEndKeys
          options={dataJson}
          getOptionLabel={(option) => ` ${option.nombrePadre}`}
          onChange={handleChangeX}
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
<div>

<label>
    Ingrese dato buscar
    <input list="listaAsis" name="listaAsis"  ref={item_name_ref} onClick={(e)=>{item_name_ref.current.value=""}} />  
</label>   


<datalist id="listaAsis">
  {dataJson.map((item, key) =>
    <option key={key} value={item.nombrePadre} />
  )}
</datalist>

</div>

        <Grid item xs={12}>
          <input onClick={buscarXDocumento} type="submit" value="Buscar" />
          <input onClick={limpiar} type="submit" value="Limpiar" />
        </Grid>

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
