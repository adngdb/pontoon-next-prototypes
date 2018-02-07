import React from 'react';
import { Link } from 'react-router-dom';


export default class EntitiesList extends React.Component {
    renderEntity(entity, index) {
        const { translations, suggestions, path } = this.props;
        if (path === '/') {
            path = '';
        }

        let translationElt = null;
        let className = '';

        const translation = translations.find(o => o.entity === entity.id);
        if (translation) {
            translationElt = <span className='translation'>{ translation.string }</span>;
            className = 'approved';
        }

        const suggestion = suggestions.find(o => o.entity === entity.id);
        if (suggestion) {
            translationElt = <span className='translation'>{ suggestion.string }</span>;
            className = 'suggested';
        }

        return (
            <li key={ index } className={ className }>
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
    }

    render() {
        const { entities } = this.props;

        return (
            <ul className='EntitiesList'>
                { entities.map((entity, i) => this.renderEntity(entity, i)) }
            </ul>
        );
    }
}
