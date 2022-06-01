import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../MyContext';
import '../styles/Recipes.css';
import IngredientsProgress from '../components/IngredientsProgress';
import { fetchDetails } from '../services/fetch';
import shareIcon from '../images/shareIcon.svg';

export default function ProcessRecipe() {
  const { ingredientsProgressHandler } = useContext(MyContext);
  const [details, setDetails] = useState();
  const history = useHistory();
  const { pathname } = history.location;
  useEffect(() => {
    const path = pathname.includes('foods') ? 'foods' : 'drinks';
    const arrayId = pathname.split('/');
    const id = arrayId[arrayId.length - 2];
    (async () => {
      const result = await fetchDetails(id, path);
      setDetails(result);
      ingredientsProgressHandler(result);
    })();
  }, []);

  const copyHandler = () => {
    console.log(pathname);
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    global.alert('Link copied!');
  };

  const mealContent = () => {
    if (details) {
      const { meals } = details;
      const infos = meals[0];
      const {
        strMealThumb,
        strMeal,
        strCategory,
        strInstructions,
        strYoutube,
      } = infos;

      return (
        <div className="recipe-details">
          <div className="details-name">
            <h3 data-testid="recipe-title">
              { strMeal }
            </h3>
          </div>
          <div>
            <img
              src={ strMealThumb }
              alt="Recipe"
              data-testid="recipe-photo"
              id="recipe-image"
              className="details-image"
            />
          </div>
          <div className="recipe-info">
            <button
              type="button"
              data-testid="share-btn"
              onClick={ copyHandler }
              className="share-button"
            >
              <img src={ shareIcon } alt="share button" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              className="favorite-button"
            >
              Favoritar
            </button>
            <p data-testid="recipe-category">
              { strCategory }
            </p>
            <h3>Ingredientes</h3>
            <IngredientsProgress />
            <p data-testid="instructions">
              { strInstructions }
            </p>
            <div className="empty">
              <iframe // https://github.com/tryber/sd-016-b-project-recipes-app/pull/315/commits/9436856721a27b22c91209e1e5f49b7f99a7a7f4]
                title="Youtube Player"
                data-testid="video"
                width="340"
                frameBorder="0"
                src={ strYoutube.replace('watch?v=', 'embed/') }
              />
            </div>
          </div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="start-recipe"
          >
            Finalizar receita
          </button>
        </div>
      );
    }
  };

  const drinkContent = () => {
    if (details) {
      const { drinks } = details;
      const infos = drinks[0];
      const {
        strDrinkThumb,
        strDrink,
        strInstructions,
        strAlcoholic,
      } = infos;

      return (
        <div className="recipe-details">
          <div className="details-name">
            <h3 data-testid="recipe-title">
              { strDrink }
            </h3>
          </div>
          <div>
            <img
              src={ strDrinkThumb }
              alt="Recipe"
              data-testid="recipe-photo"
              id="recipe-image"
              className="details-image"
            />
          </div>
          <div className="recipe-info">
            <button
              type="button"
              data-testid="share-btn"
              onClick={ copyHandler }
              className="share-button"
            >
              <img src={ shareIcon } alt="share button" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              className="favorite-button"
            >
              Favoritar
            </button>
            <p data-testid="recipe-category">
              { strAlcoholic }
            </p>
            <h3>Ingredientes</h3>
            <IngredientsProgress />
            <p data-testid="instructions">
              { strInstructions }
            </p>
            <div className="teste">
              teste
            </div>
          </div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="start-recipe"
          >
            Finalizar receita
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      { pathname.includes('foods') ? mealContent() : drinkContent() }
    </div>
  );
}
