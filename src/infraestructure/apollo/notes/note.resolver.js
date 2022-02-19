import * as noteController from '../../../application/controllers/note.controller';

export const noteMutationResolver = {
    addNote: noteController.addNote,
    updateNote: noteController.updateNote
}

export const noteQueryResolver = {
    getNotesByUser: noteController.getNotesByUser,
    getNotesByTag: noteController.getNotesByTag
}