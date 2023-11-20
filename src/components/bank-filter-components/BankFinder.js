import { Header } from '../Header';
import { ResultsPanel } from './ResultPanel';
import { FiltersPanel } from './FiltersPanel';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

const DAYS_OF_WEEK = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const DONATION_TYPES = ["produce", "bread", "dairy", "poultry", "red-meat", "nonperishables", "clothing",
                          "bedding", "toiletries", "baby", "cleaning"];

// TODO: implement ResultCard component; do we need a key?
// TOOD: implement FilterGroup
// TODO: implement FilterItem? could be combined in FilterGroup, but best to decompose as much as reasonably possible

export function BankFinder(props) {
    const [timeFilters, setTimeFilters] = useState({
        timeStart: 480,
        timeEnd: 1200,
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

    const handleTimeUpdate = function(updatedTime) {
        const {days, ...rest} = timeFilters;
        setTimeFilters({days, timeStart: updatedTime[0], timeEnd: updatedTime[1]});
    }

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
                    matchedDay = true;
                }
            }
            if (!matchedDay) {
                return false;
            }
        }
        for (const day in bank.hoursOpen) {
            const times = bank.hoursOpen[day].split(",");
            for (const time of times) {
                
            }
        }
        return true;
    });

    console.log(timeFilters.timeStart + " " + timeFilters.timeEnd);

    return (
        <div>
            <Header title="Find a Food Bank" background="find-a-bank"/>
            <div className="container">
                <SearchBar submitCallback={handleSearchSubmit} />
                <div className="row">
                    <FiltersPanel
                        days={DAYS_OF_WEEK}
                        donationTypes={DONATION_TYPES}
                        dayCallback={handleDayUpdate}
                        timeCallback={handleTimeUpdate}
                    />
                    <ResultsPanel banks={displayBanks} />
                </div>
            </div>
        </div>
    );
}