import { app, dialog, SaveDialogReturnValue } from "electron";
import { win } from "./helpers/create-window";

let lastFolderPath: string | undefined;

export async function OpenNewFile(_: any) {
    return SaveNewPPTX()
}

async function SaveNewPPTX(defaultFileName = "Apresentacao") {
    const result = await getFilePathNew(defaultFileName)

    if (result.canceled || !result.filePath) return null;

    lastFolderPath = getFolderFromAbsPath(result.filePath);
    return result.filePath;
}

async function getFilePathNew(defaultFileName: string): Promise<SaveDialogReturnValue> {
    return dialog.showSaveDialog(win, {
        title: "Salvar arquivo PowerPoint",
        defaultPath: lastFolderPath 
            ? `${lastFolderPath}/${defaultFileName}.pptx` 
            : `${app.getPath("documents")}/${defaultFileName}.pptx`,
        filters: [
            { name: "PowerPoint", extensions: ["pptx"] }
        ]
    });
}

function getFolderFromAbsPath(pathAbs: string): string {
    return pathAbs.substring(0, pathAbs.lastIndexOf("/"));
}