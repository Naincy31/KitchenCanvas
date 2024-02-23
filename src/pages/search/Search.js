import {useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
//styles
import './Search.css';
import RecipeList from '../../components/RecipeList';

const Search = () => {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const q = queryParams.get('q').toLowerCase();
    console.log(q);

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
      const getSearchedRecipes = async () => {
        setIsPending(true);

        const queryRef = collection(db, 'recipes');
        const snapshot = await getDocs(queryRef);
        console.log(snapshot);
        if (snapshot.empty){
          setError(`Could not find the recipe containing ${q}`);
          setIsPending(false);
          setData(null);
        } else {
          console.log(snapshot);
          let results = [];
          snapshot.forEach((doc) => {
            if(doc.data().title.toLowerCase().includes(q))
            results.push({ id: doc.id, ...doc.data()})
          })
          setData(results)
          setIsPending(false);
        }
      }

      getSearchedRecipes();
    }, [q])

  return (
    <div>
        <h2 className='page-title'>Recipes including "{q}"</h2>
        {error && <p className='error'>{error}</p>}
        {isPending && <p className='loading'>Loading...</p>}
        {data && <RecipeList recipes={data} />}
    </div>
  )
}

export default Search