import { Link } from 'react-router-dom';

const EditionAZ = () => {
    const indices = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const tabs = indices.split('');

    return (
        <div className="a-z-wrapper">
            {tabs.map(index => <Link to={`#${index}`}>{index}</Link>)}
        </div>
    )
}

export default EditionAZ