import React,{ useState } from 'react';
import LoadingIndicator from '../UI/LoadingIndicator';
import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [title,SetTitle]=useState('');
  const [amount,SetAmount]=useState('');
  const submitHandler =(event) => {
    event.preventDefault();
    props.onAddIngredient({title:title,amount:amount});
  };
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" name="title" 
                   value={ title } onChange={event=>{SetTitle(event.target.value)}}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" name="amount" 
                   value={amount} onChange={event=>{SetAmount(event.target.value)}}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading ? <LoadingIndicator />:null }
          </div>
        </form>
      </Card>
    </section>
  );
});
export default IngredientForm;
