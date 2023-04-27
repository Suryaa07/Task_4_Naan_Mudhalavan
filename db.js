const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB database:', err);
  });
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
