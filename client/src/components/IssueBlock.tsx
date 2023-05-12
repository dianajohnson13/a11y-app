import '../styles/IssueBlock.css';

import { IssueGroup } from '../App';
import { useState } from 'react';

interface Props {
    issue: IssueGroup
}

function Instance({instance}: {instance: string}) {
    return (
        <p className='issue-instance'>
            <code>{instance}</code>
        </p>
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
                        {instances.map(instance => (
                            <Instance instance={instance} key={instance} />
                        ))}
                        <button className='secondary-btn' onClick={() => setShowAll(false)}>Show less</button>
                    </>
                ) : (
                    <>
                        <Instance instance={instances[0]} />
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