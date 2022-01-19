import { ObjectId } from 'mongodb';

import { collection } from '../../core/src/infraestructure/mongo-db';

export const getNotesByUser = async ({ userId }) => {
    return await collection('notes').findOne({ user: userId })
}

export const addNote = async (newNote) => {
    const note = await collection('notes').insertOne(newNote)
    return note.insertedId
}