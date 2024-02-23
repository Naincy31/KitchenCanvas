import {Link} from 'react-router-dom';
import './RecipeList.css';
import { useTheme } from '../hooks/useTheme';
import Trashcan from '../assets/trashcan.svg';
import { db } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

const RecipeList = ({recipes}) => {
  const {mode} = useTheme();

  if(recipes.length === 0){
    return <div className='error'>No recipes to load...</div>
  }

  const handleClick = async (id) => {
    try{
      await deleteDoc(doc(db, 'recipes', id));
    } catch (err) {
      console.log(`Document could not be deleted successfully ${err.message}`);
    }
    
  }

  return (
    <div className='recipe-list'>
        {recipes.map((recipe) => (
            <div key={recipe.id} className={`card ${mode}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make.</p>
                <div>{recipe.method.substring(0, 100)}...</div>
                <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
                <img
                  className='delete'
                  src={Trashcan}
                  onClick={() => handleClick(recipe.id)}
                  alt="Trash Can"
                />
            </div>
        ))}
    </div>
  )
}

export default RecipeList