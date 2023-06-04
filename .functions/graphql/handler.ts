import { ApolloServer } from 'apollo-server-lambda'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'
import typeDefs from '../../schema.graphql'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new ApolloServer({
  schema,
  introspection: true
})

export const handler = server.createHandler()