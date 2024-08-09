const express = require('express');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Setup multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Get menu items by category
router.get('/:categoryId', authMiddleware, async (req, res) => {
    try {
        const menuItems = await MenuItem.findAll({ where: { CategoryId: req.params.categoryId } });
        res.json(menuItems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add a menu item
router.post('/',
    authMiddleware,
    upload.single('image'),
    check('name', 'Name is required').not().isEmpty(),
    check('categoryId', 'Category ID is required').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, categoryId } = req.body;
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ msg: 'Category not found' });
            }

            const menuItem = await MenuItem.create({
                name,
                CategoryId: categoryId,
                image: req.file ? req.file.filename : null,
            });

            res.json(menuItem);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
