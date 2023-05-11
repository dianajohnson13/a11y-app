import './App.css';
import { useState } from 'react';

import MainSearch from './components/MainSearch';
import IssueBlock from './components/IssueBlock';

interface ResultIssue {
  code: string;
  context: string;
  message: string;
  selector: string;
  type: string;
  typeCode: number;
};

interface Result {
  results: {
    issues: ResultIssue[],
    documentTitle: string,
    pageUrl: string
  }
}

export interface IssueGroup {
    code: string,
    message: string,
    instances: string[], // context[]
}

interface IssueGroups {
  [code: string]: IssueGroup
}

interface Data {
  issueGroups: IssueGroups,
  documentTitle: string,
  pageUrl: string
}

const fetchUrl = async (newURL: string) => {
  const resp = await fetch(`/api/test?url=${newURL}`);
  return resp.json();
}

const structureResults = ({results: {documentTitle, pageUrl, issues}}: Result) => {
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

export default function App() {
let [ data, setData ] = useState<Data>();
let [ loading, setLoading ] = useState<boolean>(false);

  const handleSubmit = (newURL: string): void => {
    if (newURL === "") { // handle invalid URL too
      // show error message under input
    } else {
      setLoading(true);
      fetchUrl(newURL)
        .then(result => {
          return structureResults(result);
        })
        .then(data => {
          console.log(data)
          setData(data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error.message);
          setLoading(false);
        });
    }
  }

  const codes = data ? Object.keys(data.issueGroups) : [];

  return (
    <div className="App">
      <header>
        {/* logo placeholder */}
        <div className='header-content'>
          <strong>A11y Checker</strong>
        </div>
      </header>
      <main>
        <MainSearch handleSubmit={handleSubmit} />
        {loading && <div>Loading...</div>}
        {data && data.issueGroups && codes && (
          <div>
              {codes.map((code: string) => {
                const issue = data ? data.issueGroups[code] : null; 
                return issue ? <IssueBlock issue={issue} /> : null
              })}
          </div>
        )}
      </main>
    </div>
  );
}
