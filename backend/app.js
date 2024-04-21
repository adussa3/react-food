import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';
import { nanoid } from 'nanoid';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items == []) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (orderData.customer.email === null || !orderData.customer.email.includes('@')) {
    return res.status(400).json({
      message: "Missing the required email data"
    });
  }

  if (orderData.customer.name === null || orderData.customer.name.trim() === '') {
    return res.status(400).json({
      message: "Missing the required name data"
    });
  }

  if (orderData.customer.street === null || orderData.customer.street.trim() === '') {
    return res.status(400).json({
      message: "Missing the required street data"
    });
  }

  if (orderData.customer.city === null || orderData.customer.city.trim() === '') {
    return res.status(400).json({
      message: "Missing the required city data"
    });
  }

  if (orderData.customer.state === null || orderData.customer.state.trim() === '') {
    return res.status(400).json({
      message: "Missing the required state data"
    });
  }

  if (orderData.customer['postal-code'] === null || orderData.customer['postal-code'].trim() === '') {
    return res.status(400).json({
      message: "Missing the required postal code data"
    });
  }

  const newOrder = {
    ...orderData,
    id: nanoid(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
