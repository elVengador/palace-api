export const tagSchemas = `#graphql
    type Tag {
        _id:ID!
        userId: ID!
        value: String!
        state: String!
        updateDate: String!
        creationDate: String!
    }

    input AddTagInput{
        value: String!
    }

    input UpdateTagInput{
        value: String!
    }
`

export const tagQuerySchemas = `#graphql
    getTagsByUser(userId:ID!): [Tag]
`

export const tagMutationSchemas = `#graphql
    addTag(addTagInput:AddTagInput):String
    updateTag(tagId:ID!,updateTagInput:UpdateTagInput!):Int
    # removeTag(tagId:ID!):Int
`