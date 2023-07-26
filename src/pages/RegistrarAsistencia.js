import React, {useRef, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Grid from "@mui/material/Grid";
const Papa = require("papaparse");


export default function RegistrarUso() {
  const [dataCapa, setDataCapa] = useState({});
  const [dataCola, setDataCola] = useState({});

  const capacitaciones = Array.from(dataCapa);
  const colaboradores = Array.from(dataCola);
  const itemCapaSelecc = useRef();
  const itemColaSelecc = useRef();
  const parsedData="";
  const [nomSele,setNomSele]=useState();
  
  useEffect(() => {
    console.time("cargando capa");
          const   parseFile = () => new Promise((resolve) => {
            Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRQGz8T2KfxsXMLhllLSQSwULdInnGOUW6MTrkCOGKOp4yJMkFW15s_zIr_c61NOx9o0eZSqi8HJifF/pub?gid=0&single=true&output=csv", {
              download: true,
              header: true,
              complete: (results) => {
                  resolve(results.data);
                  setDataCapa(results.data);
                  
              }
          });
          
      })
      
     parseFile();
    
     const   parseFile2 = () => new Promise((resolve) => {
      Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRQGz8T2KfxsXMLhllLSQSwULdInnGOUW6MTrkCOGKOp4yJMkFW15s_zIr_c61NOx9o0eZSqi8HJifF/pub?gid=1269302342&single=true&output=csv", {
        download: true,
        header: true,
            complete: (results) => {
                resolve(results.data);
                setDataCola(results.data);
 
            }
        });
        
    })

parseFile2();
  }, []);





  const buscarXDocumento = async (event) => {
    event.preventDefault();
        
    console.log("itemCapaSelecc>>" + itemCapaSelecc.current.value);
    console.log("itemColaSelecc>>" + itemColaSelecc.current.value);
    const nombre = itemColaSelecc.current.value.split('--');
    console.log("nombre>> ", nombre[1]);
    setNomSele(nombre[1]);
   //  parsedData = await parseFile();
   // console.log(parsedData);
//    return parsedData;
 
    
  };
  function Nombre(){
   return <h1> {nomSele=='' ? "nomSele" :nomSele} </h1>
  };

  return (
    <>
      <form>
        <div>
          <label>
        Nombre Capacitacion
            <input
              list="listaCapa"
              name="capa"
              ref={itemCapaSelecc}
              onClick={(e) => {
                itemCapaSelecc.current.value = "";
              }}
            />
          </label>
          <datalist id="listaCapa">
            {capacitaciones.map((item, index) => {
              return <option key={index} value={item.Tema} />;
            })}
          </datalist>
        </div>

        <div>
          <label>
        Nombre Colaborador
            <input
              list="listaCola"
              name="cola"
              ref={itemColaSelecc}
              onClick={(e) => {
                itemColaSelecc.current.value = "";
              }}
            />
          </label>
          <datalist id="listaCola">
            {colaboradores.map((item, index) => {
              return <option key={index} value={item.DocNombre} />;
            })}
          </datalist>
        </div>


        <Grid item xs={12}>
          <input onClick={buscarXDocumento} type="submit" value="Buscar" />
          
        </Grid>


      </form>

      <Grid item xs={12}>
    
      </Grid>
    </>
  );
}
