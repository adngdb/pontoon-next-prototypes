import { Component } from 'react';
import { connect } from 'react-redux';

import { addComment, approveSuggestion, rejectSuggestion } from '../actions';
import { getEntitiesWithSuggestion, getSuggestionsForLocale } from '../reducers';

import CommentForm from '../CommentForm';
import CommentsList from '../CommentsList';
import EntitiesList from '../EntitiesList';
import ReviewForm from '../ReviewForm';


class ReviewPage extends Component {
    addComment(comment) {
        const entityId = parseInt(this.props.match.params.entityId);
        const currentSuggestion = this.props.suggestions.find(
            o => o.entity === entityId
        );

        if (!currentSuggestion) {
            return;
        }

        this.props.dispatch(addComment(
            currentSuggestion.entity,
            currentSuggestion.locale,
            comment
        ));
    }

    approveSuggestion(suggestion) {
        this.props.dispatch(approveSuggestion(suggestion));
    }

    rejectSuggestion(suggestion) {
        this.props.dispatch(rejectSuggestion(suggestion));
    }

    renderReviewForm() {
        const entityId = parseInt(this.props.match.params.entityId);

        const currentSuggestion = this.props.suggestions.find(
            o => o.entity === entityId
        );

        if (!currentSuggestion) {
            return null;
        }

        const currentEntity = this.props.entities.find(
            o => o.id === entityId
        );

        return <ReviewForm
            entity={ currentEntity }
            suggestion={ currentSuggestion }
            approveSuggestion={ this.approveSuggestion.bind(this) }
            rejectSuggestion={ this.rejectSuggestion.bind(this) }
        />;
    }

    renderComments() {
        const entityId = parseInt(this.props.match.params.entityId);
        const currentSuggestion = this.props.suggestions.find(
            o => o.entity === entityId
        );

        if (!currentSuggestion) {
            return null;
        }

        return (<section>
            <h3>Comments</h3>
            <CommentsList comments={ currentSuggestion.comments } />
            <CommentForm addComment={ this.addComment.bind(this) } />
        </section>);
    }

    render() {
        return (
            <div>
                <section>
                    <h2>Pending suggestions</h2>
                    <EntitiesList
                        entities={ this.props.entities }
                        translations={ this.props.suggestions }
                        path='/review'
                    ></EntitiesList>
                </section>
                <section>
                    <h2>Review</h2>
                    { this.renderReviewForm() }
                    { this.renderComments() }
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        status: state.status,
        entities: getEntitiesWithSuggestion(
            state.entities, state.status.currentLocale, state.suggestions
        ),
        suggestions: getSuggestionsForLocale(
            state.suggestions, state.status.currentLocale
        ),
    };
};

export default connect(mapStateToProps)(ReviewPage);
