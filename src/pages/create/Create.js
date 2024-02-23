import { useState, useRef } from 'react';
import {useHistory} from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore';

//styles
import './Create.css';

const Create = () => {
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const ingredientInput = useRef(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();

            const data = {title, method, cookingTime: cookingTime + ' minutes', ingredients}
            const newRecipeRef = doc(collection(db, 'recipes'));
            await setDoc(newRecipeRef, data);
            history.push('/')

        } catch (err) {
            console.log(err);
        }
        
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const ing = newIngredient.trim();

        if(ing && !ingredients.includes(ing)){
            setIngredients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredient('')
        ingredientInput.current.focus();
    }

  return (
    <div className='create'>
        <h2 className='page-title'>Add a New Recipe</h2>

        <form onSubmit={handleSubmit}>
            <label>
                <span>Recipe title:</span>
                <input 
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                />
            </label>

            <label>
                <span>Recipe ingredients:</span>
                <div className='ingredients'>
                    <input 
                        type='text'
                        onChange={(e) => setNewIngredient(e.target.value)}
                        value = {newIngredient}
                        ref = {ingredientInput}
                    />
                    <button onClick = {handleAdd} className='btn'>Add</button>
                </div>
            </label>
            <p>Current ingredients: {ingredients.map((ing) => <em key={ing}>{ing}, </em>)}</p>

            <label>
                <span>Recipe method:</span>
                <textarea 
                    onChange={(e) => setMethod(e.target.value)}
                    value={method}
                    required
                />
            </label>

            <label>
                <span>Cooking time (minutes):</span>
                <input 
                    type='number'
                    onChange={(e) => setCookingTime(e.target.value)}
                    value={cookingTime}
                    required
                />
            </label>

            <button className='btn'>submit</button>

        </form>
    </div>
  )
}

export default Create