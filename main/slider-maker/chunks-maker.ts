import { Constants } from "./constants";
import { getFirstIndexOfTextOnSomethings, getFirstWordOfText, getLastIndexOfTextOnSomethings } from "./get-last-index-of-somethings";
import { Paragrafo } from "./paragrafo";
import { SlideConfigs } from "./slide-configs";

export type Chunks = [string, string]

interface ChunksReturnAdjust {
    chunks: Chunks
    worked: boolean
}

interface RestPart {
    has: boolean 
    restPart: string 
    fragmentInitial: string 
}

export class ChunksMaker {
    paragrafo!: Paragrafo 
    slideConfigs!: SlideConfigs

    constructor(paragrafo: Paragrafo, slideConfigs: SlideConfigs) {
        this.paragrafo = paragrafo
        this.slideConfigs = slideConfigs
    }

    private get paragrafoContent(): string {
        return this.paragrafo.content
    }

    public getChunks(availableHeightOnCurrentSlide: number): Chunks {
        const chunks = this.splitParagrafoIntoChunks(availableHeightOnCurrentSlide)
        return chunks
    }

    private splitParagrafoIntoChunks(availableHeightOnCurrentSlide: number): Chunks {
        const quantCharsByLine = this.paragrafo.getQuantCharsByLine()
        const simpleChunks = this.generatePreliminarChunks(quantCharsByLine, availableHeightOnCurrentSlide)

        const fullAdjust = this.adjustSimpleChunksByPriority(simpleChunks)
        const pontuationsIsolatedAdjustated = this.adjustIsolatedPontuation(fullAdjust)

        return pontuationsIsolatedAdjustated
    }

    private adjustSimpleChunksByPriority(simpleChunks: Chunks): Chunks {
        const chunksAdjustedByPontuations = this.getChunksAdjustedByPontuation(simpleChunks)
        if(chunksAdjustedByPontuations.worked) {
            return chunksAdjustedByPontuations.chunks
        }

        const chunksAdjustedByWord = this.getChunksAdjustedByWords(simpleChunks)
        if(chunksAdjustedByWord.worked) {
            return chunksAdjustedByWord.chunks
        }
        
        return simpleChunks
    }

    private adjustIsolatedPontuation(chunks: Chunks): Chunks {
        let [parte1, parte2] = chunks
        if(doStartsWithAPontuation(parte2)) {
            parte1 = parte1+parte2.at(0)
            parte2 = parte1.substring(1)
        }

        return [parte1, parte2]
    }

    private getChunksAdjustedByPontuation(simpleChunks: Chunks): ChunksReturnAdjust {
        let [parte1, parte2] = simpleChunks

        const {has: isCompleted, restPart, fragmentInitial} = this.haveCompletedPontuationAndReturnTheRestPart(parte1, parte2)

        if(!isCompleted) {
            const res = this.adjustAndReturnIfPossibleTheChunksGivenPart1AcrescentalPart1Part2AndInitialFragment(parte1, restPart, parte2, fragmentInitial)
            if(res.chunks) {
                return {chunks: res.chunks, worked: true}
            }
        }

        return {chunks: [parte1, parte2], worked: false}
    }

    private getChunksAdjustedByWords(simpleChunks: Chunks): ChunksReturnAdjust {
        let [parte1, parte2] = simpleChunks
        const {has: isCompleted, restPart, fragmentInitial} = this.haveCompletedWordAndReturnTheRestPart(parte1, parte2)
        if(!isCompleted) {
            const res = this.adjustAndReturnIfPossibleTheChunksGivenPart1AcrescentalPart1Part2AndInitialFragment(parte1, restPart, parte2, fragmentInitial)
            if(res.worked) {
                return {chunks: res.chunks, worked: true}
            }
        }


        return {chunks: [parte1, parte2], worked: false}
    }


    private adjustAndReturnIfPossibleTheChunksGivenPart1AcrescentalPart1Part2AndInitialFragment(parte1: string, acrescentalPart: string, parte2: string, fragment: string): ChunksReturnAdjust {
        const newParte1 = parte1.substring(0, parte1.length-acrescentalPart.length)
        const newParte2 = acrescentalPart+parte2

        if(this.slideConfigs.fitsThisContentInOtherSlide(fragment)) {
            return {chunks: [newParte1, newParte2], worked: true}
        }

        return {chunks: [parte1, parte2], worked: false}
    }

    private haveCompletedPontuationAndReturnTheRestPart(text: string, nextToAppendPart: string): RestPart {
        const afterPontuation = this.getLastTextAfterPontuation(text)
        const appendedPartBeforePontuation = this.getFirstTextBeforePontuation(nextToAppendPart)

        return {
            has: afterPontuation.length === 0,
            restPart: afterPontuation,
            fragmentInitial: afterPontuation+appendedPartBeforePontuation
        }
    }

    private haveCompletedWordAndReturnTheRestPart(parte1:string, nextToAppendPart: string): RestPart {
        if(!this.doThisParagrafoEndWithSpace(parte1)) {
            const indexSpace = parte1.lastIndexOf(" ")
            const restOfWordOfPart1 = parte1.slice(indexSpace)
            const restOfWordInOtherPart = getFirstWordOfText(nextToAppendPart)

            return {
                has: false,
                restPart: restOfWordOfPart1,
                fragmentInitial: restOfWordOfPart1+restOfWordInOtherPart
            }
        }

        return {
            has: false,
            restPart: "",
            fragmentInitial: ""
        }
    }

    private doThisParagrafoEndWithSpace(paragrafo: string): boolean {
        return paragrafo.endsWith(" ")
    }

    private getLastTextAfterPontuation(text: string): string {
        const lastIndex = getLastIndexOfTextOnSomethings(text, Constants.PONTUATIONS)
        return text.substring(lastIndex)
    }

    private getFirstTextBeforePontuation(text: string): string {
        const firstIndex = getFirstIndexOfTextOnSomethings(text, Constants.PONTUATIONS)
        return text.substring(0, firstIndex)
    }
    
    private generatePreliminarChunks(quantCharsByLine: number, availableHeight: number): Chunks {
        const part1Paragrafo = this.slideConfigs.paragrafoMaker(this.paragrafoContent)
        const part1Length = quantCharsByLine*part1Paragrafo.getQuantOfLinesOfSimulatedHeight(availableHeight)

        const part1 = this.paragrafoContent.substring(0, part1Length)
        const part2 = this.paragrafoContent.substring(part1Length)

        return [part1, part2]
    }
}

function doStartsWithAPontuation(text: string): boolean {
    return Constants.PONTUATIONS.includes(text.at(0) ?? "")
}