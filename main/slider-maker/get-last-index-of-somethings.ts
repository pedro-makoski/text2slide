import { Constants } from "./constants";

export function getLastIndexOfTextOnSomethings(text: string, somethings: string): number {
    let greather = 0;
    
    for(let item of somethings) {
        const index = text.lastIndexOf(item)
        if(index > greather) {
            greather = index
        }
    }

    return greather
}

export function getFirstIndexOfTextOnSomethings(text: string, somethings: string) {
    let lower = 0;
    
    for(let item of somethings) {
        const index = text.indexOf(item)
        if(index < lower) {
            lower = index
        }
    }

    return lower
}

export function getFirstWordOfText(text: string): string {
    return text.split(Constants.SEPARATOR_WORD)[0]
}