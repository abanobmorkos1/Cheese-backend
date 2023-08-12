// DEPENDENCIES

require("dotenv").config()
const {PORT, DATABASE_URL} = process.env
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require("morgan")

// MIDDLEWARE

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// MONOGO CONNECTION

mongoose.connect(DATABASE_URL)
mongoose.connection
.on('open' , () => console.log('connected to mongodb'))
.on('close' , () => console.log('not connected to mongodb'))
.on('error' , (error) => console.log('error connecting to mongodb'))


// MONGOOSE SCHEMA 

const cheeseSchema = mongoose.Schema({
    name : String,
    image: String,
})

const Cheese = mongoose.model('cheese', cheeseSchema)


//////////////////////////////////////
//ROUTES
//////////////////////////////////////

// SHOW ROUTE
app.get('/cheese', async (req, res) => {
    try{  
        res.json(await Cheese.find({}))
        
    } catch (error) {
        res.status(400).json(error)
    }
})

// POST ROUTE
app.post('/cheese' , async (req , res) => {
    try {
        res.json(await Cheese.create(req.body))
        
    } catch (error) {
        res.status(400).json(error)
    }
})
app.get('/cheese/:id', async (req, res) => {
    try{  
        res.json(await Cheese.findById(req.params.id));

    } catch (error) {
        res.status(400).json(error)
    }
})

// UPDATE ROUTE
app.put('/cheese/:id', async (req, res) => {
    try {
        res.json(await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true }))

    } catch (error) {
        res.status(400).json(error)
    }
});

// DELETE ROUTE
app.delete('/cheese/:id', async (req, res) => {
    try{
        const cheese = await Cheese.findByIdAndDelete(req.params.id)
        res.status(204).json(cheese)

    } catch (error){
        res.status(400).json(error)
    }
})

// LISTNER 
app.listen(PORT , () => console.log(`listening on port ${PORT}`))


