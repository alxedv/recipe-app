import React, { useEffect, useState, useContext } from 'react';
import '../styles/ByIngredients.css';
import { useHistory } from 'react-router-dom';
import MyContext from '../MyContext';
import { searchFoods, searchDrinks, fetchByIngredient } from '../services/fetch';

const MAX_ITEMS = 12;

export default function ByIngredients() {
  const [stateIngredients, setStateIngredients] = useState([]);
  const {
    setList,
    setIngredientHandler,
    searchResults,
    setSearchResults,
  } = useContext(MyContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  const path = pathname.split('/')[2];
  const category = path === 'foods' ? 'meals' : 'drinks';

  async function submitHandler(foodOption, input) {
    switch (path) {
    case 'foods': {
      const foodResults = await searchFoods(foodOption, input);
      setSearchResults(foodResults);
      break;
    }
    case 'drinks': {
      const drinksResult = await searchDrinks(foodOption, input);
      setSearchResults(drinksResult);
      break;
    }
    default:
      break;
    }
  }

  useEffect(() => {
    (async () => {
      const ingredients = await fetchByIngredient(path);
      setStateIngredients(ingredients[category]);
    })();

    if (searchResults) {
      const key = Object.keys(searchResults)[0];
      if (searchResults[key] && searchResults[key].length === 1) {
        const key2 = Object.keys(searchResults)[0];
        const key3 = Object.values(searchResults[key2][0])[0];
        history.push(`${pathname}/${key3}`);
        setSearchResults('');
      } else if (searchResults[key] && searchResults[key].length > 1) {
        setIngredientHandler(Object.values(searchResults)[0]);
      } else {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  }, [searchResults, history, setList]);

  async function onClickIngredient(ingredient) {
    await submitHandler('ingredient', ingredient);
    history.push(`/${path}`);
  }

  function foodIngredients() {
    return (
      <div className="ByIngredients">
        {
          stateIngredients.slice(0, MAX_ITEMS).map((element, index) => (
            <div
              key={ element.strIngredient }
              data-testid={ `${index}-ingredient-card` }
              className="ingredient-card"
              onClick={ () => onClickIngredient(element.strIngredient) }
              onKeyPress={ () => {} }
              role="button"
              tabIndex={ 0 }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${element.strIngredient}-Small.png` }
                alt="Ingredient"
                data-testid={ `${index}-card-img` }
              />
              <h3
                data-testid={ `${index}-card-name` }
              >
                {element.strIngredient}
              </h3>
            </div>
          ))
        }
      </div>
    );
  }

  function drinkIngredient() {
    return (
      <div className="ByIngredients">
        {
          stateIngredients.slice(0, MAX_ITEMS).map((element, index) => (
            <div
              key={ element.strIngredient1 }
              data-testid={ `${index}-ingredient-card` }
              className="ingredient-card"
              onClick={ () => onClickIngredient(element.strIngredient1) }
              onKeyPress={ () => {} }
              role="button"
              tabIndex={ 0 }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${element.strIngredient1}-Small.png` }
                alt="Ingredient"
                data-testid={ `${index}-card-img` }
              />
              <h3
                data-testid={ `${index}-card-name` }
              >
                {element.strIngredient1}
              </h3>
            </div>
          ))
        }
      </div>
    );
  }

  return path === 'foods' ? foodIngredients() : drinkIngredient();
}
