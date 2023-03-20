import { useState, useEffect, useRef } from "react";
import "./form.css";
import DataTable from "react-data-table-component";
import Papa from "papaparse";
import axios from "axios";

export default function CargarArchivo() {
  const [eventos, setEventos] = useState([]);
  const itemEventoSelecc = useRef();
  const [asistentes, setAsistentes] = useState([]);
  const [res, setRes] = useState();
  var formData = new FormData();
  var fileInput=null;
  const [file, setFile] = useState(null);
  const [filename, SetFilename] = useState("");
  /*useEffect(() => {
    var token = localStorage.getItem("tk");
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    const getAsistentes = async () => {
      const response = await fetch(
        "https://xua8seev0d.execute-api.us-east-1.amazonaws.com/py/items",
        requestOptions
      );
      const data = await response.json();
      setEventos(Object.values(data.Items));
      console.log("data :>> ", data);
    };
    getAsistentes();
  }, []);
*/



const enviarArchivo = async () => {

    const formData = new FormData();
    formData.append('File', file);
    console.log('file ***:>> ', file);

    try {
   const res=   await  fetch('https://doq6msba36.execute-api.us-east-1.amazonaws.com/PY/upload', 
    {
      method: 'POST',
      headers: {
        filename: 'prueba.pdf',
        bucket:'confaanexospy/MPC/beneficios/postulaciones',
        sistema:'MPC'
      },
      body: file
    })
    const actualData = await res.json();
    console.log(actualData);

      
  } catch (error) {
      console.log('error :>> ', error);
  }


};


  
  const handleCargarArchivo = async ({ target: { files } }) => {

    try {

     // const fileInput = document.querySelector('input[type="file"]');
  
      const formData = new FormData();
    formData.append("file", file);


      fetch('https://doq6msba36.execute-api.us-east-1.amazonaws.com/PY/upload', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          filename: file,
          bucket:'confaanexospy/MPC/beneficios/postulaciones',
          sistema:'MPC'
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    } catch (error) {
      console.log('error :>> ', error);
  }





    console.log('files :>> ',formData );
    file = files[0];
    let results;
    Papa.parse(file, {
      delimiter: ",",

      header: true,
      complete: function (responses) {
        results = responses.data;
        file=results;
        console.log('91:>>'+responses.data.length, responses);
        setAsistentes(responses.data);
      },
    });
  };



  const handleSubmit =  async (event) => {

    event.preventDefault();
    
    console.log('file... :>> ', file);
    const formData = new FormData();


    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "filename": "caja herlu fes.pdf",
        "bucket": "confaanexospy/MPC/beneficios/postulaciones",
        "sistema": "MPC",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify(file),
    };

    fetch(
      "https://doq6msba36.execute-api.us-east-1.amazonaws.com/PY/upload",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.respuesta != null) {
      
          console.log('data :>> ', data);
        } else {
          console.log('data :>> ', data);
        }
      })
      .catch((error) => console.log("error", error));



console.log('--------------1--fin------------ :>> ');




    formData.append("sistema", 'MPC');
    formData.append("filename", 'caja herlu festt.pdf');
    formData.append("bucket", 'confaanexospy/MPC/beneficios/postulaciones');
    formData.append("Content-Type", "application/json");


try {
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("filename", "caja herlu fes.pdf");
    myHeaders.append("bucket", "confaanexospy/MPC/beneficios/postulaciones");
    myHeaders.append("sistema", "MPC");
    myHeaders.append('Access-Control-Allow-Origin: *');

    //file = formData;
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(formData)
      
    };
    
    fetch("https://doq6msba36.execute-api.us-east-1.amazonaws.com/PY/upload", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


    } catch (error) {
  console.log('error try1 :>> ', error);
    }



try {
  


  fetch(
    'https://doq6msba36.execute-api.us-east-1.amazonaws.com/PY/upload',
    {
      method: 'POST',
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  } catch (error) {
    console.error('Error:', error);
  }

    try {

  


    fetch('https://doq6msba36.execute-api.us-east-1.amazonaws.com/PY/upload', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        filename: file,
        bucket:'confaanexospy/MPC/beneficios/postulaciones',
        sistema:'MPC'
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

  } catch (error) {
    console.log('error fech>>> :>> ', error);
  }






    try {
     var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: 'https://doq6msba36.execute-api.us-east-1.amazonaws.com/PY/upload',
      headers: { 
        'Content-Type': 'application/json', 
        'filename': 'caja herlu fes.pdf', 
        'bucket': 'confaanexospy/MPC/beneficios/postulaciones', 
        'sistema': 'MPC'
      },
      data : formData
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
         
  } catch (error) {
    console.log("err try>>"+error);
  }


   // formData.append("filename", name);
   /*
   const headers = {
    "Content-Type": "application/json",
    bucket:'confaanexospy/MPC/beneficios/postulaciones',
    sistema:'MPC',
    filename:'file.pdf'
  };
  const body={

  }

  const resp = await axios.post('https://doq6msba36.execute-api.us-east-1.amazonaws.com/PY/upload', formData,{  
    headers: {
      "Content-Type": "application/json",
      bucket:'confaanexospy/MPC/beneficios/postulaciones',
      sistema:'MPC'
    
    },
      
    });
  */


    
  };


  return (
<form  onSubmit={handleSubmit} >
      <div>
        <label>
          Nombre Archivo
          <input
            list="nomarc"
            name="eve"
            ref={itemEventoSelecc}
            onClick={(e) => {
              itemEventoSelecc.current.value = "";
            }}
          />
        </label>


        <label>Cargar Archivo15</label>
      
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <div style={{ height: 300, width: "80%" }}>

        </div>
        <h1>{res}</h1>
        <input type="submit" value="Cargar archivo 18.1."  />
      </div>
      </form>
  );
}
