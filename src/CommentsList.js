import React from 'react';
import moment from 'moment';


export default class CommentsList extends React.Component {
    state = {
        date: new Date(),
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.updateDates(),
            5000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateDates() {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        return (
            <ul className='CommentsList'>
                {this.props.comments.map((comment, i) => (
                    <li key={i}>
                        <p>
                            <img src={ comment.avatar } className='avatar' alt='avatar' />
                            <span>{ comment.user }</span>{' '}
                            <time dateTime={ comment.created_at.toISOString() }>
                                { moment(comment.created_at).fromNow() }
                            </time>
                        </p>
                        <p>
                            { comment.comment }
                        </p>
                    </li>
                ))}
            </ul>
        );
    }
}
