import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../MyContext';
import '../styles/Explore.css';
import food from '../assets/food.jpg';
import drink from '../assets/drink.png';

export default function Explore() {
  const name = 'Explore';
  const history = useHistory();

  const { titleHandler } = useContext(MyContext);
  useEffect(() => {
    titleHandler(name);
  }, []);

  return (
    <div className="main-explore">
      <Header />
      <div className="explore-btn">
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          <img className="food-image" src={ food } alt="" />
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          <img className="drink-image" src={ drink } alt="" />
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}
