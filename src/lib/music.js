import jArray from "$lib/jarray.js";

export const musicScale = ['A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭' ];
export const musicNote = {
    isSamePitch: (note, sourceNote) => sourceNote.split('/').includes(note)
}

export function selectRandomEnharmonic( note ) {
    const enharmonicParts = note.split('/');
    return enharmonicParts.length > 1 ? jArray.getRandomElement(enharmonicParts) : note;
}

export const guitarStrings = ['E', 'A', 'D', 'G', 'B', 'E'].reverse();