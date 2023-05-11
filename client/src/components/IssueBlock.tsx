import '../styles/IssueBlock.css';

import { IssueGroup } from '../App';

interface Props {
    issue: IssueGroup
}

export default function IssueBlock({
    issue: {
        code,
        message,
        instances
    }
}: Props) {

    return (
        <div className='issue' key={code}>
            <p className='issue-message'>{message}</p>
            <p className='issue-content'>
            <code>{instances[0]}</code>
            </p>
            {instances.length > 1 ? (
                <p key={code}>
                    {`We found ${instances.length - 1} more instance${instances.length > 2 ? 's' : ''} of this  `}
                    <a>See all</a>
                    </p>
            ) : null}
            <p className='issue-code'>{code}</p>
        </div>
    );
}