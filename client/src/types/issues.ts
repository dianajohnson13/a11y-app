export interface IssueGroup {
    code: string,
    message: string,
    instances: Array<{context: string, selector: string}>
}