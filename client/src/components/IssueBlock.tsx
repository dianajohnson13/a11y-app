import '../styles/IssueBlock.css';

import { IssueGroup } from '../App';
import { useState } from 'react';

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
                            <p>
                                {`We found ${instances.length - 1} more instance${instances.length > 2 ? 's' : ''} of this issue. `}
                                <button className='secondary-btn' onClick={() => setShowAll(true)}>Show all</button>
                            </p>
                        ) : null}
                    </>
                )}
            </div>
            <p className='issue-code'>{code}</p>
        </div>
    );
}