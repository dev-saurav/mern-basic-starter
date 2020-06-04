const express = require('express')
const router = express.Router()

//Item Model
const Item = require('../../models/Item')


//@route GET api/items
//@desc get all items
//@access Public
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ date: -1 })
        res.json(items)
    } catch (error) {
        res.status(400).send(error)
    }

})

//@route POST api/items
//@desc create an Item
//@access Public
router.post('/', async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name
        })
        const savedItem = await newItem.save()
        res.json(savedItem)
    } catch (error) {
        res.status(400).send(error)
    }
})

//@route DELETE api/items/:id
//@desc DELETE an Item
//@access Public
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        const removedItem = await item.remove()
        if (removedItem) return res.json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false })
    }
})

module.exports = router