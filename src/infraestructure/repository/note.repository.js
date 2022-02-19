import { ObjectId } from 'mongodb';

import { collection } from '../../core/src/infraestructure/mongo-db';

const nameCollection = 'notes'

export const getNotesById = async ({ noteId }) => {
    return await collection(nameCollection).findOne({ _id: noteId })
}

export const getNotesByTag = async ({ tagId }) => {
    const cursor = collection(nameCollection).find({ tagId })
    return await cursor.toArray();
}

export const addNote = async (newNote) => {
    const note = await collection(nameCollection).insertOne(newNote)
    return note.insertedId
}

export const updateNote = async ({ noteId, newNote }) => {
    const result = await collection(nameCollection).findOneAndUpdate(
        { _id: new ObjectId(noteId) },
        { $set: newNote },
        { returnDocument: 'after' }
    )
    return result.value
}

// export const removeTag = async ({ tagId }) => {
//     const tag = await collection(nameCollection).deleteOne({ _id: new ObjectId(tagId) })
//     return tag.deletedCount
// }