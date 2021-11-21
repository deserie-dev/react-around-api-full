import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main (props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

    <section className="profile">
        
      <div className="profile__avatar">
        <img className="profile__image" src={currentUser.avatar} alt="Avatar" />
        <button className="profile__image-edit" onClick={props.onEditAvatarClick}></button>
      </div>

      <div className="profile__content">
        <div className="profile__details">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" aria-label="edit button" className="profile__edit" onClick={props.onEditProfileClick}></button>
        </div>
        <p className="profile__occupation">{currentUser.about}</p>
      </div>
      <button className="profile__add" type="button" aria-label="add button" onClick={props.onAddPlaceClick}></button>
    </section>

    <section className="elements">
      <ul className="elements__container">
        {props.cards.map((card) => {
          return (
            <Card 
              key={card._id} 
              card={card}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}  
              onCardDelete={props.onCardDelete}
            />
          )
        })} 
      </ul>  
    </section>
    </main>
  )
}

export default Main;