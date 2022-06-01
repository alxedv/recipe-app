import React, { useContext, useEffect } from 'react';
import MyContext from '../MyContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ByIngredients from '../components/ByIngredients';

export default function ExploreDrinkIngredients() {
  const name = 'Explore Ingredients';

  const { titleHandler } = useContext(MyContext);
  useEffect(() => {
    titleHandler(name);
  }, [titleHandler]);

  return (
    <div>
      <Header />
      <ByIngredients />
      <Footer />
    </div>
  );
}
