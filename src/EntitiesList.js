import React from 'react';


const EntitiesList = ({ entities, translations, onItemClick }) => {
    console.log(translations);
    let results = entities.map((entity, i) => {
        const translation = translations.find(o => o.entity === entity.id);
        let translationElt = null;
        if (translation) {
            translationElt = <span className='translation'>{ translation.string }</span>;
        }
        return (
            <li onClick={() => onItemClick(entity.id)} key={i}>
                { entity.string }
                { translationElt }
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
