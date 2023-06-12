import { useState } from 'react';

import '../styles/IssueBlock.css';
import type { IssueGroup } from '../types/issues';


// TO DO: Move parseIssueCode and generateTechniqueUrl to backend
function parseIssueCode(code: string) {
    // Example: ...
    const snippets = code.split('.');

    return {
        successCriterion: snippets[3].replaceAll("_", "."),
        techniques: snippets[4].split(',')
    }
}

function generateTechniqueUrl(id: string): string {
    id = id.toUpperCase();
    return (id.includes('ARIA'))
        ? `https://www.w3.org/WAI/WCAG21/Techniques/aria/${id}`
        : `https://www.w3.org/WAI/WCAG21/Techniques/html/${id}.html`;
}

interface Instance {
    context: string,
    selector: string
}

interface Props {
    issue: IssueGroup
}

function Instance({context, selector}: Instance): JSX.Element {
    return (
        <div className='issue-instance'>
            <p className='instance-selector'>{selector}</p>
            <p className='instance-context'>
                <code>{context}</code>
            </p>
        </div>
    );
}

export default function IssueBlock({
    issue: {
        code,
        message,
        instances
    }
}: Props) {
    const [showAll, setShowAll] = useState<boolean>(false)

    const {techniques} = parseIssueCode(code);

    return (
        <div className='issue' key={code}>
            <p className='issue-message'>{message}</p>
            <div className='issue-instance-list'>
                {showAll ? (
                    <>
                        {instances.map(({context, selector}: Instance) => (
                            <Instance
                                context={context}
                                selector={selector}
                                key={context}
                            />
                        ))}
                        <button className='secondary-btn' onClick={() => setShowAll(false)}>Show less</button>
                    </>
                ) : (
                    <>
                        <Instance context={instances[0].context} selector={instances[0].selector} />
                        {instances.length > 1 ? (
                            <p className='issue-instance-count'>
                                {`We found ${instances.length - 1} instance${instances.length > 2 ? 's' : ''} similar to this issue. `}
                                <button className='secondary-btn' onClick={() => setShowAll(true)}>Show all</button>
                            </p>
                        ) : null}
                    </>
                )}
            </div>
            <div>
                <h3>Relates to</h3>
                <ul>
                     {/* TO DO: add link to guideline */}
                    {/* <li>
                        <a href="#" target="_blank">
                            {`Guideline ${successCriterion}`}
                        </a>
                    </li> */}
                    {techniques.map(id => (
                        <li key={id}>
                            <a
                                href={generateTechniqueUrl(id)}
                                target="_blank"
                            >
                                {`Technique ${id}`}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <p className='issue-code'>{code}</p>
        </div>
    );
}