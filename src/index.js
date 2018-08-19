const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')

const getPrismaInstance = () => {
  return new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,     // `secret` taken from `prisma.yml`
    debug: false                             // log all requests to the Prisma API to console
  })
}

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: getPrismaInstance(),
  }),
})
  server.start(() => console.log('Server is running on http://localhost:4000'))
  