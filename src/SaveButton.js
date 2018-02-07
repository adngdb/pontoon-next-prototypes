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

        let label = 'Suggest';

        if (!currentBranch) {
            label = 'Create Branch';
        }
        else if (hasExistingSuggestion) {
            label = 'Update';
        }

        return <button onClick={ this.onClick }>{ label }</button>;
    }
}
