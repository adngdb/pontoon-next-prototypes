import { Component } from 'react';
import { connect } from 'react-redux';

import { addSuggestion, selectEntity, updateSuggestion } from '../actions';
import { getTranslationsForLocale, getSuggestionsForLocale } from '../reducers';
import { getUID } from '../utils';
import EntitiesList from '../EntitiesList';
import TranslationForm from '../TranslationForm';


class TranslatePage extends Component {
    openEditor(entityId) {
        this.props.dispatch(selectEntity(entityId));
    }

    saveSuggestion(string) {
        const entity = this.props.status.selectedEntity;
        const locale = this.props.status.currentLocale;

        const suggestion = this.props.suggestions.find(
            o => o.entity === entity && o.locale === locale
        );

        console.log(string);

        if (suggestion) {
            this.props.dispatch(updateSuggestion(entity, locale, string));
        }
        else {
            this.props.dispatch(addSuggestion(entity, locale, string));
        }
    }

    render() {
        const currentTranslation = this.props.suggestions.find(
            o => o.entity === this.props.status.selectedEntity
        ) || this.props.translations.find(
            o => o.entity === this.props.status.selectedEntity
        ) || {
            entity: this.props.status.selectedEntity,
            locale: this.props.status.currentLocale,
            string: '',
        };

        const currentEntity = this.props.entities.find(
            o => o.id === this.props.status.selectedEntity
        );

        let translationForm = null;
        if (this.props.status.selectedEntity) {
            translationForm = <TranslationForm
                entity={ currentEntity }
                translation={ currentTranslation }
                saveTranslation={ this.saveSuggestion.bind(this) }
            />;
        }

        return (
            <div>
                <section>
                    <h2>All strings</h2>
                    <EntitiesList
                        entities={ this.props.entities }
                        translations={ this.props.translations }
                        onItemClick={ this.openEditor.bind(this) }
                    ></EntitiesList>
                </section>
                <section>
                    <h2>Translate</h2>
                    { translationForm }
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
