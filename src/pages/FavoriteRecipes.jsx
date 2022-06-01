import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../MyContext';
import '../styles/FavoriteRecipe.css';

const linkCopied = 'Link copied!';
export default function FavoriteRecipes() {
  const [favorite, setFavorite] = useState([]);
  const [showTag, setShowTag] = useState(false);
  const [justFood, setJustFood] = useState(false);
  const [justDrink, setJustDrink] = useState(false);
  const [allFavorite, setAllFavorite] = useState(true);
  const name = 'Favorite Recipes';

  useEffect(() => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorite(favoriteStorage);
  }, []);

  const { titleHandler } = useContext(MyContext);
  useEffect(() => {
    titleHandler(name);
  }, [titleHandler]);

  const copyHandler = (type, id) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setShowTag(true);
  };

  const setFoods = () => {
    setAllFavorite(false);
    setJustDrink(false);
    setJustFood(true);
  };

  const setDrinks = () => {
    setAllFavorite(false);
    setJustFood(false);
    setJustDrink(true);
  };

  const setAll = () => {
    setJustFood(false);
    setJustDrink(false);
    setAllFavorite(true);
  };

  function byDrink() {
    const arrayDrinks = favorite.filter((element) => element.type === 'drink');
    console.log('drink');
    return (
      arrayDrinks.map((element, index) => (
        <div className="favorite-card" key={ element.name }>
          <Link to={ `/${element.type}s/${element.id}` }>
            <div>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ element.image }
                alt={ element.name }
                className="favorite-image"
              />
              <div className="info-favorite">
                <h3 data-testid={ `${index}-horizontal-name` }>{ element.name }</h3>
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {element.category}
                </h3>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  Favorite
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => copyHandler(element.type, element.id) }
                >
                  Share
                </button>
                <p>{ showTag && linkCopied }</p>
              </div>
            </div>
          </Link>
        </div>
      ))
    );
  }

  function byFood() {
    const arrayFoods = favorite.filter((element) => element.type === 'food');
    return (
      arrayFoods.map((element, index) => (
        <div className="favorite-card" key={ element.id }>
          <Link to={ `/${element.type}s/${element.id}` }>
            <div>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ element.image }
                alt={ element.name }
                className="favorite-image"
              />
              <div className="info-favorite">
                <h3 data-testid={ `${index}-horizontal-name` }>{ element.name }</h3>
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {element.category}
                </h3>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  Favorite
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => copyHandler(element.type, element.id) }
                >
                  Share
                </button>
                <p>{ showTag && linkCopied }</p>
              </div>
            </div>
          </Link>
        </div>
      ))
    );
  }

  function All() {
    return (
      allFavorite && favorite ? favorite.map((element, index) => (
        <div className="favorite-card" key={ index }>
          <Link to={ `/${element.type}s/${element.id}` }>
            <div className="container">
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ element.image }
                alt={ element.name }
                className="favorite-image"
              />
              <div className="info-favorite">
                <h3 data-testid={ `${index}-horizontal-name` }>{ element.name }</h3>
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {element.category}
                </h3>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  &#128420;
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => copyHandler(element.type, element.id) }
                >
                  Share
                </button>
                <p>{ showTag && linkCopied }</p>
              </div>
            </div>
          </Link>
        </div>
      ))
        : ''
    );
  }

  return (
    <div>
      <Header />
      <div className="favorite-recipes">
        <div className="filter-buttons">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ setAll }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ setFoods }
          >
            By Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ setDrinks }
          >
            By Drink
          </button>
        </div>
        {justFood && allFavorite === false ? byFood() : ''}
        {justDrink && allFavorite === false ? byDrink() : ''}
        { allFavorite && justFood === false ? All() : '' }
      </div>
    </div>
  );
}
