import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'OK' 
    })
})

app.listen(3000, () => {
  console.log('Server is running on port https://localhost:3000');
})