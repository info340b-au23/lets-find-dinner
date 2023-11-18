import { Header } from '../Header';
import { ResultsPanel } from './ResultPanel';
import { FiltersPanel } from './FiltersPanel';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

// TODO: implement ResultCard component; do we need a key?
// TOOD: implement FilterGroup
// TODO: implement FilterItem? could be combined in FilterGroup, but best to decompose as much as reasonably possible

export function BankFinder(props) {
    const [timeFilters, setTimeFilters] = useState({
        hourStart: "6:00",
        hourEnd: "18:00",
        days: []
    });
    const [donationFilters, setDonationFilters] = useState([]);
    const [city, setCity] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (query) => {
        setSearchQuery(query);
    }

    const queryTerms = searchQuery.split(" ");
    const displayBanks = props.banks.filter((bank) => {
        let matchedTerm = false;
        const bankName = bank.name.toLowerCase();
        if (searchQuery !== "") {
            for (const query of queryTerms) {
                if (bankName.indexOf(query) !== -1) {
                    matchedTerm = true;
                }
            }
            if (!matchedTerm) {
                return false;
            }
        }
        // for (const day in bank.hoursOpen) {

        // }
        return true;
    });

    console.log(displayBanks);

    return (
        <div>
            <Header title="Find a Food Bank" background="find-a-bank"/>
            <div className="container">
                <SearchBar submitCallback={handleSearchSubmit} />
                <div className="row">
                    <FiltersPanel />
                    <ResultsPanel banks={displayBanks} />
                </div>
            </div>
        </div>
    );
}