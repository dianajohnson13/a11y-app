import '../styles/MainSearch.css';
import { FormEvent } from 'react';

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
      <form className='search-container' onSubmit={onSubmit}>
        <label htmlFor="urlInput">
          {"Enter a URL: "}
          <input id="urlInput" />
        </label>
        <button className='primary-btn' type="submit">Run Test</button>
      </form>
    )
}