import { Component } from 'react';

import Entity from './Entity';


export default class ReviewForm extends Component {
    approveSuggestion(event) {
        event.preventDefault();
        this.props.approveSuggestion(this.props.suggestion);
    }

    rejectSuggestion(event) {
        event.preventDefault();
        this.props.rejectSuggestion(this.props.suggestion);
    }

    render() {
        return (
            <form className='ReviewForm'>
                <p className='original-string'>
                    <span className='label'>Original: </span><br />
                    <Entity entity={ this.props.entity } />
                </p>
                <p className='suggestion'>
                    <span className='label'>Proposed translation: </span><br />
                    { this.props.suggestion ? this.props.suggestion.string : '' }
                </p>
                <p>
                    <button onClick={ this.approveSuggestion.bind(this) }>Approve</button>
                    <button onClick={ this.rejectSuggestion.bind(this) }>Reject</button>
                </p>
            </form>
        );
    }
}
