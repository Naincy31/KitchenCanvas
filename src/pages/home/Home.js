import { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList';
import { db } from '../../firebase/config';
import { QuerySnapshot, collection, getDocs, onSnapshot } from 'firebase/firestore';

//styles
import './Home.css';

const Home = () => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getRecipesData = async () => {
      setIsPending(true);

      const ref = collection(db, 'recipes');
      const unsubscribe = await onSnapshot(ref, (snapshot) => {
        if (snapshot.empty) {
          setError('No recipes to load');
          setIsPending(false);
          setData(null)
        } else {
          let results = [];
          snapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data()})
          })
          setData(results)
          setIsPending(false);
        }
      }, (error) => {
        setError(error.message);
        setIsPending(false);
      });

      return () => unsubscribe();
      
    }
    getRecipesData();
  }, [])
    
  return (
    <div className='home'>
        {error && <p className='error'>{error}</p>}
        {isPending && <p className='loading'>Loading...</p>}
        {data && <RecipeList recipes = {data} />}
    </div>
  )
}

export default Home