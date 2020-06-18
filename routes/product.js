const express = require("express");
const router = express.Router();
const Product=require('../models/product')
const mongoose = require("mongoose");

router.post('/',async (req,res)=>{
  console.log('reached')
  res.send('reached')
})
router.post('/add',async (req,res)=>{
  console.log('reached')
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        ratings:[0,0,0,0,0,0],
        totalRatings:0,
        avgRating:0
      });
      product
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({message: "Created product successfully",id:product._id,product});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
})

router.post('/buy',async (req,res)=>{
  const {customer,id}=req.body;
  const product=await Product.findById(id);
  if(!product)
   return res.send('No Such Product Found');
  var customers=product.customers
  customers.push(customer);
  
  Product.update({ _id:id }, { $set: {customers:customers} })
      .exec()
      .then(result => {
        res.status(200).json({message: "Product updated",id:id});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})
router.post('/rateProduct',async (req,res)=>{
    const {rating,id,customer}=req.body;

    if(!rating || !id || !customer)
     return res.status(400).send('Add Rating and id');
    
    const prod=await Product.findById(id);
    if(!prod)
     return res.status(400).send('No Such product found');
    
    if(!prod.customers.includes(customer))
    return res.status(400).send('You need to buy first');

    var ratings=prod.ratings
    ratings[rating]++;
    var total=prod.totalRatings
    var avg=prod.avgRating
    avg=((avg*total+(new Number(rating)))/(total+1));
    total=total+1;
    console.log(avg)


    Product.update({ _id: id }, { $set: {ratings:ratings,avgRating:avg,totalRatings:total} })
      .exec()
      .then(result => {
        res.status(200).json({message: "Product updated",id:id});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})

router.get('/product', async (req,res)=>{
  try{
    const {id}=req.query;
    if(!id)
     return res.send('Please send id of product');
  const product=await Product.findById(id);
  console.log(product)
  return res.status(200).json(product)
  } catch(e){
    console.log(e)
    return res.status(404).send(e);
  }
  
})

module.exports = router;