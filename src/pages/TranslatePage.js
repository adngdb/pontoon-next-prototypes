import { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import {
    addSuggestion,
    createBranch,
    selectBranch,
    updateSuggestion,
} from '../actions';
import { getTranslationsForLocale, getSuggestionsForBranch } from '../reducers';
import { getUID } from '../utils';
import EntitiesList from '../EntitiesList';
import TranslationForm from '../TranslationForm';
import SaveButton from '../SaveButton';
import BranchSelector from '../BranchSelector';


class TranslatePage extends Component {
    get entityId() {
        return parseInt(this.props.match.params.entityId);
    }

    get currentEntity() {
        return this.props.entities.find(
            o => o.id === this.entityId
        );
    }

    get currentTranslation() {
        return this.props.suggestions.find(
            o => o.entity === this.entityId
        ) || this.props.translations.find(
            o => o.entity === this.entityId
        ) || {
            entity: this.entityId,
            locale: this.props.status.currentLocale,
            string: '',
        };
    }

    get hasExistingSuggestion() {
        return !!this.props.suggestions.find(o => o.entity === this.entityId);
    }

    createBranch = () => {
        const uid = getUID();
        this.props.dispatch(createBranch(uid, `branch ${uid}`));
        this.props.dispatch(selectBranch(uid));
    }

    selectBranch = (branchId) => {
        this.props.dispatch(selectBranch(branchId));
    }

    saveSuggestion = (string) => {
        const locale = this.props.status.currentLocale;
        const branch = this.props.status.currentBranch;

        const suggestion = this.props.suggestions.find(
            o => o.entity === this.entityId && o.locale === locale
        );

        if (suggestion) {
            this.props.dispatch(updateSuggestion(this.entityId, locale, branch, string));
        }
        else {
            this.props.dispatch(addSuggestion(this.entityId, locale, branch, string));
        }
    }

    renderTranslationForm = () => {
        const renderActionButton = (saveTranslation) => <SaveButton
            saveTranslation={ saveTranslation }
            createBranch={ this.createBranch }
            currentBranch={ this.props.status.currentBranch }
            hasExistingSuggestion={ this.hasExistingSuggestion }
        />;

        return (<TranslationForm
            entity={ this.currentEntity }
            translation={ this.currentTranslation }
            saveTranslation={ this.saveSuggestion }
            renderActionButton={ renderActionButton }
        />);
    }

    render() {
        const { branches, entities, translations, suggestions, status } = this.props;

        return (
            <div>
                <header>
                    Change branch:{' '}
                    <BranchSelector
                        branches={ branches }
                        currentBranch={ status.currentBranch }
                        selectBranch={ this.selectBranch }
                    />
                    {' or '}
                    <button onClick={ this.createBranch }>Create Branch</button>
                </header>
                <section>
                    <h2>All strings</h2>
                    <EntitiesList
                        entities={ entities }
                        translations={ translations }
                        suggestions={ suggestions }
                        path='/translate'
                    ></EntitiesList>
                </section>
                <section>
                    <h2>Translate</h2>
                    <Route
                        path='/translate/:entityId'
                        render={ this.renderTranslationForm }
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
        branches: state.branches,
        suggestions: getSuggestionsForBranch(state.branches, state.status.currentBranch),
    };
};

export default connect(mapStateToProps)(TranslatePage);
