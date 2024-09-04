import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import eventRoutes from './routes/eventosRoutes.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Registrar rotas
app.use(eventRoutes);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
