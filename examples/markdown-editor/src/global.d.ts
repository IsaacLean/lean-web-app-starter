declare interface Window {
    api: {
        checkForMarkdownChange: (markdown: string) => Promise<boolean>
        onFocusModeToggle: (
            callback: () => void,
        ) => () => import('electron').IpcRenderer
        onMainErrorMessage: (
            callback: (errorMessage: string) => void,
        ) => () => import('electron').IpcRenderer
        onMainSaveFile: (
            callback: () => void,
        ) => () => import('electron').IpcRenderer
        onReadFile: (
            callback: (filePath: string, markdown: string) => void,
        ) => () => import('electron').IpcRenderer
        onSaveFileSuccess: (
            callback: () => void,
        ) => () => import('electron').IpcRenderer
        saveFile: (markdown: string) => void
        showExportHtmlDialog: (html: string) => void
        showInFolder: () => void
        showOpenFileDialog: () => void
    }
}
