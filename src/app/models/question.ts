export type DataQuestion = {
    title: string,
    questions: Questions[],
    results: Result
}

type  Questions = {
    id: number,
    question: string,
    options: Option[]
}

export type Option = {
    id: number,
    name: string,
    alias: string
}

type Result = {
    A: string,
    B: string
}