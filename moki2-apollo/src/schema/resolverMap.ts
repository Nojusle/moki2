import { IResolvers } from "graphql-tools";
import * as Mongo from "mongodb";

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  MONGO_REPLICASET
} = process.env;

const URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?replicaSet=${MONGO_REPLICASET}&authSource=admin`;

function connect() {
  const client = new Mongo.MongoClient(URL);
  return client.db();
}

const messages = ["veikia", URL, `url: ${URL}`];

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
      try {
        connect()
          .collection("messages")
          .insertOne({ msg });
      } catch (err) {
        return [...messages, JSON.stringify(err)];
      }
      return ["allgood", ...messages];
    }
  }
};
export default resolverMap;
