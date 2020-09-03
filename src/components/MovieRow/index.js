import React from 'react';
import './style.css';

const index = ({title, items}) => {
    return (
        <div>
            <h2>{title}</h2>
            <div className="movieRow--listarea">
                {items.results.length > 0 && items.results.map( (item, key) => (
                    <img key={key} src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} />
                ))}
            </div>
        </div>
    );
};

export default index;
