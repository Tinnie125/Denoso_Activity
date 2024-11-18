const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const mockData = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 30 }
];


app.get('/items', (req, res) => {
    res.json(mockData);
});


app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = mockData.find(item => item.id === id);
    
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.post('/items', (req, res) => {
    const newItem = req.body;
    newItem.id = mockData.length ? mockData[mockData.length - 1].id + 1 : 1;
    mockData.push(newItem);
    res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = mockData.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        mockData[itemIndex] = { ...mockData[itemIndex], ...req.body };
        res.json(mockData[itemIndex]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = mockData.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        const deletedItem = mockData.splice(itemIndex, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});
