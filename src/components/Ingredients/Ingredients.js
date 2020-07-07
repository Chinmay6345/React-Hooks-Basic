import React,{ useState } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {

const [useringredients,SetIngredients]=useState(new Array());

const addIngredient=(ingredient)=>{
  SetIngredients(prevIngredient=>[
    ...prevIngredient,
    {
      id: Math.random.toString,...ingredient
    }
  ]);
}
const removeIngredient=(ingredientId)=>{
  SetIngredients(prevIngredient=>prevIngredient.filter((ingredient)=>ingredient.id !==ingredientId));
}
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredient} />

      <section>
        <Search />
        <IngredientList ingredients={useringredients} onRemoveItem={ removeIngredient }/>
      </section>
    </div>
  );
}

export default Ingredients;
