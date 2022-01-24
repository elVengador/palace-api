import { ObjectId } from 'mongodb';

import { collection } from '../../core/src/infraestructure/mongo-db';

const nameCollection = 'tags'

export const getTagsById = async ({ tagId }) => {
    return await collection(nameCollection).findOne({ _id: tagId })
}

export const getTagsByUser = async ({ userId }) => {
    const cursor = collection(nameCollection).find({ userId })
    return await cursor.toArray();
}

export const addTag = async (newTag) => {
    const tag = await collection(nameCollection).insertOne(newTag)
    return tag.insertedId
}

export const updateTag = async ({ tagId, newTag }) => {
    const tag = await collection(nameCollection).updateOne({ _id: new ObjectId(tagId) }, { $set: newTag })
    return tag.matchedCount
}

export const removeTag = async ({ tagId }) => {
    const tag = await collection(nameCollection).deleteOne({ _id: new ObjectId(tagId) })
    return tag.deletedCount
}
