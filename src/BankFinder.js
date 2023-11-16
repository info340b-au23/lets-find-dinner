import Header from './Header';
import { useState } from 'react';

function SearchBar(props) {
    const [searchText, setSearchText] = useState("");

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.submitCallback(searchText);
    }

    return (
        <div className="row">
            <div className="col col-lg-8">
                <section id="search-bar">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="bank-search-text-input">SEARCH BY NAME</label>
                            <div className="input-group">
                                <input type="text" id="bank-search-text-input" name="bank-search-text-input" value={searchText} placeholder="Enter the name of a food bank to search and apply filters" className="form-control border border-secondary" onChange={handleTextChange} aria-label="food bank search box" />
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

function FiltersPanel(props) {
    // TODO: add filters to filter.json
    return (
        <div className="col-lg-3">
            <section id="search-filters">
                <div className="row shadow-lg sub-section-title">
                    <h2>Filters</h2>
                </div>
                <section className="filter-category" id="filter-time">
                    <h3>Hours of Operation</h3>
                    <h4>Day of Week</h4>
                    <div className="input-element">
                        <input id="time-monday" type="checkbox" name="time-monday" />
                        <label for="time-monday">Mon</label>
                    </div>
                    <div className="input-element">
                        <input id="time-tuesday" type="checkbox" name="time-tuesday" />
                        <label for="time-tuesday">Tues</label>
                    </div>
                    <div className="input-element">
                        <input id="time-wednesday" type="checkbox" name="time-wednesday" />
                        <label for="time-wednesday">Wed</label>
                    </div>
                    <div className="input-element">
                        <input id="time-thursday" type="checkbox" name="time-thursday" />
                        <label for="time-thursday">Thurs</label>
                    </div>
                    <div className="input-element">
                        <input id="time-friday" type="checkbox" name="time-friday" />
                        <label for="time-friday">Fri</label>
                    </div>
                    <div className="input-element">
                        <input id="time-saturday" type="checkbox" name="time-saturday" />
                        <label for="time-saturday">Sat</label>
                    </div>
                    <div className="input-element">
                        <input id="time-sunday" type="checkbox" name="time-sunday" />
                        <label for="time-sunday">Sun</label>
                    </div>
                    <h4>Time Period</h4>
                    <div className="input-element">
                        <p>7:00 AM - 8:30 PM</p>
                        <input id="time-hours" type="range" name="time-hours" min="0" max="100" step="4" />
                    </div>
                </section>    
                <section className="filter-category" id="filter-donation">
                    <h3>Donation Requests</h3>
                    <div className="input-element">
                        <input id="donation-produce" type="checkbox" name="donation-produce" />
                        <label for="donation-produce">Fruits, Vegetables</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-bread" type="checkbox" name="donation-bread" />
                        <label for="donation-bread">Bread, Rice, Pasta</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-dairy" type="checkbox" name="donation-dairy" />
                        <label for="donation-dairy">Milk and Dairy</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-poultry" type="checkbox" name="donation-poultry" />
                        <label for="donation-poultry">Poultry (Chicken, Turkey)</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-redmeat" type="checkbox" name="donation-redmeat" />
                        <label for="donation-redmeat">Red Meat (Beef, Pork)</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-nonperishables" type="checkbox" name="donation-nonperishables" />
                        <label for="donation-nonperishables">Boxed, Canned Foods</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-clothing" type="checkbox" name="donation-clothing" />
                        <label for="donation-clothing">Clothing</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-bedding" type="checkbox" name="donation-bedding" />
                        <label for="donation-bedding">Bedding, Sheets, Blankets</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-toiletries" type="checkbox" name="donation-toiletries" />
                        <label for="donation-toiletries">Toiletries</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-baby" type="checkbox" name="donation-baby" />
                        <label for="donation-baby">Baby/Infant Food, Diapers</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-cleaning" type="checkbox" name="donation-cleaning" />
                        <label for="donation-cleaning">Cleaning Supplies</label>
                    </div>
                </section>
                <section className="filter-category" id="filter-location">
                    {/* Possibly change to select city instead; alternatively based location on navigator.geolocate (js) */}
                    <h3>Location</h3>
                        <fieldset>
                            <div className="input-element">
                                <input id="location-all" type="radio" name="location-radius" checked />
                                <label for="location-all">Any Location</label> 
                            </div>
                            <div className="input-element">
                                <input id="location-5" type="radio" name="location-radius" />
                                <label for="location-5">Within 5 Miles</label> 
                            </div>
                            <div className="input-element">
                                <input id="location-10" type="radio" name="location-radius" />
                                <label for="location-10">Within 10 Miles</label> 
                            </div>
                            <div className="input-element">
                                <input id="location-20" type="radio" name="location-radius" />
                                <label for="location-20">Within 20 Miles</label> 
                            </div>
                        </fieldset>
                </section>
            </section>
        </div>
    );
}

// TODO: implement ResultCard component; do we need a key?
// TOOD: implement FilterGroup
// TODO: implement FilterItem? could be combined in FilterGroup, but best to decompose as much as reasonably possible

function ResultsPanel(props) {
    // TODO: add data to results.json; may need to use Firebase storage later
    return (
        <div className="col">
            <section id="search-results">
                {/* TODO: use list group to represent phone numbers, include info on days of week */}
                <div className="row shadow-lg sub-section-title">
                    <div className="col">
                        <h2>Results</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xl-4">
                        <div className="card result-item my-2 shadow">
                            <div className="card-header pt-4">
                                <h3>Snohomish Community Food Bank</h3>
                            </div>
                            <div className="card-body">
                                <h4>Location</h4>
                                <p>1330 Ferguson Park Rd, Snohomish, WA, 98292</p>
                                <h4>Contact Info</h4>
                                <p>Phone:</p>
                                <a href="tel:3605687993">(360)-568-7993</a>
                                <p>Email:</p>
                                <a href="mailto:director@snohomishfoodbank.org">director@snohomishfoodbank.org</a>
                                <p>Website:</p>
                                <a href="http://www.snohomishfoodbank.org/" target="blank">http://www.snohomishfoodbank.org</a>
                                <button className="rounded result-apply non-search-btn btn--darkred" type="button">Apply</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-4">
                        <div className="card result-item my-2 shadow">
                            <div className="card-header pt-4">
                                <h3>Lynnwood Food Bank</h3>
                            </div>
                            <div className="card-body">
                                <h4>Location</h4>
                                <p>5320 176th SW, Lynnwood, WA, 98037</p>
                                <h4>Contact Info</h4>
                                <p>Phone</p>
                                <a href="tel:4257451635">(425)-745-1635</a>
                                <p>Email</p>
                                <a href="mailto:lynnwoodfoodbank@comcast.net">lynnwoodfoodbank@comcast.net</a>
                                <p>Website</p>
                                <a href="http://www.lynnwoodfoodbank.org/" target="blank">http://www.lynnwoodfoodbank.org</a>
                                <button className="rounded result-apply non-search-btn btn--darkred" type="button">Apply</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-4">
                        <div className="card result-item my-2 shadow">
                            <div className="card-header pt-4">
                                <h3>Community Resource Network</h3>
                            </div>
                            <div className="card-body">
                                <h4>Location</h4>
                                <p>15725 Simonds Rd NE, Kenmore, WA, 98028</p>
                                <h4>Contact Info</h4>
                                <p>Phone</p>
                                <a href="tel:4254482589">(425)-448-2589</a>
                                <p>Website</p>
                                <a href="http://www.crninfo.org" target="blank">http://www.crninfo.org</a>
                                <button className="justify-content-end rounded result-apply non-search-btn btn--darkred" type="button">Apply</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-4">
                        <div className="card result-item my-2 shadow">
                            <div className="card-header pt-4">
                                <h3>Annie's Community Kitchen</h3>
                            </div>
                            <div className="card-body">
                                <h4>Location</h4>
                                <p>23525 84th Ave W, Edmonds, WA, 98026</p>
                                <h4>Contact Info</h4>
                                <p>Phone</p>
                                <a href="tel:4257448090">(425)-744-8090</a>
                                <p>Website</p>
                                <a href="https://annieskitchen.edmondslutheran.org/" target="blank">https://annieskitchen.edmondslutheran.org</a>
                                <button className="align-items-end rounded result-apply non-search-btn btn--darkred" type="button">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function BankFinder(props) {
    const [filters, setFilters] = useState({
        timeStart: "6:00",
        timeEnd: "18:00",
        days: [],
        donationFilters: [],
    });
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (query) => {
        setSearchQuery(query);
    }

    console.log(searchQuery);

    return (
        <div>
            <Header title="Find a Food Bank" background="find-a-bank"/>
            <div className="container">
                <SearchBar submitCallback={handleSearchSubmit} />
                <div className="row">
                    <FiltersPanel />
                    <ResultsPanel />
                </div>
            </div>
        </div>
    );
}