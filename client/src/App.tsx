import './App.css';
import { useState, FormEvent } from 'react';

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

interface IssueGroup {
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

function App() {
let [ data, setData ] = useState<Data>();
let [ loading, setLoading ] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let newURL = (document.getElementById('urlInput') as HTMLInputElement).value;
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
        <form className='search-container' onSubmit={handleSubmit}>
          <label htmlFor="urlInput">
            {"Enter a URL: "}
            <input id="urlInput" />
          </label>
          <button className='primary-btn' type="submit">Run Test</button>
        </form>
        {loading && <div>Loading...</div>}


        {data && data.issueGroups && codes && (
          <div>
              {codes.map((code: string) => {
                const issue = data ? data.issueGroups[code] : null; 
                return issue ? (
                  <div className='issue' key={code}>
                    <p className='issue-message'>{issue.message}</p>
                    <p className='issue-content'>
                      <code>{issue.instances[0]}</code>
                    </p>
                    {issue.instances.length > 1 ? (
                        <p>
                          {`We found ${issue.instances.length - 1} more instance${issue.instances.length > 2 ? 's' : ''} of this issue. `}
                          <a>See all</a>
                        </p>
                      ) : null}
                    <p className='issue-code'>{code}</p>
                  </div>
                ) : null
              })}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
