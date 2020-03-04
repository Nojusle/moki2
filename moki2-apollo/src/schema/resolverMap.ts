import { IResolvers } from "graphql-tools";
import * as Mongo from "mongodb";

// const {
//   MONGO_USERNAME,
//   MONGO_PASSWORD,
//   MONGO_HOSTNAME,
//   MONGO_PORT,
//   MONGO_REPLICASET
// } = process.env;
// MONGO_DB,

// const URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}?replicaSet=${MONGO_REPLICASET}&authSource=admin`;
async function connect() {
  const url =
    "mongodb://mongo-mongodb-replicaset-0.mongo-mongodb-replicaset.default.svc.cluster.local,mongo-mongodb-replicaset-1.mongo-mongodb-replicaset.default.svc.cluster.local,mongo-mongodb-replicaset-2.mongo-mongodb-replicaset.default.svc.cluster.local:27017/sharkinfo?replicaSet=rs0";
  // console.log("connecting");
  return (await Mongo.MongoClient.connect(url)).db().collection("messages");
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
