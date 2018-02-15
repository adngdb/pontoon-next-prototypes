import React from 'react';


export default class SaveButton extends React.Component {
    onClick = (event) => {
        event.preventDefault();

        const { saveTranslation, createBranch, currentBranch } = this.props;

        if (!currentBranch) {
            createBranch();
        }
        else {
            saveTranslation();
        }
    }

    render() {
        const { currentBranch, hasExistingSuggestion } = this.props;

        let title = 'Save new suggestion';
        let label = 'Save';

        if (!currentBranch) {
            label = 'Create Branch';
            title = 'Create a new branch to start translating';
        }
        else if (hasExistingSuggestion) {
            label = 'Update';
            title = 'Update current suggestion';
        }

        return (
            <button className='pure-button' title={ title } onClick={ this.onClick }>
                { label }
            </button>
        );
    }
}
