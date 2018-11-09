//this file connects to the remote prisma DB and gives us the ability to query it with JS
const { Prisma } = require('prisma-binding');

// typedefinitions is the generated prisma.graphql. It needs to know what all the different Types, querys and mutations are in order to use it. We need to feed it the prisma.graphql file.
const db = new Prisma({
  typeDef: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRSIMA_SECRET,
  debug: false,
})

module.exports = db;
