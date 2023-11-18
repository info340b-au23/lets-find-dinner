import { Header } from '../Header';
import { ResultsPanel } from './ResultPanel';
import { FiltersPanel } from './FiltersPanel';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

// TODO: implement ResultCard component; do we need a key?
// TOOD: implement FilterGroup
// TODO: implement FilterItem? could be combined in FilterGroup, but best to decompose as much as reasonably possible

export function BankFinder(props) {
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