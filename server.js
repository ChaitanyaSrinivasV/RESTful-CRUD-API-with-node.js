const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()


//using middleware (express.js)

app.use(express.json())

//routes 

//get routes
app.get('/', (req, res) => {
  res.send('Hey World how are you today! ')
})

app.get('/name', (req, res) => {
    res.send('Chaitanya Vuyyuri')
  })

//get route to get the product details that are present in DB 
  app.get('/products', async(req,res)=>{
    try{
      const products = await Product.find({});
      res.status(200).json(products);

    }catch (error){
res.status(500).json({message:error.message})
    }
  })

 //get route to fetch specific product from the DB
 
 app.get('/products/:id', async(req, res) =>{
  try {
    const {id} = (req.params);
    const products = await Product.findById(id);
      res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
 })
//post routes
 
app.post('/product',async(req,res) => {

//   console.log(req.body);
//   res.send(req.body)
// })
   try{
const product = await Product.create(req.body)
res.status(200).json(product);
}  
   catch(error){
   console.log(error.message);
   res.status(500).json({message:error.message})
   }
})


// PUT method (Update the data in DB)
app.put('/products/:id', async(req, res) =>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    //we can not find any product in DB
    if(!product){
      return res.status(404).json({message: `cannot find any product with ID ${id}`})
    }
const updatedProduct = await Product.findById(id);    
res.status(200).json(updatedProduct); 

  } catch (error) {
    res.status(500).json({message: error.message})
    }
})

//Delete a product

app.delete('/products/:id', async(req,res) =>{
try {
  const {id} = req.params;
  const product = await Product.findByIdAndDelete(id);

  if(!product){
    return res.status(404).json({message: `we cannot find any product with the ID ${id}`})
  }
  res.status(200).json(product)
  
} catch (error) {
  res.status(500).json({message: error.message})

}
})

//connecting to the MongoDB

mongoose.
connect('mongodb+srv://admin:123456admin@chaitanyaapi.aeq9usk.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() =>{
    console.log('connected to MongoDB')
    app.listen(3000,() =>{
        console.log("Hey World! This app is running on port 3000")
})
}).catch((error) => {
console.log(error)
})