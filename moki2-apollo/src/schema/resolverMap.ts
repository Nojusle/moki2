import { IResolvers } from "graphql-tools";
import * as Mongo from "mongodb";
import { MONGO_URL } from "../env";

async function connect() {
  return (await Mongo.MongoClient.connect(MONGO_URL))
    .db()
    .collection("messages");
}

async function getMessages(collection: Mongo.Collection) {
  return [
    "new12",
    ...(await (await collection).find().toArray()).map(i => i.msg),
    "new12"
  ];
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
