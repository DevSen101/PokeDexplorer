import './Search.css'

function Search({updateSearchTerm}) {

    

    return(
        <div className="search-wrapper">
        <input
        id="pokemon-name-search"
        type="text" 
        placeholder= "What's your favourite pokemon's name ?"
        onChange={(e) => updateSearchTerm(e.target.value)}
        
        />
        
          </div>  
        
    )
}

export default Search;