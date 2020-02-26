import { IResolvers } from "graphql-tools";

const messages = [""];

const resolverMap: IResolvers = {
  Query: {
    messages(_: void, args: void): string[] {
      return messages;
    }
  },
  Mutation: {
    addMessage(_: void, { msg }: any): string[] {
      console.log("msg", msg);
      messages.push(msg);
      return messages;
    }
  }
};
export default resolverMap;
