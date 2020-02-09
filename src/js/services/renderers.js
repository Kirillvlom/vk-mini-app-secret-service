import React from 'react';
import NoteCell from '../components/NoteCell';

export const renderNotesList = (items) => {
    let notes = null;
    if (items !== undefined && items !== null && items.length !== 0) {
        notes = items.map((note) => (
            <NoteCell
                key={note.id}
                comment={note.comment}
                uniqUrl={note.uniqUrl}/>
        ));
    }
    return notes;
};