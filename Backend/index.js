const connecttomongo = require('./Db');
connecttomongo();

const cors = require('cors')

const express = require('express');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/user', require('./routes/Userroute'));
app.use('/api/notes', require('./routes/Notesroute'))

app.listen(port, () => {
    console.log("Backend listening at  port http://localhost:", port);
});
