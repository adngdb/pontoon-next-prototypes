import React from 'react';


const Entity = ({ entity }) => {
    if (!entity) {
        return <p></p>;
    }
    return (
        <span>{ entity.string }</span>
    );
}

export default Entity;
