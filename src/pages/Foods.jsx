import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cards from '../components/Cards';
import FilterButton from '../components/FilterButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../MyContext';
import { searchFoods, searchCategory } from '../services/fetch';

export default function Foods() {
  const history = useHistory();
  const { setList, setArrayCategories } = useContext(MyContext);
  const name = 'Foods';

  const renderFirstList = async () => {
    const foodResults = await searchFoods('name', '');
    setList(foodResults.meals.slice(0, +'12'));
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
