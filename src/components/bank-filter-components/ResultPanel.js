export function ResultsPanel(props) {
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

function ResultCard(props) {
    
}