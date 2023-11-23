import { NavBar } from './NavBar';
import { Home } from './Home';
import { About } from './About';
import { VolunteerForm } from './Contact';
import { BankFinder } from './bank-filter-components/BankFinder';
import { Login } from './Login';
import { FoodBankProfile } from './FoodBankProfile';
import { MisDirect } from './Misdirect';
import { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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

    // signup-client - edit button link in login
    // signup-provider - edit button link in login
    return (
        <div>
            <NavBar user={loggedUser} handleLogout={handleLogout} />
            <Routes>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="volunteer" element={<VolunteerForm />} />
                <Route path="find-a-food-bank" element={<BankFinder banks={bankList} cities={uniqueCities} />} />
                <Route path="login" element={<Login loginCallback={handleLogin} />} />
                <Route element={<RequireAuth loggedUser={loggedUser} />}>
                    <Route path="account" element={<FoodBankProfile bankList={bankList} />} />
                </Route>
                <Route path="*" element={<MisDirect />} />
            </Routes>
        </div>
    );
}

function RequireAuth(props) {
    if (!props.loggedUser) {
        return <Navigate to="/login"/>
    }
    return <Outlet />
}