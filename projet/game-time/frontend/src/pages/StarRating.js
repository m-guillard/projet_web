// Composant StarRating à ajouter dans un nouveau fichier StarRating.js
import React from 'react';

const StarRating = ({ rating }) => {
  // Convertir la note de 0-100 en 0-5
  const starRating = rating ? (rating / 20) : 0;
  
  // Créer un tableau de 5 étoiles
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    // Déterminer le remplissage de chaque étoile (pleine, demie, ou vide)
    let starClass = "star empty";
    
    if (i <= Math.floor(starRating)) {
      starClass = "star full";
    } else if (i - 0.5 <= starRating) {
      starClass = "star half";
    }
    
    stars.push(
      <span key={i} className={starClass}>
        {starClass === "star full" && "★"}
        {starClass === "star half" && "★"}
        {starClass === "star empty" && "☆"}
      </span>
    );
  }
  
  return (
    <div className="star-rating">
      {stars}
      <span className="rating-number">({Math.round(rating) / 10}/10)</span>
    </div>
  );
};

export default StarRating;