
import express from "express"
import bodyParser from "body-parser"
import axios from "axios"


const app = express()
const port = 3000
const API_URL = "https://secrets-api.appbrewery.com"

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.get("/", async(req,res)=>{
    try {
        const result = await axios.get(API_URL+"/random")
        res.render("index.ejs", {
            secret: (result.data.secret),
            user: (result.data.username)
        })
    } catch(error){
        res.render("index.ejs", {secret: JSON.stringify(error.response.data)})
    }
})

app.listen(port,()=>{
    console.log("The port is connected...  http://localhost:"+port)
})