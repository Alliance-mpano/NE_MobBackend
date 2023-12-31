const express = require('express')
require('dotenv').config()
const json = express.json();
const cors = require('cors')

const PORT = process.env.PORT || 2000
const app = express();

app.use(json)
app.use(cors({
    origin: "exp://192.168.8.117:19001",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

require('./src/config/db')
const purchaseRoutes = require('./src/routes/purchase.routes');
const swagger = require('./swagger')

swagger(app);

app.get('/',(req,res) => {
    res.send('Welcome to backend tutorial')
})


app.use('/api/purchase', purchaseRoutes);

app.listen(PORT, function() {
    console.log(`app running on http://localhost:${PORT}`);
})