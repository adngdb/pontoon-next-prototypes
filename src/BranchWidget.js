import React from 'react';
import { Link } from 'react-router-dom';

import BranchSelector from './BranchSelector';


export default class BranchWidget extends React.Component {
    handleCreateBranch = (event) => {
        event.preventDefault();
        this.props.createBranch();
    }

    handleSendBranchForReview = (event) => {
        event.preventDefault();
        this.props.sendBranchForReview();
    }

    renderReviewButton() {
        const { branches, currentBranch } = this.props;
        const branch = branches.find(o => o.id === currentBranch);

        if (!branch || !branch.suggestions.length) {
            return null;
        }

        if (branch.open) {
            return (
                <Link to={ `/review/${branch.id}` } className='pure-button pure-button-primary'>
                    See Review
                </Link>
            );
        }

        return (
            <button
                className='pure-button pure-button-primary'
                onClick={ this.handleSendBranchForReview }
            >
                Send for review
            </button>
        );
    }
    render() {
        const {
            branches,
            currentBranch,
            selectBranch,
        } = this.props;

        return (
            <form className='pure-form'>
                Current branch:{' '}
                <BranchSelector
                    branches={ branches }
                    currentBranch={ currentBranch }
                    selectBranch={ selectBranch }
                />
                {' '}
                <button
                    className='pure-button'
                    onClick={ this.handleCreateBranch }
                    title='Create Branch'
                >
                    +
                </button>
                {' '}
                { this.renderReviewButton() }
            </form>
        );
    }
}
