import * as noteController from '../../../application/controllers/note.controller';

export const noteMutationResolver = {
    addNote: noteController.addNote,
    updateNote: noteController.updateTag
}

export const noteQueryResolver = {
    getNotesByTag: noteController.getNotesByTag
}