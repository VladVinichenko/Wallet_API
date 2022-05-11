const app = require("./app");

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running. Use our API on port: 4000");
});
