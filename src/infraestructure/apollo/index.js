import { gql } from 'apollo-server-core';
import { startApolloServer } from '../../core/src/infraestructure/apollo';
import { coreMutationResolver, coreQueryResolver } from '../../core/src/infraestructure/apollo/resolvers';
import { coreMutationSchemas, coreQuerySchemas, coreSchemas } from '../../core/src/infraestructure/apollo/schemas';
import { noteMutationResolver, noteQueryResolver } from './notes/note.resolver';
import { noteMutationSchemas, noteQuerySchemas, noteSchema } from './notes/note.schema';
import { tagMutationResolver, tagQueryResolver } from './tags/tag.resolver';
import { tagMutationSchemas, tagQuerySchemas, tagSchemas } from './tags/tag.schema';

const querySchemas = `
    ${coreQuerySchemas}
    ${tagQuerySchemas}
    ${noteQuerySchemas}
`

const mutationSchemas = `
    ${coreMutationSchemas}
    ${tagMutationSchemas}
    ${noteMutationSchemas}
`

// Schema definition
const typeDefs = gql`
    ${coreSchemas}
    ${tagSchemas}
    ${noteSchema}
    type Query {${querySchemas}}
    type Mutation {${mutationSchemas}}
  `;

// Resolver map
const resolvers = {
    Query: {
        ...coreQueryResolver,
        ...tagQueryResolver,
        ...noteQueryResolver
    },
    Mutation: {
        ...coreMutationResolver,
        ...tagMutationResolver,
        ...noteMutationResolver
    }
};

startApolloServer(typeDefs, resolvers, 4100)

