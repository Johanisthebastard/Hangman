import words from "./svenska-ord.js";

let level = null;

export function easyPeasy(words) {
    const easyWords = words.filter(word => word.length === 10)
    if (easyWords) {
        const easyIndex = Math.floor(Math.random() * easyWords.length)
        return easyWords[easyIndex]
    }
}

export function mediumSquezy(words) {
    const mediumWords = words.filter(word => word.length === 7)
    if (mediumWords) {
        const mediumIndex = Math.floor(Math.random() * mediumWords.length)
        return mediumWords[mediumIndex]
    }
}
export function hardyParty(words) {
    const hardWords = words.filter(word => word.length === 5)
    if (hardWords) {
        const hardIndex = Math.floor(Math.random() * hardWords.length)
        return hardWords[hardIndex]
    }
}
