export interface ResultIssue {
    code: string;
    context: string;
    message: string;
    selector: string;
    type: string;
    typeCode: number;
  };
  
export interface Result {
    issues: ResultIssue[],
    documentTitle: string,
    pageUrl: string
}

export interface IssueGroup {
    code: string,
    message: string,
    instances: Array<{context: string, selector: string}>,
}

export interface IssueGroups {
  [code: string]: IssueGroup
}
