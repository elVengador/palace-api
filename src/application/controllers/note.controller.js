import * as noteRepository from '../../infraestructure/repository/note.repository';
import * as tagRepository from '../../infraestructure/repository/tag.repository';
import * as errorUtil from '../../core/src/application/utils/error.util';
import { Note } from '../../domain/note.entities';
import { ObjectId } from 'mongodb';

export const addNote = async (parent, { addNoteInput }, context) => {
    try {
        const userId = context.userId
        if (!userId) { return errorUtil.UNAUTHORIZED() }

        const newNote = Note()
        newNote.tagId = addNoteInput.tagId
        newNote.value = addNoteInput.value
        newNote.creationUser = userId
        const noteId = await noteRepository.addNote(newNote)
        const note = await noteRepository.getNotesById({ noteId })
        return await resolveTagInNote(note)
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}

export const getNotesByUser = async (parent, { }, context) => {
    try {
        const userId = context.userId
        if (!userId) { return errorUtil.UNAUTHORIZED() }

        const tags = await tagRepository.getTagsByUser({ userId })
        const userNotes = await Promise.all(tags.map(async (cur) => {
            const tagId = cur._id.toHexString()
            const notes = await noteRepository.getNotesByTag({ tagId })
            return notes.map(curNote => syncResolveTagInNote(curNote, [cur]))
        }))
        return userNotes.flat()
    } catch (err) {
        console.log(err);
        return errorUtil.SERVER_ERROR()
    }
}

export const getNotesByTag = async (parent, { tagId }, context) => {
    try {
        const userId = context.userId
        if (!userId) { return errorUtil.UNAUTHORIZED() }
        const notes = await noteRepository.getNotesByTag({ tagId })
        const result = await Promise.all(notes.map(async (cur) => await resolveTagInNote(cur)))
        return result
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}

export const updateTag = async (parent, { noteId, updateNoteInput }, context) => {
    try {
        const userId = context.userId
        if (!userId) { return errorUtil.UNAUTHORIZED() }

        const newNote = { ...updateNoteInput }
        newNote.updateDate = new Date().toISOString()
        return await noteRepository.updateNote({ noteId, newNote })
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}
export const resolveTagInNote = async (note) => {
    console.log('note:', note);
    const tag = await tagRepository.getTagById({ tagId: new ObjectId(note.tagId) })
    return { ...note, tags: [tag] }
}

export const syncResolveTagInNote = async (note, tags) => {
    return { ...note, tags: [...tags] }
}

// export const resolveTagInNote = (note, tags) => {
//     return { ...note, tags: [...tags] }
// }

// export const removeTag = async ({ tagId }) => {
//     try {
//         return await tagRepository.removeTag({ tagId })
//     } catch (err) {
//         return errorUtil.SERVER_ERROR()
//     }
// }
