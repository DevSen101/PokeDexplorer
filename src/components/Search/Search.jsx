import useDebounce from '../../hooks/useDebounce';
import './Search.css'

function Search({updateSearchTerm}) {
    const debouncedCallBack = useDebounce((e) => updateSearchTerm(e.target.value))

    

    return(
        <div className="search-wrapper">
        <input
        id="pokemon-name-search"
        type="text" 
        placeholder= "What's your favourite pokemon's name ?"
        onChange={debouncedCallBack}

        />
        
          </div>  
        
    )
}

export default Search;