import { HashLink } from 'react-router-hash-link';
import '../../styles/filters.css'

const EditionAZ = () => {
    const indices = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const tabs = indices.split('');

    return (
        <div className="a-z-wrapper">
            {tabs.map(index => <HashLink key={index} to={`#${index}`}>{index}</HashLink>)}
        </div>
    )
}

export default EditionAZ