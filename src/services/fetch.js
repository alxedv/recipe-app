import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export async function searchFoods(foodOption, input) {
  switch (foodOption) {
  case 'ingredient': {
    const fetchByIngredient = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
      .then((response) => response.json());
    return fetchByIngredient;
  }
  case 'name': {
    const fetchByName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
      .then((response) => response.json());
    return fetchByName;
  }
  case 'firstLetter': {
    if (input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      break;
    }
    const fetchByFirstLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`)
      .then((response) => response.json());
    return fetchByFirstLetter;
  }
  case 'nationality': {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json());
    return result;
  }
  default:
    break;
  }
}

export async function searchDrinks(foodOption, input) {
  switch (foodOption) {
  case 'ingredient': {
    const fetchByIngredient = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`)
      .then((response) => response.json());
    return fetchByIngredient;
  }
  case 'name': {
    const fetchByName = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
      .then((response) => response.json());
    return fetchByName;
  }
  case 'firstLetter': {
    if (input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      break;
    }
    const fetchByFirstLetter = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`)
      .then((response) => response.json());
    return fetchByFirstLetter;
  }
  default:
    break;
  }
}

export async function searchCategory(url) {
  switch (url) {
  case '/foods': {
    const fetchByFirstLetter = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json());
    return fetchByFirstLetter;
  }
  case '/drinks': {
    const fetchByFirstLetter = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json());
    return fetchByFirstLetter;
  }
  default:
    break;
  }
}

export async function FilterByButton(category, url) {
  console.log(category);
  switch (url) {
  case 'foods': {
    console.log('comida');
    const fetchByF = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json());
    console.log(fetchByF);
    return fetchByF;
  }
  case 'drinks': {
    console.log('bebida');
    const fetchByFilterDrinks = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
    )
      .then((response) => response.json());
    return fetchByFilterDrinks;
  }
  default:
    break;
  }
}

export async function fetchDetails(id, category) {
  if (category === 'foods') {
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json());
    return result;
  }
  const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json());
  return result;
}

export async function fetchRecommended(category) {
  if (category === 'foods') {
    const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json());
    return result;
  }
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json());
  return result;
}

export async function fetchRandom(endpoint) {
  const randomMeal = await fetch(endpoint)
    .then((res) => res.json());
  return randomMeal;
}

export function createRecipe(details) {
  let objRecipe = {};
  const typeObj = Object.keys(details);
  if (typeObj.includes('meals')) {
    const obj = details.meals[0];
    objRecipe = {
      id: obj.idMeal,
      type: 'food',
      nationality: obj.strArea,
      category: obj.strCategory,
      alcoholicOrNot: '',
      name: obj.strMeal,
      image: obj.strMealThumb,
    };
  } else {
    const obj = details.drinks[0];
    objRecipe = {
      id: obj.idDrink,
      type: 'drink',
      nationality: '',
      category: obj.strCategory,
      alcoholicOrNot: obj.strAlcoholic,
      name: obj.strDrink,
      image: obj.strDrinkThumb,
    };
  }

  const arrayFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (arrayFavoritas) {
    const existe = arrayFavoritas.some((favorita) => favorita.id === objRecipe.id);
    const elementoARetirar = arrayFavoritas.find((aiai) => aiai.id === objRecipe.id);
    if (existe) {
      const indexARetirar = arrayFavoritas.indexOf(elementoARetirar);
      arrayFavoritas.splice(indexARetirar, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoritas));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...arrayFavoritas, objRecipe]));
    }
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      objRecipe]));
  }
}

export function alteraIcon(pathname, details) {
  let idVerified = '';
  if (pathname.includes('foods')) {
    console.log(details);
    idVerified = details.meals[0].idMeal;
  } else {
    idVerified = details.drinks[0].idDrink;
  }
  const arrayFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (arrayFavoritas) {
    const existe = arrayFavoritas.some((favorita) => favorita.id === idVerified);
    if (existe) {
      return (blackHeartIcon);
    }
    return (whiteHeartIcon);
  }
  return (whiteHeartIcon);
}

export const fetchByIngredient = async (path) => {
  if (path === 'foods') {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((response) => response.json());
    return result;
  } const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json());
  return result;
};

export const fetchCountries = async () => {
  const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json());
  return result;
};

export const fetchByNationality = async (country) => {
  const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    .then((response) => response.json());
  return result;
};
