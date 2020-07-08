import React,{ useState,useCallback,useReducer,useMemo } from 'react';
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
const httpReducer=(state,action)=>{
  switch(action.type){
    case 'SEND': 
              return { loading:true,error:null };
    case 'RESPONSE':
              return { ...state,loading:false };
    case 'ERROR':
              return { loading:false, error:action.errorMessage };
    case 'CLEAR':
               return { ...state, error:null };
    default:throw new Error();
  }
}

const Ingredients=()=> {
const[useringredients,dispatch]=useReducer(ingredientsReducer,[]);
const[httpState,dispatchHttp]=useReducer(httpReducer,{ loading:false,error:null });

//const [useringredients,SetIngredients]=useState(new Array());
//const[isLoading,SetLoading]=useState(false);
//const[error,SetError]=useState();


const addIngredient=useCallback((ingredient)=>{
  //SetLoading(true);
  dispatchHttp({type:'SEND'});
  fetch('https://reacthooks-eb57d.firebaseio.com/ingredients.json',{
    method:'POST',
    body:JSON.stringify(ingredient),
    headers:{'Content-Type':'application/json'}
  })
  .then(response=>{
    dispatchHttp({type:'RESPONSE'});
    //SetLoading(false);
      return response.json()
  })
  .then(responseData=>{
        // SetIngredients(prevIngredient=>[
        //   ...prevIngredient,
        //   { id: responseData.name,...ingredient }
        // ]);
        dispatch({type:'ADD',ingredient:{ id: responseData.name,...ingredient }})
  }).catch(error=>{
    //SetError(error.message);
    dispatchHttp({type:'ERROR', loading:false, errorMessage:'SOMETHING WENT WRONG' });
  });;
},[]);
const removeIngredientHandler= useCallback((ingredientId)=>{
  //SetLoading(true);
  dispatchHttp({type:'SEND'});
  fetch(`https://reacthooks-eb57d.firebaseio.com/ingredients/${ingredientId}.json`,{
    method:'DELETE'
  })
  .then(response=>{
    //SetLoading(false);
    dispatchHttp({type:'RESPONSE'});
       // SetIngredients(ing=>ing.filter((ingredient=>ingredient.id !==ingredientId)));
       dispatch({type:'DELETE',id:ingredientId});
  })
  .catch(error=>{
    //SetError(error.message);
    dispatchHttp({type:'ERROR', loading:false, errorMessage:'SOMETHING WENT WRONG' });
  });
},[]);

const filteredIngredientsHandler=useCallback((filteredIngredients)=>{
  //SetIngredients(ingredient);
  dispatch({type:'SET',ingredients:filteredIngredients});
},[]);

const clearError=useCallback(()=>{
  //SetError(null);
  dispatchHttp({type:'CLEAR'});
  //SetLoading(false);
},[]);

const ingredientlist=useMemo(()=>{
  return (
    <IngredientList ingredients={useringredients} onRemoveItem={ removeIngredientHandler }/>
  )
},[useringredients,removeIngredientHandler])

  return (
    <div className="App">
      {
        httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      }
      <IngredientForm onAddIngredient={addIngredient} loading={httpState.loading} />

      <section>
        <Search onloadIngredients={filteredIngredientsHandler} />
        {
          ingredientlist
        }
      </section>
    </div>
  );
}

export default Ingredients;
