import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    addBranchComment,
} from '../actions';
import { getBranchesToReview } from '../reducers';

import CommentForm from '../CommentForm';
import CommentsList from '../CommentsList';


class ReviewsListPage extends React.Component {
    renderNoBranches() {
        return <p className='info'>Nothing left to review. Good job! </p>;
    }

    renderBranches() {
        const { branches } = this.props;

        return (<ul>
            { branches.map((branch, index) => this.renderBranch(branch, index)) }
        </ul>);
    }

    renderBranch(branch, index) {
        return (<li key={ index }>
            <h4><Link to={ `/review/${branch.id}` }>{ branch.name }</Link></h4>
            <p>#{ branch.id } opened by Author - { branch.suggestions.length } strings</p>
        </li>);
    }

    render() {
        const { branches } = this.props;
        return (
            <div className='Reviews'>
                <h2>Review requests</h2>
                { branches.length ? this.renderBranches() : this.renderNoBranches() }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        branches: getBranchesToReview(state.branches),
    };
};

export default connect(mapStateToProps)(ReviewsListPage);
