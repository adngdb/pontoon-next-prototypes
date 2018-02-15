import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    addBranchComment,
    addTranslationComment,
    approveSuggestion,
    closeBranch,
    mergeBranch,
    rejectSuggestion
} from '../actions';
import { getEntitiesWithSuggestion, getSuggestionsForLocale } from '../reducers';

import CommentForm from '../CommentForm';
import CommentsList from '../CommentsList';
import EntitiesList from '../EntitiesList';
import ReviewForm from '../ReviewForm';


class ReviewPage extends Component {
    get currentBranch() {
        const { branches, match } = this.props;
        const branchId = parseInt(match.params.branchId);
        return branches.find(o => o.id === branchId);
    }

    handleReject = event => {
        event.preventDefault();
        const { dispatch } = this.props;

        dispatch(closeBranch(this.currentBranch.id));
    }

    handleMerge = event => {
        event.preventDefault();
        const { dispatch } = this.props;

        dispatch(mergeBranch(this.currentBranch));
    }

    addTranslationComment(entityId, comment) {
        const { dispatch } = this.props;

        const currentBranch = this.currentBranch;
        const currentSuggestion = currentBranch.suggestions.find(
            o => o.entity === entityId
        );

        if (!currentSuggestion) {
            return;
        }

        dispatch(addTranslationComment(
            currentBranch.id,
            currentSuggestion.entity,
            currentSuggestion.locale,
            comment
        ));
    }

    addBranchComment(comment) {
        const { dispatch } = this.props;
        const currentBranch = this.currentBranch;

        dispatch(addBranchComment(
            currentBranch.id,
            comment
        ));
    }

    renderCommentForm(addComment, alwaysVisible) {
        if (!this.currentBranch.open) {
            return null;
        }

        return <CommentForm addComment={ addComment } alwaysVisible={ alwaysVisible } />
    }

    renderComments(comments, addComment, alwaysVisible) {
        return (<section className='comments'>
            <CommentsList comments={ comments } />
            { this.renderCommentForm(addComment, alwaysVisible) }
        </section>);
    }

    renderSuggestion(suggestion, index) {
        const { entities, translations } = this.props;
        const original = entities.find(o => o.id === suggestion.entity);
        const approved = translations.find(o => o.entity === suggestion.entity);

        const currentTranslation = approved ? approved.string : '';

        return (<div className='suggestion' key={ index }>
            <section className='diff'>
                <p className='original'>{ original.string }</p>
                <p className='approved'>{ currentTranslation }</p>
                <p className='suggested'>{ suggestion.string }</p>
            </section>
            { this.renderComments(
                suggestion.comments,
                comment => this.addTranslationComment(
                    suggestion.entity,
                    comment
                )
            ) }
        </div>);
    }

    renderReviewCommands() {
        const branch = this.currentBranch;

        if (branch.merged) {
            return <p>This branch has been merged.</p>;
        }

        if (!branch.open) {
            return <p>This branch is not ready for review yet.</p>;
        }

        return (
            <form className='pure-form'>
                <button onClick={ this.handleReject } className='pure-button pure-button-secundary'>
                    Reject request
                </button>
                {' '}
                <button onClick={ this.handleMerge } className='pure-button pure-button-primary'>
                    Merge strings
                </button>
            </form>
        );
    }

    render() {
        const branch = this.currentBranch;

        return (
            <section className='Review'>
                <header>
                    <h2>{ branch.name }</h2>
                    <p>
                        <img src={ branch.avatar } className='avatar' alt='avatar' />
                        <b>{ branch.user }</b> wants to update { branch.suggestions.length } strings
                    </p>
                </header>
                { branch.suggestions.map((item, i) => this.renderSuggestion(item, i)) }
                <footer>
                    <h2>Review changes</h2>
                    <div className='review-commands'>
                        { this.renderReviewCommands() }
                    </div>
                    { this.renderComments(
                        branch.comments,
                        comment => this.addBranchComment(comment),
                        true
                    ) }
                </footer>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        status: state.status,
        entities: state.entities,
        translations: state.translations,
        branches: state.branches,
    };
};

export default connect(mapStateToProps)(ReviewPage);
