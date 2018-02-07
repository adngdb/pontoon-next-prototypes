import { Component } from 'react';

import Editor from './Editor';
import Entity from './Entity';


export default class TranslationForm extends Component {
    state = {
        translation: '',
    }

    componentDidMount() {
        this.setTranslation(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setTranslation(nextProps);
    }

    setTranslation(props) {
        let translation = '';
        if (props.translation) {
            translation = props.translation.string;
        }

        this.setState({
            translation,
        });
    }

    updateTranslation = (event) => {
        const target = event.target;

        this.setState({
            translation: target.value,
        });
    }

    saveTranslation = () => {
        this.props.saveTranslation(this.state.translation);
    }

    render() {
        const { renderActionButton, entity } = this.props;

        return (
            <form>
                <p>
                    <span className='original'>Original: </span>
                    <Entity entity={ entity } />
                </p>
                <p>
                    <Editor
                        translation={ this.state.translation }
                        updateTranslation={ this.updateTranslation }
                    />
                </p>
                <p>
                    { renderActionButton(this.saveTranslation) }
                </p>
            </form>
        );
    }
}
