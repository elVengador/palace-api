export const noteSchema = `#graphql
    type Note {
        _id: ID!
        tagId: ID!
        value: String!
        state: String!
        updateDate: String!
        creationDate: String!
        creationUser: ID!
    }

    type NoteOutput {
        _id: ID!
        tags:[Tag!]!
        value: String!
        state: String!
        updateDate: String!
        creationDate: String!
        creationUser: ID!
    }

    input AddNoteInput{
        tagId:ID!,
        value:ID!
    }
    input UpdateNoteInput{
        tagId:ID!,
        value:ID!
    }
`

export const noteQuerySchemas = `#graphql
    getNotesByUser:[NoteOutput]
    getNotesByTag(tagId:ID!):[NoteOutput]
`

export const noteMutationSchemas = `#graphql
    addNote(addNoteInput:AddNoteInput):NoteOutput
    updateNote(noteId:ID!,updateNoteInput:UpdateNoteInput):Note
    # removeNote(idNote:ID!):
`