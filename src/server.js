const express = require('express');

const app = express();

const PORT = 3000;
const SERVER = app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
});