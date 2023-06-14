import express, { Request, Response } from 'express';
import pa11y from 'pa11y';

import type {
  ResultIssue,
  Result,
  IssueGroups
} from '../types/a11yTestResults';

// Routes under '/api/a11y'
const router = express.Router();
  
router.get('/test', async (req: Request, res: Response) => {
  try {
    const url = req.query.url as string;
    if (!url) {
      res.status(400).json({ error: 'Missing URL' });
    } else {
      const results: Result = await pa11y(url);
      const data = structureResults(results);
      res.status(200).json({data});
    }
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
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