import express, { Request, Response } from 'express';
import pa11y from 'pa11y';

import type {
  ResultIssue,
  Result,
  IssueGroups
} from '../types/a11yTestResults';

const router = express.Router();
  
router.get('/test', async (req: Request, res: Response) => {
    const url = req.query.url as string;
    console.log('here', req)
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
  
    issues.forEach(({ code, message, context, selector }: ResultIssue) => {
      if (issueGroups[code]) {
        issueGroups[code].instances.push({ context, selector });
      } else {
        issueGroups[code] = {
          code: code,
          message: message,
          instances: [{ context, selector } ]
        }
      }
    });
  
    return {
      documentTitle,
      pageUrl,
      issueGroups
    };
  }
export default router;