import express, { Request, Response } from 'express';
import pa11y from 'pa11y';

const app = express();
export default app;

// routes to be moved
app.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from server!" });
});

// /a11y/test

interface ResultIssue {
    code: string;
    context: string;
    message: string;
    selector: string;
    type: string;
    typeCode: number;
  };
  
interface Result {
    issues: ResultIssue[],
    documentTitle: string,
    pageUrl: string
}

interface IssueGroup {
    code: string,
    message: string,
    instances: string[], // context[]
}

interface IssueGroups {
  [code: string]: IssueGroup
}
  
app.get('/a11y/test', async (req: Request, res: Response) => {
    const url = req.query.url as string;
    if (!url) {
      res.status(400).json({ error: 'Missing URL' });
    } else {
      const results: Result = await pa11y(url);
      const data = structureResults(results);
      res.status(200).json({data});
    }
});

const structureResults = ({ documentTitle, pageUrl, issues }: Result) => {
    const issueGroups: IssueGroups = {}; 
  
    issues.forEach(({ code, message, context }: ResultIssue) => {
      if (issueGroups[code]) {
        issueGroups[code].instances.push(context);
      } else {
        issueGroups[code] = {
          code: code,
          message: message,
          instances: [context]
        }
      }
    });
  
    return {
      documentTitle,
      pageUrl,
      issueGroups
    };
  }