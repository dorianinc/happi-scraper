import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input type="text" placeholder="Search..." className="search-input" />
        <button type="submit" className="search-button">
          <i class="fa-solid fa-magnifying-glass" style={{ color: "#0e1b4d" }} />
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
