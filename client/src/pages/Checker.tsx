import { useState } from 'react';

import MainSearch from '../components/MainSearch';
import IssueBlock from '../components/IssueBlock';
import type { IssueGroup } from '../types/issues';

interface Data {
  issueGroups: {
    [code: string]: IssueGroup
  },
  documentTitle: string,
  pageUrl: string
}

const fetchUrl = async (newURL: string) => {
  const resp = await fetch(`/api/a11y/test?url=${newURL}`);
  return resp.json();
}

export default function Checker() {
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
    <>
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
      </>
  );
}
