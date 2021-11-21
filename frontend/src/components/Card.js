import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const isUserCard = props.card.owner === currentUser._id;
  const visibilityState = isUserCard ? "visible" : "hidden";

  const cardLikeButtonClassName = `elements__like ${
    isLiked ? 'elements__like_active' : ''
  }`;
  
  function handleClick() {
    props.onCardClick(props.card);
  }  

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return(
    <li className="elements__item">
      <img className="elements__image" alt={props.card.name} src={props.card.link} onClick={handleClick} />
        <button className="elements__delete-button" style={{ visibility: visibilityState }} type="button" aria-label="trash button" onClick={handleDeleteClick}></button>
        <div className="elements__heading">
          <h2 className="elements__title">{props.card.name}</h2>
          <div className="elements__like-container">
            <button className={cardLikeButtonClassName} type="button" aria-label="like button" onClick={handleLikeClick}></button>
            <p className="elements__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;