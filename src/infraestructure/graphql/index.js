import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

// import { coreSchemas, coreResolvers } from '../../core/src/infraestructure/graphql'
// import moduleName from 'module';
import { coreSchemas, coreResolvers } from '../../core/src/infraestructure/graphql';
// import { userSchema } from './user/user.schema';
// import { userResolver } from './user/user.resolver';



// Construct a schema, using GraphQL schema language
// ${userSchema}  
var schema = buildSchema(`
  ${coreSchemas}
`);

// The root provides a resolver function for each API endpoint
// ...userResolver,
var root = {
  ...coreResolvers,
};

const graphqlHTTPConfig = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})

export { graphqlHTTPConfig }