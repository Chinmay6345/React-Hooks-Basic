import React,{ useState,useCallback,useReducer } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientsReducer=(state,action)=>{
  switch(action.type){
    case 'ADD': 
              return [...state,action.ingredient];
    case 'SET':
              return action.ingredients;
    case 'DELETE':
              return state.filter(ing=>ing.id!==action.id);
    default: throw new Error();    
  }
}
const Ingredients=()=> {
const[useringredients,dispatch]=useReducer(ingredientsReducer,[]);
//const [useringredients,SetIngredients]=useState(new Array());
const[isLoading,SetLoading]=useState(false);
const[error,SetError]=useState();
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
        // SetIngredients(prevIngredient=>[
        //   ...prevIngredient,
        //   { id: responseData.name,...ingredient }
        // ]);
        dispatch({type:'ADD',ingredient:{ id: responseData.name,...ingredient }})
  }).catch(error=>{
    SetError(error.message);
  });;
}
const removeIngredient=(ingredientId)=>{
  SetLoading(true);
  fetch(`https://reacthooks-eb57d.firebaseio.com/ingredients/${ingredientId}.json`,{
    method:'DELETE'
  })
  .then(response=>{
    SetLoading(false);
       // SetIngredients(ing=>ing.filter((ingredient=>ingredient.id !==ingredientId)));
       dispatch({type:'DELETE',id:ingredientId});
  })
  .catch(error=>{
    SetError(error.message);
  });
}

const filteredIngredientsHandler=useCallback((filteredIngredients)=>{
  //SetIngredients(ingredient);
  dispatch({type:'SET',ingredients:filteredIngredients});
},[]);

const clearError=()=>{
  SetError(null);
  SetLoading(false);
}

  return (
    <div className="App">
      {
        error && <ErrorModal onClose={clearError}>error</ErrorModal>
      }
      <IngredientForm onAddIngredient={addIngredient} loading={isLoading} />

      <section>
        <Search onloadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={useringredients} onRemoveItem={ removeIngredient }/>
      </section>
    </div>
  );
}

export default Ingredients;
