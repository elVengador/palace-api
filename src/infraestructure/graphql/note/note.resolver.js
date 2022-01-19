import { getNotesByUser, addNote } from '../../repository/note.repository';

export const noteResolver = {
    getNotesByUser: getNotesByUser,
    addNote: addNote

}