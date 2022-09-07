const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;

mongoose.connect(`${dbUrl}/${dbName}`)
  .then((con) => {
    console.log('Conectado a Mongo', con.connection.host);
  });
app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
 });