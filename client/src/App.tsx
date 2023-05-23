import './App.css';
import { useState } from 'react';

import MainSearch from './components/MainSearch';
import IssueBlock from './components/IssueBlock';

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
  const resp = await fetch(`/a11y/test?url=${newURL}`);
  return resp.json();
}

export default function App() {
const [ data, setData ] = useState<Data>();
const [ loading, setLoading ] = useState<boolean>(false);

  const handleSubmit = (newURL: string): void => {
    if (newURL === "") { // handle invalid URL too
      // show error message under input
    } else {
      setLoading(true);
      fetchUrl(newURL)
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error.message);
          setLoading(false);
        });
    }
  }

  const codes = data && data.issueGroups ? Object.keys(data.issueGroups) : [];

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
                return issue ? <IssueBlock key={code} issue={issue} /> : null
              })}
          </div>
        )}
      </main>
    </div>
  );
}
