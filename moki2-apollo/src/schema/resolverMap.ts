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

async function connect(url: string) {
  // console.log("connecting");
  return (await Mongo.MongoClient.connect(url)).db("linas");
}

const messages = ["veikia"];

const resolverMap: IResolvers = {
  Query: {
    messages(_: void, args: void): string[] {
      return messages;
    }
  },
  Mutation: {
    async addMessage(_: void, { msg }: any): Promise<string[]> {
      messages.push(msg);
      // try {
      await (await connect(msg)).collection("messages").insertOne({ msg });
      // } catch (err) {
      //   console.log("err", err);
      //   return [...messages, JSON.stringify(err)];
      // }
      return [...messages];
    }
  }
};
export default resolverMap;
