import { NavBar } from './NavBar';
import { Home } from './Home';
import { About } from './About';
import Volunteer from './Contact';
import { BankFinder } from './bank-filter-components/BankFinder';
import { Login } from './Login';
import FoodBankProfile from './food-bank-profile';
import { MisDirect } from './Misdirect';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import bankList from '../data/banks.json';

export default function App(props) {
    const [loggedUser, setLoginStatus] = useState(null);
    
    const handleLogin = function(user) {
        setLoginStatus(user);
    };

    const handleLogout = function() {
        setLoginStatus(null);
    }

    const uniqueCities = [...new Set(bankList.map((bankData) => {
        return bankData.city;
    }))].sort();

    // if user logs in after already logged in, send to account

    // signup-client - edit button link in login
    // signup-provider - edit button link in login

    // later: check volunteer form, add header
    return (
        <div>
            <NavBar user={loggedUser} handleLogout={handleLogout} />
            <Routes>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="volunteer" element={<Volunteer />} />
                <Route path="find-a-food-bank" element={<BankFinder banks={bankList} cities={uniqueCities} />} />
                <Route path="login" element={<Login loginCallback={handleLogin} />} />
                <Route path="*" element={<MisDirect />} />
            </Routes>
        </div>
    );
}