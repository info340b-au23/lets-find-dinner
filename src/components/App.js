import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { BankFinder } from './bank-filter-components/BankFinder';
import About from './About';
import Volunteer from './Contact';
import { Home } from './Home';
import FoodBankProfile from './food-bank-profile';
import { useState } from 'react';
import bankList from '../data/banks.json';

export default function App(props) {
    const [loggedIn, setLoginStatus] = useState(false);

    const handleLogin = function() {
        setLoginStatus(!loggedIn);
    };

    const uniqueCities = [...new Set(bankList.map((bankData) => {
        return bankData.city;
    }))].sort();

    return (
        <div>
            <NavBar logginIn={loggedIn} />
            <Home />
            {/* <About /> */}
            {/* <Volunteer /> */}
            {/* <BankFinder banks={bankList} cities={uniqueCities} /> */}
            {/* <Login /> */}
            {/* <Profile /> */}
            <Footer />
        </div>
    );
}