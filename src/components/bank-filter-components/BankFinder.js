import { Header } from '../Header';
import { ResultsPanel } from './ResultPanel';
import { FiltersPanel } from './FiltersPanel';
import { SearchBar } from './SearchBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState, useEffect, useRef } from 'react';

const DAYS_OF_WEEK = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const DONATION_TYPES = ["Produce", "Bread", "Dairy", "Poultry", "Red-Meat", "Nonperishables", "Clothing",
                          "Bedding", "Toiletries", "Baby", "Cleaning"];
const MIN_PER_HOUR = 60;

export function BankFinder({heightCallback, ...props}) {
    const [timeFilters, setTimeFilters] = useState({
        timeStart: 480,
        timeEnd: 1200,
        days: [false, false, false, false, false, false, false]
    });
    const [displayTime, setDisplayTime] = useState(["8:00 a.m.", "8:00 p.m."]);
    const [donationFilters, setDonationFilters] = useState(
        [false, false, false, false, false, false, false,
        false, false, false, false]
    );
    const [city, setCity] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = function(query) {
        setSearchQuery(query);
    }

    const containerRef = useRef(null);

    useEffect(() => {
        heightCallback(containerRef.current.clientHeight);
    })

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

    const handleDisplayTimeUpdate = function(updatedDisplayTime) {
        setDisplayTime(updatedDisplayTime);
    }

    const handleCityUpdate = function(updatedCity) {
        setCity(updatedCity);
    }

    const handleDonationUpdate = function(donation) {
        const donationIdx = DONATION_TYPES.indexOf(donation);
        const updatedDonations = donationFilters.map((includeDonation, idx) => {
            if (idx === donationIdx) {
                return !includeDonation;
            }
            return includeDonation;
        });
        setDonationFilters(updatedDonations);
    }

    const handleReset = function() {
        setTimeFilters({
            timeStart: 480,
            timeEnd: 1200,
            days: [false, false, false, false, false, false, false]
        });
        setDonationFilters(
            [false, false, false, false, false, false, false,
            false, false, false, false]
        );
        setCity("");
        setSearchQuery("");
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
        if (city !== "" && bank.city !== city) {
            return false;
        }
        if (donationFilters.includes(true)) {
            let matchedDonation = false;
            for (const donation of bank.requests) {
                matchedDonation |= donationFilters[DONATION_TYPES.indexOf(donation)];
            }
            if (!matchedDonation) {
                return false;
            }
        }
        return true;
    });

    return (
        <div ref={containerRef}>
            <Header title="Find a Food Bank" background="find-a-bank"/>
            <Container className="pb-4">
                <SearchBar submitCallback={handleSearchSubmit} />
                <Row>
                    <FiltersPanel
                        days={DAYS_OF_WEEK}
                        donationTypes={DONATION_TYPES}
                        cities={props.cities}
                        dayValues={timeFilters.days}
                        timeValues={[timeFilters.timeStart, timeFilters.timeEnd]}
                        displayTimeValues={displayTime}
                        cityValue={city}
                        donationValues={donationFilters}
                        resetCallback={handleReset}
                        dayCallback={handleDayUpdate}
                        timeCallback={handleTimeUpdate}
                        displayTimeCallback={handleDisplayTimeUpdate}
                        cityCallback={handleCityUpdate}
                        donationCallback={handleDonationUpdate}
                    />
                    <ResultsPanel banks={displayBanks} />
                </Row>
            </Container>
        </div>
    );
}