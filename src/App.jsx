import { Component } from 'react';
import './App.css';

import EntitiesList from './EntitiesList';
import TranslationForm from './TranslationForm';


export default class App extends Component {
    state = {
        name: 'next',
        selectedEntity: null,
        currentLocale: 'fr',
        locales: [
            'fr',
            'kg',
        ],
        entities: [
            {
                id: 1,
                string: 'hello',
            },
            {
                id: 2,
                string: 'world',
            },
        ],
        translations: [
            {
                locale: 'fr',
                entity: 1,
                string: 'bonjour',
            },
        ],
    };

    openEditor(entityId) {
        this.setState({
            selectedEntity: entityId,
        });
    }

    saveTranslation(entity, locale, translation) {
        const translationId = this.state.translations.findIndex(
            o => o.entity === entity && o.locale === locale
        );
        let newTranslations = this.state.translations;

        if (translationId === -1) {
            newTranslations = [
                ...this.state.translations,
                {
                    entity,
                    locale,
                    string: translation,
                },
            ]
        }
        else {
            newTranslations[translationId] = Object.assign(
                {},
                newTranslations[translationId],
                {string: translation}
            );
        }
        this.setState({
            translations: newTranslations,
        });
    }

    render() {
        const currentEntity = this.state.entities.find(
            o => o.id === this.state.selectedEntity
        );
        const currentTranslation = this.state.translations.find(
            o => o.entity === this.state.selectedEntity && o.locale === this.state.currentLocale
        ) || {
            entity: this.state.selectedEntity,
            locale: this.state.currentLocale,
            string: '',
        };

        let translationForm = null;
        if (currentEntity) {
            translationForm = <TranslationForm
                entity={ currentEntity }
                translation={ currentTranslation }
                saveTranslation={ this.saveTranslation.bind(this) }
            />;
        }

        return (
            <div className="App">
                <section>
                    <h2>All strings</h2>
                    <EntitiesList
                        entities={ this.state.entities }
                        translations={ this.state.translations.filter(o => o.locale === this.state.currentLocale) }
                        onItemClick={ entity => this.openEditor(entity) }
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
