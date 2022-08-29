const express = require('express');

const app = express();

module.exports = (( req, res, next) => {
    // Logging the rejected field from multer error
    app.use((error) => {
        console.log('This is the rejected field ->', error.field);
      });
});

