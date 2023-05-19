import '../styles/MainSearch.css';
import { FormEvent } from 'react';

import Search from '../assets/search.svg';

interface Props {
    handleSubmit: (newURL: string) => void
}

export default function MainSearch({
    handleSubmit
}: Props) {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        let newURL = (document.getElementById('urlInput') as HTMLInputElement).value;
        handleSubmit(newURL);
    }

    return (
      <form onSubmit={onSubmit}>
        <div className='search-container'>
          <input id="urlInput" aria-label="Enter a URL" placeholder="Enter a URL" />
          <button type="submit">
            <img src={Search}/>
          </button>
        </div>
      </form>
    )
}