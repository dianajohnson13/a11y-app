import './App.css';
import { useState, FormEvent } from 'react';

const fetchUrl = async (newURL: string) => {
  const resp = await fetch(`/api/test?url=${newURL}`);
  return resp.json();
}

function App() {
let [ data, setData ] = useState<any>();
let [ loading, setLoading ] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let newURL = (document.getElementById('urlInput') as HTMLInputElement).value;
    if (newURL === "") { // handle invalid URL too
      // show error message under input
    } else {
      fetchUrl(newURL)
        .then(data => {
          console.log(data)
          setData(data);
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

      </main>
    </div>
  );
}

export default App;
