import express from "express"
const app = express()
const port = 9000
app.get("/",(req, res)=>{
    res.send("Hello from viganesh and his tea!")
})
app.get("/ice-tea",(req, res)=>{
    res.send("What ice tea would you prefer?")
})

app.use(express.json())
let testData = []
let nextId = 1
//create
app.post("/teas",(req, res)=>{
    const {name, price} = req.body
    const newTea ={id:nextId++, name, price}
    testData.push(newTea)
    res.status(201).send(newTea)
})
//read
app.get("/teas",(req, res)=>{
    res.status(200).send(testData)
})
//read
app.get("/teas/:id",(req, res)=>{
    const tea = testData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        res.status(404).send("tea not found")
    }else{
        res.status(200).send(tea)
    }
})

//update 
app.put("/teas/:id",(req, res)=>{
    const teaId = req.params.id
    const tea = testData.find(t => t.id === parseInt(teaId))
    if(!tea){
        res.status(404).send("tea not found")
    }else{
       const {name, price} = req.body
       tea.name = name
       tea.price = price
       res.status(200).send(tea)
    }
})

//delete
app.delete("/teas/:id",(req, res)=>{
    const index = testData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1){
        res.status(404).send("Tea not found")
    }else{
        testData.splice(index, 1)
        res.status(200).send("deleted")
    }
})
app.listen(port,()=>{
    console.log(`Server is running at port: ${port}...`)
})