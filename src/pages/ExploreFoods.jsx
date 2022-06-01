import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../MyContext';
import { fetchRandom } from '../services/fetch';
import '../styles/ExploreFoods.css';

export default function ExploreFoods() {
  const name = 'Explore Foods';
  const history = useHistory();

  const redirectRandomMeal = async () => {
    const randomMeal = await fetchRandom('https://www.themealdb.com/api/json/v1/1/random.php');
    console.log(randomMeal);
    history.push(`/foods/${randomMeal.meals[0].idMeal}`);
  };

  const { titleHandler } = useContext(MyContext);
  useEffect(() => {
    titleHandler(name);
  }, [titleHandler]);

  return (
    <div>
      <Header />
      <div className="explorefoods-btn">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ redirectRandomMeal }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}
