import { Component } from 'react';
import { connect } from 'react-redux';

import { selectEntity } from '../actions';
import { getTranslationsForLocale } from '../reducers';
import EntitiesList from '../EntitiesList';
import TranslationForm from '../TranslationForm';


class ReviewPage extends Component {

    render() {
        const currentTranslation = this.props.translations.find(
            o => o.entity === this.props.status.selectedEntity
        ) || {
            entity: this.props.status.selectedEntity,
            locale: this.props.status.currentLocale,
            string: '',
        };

        let translationForm = null;
        if (this.props.status.selectedEntity) {
            translationForm = <TranslationForm
                entity={ this.props.status.selectedEntity }
                translation={ currentTranslation }
                saveTranslation={ this.saveTranslation.bind(this) }
            />;
        }

        return (
            <div>
                <section>
                    <h2>All strings</h2>
                    <EntitiesList
                        entities={ this.props.entities }
                        translations={ this.props.translations }
                    ></EntitiesList>
                </section>
                <section>
                    <h2>Review</h2>
                    <p>Here come the things to review!</p>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        status: state.status,
        entities: state.entities,
        translations: getTranslationsForLocale(state.translations, state.status.currentLocale),
    };
};

export default connect(mapStateToProps)(ReviewPage);
