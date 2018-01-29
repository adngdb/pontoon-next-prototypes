import React from 'react';


const Entity = ({ entity }) => {
    if (!entity) {
        return <span></span>;
    }
    return (
        <span>{ entity.string }</span>
    );
}

export default Entity;
