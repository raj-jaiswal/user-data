const express= require('express');
const db= require('nedb');
const app=express();
const database=new db('data.db');
database.loadDatabase();

app.listen(3000, ()=> console.log('listening'));
app.use(express.static('files'));
app.use(express.json({limit:'3mb'}));

app.post('/api',(request,response)=>{
   console.log('new entry added!');
   request.body.timestamp= Date.now();
   database.insert(request.body);
   response.json({
     status:'Success'
   });
});

app.get('/data',(request,response)=>{
   database.find({},(err,res)=>{
     response.json(res);
   });
});
