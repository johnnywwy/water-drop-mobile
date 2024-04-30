/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { faker } from "@faker-js/faker/locale/zh_CN";

const typeDefs = `#graphql
  type Query {
    hello: String
    resolved: String
  }
`;

const resolvers = {
  Query: {
    resolved: () => "Resolved",
  },
};

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => faker.location.city(),
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 8888 } });

console.log(`🚀 Server listening at: ${url}`);
