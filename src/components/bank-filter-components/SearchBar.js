import { useState } from "react";

export function SearchBar(props) {
    const [searchText, setSearchText] = useState("");

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.submitCallback(searchText.toLowerCase());
    }

    return (
        <div className="row">
            <div className="col col-lg-8">
                <section id="search-bar">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="bank-search-text-input">SEARCH BY NAME</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="bank-search-text-input"
                                    name="bank-search-text-input"
                                    value={searchText}
                                    placeholder="Enter the name of a food bank to search for"
                                    className="form-control border border-secondary"
                                    onChange={handleTextChange}
                                    aria-label="Food bank search input"
                                    autoComplete="off"
                                />
                                <div className="input-group-append">
                                    <button id="bank-search-button" className="btn btn-danger" type="submit">
                                        <i id="search-button-icon" aria-label="submit" className="fa-solid fa-magnifying-glass"></i>
                                        <p id="search-button-text">Search</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}