import React, { useContext, useState } from 'react';
import MyContext from '../MyContext';
import { FilterByButton, searchDrinks, searchFoods } from '../services/fetch';
import '../styles/CategoryBar.css';

export default function FilterButton() {
  const { arrayCategories, setList, componentTitle } = useContext(MyContext);
  const [filtroValor, setfiltroValor] = useState('');

  const urlLocal = componentTitle.toLowerCase();

  let foodCategories = '';

  if (urlLocal === 'foods') {
    foodCategories = 'meals';
  } else if (urlLocal === 'drinks') {
    foodCategories = 'drinks';
  }

  const buttonFilter = async ({ target }) => {
    let drinksResult = '';
    if (target.value === filtroValor) {
      if (urlLocal === 'foods') {
        drinksResult = await searchFoods('name', '');
      } else {
        drinksResult = await searchDrinks('name', '');
      }
      setList(drinksResult[foodCategories].slice(0, +'12'));
      setfiltroValor('');
    } else {
      setfiltroValor(target.value);
      const listWithCateg = await FilterByButton(target.value, urlLocal);
      setList(listWithCateg[foodCategories].slice(0, +'12'));
    }
  };

  return (
    <div className="categoryBar">
      <button
        type="button"
        data-testid="All-category-filter"
        value={ filtroValor }
        onClick={ (evt) => buttonFilter(evt) }
      >
        All
      </button>
      {
        (arrayCategories[foodCategories])
          ? arrayCategories[foodCategories].slice(0, +'5').map((acc, index) => (
            <button
              key={ index }
              type="button"
              value={ acc.strCategory }
              data-testid={ `${acc.strCategory}-category-filter` }
              onClick={ (evt) => buttonFilter(evt) }
            >
              {acc.strCategory}
            </button>
          ))
          : ''
      }
    </div>
  );
}
