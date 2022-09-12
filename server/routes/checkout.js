const express = require('express')
const router = express.Router()
const Checkout = require("../models/checkout")

router.get('/checkout', async (req, res) =>  {
    try {
        const cart = await Checkout.find()
        res.json(cart)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/checkout=:id', getItem, async (req, res) =>  {
    res.send(req.params.id)
})

router.post('/checkout', async (req, res) =>  {
    const item = new Checkout({
        name: req.body.name,
        qty: req.body.qty,
        cost: req.body.cost,
        item_id: req.body.item_id
    })
    try {
        const newItem = await item.save()
        res.status(201).json(newItem)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.patch('/checkout=:id', getItem, async (req, res) =>  {
    if (req.body.name != null) {
        res.checkout.name = req.body.name
    }
    if (req.body.qty != null) {
        res.checkout.qty = req.body.qty
    }
    if (req.body.cost != null) {
        res.checkout.cost = req.body.cost
    }
    if (req.body.item_id != null) {
        res.checkout.item_id = req.body.item_id
    }
    try {
        const updatedCheckout = await res.checkout.save()
        res.json(updatedCheckout)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/checkout=:id', getItem, async (req, res) =>  {
    try {
        await res.checkout.remove()
        res.json({message: 'Item deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getItem(req, res, next) {
    try {
        item= await checkout.findById(req.params.id)
        if (item== null) {
            return res.status(404).json({message: 'Item not found'})
        }
    } catch (error) {
        return res.status(500).json({message:error.message}) 
    }
    res.item = item
    next()
}
module.exports = router