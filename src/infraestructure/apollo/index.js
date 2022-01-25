import { gql } from 'apollo-server-core';
import { startApolloServer } from '../../core/src/infraestructure/apollo';
import { coreMutationResolver, coreQueryResolver } from '../../core/src/infraestructure/apollo/resolvers';
import { coreMutationSchemas, coreQuerySchemas, coreSchemas } from '../../core/src/infraestructure/apollo/schemas';
import { tagMutationResolver, tagQueryResolver } from './tags/tag.resolver';
import { tagMutationSchemas, tagQuerySchemas, tagSchemas } from './tags/tag.schema';

const querySchemas = `
    ${coreQuerySchemas}
    ${tagQuerySchemas}
`

const mutationSchemas = `
    ${coreMutationSchemas}
    ${tagMutationSchemas}
`

// Schema definition
const typeDefs = gql`
    ${coreSchemas}
    ${tagSchemas}
    type Query {${querySchemas}}
    type Mutation {${mutationSchemas}}
  `;

// Resolver map
const resolvers = {
    Query: {
        ...coreQueryResolver,
        ...tagQueryResolver
    },
    Mutation: {
        ...coreMutationResolver,
        ...tagMutationResolver
    }
};

startApolloServer(typeDefs, resolvers, 4100)

