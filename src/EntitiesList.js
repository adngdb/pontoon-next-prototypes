import React from 'react';
import { Link } from 'react-router-dom';


const EntitiesList = ({ entities, translations, path }) => {
    if (path === '/') {
        path = '';
    }

    let results = entities.map((entity, i) => {
        const translation = translations.find(o => o.entity === entity.id);
        let translationElt = null;
        if (translation) {
            translationElt = <span className='translation'>{ translation.string }</span>;
        }
        return (
            <li key={i}>
                <p>
                    <Link to={ `${path}/${entity.id}` }>
                        { entity.string }
                    </Link>
                </p>
                <p>
                    <Link to={ `${path}/${entity.id}` }>
                        { translationElt }
                    </Link>
                </p>
            </li>
        );
    });
    return (
        <ul className='EntitiesList'>
            {results}
        </ul>
    );
}

export default EntitiesList;
