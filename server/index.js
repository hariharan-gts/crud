const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors');

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
   user:'root',
   host:'localhost',
   password:"password",
   database:'employee_system'
});

app.post('/create',(req,res)=>{
   console.log(req.body);
   const name=req.body.name;
   const age=req.body.age;
   const nationality=req.body.nationality;
   const position=req.body.position;name;
   const salary=req.body.salary;name;
   const gmail=req.body.gmail;name;

   db.query(
      "INSERT INTO employees(name,age,nationality,position,salary,gmail) VALUES(?,?,?,?,?,?)",
      [name,age,nationality,position,salary,gmail],
      (err,result)=>{
         if(err){
            console.log(err);
         }else{
            res.send("Successfully inserted");
         }
      }
   )
   
})


app.get('/getEmployees',(req,res)=>{
   db.query("SELECT * FROM employees ",(err,result)=>{
      if(err){
         console.log(err);
      }else{
         res.send(result)
      }
   })
})

app.delete('/delteEmployee/:id',(req,res)=>{
   const id=req.params.id;
   db.query("DELETE FROM employees WHERE employees.id=?",id,(err,result)=>{
      if(err){
         console.log(err);
      }else{
         res.send(result);
      }
   })
})

app.put('/updateEmployee',(req,res)=>{
    const id=req.body.id;
    const param=req.body.paramet;
    const value=req.body.val;
    var sqlq='';
    switch(param){
      
      case 0:
        sqlq="UPDATE employees SET  name=? WHERE id=?";
        break;
      case 1:
         sqlq="UPDATE employees SET  age=? WHERE id=?";
         break;
      case 2:
         sqlq="UPDATE employees SET  nationality=? WHERE id=?";
         break;
      case 3:
         sqlq="UPDATE employees SET  position=? WHERE id=?";
            break;
      case 4:
         sqlq="UPDATE employees SET  salary=? WHERE id=?";
         break;
      case 5:
         sqlq="UPDATE employees SET  gmail=? WHERE id=?";
         break;
    }
    db.query(sqlq,[value,id],
    (err,result)=>{
      if(err){
         console.log(err);
      }else{
         res.send(result); 
      }
    })
})
 app.listen(3001,()=>{
    console.log("Hey i am listening!");
 })