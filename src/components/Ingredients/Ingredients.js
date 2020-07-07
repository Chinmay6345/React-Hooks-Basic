import React,{ useState,useEffect } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients=()=> {
  const [useringredients,SetIngredients]=useState(new Array());
useEffect(()=>{
    fetch('https://reacthooks-eb57d.firebaseio.com/ingredients.json')
    .then(response=>{
      return response.json()
    })
    .then(responseData=>{
      const loadedIngredients=[];
      for(let ing in responseData) {
        loadedIngredients.push({
          id:ing,
          title:responseData[ing].title,
          amount:responseData[ing].amount
        });
      }
      SetIngredients(loadedIngredients);
    });
},new Array())



const addIngredient=(ingredient)=>{
  fetch('https://reacthooks-eb57d.firebaseio.com/ingredients.json',{
    method:'POST',
    body:JSON.stringify(ingredient),
    headers:{'Content-Type':'application/json'}
  })
  .then(response=>{
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
