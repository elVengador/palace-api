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
    getTagsByUser: [Tag]
`

export const tagMutationSchemas = `#graphql
    addTag(addTagInput:AddTagInput):Tag
    updateTag(tagId:ID!,updateTagInput:UpdateTagInput!):Tag
    # removeTag(tagId:ID!):Int
`