import { BrowserWindow, dialog, shell } from 'electron'
import { readFile } from 'node:fs/promises'

import { isFileOpen } from './currFile'
import { sendMainErrorMessage } from './interfaces/mse'

/**
 * Show the open dialog and read contents of the selected markdown file.
 * @param browserWin Electron BrowserWindow instance
 * @return The file path of the currently open markdown file, and the contents of the
 *     currently open markdown file, or undefined if no file was opened
 */
export const showFileOpenDialog = async (browserWin: BrowserWindow) => {
    const result = await dialog.showOpenDialog(browserWin, {
        title: 'Open Markdown',
        properties: ['openFile'],
        filters: [{ name: 'Markdown File', extensions: ['md'] }],
    })

    if (result.canceled) {
        return
    }

    const [filePath] = result.filePaths

    let markdownSaved
    try {
        markdownSaved = await readFile(filePath, { encoding: 'utf-8' })
    } catch (err) {
        if (err instanceof Error) {
            sendMainErrorMessage(err, browserWin)
        } else {
            throw err
        }
    }

    return [filePath, markdownSaved as string]
}

/**
 * Open the folder the currently opened markdown file is located in.
 */
export const showInFolder = async () => {
    const filePath = isFileOpen()
    if (filePath) {
        await shell.showItemInFolder(filePath)
    }
}
