import React from 'react';


export default class BranchSelector extends React.Component {
    handleChange = (event) => {
        event.preventDefault();

        const branchId = (event.target.value === '') ? '' : parseInt(event.target.value);
        this.props.selectBranch(branchId);
    }

    render() {
        const { branches, currentBranch } = this.props;

        return (<select value={ currentBranch } onChange={ this.handleChange }>
            <option value=''></option>
            { branches.map(
                (branch, i) => <option value={ branch.id } key={ i }>{ branch.name }</option>
            ) }
        </select>);
    }
}
