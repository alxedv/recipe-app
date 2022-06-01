import React, { useContext } from 'react';
import MyContext from '../MyContext';

export default function IngredientsList() {
  const { details } = useContext(MyContext);
  // console.log(details);

  const ingredientsContent = () => {
    const ingredients = [];
    const measures = [];
    const NUMBER_OF_INGREDIENTS = 20;
    const recipe = details[Object.keys(details)][0];
    for (let i = 1; i <= NUMBER_OF_INGREDIENTS; i += 1) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(recipe[`strIngredient${i}`]);
        measures.push(recipe[`strMeasure${i}`]);
        // setArrayIngredients(ingredients);
        // setArrayMeasure(measures);
      }
    }

    return (
      <ul>
        { ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
            className="ingredient-item"
          >
            { `${ingredient}: ${measures[index]}` }
          </li>
        )) }
      </ul>
    );
  };

  return (
    <div>
      { details && ingredientsContent() }
    </div>
  );
}
