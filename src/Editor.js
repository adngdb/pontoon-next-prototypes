import { Component } from 'react';


export default class Editor extends Component {
    render() {
        return (
            <textarea
                className='Editor'
                name='content'
                onChange={ this.props.updateTranslation }
                value={ this.props.translation }
            />
        );
    }
}
