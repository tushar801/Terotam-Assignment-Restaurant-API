const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Importing routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const menuItemRoutes = require('./routes/menuItem');

// Defining routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/menu-items', menuItemRoutes);

// Starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
