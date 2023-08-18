const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');


//show purchase
router.get('/',async(req,res)=>{
  try{
    const purchase=await Purchase.find();
    res.json(purchase);  
  }catch(error){
    console.log('Error fetching',error)
    res.json('fetaching error',error)
  }

})

// Create a new purchase
router.post('/', async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    // Here, you can perform additional validations or checks before creating a purchase
    const newPurchase = new Purchase({ user_id, product_id });
    await newPurchase.save();
    res.json({ message: 'Purchase added successfully' });
  } catch (error) {
    console.error('Error adding purchase:', error);
    res.json({ error: 'Server error' });
  }
});


module.exports = router;
