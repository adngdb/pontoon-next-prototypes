import { Component } from 'react';
import { connect } from 'react-redux';

import { approveSuggestion, rejectSuggestion, selectEntity } from '../actions';
import { getEntitiesWithSuggestion, getSuggestionsForLocale } from '../reducers';

import EntitiesList from '../EntitiesList';
import ReviewForm from '../ReviewForm';


class ReviewPage extends Component {
    openSuggestion(entity) {
        this.props.dispatch(selectEntity(entity));
    }

    approveSuggestion(suggestion) {
        this.props.dispatch(approveSuggestion(suggestion));
    }

    rejectSuggestion(suggestion) {
        this.props.dispatch(rejectSuggestion(suggestion));
    }

    render() {
        const currentEntity = this.props.entities.find(
            o => o.id === this.props.status.selectedEntity
        );

        const currentSuggestion = this.props.suggestions.find(
            o => o.entity === this.props.status.selectedEntity
        );

        let reviewForm = null;
        if (currentSuggestion) {
            reviewForm = <ReviewForm
                entity={ currentEntity }
                suggestion={ currentSuggestion }
                approveSuggestion={ this.approveSuggestion.bind(this) }
                rejectSuggestion={ this.rejectSuggestion.bind(this) }
            />;
        }

        return (
            <div>
                <section>
                    <h2>All strings</h2>
                    <EntitiesList
                        entities={ this.props.entities }
                        translations={ this.props.suggestions }
                        onItemClick={ this.openSuggestion.bind(this) }
                    ></EntitiesList>
                </section>
                <section>
                    <h2>Review</h2>
                    { reviewForm }
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
