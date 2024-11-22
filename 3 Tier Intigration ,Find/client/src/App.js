import {useState} from "react";
import './App.css';

function App() {

  let [students,setStudents] = useState([]);

  let getStudentsFromServer = async ()=>{

     let reqOptions = {
      method:"GET"
     }

     let JSONData = await fetch("http://localhost:4567/getStudents",reqOptions);

     let JSOData = await JSONData.json();

     console.log(JSOData);
     setStudents(JSOData);

  };

  return (
    <div className="App">
     <button onClick={()=>{
      getStudentsFromServer();
     }}
      
      >Get Students</button>
      {students.map((ele,i)=>{
        return (
        <h1>{ele.name},{ele.age},{ele.email},{ele.gender}
        </h1>
        );
      })}
    </div>
  );
}

export default App;
