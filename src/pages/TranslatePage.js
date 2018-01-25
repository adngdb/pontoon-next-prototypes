import { Component } from 'react';
import { connect } from 'react-redux';

import { addTranslation, selectEntity, updateTranslation } from '../actions';
import { getTranslationsForLocale } from '../reducers';
import EntitiesList from '../EntitiesList';
import TranslationForm from '../TranslationForm';


class TranslatePage extends Component {

    openEditor(entityId) {
        this.props.dispatch(selectEntity(entityId));
    }

    saveTranslation(string) {
        const entity = this.props.status.selectedEntity;
        const locale = this.props.status.currentLocale;

        const translation = this.props.translations.find(
            o => o.entity === entity && o.locale === locale
        );

        if (translation) {
            this.props.dispatch(updateTranslation(entity, locale, string));
        }
        else {
            this.props.dispatch(addTranslation(entity, locale, string));
        }
    }

    render() {
        const currentTranslation = this.props.translations.find(
            o => o.entity === this.props.status.selectedEntity
        ) || {
            entity: this.props.status.selectedEntity,
            locale: this.props.status.currentLocale,
            string: '',
        };

        let translationForm = null;
        if (this.props.status.selectedEntity) {
            translationForm = <TranslationForm
                entity={ this.props.status.selectedEntity }
                translation={ currentTranslation }
                saveTranslation={ this.saveTranslation.bind(this) }
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
    };
};

export default connect(mapStateToProps)(TranslatePage);
