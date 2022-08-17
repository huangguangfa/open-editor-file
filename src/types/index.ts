type specifiedEditorCallback = () => void
export type specifiedEditor = string | specifiedEditorCallback | undefined

type srcRootCallback = () => void
export type srcRoot = string | srcRootCallback | undefined

export type onErrorCallback = () => void