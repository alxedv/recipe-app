import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cards from '../components/Cards';
import FilterButton from '../components/FilterButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../MyContext';
import { searchCategory, searchDrinks } from '../services/fetch';

export default function Drinks() {
  const history = useHistory();
  const name = 'Drinks';
  const { setList, setArrayCategories } = useContext(MyContext);

  const renderFirstList = async () => {
    const drinksResult = await searchDrinks('name', '');
    setList(drinksResult.drinks.slice(0, +'12'));
  };

  const searchCat = async () => {
    setArrayCategories(await searchCategory(history.location.pathname));
  };

  useEffect(() => {
    renderFirstList();
    searchCat();
  }, []);

  const { titleHandler } = useContext(MyContext);
  useEffect(() => {
    titleHandler(name);
  }, [titleHandler]);

  return (
    <div>
      <Header />
      <FilterButton />
      <Cards />
      <Footer />
    </div>
  );
}
