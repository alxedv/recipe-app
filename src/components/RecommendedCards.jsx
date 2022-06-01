import React, { useContext } from 'react';
import MyContext from '../MyContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Recommended.css';

export default function RecommendedCards() {
  const { recommended } = useContext(MyContext);
  const recommendedContent = recommended[Object.keys(recommended)[0]];
  const MAX_ITEMS = 6;

  return (
    <div id="recommended-container" className="cards">
      {
        recommendedContent
          .slice(0, MAX_ITEMS)
          .map((recipe, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
              className="card-recipe"
            >
              <img
                className="recipe-image"
                src={
                  Object.prototype.hasOwnProperty.call(recipe, 'idMeal') // https://stackoverflow.com/questions/39282873/how-do-i-access-the-object-prototype-method-in-the-following-logic
                    ? recipe.strMealThumb
                    : recipe.strDrinkThumb
                }
                alt="recipe"
              />
              <h3
                className="recipe-name"
                data-testid={ `${index}-recomendation-title` }
              >
                {
                  Object.prototype.hasOwnProperty.call(recipe, 'idMeal')
                    ? recipe.strMeal
                    : recipe.strDrink
                }
              </h3>
            </div>
          ))
      }
    </div>
  );
}
