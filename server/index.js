require("dotenv").config();
const http = require("http");
const connectToDB = require("./config/db");
const app = require("./app");

async function startServer() {
  await connectToDB();

  const server = http.createServer(app);

  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server", err);
  process.exit(1);
});
