// schema.ts
import 'graphql-import-node';
import { GraphQLSchema } from 'graphql';

import * as typeDefs from './typeDefs.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolverMap';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
