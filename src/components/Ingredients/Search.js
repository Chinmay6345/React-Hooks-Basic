import React,{useState,useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
const { onloadIngredients }=props;
const[enteredValue,SetEnteredValue]=useState('');

useEffect(()=>{
  const queryParams=enteredValue.length==0 ? '' : `?orderBy="title"&equalTo="${enteredValue}"`;
  fetch('https://reacthooks-eb57d.firebaseio.com/ingredients.json' + queryParams)
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
      onloadIngredients(loadedIngredients);
    });
},[enteredValue,onloadIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" 
                 onChange={ (event)=>{SetEnteredValue(event.target.value) }} 
                 value={enteredValue} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
