import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

import { coreSchemas, coreQuerySchemas, coreMutationSchemas, coreResolvers } from '../../core/src/infraestructure/graphql';
import { tagMutationSchemas, tagQuerySchemas, tagSchemas } from './tag/tag.schema';
import { tagResolvers } from './tag/tag.resolver';
import { formatError } from '../../core/src/application/utils/error.util';



// Construct a schema, using GraphQL schema language
const querySchemas = `
    ${coreQuerySchemas}
    ${tagQuerySchemas}
`

const mutationSchemas = `
    ${coreMutationSchemas}
    ${tagMutationSchemas}
`

var schema = buildSchema(`#graphql
    ${coreSchemas}
    ${tagSchemas}
    type Query {${querySchemas}}
    type Mutation {${mutationSchemas}}
`);

// The root provides a resolver function for each API endpoint
// ...userResolver,
var root = {
    ...coreResolvers,
    ...tagResolvers
};

const graphqlHTTPConfig = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    formatError: (err) => {
        console.log('>> format error');
        return ({ message: err.message, statusCode: 200 })
    },
    customFormatErrorFn: (err) => {
        console.log('>> custom format error');
        return ({ message: err.message, statusCode: 200 })
    }
})

export { graphqlHTTPConfig }