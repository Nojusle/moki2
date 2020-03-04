import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import schema from "./schema";

const memoryLeakArr = [];

// function memeoryLeak() {
//   console.warn("running active memory leak");

//   const crashArrFunc = () => {
//     for (let i = 0; i < 10000000 / 6; i++) {
//       memoryLeakArr.push("leak");
//     }
//     console.log(`arr size: ${memoryLeakArr.length}`);

//     setTimeout(() => {
//       crashArrFunc();
//     }, 1000);
//   };

//   crashArrFunc();
// }

const app = express();

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)]
});

app.use("*", cors());

app.use(compression());

server.applyMiddleware({ app, path: "/" });

const httpServer = createServer(app);

httpServer.listen({ port: 4000 }, (): void =>
  console.log(`\n🚀      GraphQL is now running on http://localhost:4000/`)
);

// memeoryLeak();
