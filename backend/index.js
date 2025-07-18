require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);


// Root route handler
app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));