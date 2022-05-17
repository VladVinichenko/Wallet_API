const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path")
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const {
  authRouter,
  usersRouter,
  financeRouter,
} = require('./src/routes/api/index');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/finance', financeRouter);

app.use("/link", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/link.html"))
})

app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
);
    
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
  next();
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
  next();
});

module.exports = app;
