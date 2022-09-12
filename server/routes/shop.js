const express = require('express')
const router = express.Router()
const Shop = require("../models/shop")

// Getting All
router.get('/shop', async (req, res) => {
    try {
        const products = await Shop.find()
        res.render('shop.ejs', {
            shop: products
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Getting One
router.get('/product=:id', getProduct, (req, res) => {
    res.render('product.ejs', {
        product: res.product
    })
})

// Creating One
router.post('/shop', async (req, res) => {
    const product = new Shop({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Updating One
router.patch('/product=:id', getProduct, async (req, res) => {
    if (req.body.name != null) {
        res.shop.name = req.body.name
    }
    if (req.body.description != null) {
        res.shop.description = req.body.description
    }
    if (req.body.price != null) {
        res.shop.price = req.body.price
    }
    try {
        const updatedShop = await res.shop.save()
        res.json(updatedShop)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Deleting One
router.delete('/product=:id', getProduct, async (req, res) => {
    try {
        await res.shop.remove()
        res.json({message: 'Product deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

async function getProduct(req, res, next) {
    try {
        product = await Shop.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({message: 'Product not found'})
        } 
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    res.product = product
    next()
}

module.exports = router