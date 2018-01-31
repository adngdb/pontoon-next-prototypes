import { Component } from 'react';
import { connect } from 'react-redux';

import { addComment, approveSuggestion, rejectSuggestion, selectEntity } from '../actions';
import { getEntitiesWithSuggestion, getSuggestionsForLocale } from '../reducers';

import CommentForm from '../CommentForm';
import CommentsList from '../CommentsList';
import EntitiesList from '../EntitiesList';
import ReviewForm from '../ReviewForm';


class ReviewPage extends Component {
    addComment(comment) {
        const currentSuggestion = this.props.suggestions.find(
            o => o.entity === this.props.status.selectedEntity
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

    openSuggestion(entity) {
        this.props.dispatch(selectEntity(entity));
    }

    approveSuggestion(suggestion) {
        this.props.dispatch(approveSuggestion(suggestion));
    }

    rejectSuggestion(suggestion) {
        this.props.dispatch(rejectSuggestion(suggestion));
    }

    renderReviewForm() {
        const currentSuggestion = this.props.suggestions.find(
            o => o.entity === this.props.status.selectedEntity
        );

        if (!currentSuggestion) {
            return null;
        }

        const currentEntity = this.props.entities.find(
            o => o.id === this.props.status.selectedEntity
        );

        return <ReviewForm
            entity={ currentEntity }
            suggestion={ currentSuggestion }
            approveSuggestion={ this.approveSuggestion.bind(this) }
            rejectSuggestion={ this.rejectSuggestion.bind(this) }
        />;
    }

    renderComments() {
        const currentSuggestion = this.props.suggestions.find(
            o => o.entity === this.props.status.selectedEntity
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
                        onItemClick={ this.openSuggestion.bind(this) }
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
