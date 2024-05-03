/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { faker } from "@faker-js/faker/locale/zh_CN";

const typeDefs = `#graphql
type UserType {
  id: String!

  """昵称"""
  name: String!

  """简介"""
  desc: String!

  """tel"""
  tel: String!
}

type Query {
  """使用 ID 查询用户"""
  find(id: String!): UserType!
}

type Mutation {
  """新增用户"""
  create(params: UserInput!): Boolean!

  """更新用户"""
  update(id: String!, params: UserInput!): Boolean!

  """删除用户"""
  delete(id: String!): Boolean!
}

input UserInput {
  """昵称"""
  name: String!

  """简介"""
  desc: String!
}
`;

const resolvers = {
  UserType: {
    name: () => faker.person.fullName(),
  },
};

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'hello',
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true,
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 8888 } });

console.log(`🚀 Server listening at: ${url}`);
