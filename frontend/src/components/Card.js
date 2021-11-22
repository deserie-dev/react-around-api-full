import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__like ${
    isLiked ? 'elements__like_active' : 'elements__like'
  }`);

  const isUserCard = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`elements__delete-button ${
    isUserCard ? 'elements__delete-button' : 'elements__delete-button_hidden'
  }`);

  
  
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
        <button className={cardDeleteButtonClassName} type="button" aria-label="trash button" onClick={handleDeleteClick}></button>
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