const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});