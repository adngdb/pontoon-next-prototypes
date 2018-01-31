import { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { addSuggestion, updateSuggestion } from '../actions';
import { getTranslationsForLocale, getSuggestionsForLocale } from '../reducers';
import { getUID } from '../utils';
import EntitiesList from '../EntitiesList';
import TranslationForm from '../TranslationForm';


class TranslatePage extends Component {
    openEditor(entityId) {
        this.props.dispatch(selectEntity(entityId));
    }

    saveSuggestion(string) {
        const entityId = parseInt(this.props.match.params.entityId);
        const locale = this.props.status.currentLocale;

        const suggestion = this.props.suggestions.find(
            o => o.entity === entityId && o.locale === locale
        );

        if (suggestion) {
            this.props.dispatch(updateSuggestion(entityId, locale, string));
        }
        else {
            this.props.dispatch(addSuggestion(entityId, locale, string));
        }
    }

    renderTranslationForm() {
        const entityId = parseInt(this.props.match.params.entityId);

        const currentEntity = this.props.entities.find(
            o => o.id === entityId
        );

        const currentTranslation = this.props.suggestions.find(
            o => o.entity === entityId
        ) || this.props.translations.find(
            o => o.entity === entityId
        ) || {
            entity: entityId,
            locale: this.props.status.currentLocale,
            string: '',
        };

        return (<TranslationForm
            entity={ currentEntity }
            translation={ currentTranslation }
            saveTranslation={ this.saveSuggestion.bind(this) }
        />);
    }

    render() {
        return (
            <div>
                <section>
                    <h2>All strings</h2>
                    <EntitiesList
                        entities={ this.props.entities }
                        translations={ this.props.translations }
                        path='/translate'
                    ></EntitiesList>
                </section>
                <section>
                    <h2>Translate</h2>
                    <Route
                        path='/translate/:entityId'
                        render={ () => this.renderTranslationForm() }
                    />
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        status: state.status,
        entities: state.entities,
        translations: getTranslationsForLocale(state.translations, state.status.currentLocale),
        suggestions: getSuggestionsForLocale(state.suggestions, state.status.currentLocale),
    };
};

export default connect(mapStateToProps)(TranslatePage);
