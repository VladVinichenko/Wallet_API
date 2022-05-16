const app = require('../app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log('Database connection Successful');
      console.log(`Server running. Use our API on port: ${PORT}`);
    }),
  )
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
