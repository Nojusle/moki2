import { IResolvers } from "graphql-tools";
import * as Mongo from "mongodb";

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_REPLICASET,
  MONGO_DB
} = process.env;

console.log("MONGO_USERNAME", MONGO_USERNAME);
console.log("MONGO_PASSWORD", MONGO_PASSWORD);
console.log("MONGO_HOSTNAME", MONGO_HOSTNAME);
console.log("MONGO_PORT", MONGO_PORT);
console.log("MONGO_REPLICASET", MONGO_REPLICASET);
console.log("MONGO_DB", MONGO_DB);

console.log("process.env", process.env);

// const URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}?replicaSet=${MONGO_REPLICASET}&authSource=admin`;

const URL =
  "mongodb://bm9qdXM=:bm9qdXMxMjM=@mongo-mongodb-replicaset-0.mongo-mongodb-replicaset.default.svc.cluster.local,mongo-mongodb-replicaset-1.mongo-mongodb-replicaset.default.svc.cluster.local,mongo-mongodb-replicaset-2.mongo-mongodb-replicaset.default.svc.cluster.local:27017/sharkinfo?replicaSet=rs0&authSource=admin";
async function connect() {
  return (await Mongo.MongoClient.connect(URL)).db().collection("messages");
}

async function getMessages(collection: Mongo.Collection) {
  return (await (await collection).find().toArray()).map(i => i.msg);
}

const resolverMap: IResolvers = {
  Query: {
    async messages(_: void, args: void): Promise<string[]> {
      return getMessages(await connect());
    }
  },
  Mutation: {
    async addMessage(_: void, { msg }: any): Promise<string[]> {
      const connection = await connect();
      await connection.insertOne({ msg });
      return getMessages(connection);
    }
  }
};
export default resolverMap;
