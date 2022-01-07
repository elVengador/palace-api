import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

import { coreSchemas, coreQuerySchemas, coreMutationSchemas, coreResolvers } from '../../core/src/infraestructure/graphql';



// Construct a schema, using GraphQL schema language
const querySchemas = `
    ${coreQuerySchemas}
`

const mutationSchemas = `
    ${coreMutationSchemas}
`

var schema = buildSchema(`#graphql
    ${coreSchemas}
    type Query {${querySchemas}}
    type Mutation {${mutationSchemas}}
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