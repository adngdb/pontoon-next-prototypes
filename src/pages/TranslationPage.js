import { Component } from 'react';
import { connect } from 'react-redux';

import { addComment, approveSuggestion, rejectSuggestion, selectEntity } from '../actions';
import { getEntitiesWithSuggestion, getSuggestionsForLocale } from '../reducers';

import CommentForm from '../CommentForm';
import CommentsList from '../CommentsList';
import EntitiesList from '../EntitiesList';
import ReviewForm from '../ReviewForm';


class TranslationPage extends Component {
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
                    <h2>Translation</h2>
                </section>
                <section>
                    <h2>Metadata</h2>
                </section>
                <section>
                    <h2>Comments</h2>
                    { this.renderComments() }
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        status: state.status,
        entities: state.entities,
        suggestions: state.suggestions,
        translations: state.translations,
    };
};

export default connect(mapStateToProps)(TranslationPage);
