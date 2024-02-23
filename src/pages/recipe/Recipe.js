import {useParams} from 'react-router-dom';
import { db } from '../../firebase/config';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

//styles
import './Recipe.css';
import { useTheme } from '../../hooks/useTheme';
import { useEffect, useState } from 'react';

const Recipe = () => {
    const {id} = useParams();
    const {mode} = useTheme();

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getRecipeData = async () => {
            setIsPending(true);

            const docRef = doc(db, 'recipes', id);
            const unsubscribe = await onSnapshot(docRef, (snapshot) => {
              if (snapshot.exists()) {
                setData(snapshot.data());
                setIsPending(false);
              } else {
                setError('Could not find that recipe');
                setIsPending(false);
              }
            });

            return () => unsubscribe();
          } 
        getRecipeData();
    }, [id])

  const handleUpdate = async () => {
    const docRef = doc(db, 'recipes', id);
    await updateDoc(docRef, {
      title: "Updated Title"
    });
  }

  return (
    <div className={`recipe ${mode}`}>
        {isPending && <p className='loading'>Loading...</p>}
        {error && <p className='error'>{error}</p>}
        {data && (
            <>
                <h2 className='page-title'>{data.title}</h2>
                <p>Takes {data.cookingTime} to cook.</p>
                <ul>
                    {data.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                </ul>
                <p className='method'>{data.method}</p>
                <button onClick={() => handleUpdate()}>Update</button>
            </>
        )}
    </div>
  )
}

export default Recipe