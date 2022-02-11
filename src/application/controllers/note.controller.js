import * as noteRepository from '../../infraestructure/repository/note.repository';
import * as tagRepository from '../../infraestructure/repository/tag.repository';
import * as errorUtil from '../../core/src/application/utils/error.util';
import { Note } from '../../domain/note.entities';
import { ObjectId } from 'mongodb';

export const addNote = async (parent, { addNoteInput }, context) => {
    try {
        console.log('Add note controller');
        const userId = context.userId
        if (!userId) { return errorUtil.UNAUTHORIZED() }

        const newNote = Note()
        newNote.tagId = addNoteInput.tagId
        newNote.value = addNoteInput.value
        newNote.creationUser = userId
        const noteId = await noteRepository.addNote(newNote)
        return await noteRepository.getNotesById({ noteId })
    } catch (err) {
        return errorUtil.SERVER_ERROR()
    }
}

export const getNotesByTag = async (parent, { tagId }, context) => {
    try {
        const userId = context.userId
        if (!userId) { return errorUtil.UNAUTHORIZED() }
        const notes = await noteRepository.getNotesByTag({ tagId })
        console.log('noteS:', notes);
        const result = await Promise.all(notes.map(async (cur) => await resolveTagInNote(cur)))
        console.log('RES', result);
        return result
    } catch (err) {
        console.log(err);
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
    console.log('note.tagId', note.tagId);
    const tag = await tagRepository.getTagById({ tagId: new ObjectId(note.tagId) })
    console.log('tag', tag);
    return { ...note, tags: [tag] }
}

// export const removeTag = async ({ tagId }) => {
//     try {
//         return await tagRepository.removeTag({ tagId })
//     } catch (err) {
//         return errorUtil.SERVER_ERROR()
//     }
// }
