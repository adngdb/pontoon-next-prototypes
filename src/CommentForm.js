import { Component } from 'react';


export default class CommentForm extends Component {
    state = {
        comment: '',
    }

    updateComment(event) {
        const target = event.target;

        this.setState({
            comment: target.value,
        });
    }

    addComment(event) {
        event.preventDefault();
        this.props.addComment(this.state.comment);
        this.setState({
            comment: '',
        });
    }

    render() {
        return (
            <form className='CommentForm'>
                <p>
                    <textarea
                        name='comment'
                        onChange={ this.updateComment.bind(this) }
                        value={ this.state.comment }
                        placeholder='Add a comment'
                    />
                </p>
                <p>
                    <button onClick={ this.addComment.bind(this) }>Comment</button>
                </p>
            </form>
        );
    }
}
