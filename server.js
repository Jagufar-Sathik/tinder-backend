import express from 'express'
import mongoose from 'mongoose'
import Cards from "./dbCards.js"
import cors from "cors"
//app config
const app= express();
const port=process.env.PORT||8001;
app.use(express.json())
app.use(cors());

//db config
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
//api
app.get('/',(req,res)=>res.status(200).send('hi dhere'));
app.post('/tinder/cards',(req,res)=>{
    const dbCard=req.body;
    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })

})
app.get('/tinder/cards',(req,res) => {
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
})
})
app.listen(port,()=>
console.log(`listening local host: ${port}`));