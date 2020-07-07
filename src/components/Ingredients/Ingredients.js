import React,{ useState,useEffect,useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients=()=> {
const [useringredients,SetIngredients]=useState(new Array());
const[isLoading,SetLoading]=useState(false);
const addIngredient=(ingredient)=>{
  SetLoading(true);
  fetch('https://reacthooks-eb57d.firebaseio.com/ingredients.json',{
    method:'POST',
    body:JSON.stringify(ingredient),
    headers:{'Content-Type':'application/json'}
  })
  .then(response=>{
    SetLoading(false);
      return response.json()
  })
  .then(responseData=>{
        SetIngredients(prevIngredient=>[
          ...prevIngredient,
          { id: responseData.name,...ingredient }
        ]);
  });
}
const removeIngredient=(ingredientId)=>{
  SetLoading(true);
  fetch(`https://reacthooks-eb57d.firebaseio.com/ingredients/${ingredientId}.json`,{
    method:'DELETE'
  })
  .then(response=>{
    SetLoading(false);
        SetIngredients(ing=>ing.filter((ingredient=>ingredient.id !==ingredientId)));
  });
}

const searchIngredients=useCallback((ingredient)=>{
  SetIngredients(ingredient);
},new Array());

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredient} loading={isLoading} />

      <section>
        <Search onloadIngredients={searchIngredients} />
        <IngredientList ingredients={useringredients} onRemoveItem={ removeIngredient }/>
      </section>
    </div>
  );
}

export default Ingredients;
