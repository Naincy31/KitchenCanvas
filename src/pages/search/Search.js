import {useLocation} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
//styles
import './Search.css';
import RecipeList from '../../components/RecipeList';

const Search = () => {
    const queryString = useLocation().search
    console.log(queryString);
    const queryParams = new URLSearchParams(queryString)
    console.log(queryParams);
    const query = queryParams.get('q')
    console.log(query);

    const url = `http://localhost:3000/recipes?recipe.title=${query}`;
    const {error, isPending, data} = useFetch(url)
    console.log(data);

  return (
    <div>
        <h2 className='page-title'>Recipes including "{query}"</h2>
        {error && <p className='error'>{error}</p>}
        {isPending && <p className='loading'>Loading...</p>}
        {data && <RecipeList recipes={data} />}
    </div>
  )
}

export default Search