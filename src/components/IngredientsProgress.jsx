import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../MyContext';
import '../styles/ProgressRecipe.css';

export default function IngredientsProgress() {
  const { ingredientsProgress } = useContext(MyContext);
  const [progress, setProgress] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;
  const path = pathname.split('/')[1];
  const id = pathname.split('/')[2];

  const progressStorageObj = { cocktails: {}, meals: {} };

  // Esse useEffect tem a função de garantir que o localState mantenha a informação dos checkboxes marcados
  useEffect(() => {
    const storageTarget = path === 'foods' ? 'meals' : 'cocktails';
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress) {
      const teste = recipesInProgress[storageTarget][id];
      if (teste) {
        setProgress(teste);
      }
    }
  }, []);

  useEffect(() => {
    const storageTarget = path === 'foods' ? 'meals' : 'cocktails';

    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress) {
      const prevObj = recipesInProgress;
      const previousIds = prevObj[storageTarget];
      const test = { ...prevObj, [storageTarget]: { ...previousIds, [id]: progress } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(test));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressStorageObj));
    }
  }, [progress]);

  const ingredientsContent = () => {
    const ingredients = [];
    const measures = [];
    if (ingredientsProgress) {
      const NUMBER_OF_INGREDIENTS = 20;
      const recipe = ingredientsProgress[Object.keys(ingredientsProgress)][0];
      for (let i = 1; i <= NUMBER_OF_INGREDIENTS; i += 1) {
        if (recipe[`strIngredient${i}`]) {
          ingredients.push(recipe[`strIngredient${i}`]);
          measures.push(recipe[`strMeasure${i}`]);
        }
      }
    }

    const toggleChecked = ({ target }) => {
      if (target.checked === true) {
        target.parentNode.setAttribute('class', 'checked');
        setProgress([...progress, target.id]);
      } else {
        target.parentNode.classList.remove('checked');
        setProgress(progress.filter((checkbox) => checkbox !== target.id));
      }
    };

    const checkValidator = (index) => progress.includes(`checkbox${index}`);

    return (
      <ul>
        { ingredients.map((ingredient, index) => {
          const isChecked = checkValidator(index);
          // console.log(isChecked);
          return (
            <li
              id={ `ingredient-item-${ingredient}` }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className={ isChecked ? 'checked' : '' }
            >
              <input
                type="checkbox"
                id={ `checkbox${index}` }
                index={ index }
                onChange={ toggleChecked }
                defaultChecked={ isChecked }
              />
              { `${ingredient}: ${measures[index]}` }
            </li>
          );
        }) }
      </ul>
    );
  };

  return (
    <div>
      { ingredientsProgress && ingredientsContent() }
    </div>
  );
}
