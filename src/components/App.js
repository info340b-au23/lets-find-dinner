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
    const [loggedIn, setLoginStatus] = useState(false);

    const handleLogin = function() {
        setLoginStatus(!loggedIn);
    };

    const uniqueCities = [...new Set(bankList.map((bankData) => {
        return bankData.city;
    }))].sort();

    // if user logs in after already logged in, send to account
    // if user is logged in, clicking the sign out sends them to you are signed out.
    // You are now signed out. Click here to return to login.
    return (
        <div>
            <NavBar logginIn={loggedIn} />
            <Routes>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="volunteer" element={<Volunteer />} />
                <Route path="find-a-food-bank" element={<BankFinder banks={bankList} cities={uniqueCities} />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<MisDirect />} />
            </Routes>
        </div>
    );
}