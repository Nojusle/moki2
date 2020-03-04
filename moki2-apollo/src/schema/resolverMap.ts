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
  return (await Mongo.MongoClient.connect(url))
    .db("linas")
    .collection("messages");
}

const resolverMap: IResolvers = {
  Query: {
    async messages(_: void, args: void): Promise<string[]> {
      return (await (await connect()).find().toArray()).map(i =>
        JSON.stringify(i)
      );
    }
  },
  Mutation: {
    async addMessage(_: void, { msg }: any): Promise<string[]> {
      // try {
      const connection = await connect();
      await connection.insertOne({ msg });
      // } catch (err) {
      //   console.log("err", err);
      //   return [...messages, JSON.stringify(err)];
      // }
      return (await connection.find().toArray()).map(i => JSON.stringify(i));
    }
  }
};
export default resolverMap;
