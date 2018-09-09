const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')

const getPrismaInstance = () => {
  return new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://159.89.173.174:4466/',     
    debug: true                             
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
  