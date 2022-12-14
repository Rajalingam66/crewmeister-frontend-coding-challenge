import 'dotenv/config'
import express from 'express';

import cors from 'cors'
import routes from './routes/routes.js'


const app = express();
app.use(cors())

app.use('/api', routes)
const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`API server listening on port ${port}!`),
);