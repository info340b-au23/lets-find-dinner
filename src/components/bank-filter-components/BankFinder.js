import { Header } from '../Header';
import { ResultsPanel } from './ResultPanel';
import { FiltersPanel } from './FiltersPanel';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

const DAYS_OF_WEEK = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const DONATION_TYPES = ["produce", "bread", "dairy", "poultry", "red-meat", "nonperishables", "clothing",
                          "bedding", "toiletries", "baby", "cleaning"];
const MIN_PER_HOUR = 60;

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
        setTimeFilters({...rest, days: updatedDays});
    }

    const handleTimeUpdate = function(updatedTime) {
        const {days} = timeFilters;
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
        let matchedDays = [];
        const filterOnDays = days.includes(true);
        if (filterOnDays) {
            for (const day in bank.hoursOpen) {
                if (days[DAYS_OF_WEEK.indexOf(day)]) {
                    matchedDays.push(day);
                }
            }
            if (matchedDays.length === 0) {
                return false;
            }
        }
        let matchedTime = false;
        for (const day in bank.hoursOpen) {
            const times = bank.hoursOpen[day].split(",");
            if ((filterOnDays && matchedDays.includes(day)) || !filterOnDays) {
                for (const period of times) {
                    const [start, end] = period.split("-").map((time) => {
                        const colonIdx = time.indexOf(":");
                        let hour = parseInt(time.substring(0, colonIdx));
                        if (time.substring(time.length - 2) === "pm" && hour !== 12) {
                            hour += 12;
                        }
                        const min = parseInt(time.substring(colonIdx + 1));
                        return hour * MIN_PER_HOUR + min;
                    });
                    if ((timeFilters.timeStart < start && timeFilters.timeEnd > start) ||
                            (timeFilters.timeStart >= start && timeFilters.timeStart < end)) {
                        matchedTime = true;
                    }
                }
            }
        }
        if (!matchedTime) {
            return false;
        }
        return true;
    });

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