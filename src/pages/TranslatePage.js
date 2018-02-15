import { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import {
    addSuggestion,
    createBranch,
    selectBranch,
    sendBranchForReview,
    updateSuggestion,
} from '../actions';
import {
    getTranslationsForLocale,
    getSuggestionsForBranch,
    getWorkingBranches,
} from '../reducers';
import { getUID } from '../utils';
import EntitiesList from '../EntitiesList';
import TranslationForm from '../TranslationForm';
import SaveButton from '../SaveButton';
import BranchWidget from '../BranchWidget';


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

    componentWillUnmount() {
        this.props.dispatch(selectBranch(undefined));
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

    sendBranchForReview = (event) => {
        this.props.dispatch(sendBranchForReview(this.props.status.currentBranch));
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
            <div className='Translate'>
                <header className='pure-u-1'>
                    <BranchWidget
                        branches={ branches }
                        currentBranch={ status.currentBranch }
                        selectBranch={ this.selectBranch }
                        createBranch={ this.createBranch }
                        sendBranchForReview={ this.sendBranchForReview }
                    />
                </header>
                <section className='pure-u-2-5'>
                    <h2>All strings</h2>
                    <EntitiesList
                        entities={ entities }
                        translations={ translations }
                        suggestions={ suggestions }
                        path='/translate'
                    ></EntitiesList>
                </section>
                <section className='pure-u-3-5'>
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
        branches: getWorkingBranches(state.branches),
        suggestions: getSuggestionsForBranch(state.branches, state.status.currentBranch),
    };
};

export default connect(mapStateToProps)(TranslatePage);
