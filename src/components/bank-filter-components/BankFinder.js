import { Header } from '../Header';
import { ResultsPanel } from './ResultPanel';
import { FiltersPanel } from './FiltersPanel';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

const DAYS_OF_WEEK = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const DONATION_FILTERS = ["produce", "bread", "dairy", "poultry", "red-meat", "nonperishables", "clothing",
                          "bedding", "toiletries", "baby", "cleaning"];

// TODO: implement ResultCard component; do we need a key?
// TOOD: implement FilterGroup
// TODO: implement FilterItem? could be combined in FilterGroup, but best to decompose as much as reasonably possible

export function BankFinder(props) {
    const [timeFilters, setTimeFilters] = useState({
        hourStart: "6:00",
        hourEnd: "18:00",
        days: [false, false, false, false, false, false, false]
    });
    const [donationFilters, setDonationFilters] = useState([]);
    const [city, setCity] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = function(query) {
        setSearchQuery(query);
    }

    const handleDayUpdate = function(day) {
        const {days, ...rest} = timeFilters;
        const dayIdx = DAYS_OF_WEEK.indexOf(day);
        const updatedDays = days.map((checkDay, idx) => {
            return idx === dayIdx ? !checkDay : checkDay;
        });
        setTimeFilters({rest, days: updatedDays});
    }

    console.log(timeFilters.days);

    const queryTerms = searchQuery.split(" ");
    const displayBanks = props.banks.filter((bank) => {
        const bankName = bank.name.toLowerCase();
        if (searchQuery !== "") {
            let matchedTerm = false;
            for (const query of queryTerms) {
                if (bankName.indexOf(query) !== -1) {
                    matchedTerm = true;
                }
            }
            if (!matchedTerm) {
                return false;
            }
        }
        const days = timeFilters.days;
        if (days.includes(true)) {
            let matchedDay = false;
            for (const day in bank.hoursOpen) {
                if (days[DAYS_OF_WEEK.indexOf(day)]) {
                    // more code inside if for processing time
                    matchedDay = true;
                }
            }
            if (!matchedDay) {
                return false;
            }
        }
        return true;
    });

    return (
        <div>
            <Header title="Find a Food Bank" background="find-a-bank"/>
            <div className="container">
                <SearchBar submitCallback={handleSearchSubmit} />
                <div className="row">
                    <FiltersPanel days={DAYS_OF_WEEK} dayCallback={handleDayUpdate} />
                    <ResultsPanel banks={displayBanks} />
                </div>
            </div>
        </div>
    );
}