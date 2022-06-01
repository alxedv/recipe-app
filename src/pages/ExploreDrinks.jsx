import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../MyContext';
import { fetchRandom } from '../services/fetch';

export default function ExploreDrinks() {
  const name = 'Explore Drinks';
  const history = useHistory();

  const { titleHandler } = useContext(MyContext);

  const redirectRandom = async () => {
    const randomDrink = await fetchRandom('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    console.log(randomDrink);
    history.push(`/drinks/${randomDrink.drinks[0].idDrink}`);
  };

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
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ redirectRandom }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}
