import { IResolvers } from "graphql-tools";
import * as Mongo from "mongodb";

const MONGO_URL = process.env.MONGO_URL || "";

const client = new Mongo.MongoClient(MONGO_URL);

const db = client.db();

const messages = ["veikia", MONGO_URL];

const resolverMap: IResolvers = {
  Query: {
    messages(_: void, args: void): string[] {
      return messages;
    }
  },
  Mutation: {
    async addMessage(_: void, { msg }: any): Promise<string[]> {
      console.log("msg", msg);
      messages.push(msg);
      db.collection("messages").insertOne({ msg });
      return messages;
    }
  }
};
export default resolverMap;
