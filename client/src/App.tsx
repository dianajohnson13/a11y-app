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

const fetchUrl = async (newURL: string) => {
  const resp = await fetch(`/api/test?url=${newURL}`);
  return resp.json();
}

function App() {
let [ data, setData ] = useState<Result>();
let [ loading, setLoading ] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let newURL = (document.getElementById('urlInput') as HTMLInputElement).value;
    if (newURL === "") { // handle invalid URL too
      // show error message under input
    } else {
      setLoading(true);
      fetchUrl(newURL)
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error.message);
          setLoading(false);
        });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="urlInput">
            {"Enter a URL: "}
            <input id="urlInput" />
          </label>
          <button type="submit">Run Test</button>
        </form>
        {loading && <div>Loading...</div>}


        {data && (
          <div>
              {data.results.issues.map((issue: ResultIssue, idx: number) => {
                return (
                  <div key={idx}>
                    <p>{issue.message}</p>
                    <p>{issue.context}</p>
                    <p>{issue.code}</p>
                  </div>
                )
              })}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
