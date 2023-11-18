export function FiltersPanel(props) {
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
                        <label htmlFor="time-monday">Mon</label>
                    </div>
                    <div className="input-element">
                        <input id="time-tuesday" type="checkbox" name="time-tuesday" />
                        <label htmlFor="time-tuesday">Tues</label>
                    </div>
                    <div className="input-element">
                        <input id="time-wednesday" type="checkbox" name="time-wednesday" />
                        <label htmlFor="time-wednesday">Wed</label>
                    </div>
                    <div className="input-element">
                        <input id="time-thursday" type="checkbox" name="time-thursday" />
                        <label htmlFor="time-thursday">Thurs</label>
                    </div>
                    <div className="input-element">
                        <input id="time-friday" type="checkbox" name="time-friday" />
                        <label htmlFor="time-friday">Fri</label>
                    </div>
                    <div className="input-element">
                        <input id="time-saturday" type="checkbox" name="time-saturday" />
                        <label htmlFor="time-saturday">Sat</label>
                    </div>
                    <div className="input-element">
                        <input id="time-sunday" type="checkbox" name="time-sunday" />
                        <label htmlFor="time-sunday">Sun</label>
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
                        <label htmlFor="donation-produce">Fruits, Vegetables</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-bread" type="checkbox" name="donation-bread" />
                        <label htmlFor="donation-bread">Bread, Rice, Pasta</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-dairy" type="checkbox" name="donation-dairy" />
                        <label htmlFor="donation-dairy">Milk and Dairy</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-poultry" type="checkbox" name="donation-poultry" />
                        <label htmlFor="donation-poultry">Poultry (Chicken, Turkey)</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-redmeat" type="checkbox" name="donation-redmeat" />
                        <label htmlFor="donation-redmeat">Red Meat (Beef, Pork)</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-nonperishables" type="checkbox" name="donation-nonperishables" />
                        <label htmlFor="donation-nonperishables">Boxed, Canned Foods</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-clothing" type="checkbox" name="donation-clothing" />
                        <label htmlFor="donation-clothing">Clothing</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-bedding" type="checkbox" name="donation-bedding" />
                        <label htmlFor="donation-bedding">Bedding, Sheets, Blankets</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-toiletries" type="checkbox" name="donation-toiletries" />
                        <label htmlFor="donation-toiletries">Toiletries</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-baby" type="checkbox" name="donation-baby" />
                        <label htmlFor="donation-baby">Baby/Infant Food, Diapers</label>
                    </div>
                    <div className="input-element">
                        <input id="donation-cleaning" type="checkbox" name="donation-cleaning" />
                        <label htmlFor="donation-cleaning">Cleaning Supplies</label>
                    </div>
                </section>
                <section className="filter-category" id="filter-location">
                    {/* Possibly change to select city instead; alternatively based location on navigator.geolocate (js) */}
                    <h3>Location</h3>
                        <fieldset>
                            {/* <div className="input-element">
                                <input id="location-all" type="radio" name="location-radius" checked />
                                <label htmlFor="location-all">Any Location</label> 
                            </div>
                            <div className="input-element">
                                <input id="location-5" type="radio" name="location-radius" />
                                <label htmlFor="location-5">Within 5 Miles</label> 
                            </div>
                            <div className="input-element">
                                <input id="location-10" type="radio" name="location-radius" />
                                <label htmlFor="location-10">Within 10 Miles</label> 
                            </div>
                            <div className="input-element">
                                <input id="location-20" type="radio" name="location-radius" />
                                <label htmlFor="location-20">Within 20 Miles</label> 
                            </div> */}
                        </fieldset>
                </section>
            </section>
        </div>
    );
}