import './App.css';
import {useState} from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState(0);
  const [gmail, setGmail] = useState('');
  const [employees, setEmployees] = useState([]);
  const [parameter, setParameter] = useState("");
  const [value, setValue] = useState("");
  const li=["Name","Age","Nationality","Postion","Salary","Gmail"];
  const AddEmployee=()=>{
   Axios.post('http://localhost:3001/create',{
    name:name,
    age:age,
    nationality:nationality,
    position:position,
    salary:salary,
    gmail:gmail,
   }).then(()=>{
    setEmployees([
      ...employees,
      {
        name:name,
        age:age,
        nationality:nationality,
        position:position,
        salary:salary,
        gmail:gmail,
      }
    ]);
   })
  }
  const getEmployees=()=>{
    Axios.get('http://localhost:3001/getEmployees').then((res)=>{
     setEmployees(res.data);
    })
  }
  const upadateEmployee=(id,paramet,val)=>{
  
   Axios.put('http://localhost:3001/updateEmployee',{
   id:id,
   paramet:li.indexOf(paramet),
   val:(paramet=='Age'||paramet=='Salary')?parseInt(val):val,
  
   })
  } 
  const delteEmployee=(id)=>{
    Axios.delete(`http://localhost:3001/delteEmployee/${id}`)
  }
  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input type="text" onChange={(e)=>{setName(e.target.value)}}/>
        <label>Age:</label>
        <input type="number" onChange={(e)=>{setAge(e.target.value)}}/>
        <label>Nationality:</label>
        <input type="text" onChange={(e)=>{setNationality(e.target.value)}}/>
        <label>Postion:</label>
        <input type="text" onChange={(e)=>{setPosition(e.target.value)}}/>
        <label>Salary(year):</label>
        <input type="number" onChange={(e)=>{setSalary(e.target.value)}}/>
        <label>Gmail:</label>
        <input type="mail" onChange={(e)=>{setGmail(e.target.value)}}/> 
        <button className='info-button' onClick={AddEmployee}>Add Employee</button>
        <button className="show" onClick={getEmployees}>Show Employees</button>
        <div className="employees">
        
        {
          employees.map((v,k)=>{
           if(v.name.length!=0){
            return (
              <div className="employee">
              <button onClick={()=>{delteEmployee(v.id)}}>Delete</button>
              <h3>Name: {v.name}</h3>
              <h3>Age: {v.age}</h3>
              <h3>Nationality: {v.nationality}</h3>
              <h3>Postion: {v.position}</h3>
              <h3>Salary: {v.salary}</h3>
              <h3>Gmail: {v.gmail}</h3>
               <input type="text" placeholder='Parameter' onChange={(e)=>{setParameter(e.target.value)}}/>
               <input type="text" placeholder='Value' onChange={(e)=>{setValue(e.target.value)}}/>
              <button onClick={()=>{upadateEmployee(v.id,parameter,value)}}>Update</button>
             </div>
            );
           }
          })
        }
        </div>
      </div>
    </div>
  );
}

export default App;
