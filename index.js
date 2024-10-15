const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

// Middleware
app.use(cors());
app.use(express.json());

// Mock database penginapan
const hotels = [
  { id: 1, name: 'Hotel A', address: 'Jakarta', price: 500000, rating: 4.5, lat: -6.2088, lng: 106.8456 },
  { id: 2, name: 'Hotel B', address: 'Bandung', price: 400000, rating: 4.0, lat: -6.9175, lng: 107.6191 },
  { id: 3, name: 'Hotel C', address: 'Bali', price: 600000, rating: 4.7, lat: -8.3405, lng: 115.0920 }
];

// Rute untuk pencarian penginapan berdasarkan lokasi (latitude dan longitude)
app.get('/search', (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ message: 'Latitude and Longitude are required!' });
  }
  // Filter penginapan dalam radius tertentu (misal 50km)
  const nearbyHotels = hotels.filter(hotel => {
    const distance = Math.sqrt(Math.pow(hotel.lat - lat, 2) + Math.pow(hotel.lng - lng, 2));
    return distance < 0.5; // 0.5 adalah jarak yang disimulasikan
  });

  res.json({
    message: `Hasil pencarian untuk koordinat: ${lat}, ${lng}`,
    hotels: nearbyHotels
  });
});

// Jalankan server di port 3000
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
