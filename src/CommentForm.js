import { Component } from 'react';


export default class CommentForm extends Component {
    state = {
        visible: false,
        comment: '',
    }

    updateComment = (event) => {
        const target = event.target;

        this.setState({
            comment: target.value,
        });
    }

    addComment = (event) => {
        event.preventDefault();
        this.props.addComment(this.state.comment);
        this.setState({
            visible: false,
            comment: '',
        });
    }

    toggleCommentForm = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    renderBasicForm() {
        return (
            <div className='pure-u-1'>
                <input
                    placeholder='Reply…'
                    onFocus={ this.toggleCommentForm }
                    className='pure-input-1'
                />
            </div>
        );
    }

    renderCancelButton() {
        if (this.props.alwaysVisible) {
            return null;
        }
        return <button className='pure-button' onClick={ this.toggleCommentForm }>Cancel</button>;
    }

    renderCommentForm() {
        return (<div className='pure-u-1'>
            <div>
                <textarea
                    name='comment'
                    onChange={ this.updateComment }
                    value={ this.state.comment }
                    placeholder='Leave a comment'
                    autoFocus='on'
                    className='pure-input-1'
                />
            </div>
            <div className='controls'>
                { this.renderCancelButton() }
                <button className='pure-button pure-button-primary' onClick={ this.addComment }>Comment</button>
            </div>
        </div>);
    }

    render() {
        const { alwaysVisible } = this.props;
        return (
            <form className='pure-form pure-g CommentForm'>
                { (alwaysVisible || this.state.visible) ? this.renderCommentForm() : this.renderBasicForm() }
            </form>
        );
    }
}
