import { NavBar } from './NavBar';
import { Home } from './Home';
import { Footer } from './Footer';
import { About } from './About';
import { VolunteerForm } from './Contact';
import { BankFinder } from './bank-filter-components/BankFinder';
import { Login } from './Login';
import { FoodBankProfile } from './FoodBankProfile';
import { MisDirect } from './Misdirect';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import bankList from '../data/banks.json';

export default function App(props) {
    const [loggedUser, setLoginStatus] = useState(null);
    const [fixFooter, setFixFooter] = useState(false);
    const [bodyHeight, setBodyHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);

    const bodyHeightCallback = function(height) {
        setBodyHeight(height);
    };

    const footerHeightCallback = function(height) {
        setFooterHeight(height);
    };

    useEffect(() => {
        const onResize = function() {
            if (window.innerHeight > footerHeight + bodyHeight) {
                setFixFooter(true);
            } else {
                setFixFooter(false);
            }
        }
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [bodyHeight, footerHeight]);

    const handleLogin = function(user) {
        setLoginStatus(user);
    };

    const handleLogout = function() {
        setLoginStatus(null);
    }

    const uniqueCities = [...new Set(bankList.map((bankData) => {
        return bankData.city;
    }))].sort();

    return (
        <div>
            <NavBar user={loggedUser} handleLogout={handleLogout} />
            <Routes>
                <Route index element={<Home heightCallback={bodyHeightCallback} />} />
                <Route path="about" element={<About heightCallback={bodyHeightCallback} />} />
                <Route path="volunteer" element={<VolunteerForm heightCallback={bodyHeightCallback} />} />
                <Route
                    path="find-a-food-bank"
                    element={
                        <BankFinder
                            banks={bankList}
                            cities={uniqueCities}
                            heightCallback={bodyHeightCallback}
                        />
                    }
                />
                <Route
                    path="login"
                    element={
                        <Login
                            loginCallback={handleLogin}
                            heightCallback={bodyHeightCallback}
                        />
                    }
                />
                <Route element={<RequireAuth loggedUser={loggedUser} />}>
                    <Route path="account" element={<FoodBankProfile bankList={bankList} heightCallback={bodyHeightCallback} />} />
                </Route>
                <Route path="*" element={<MisDirect heightCallback={bodyHeightCallback} />} />
            </Routes>
            <Footer fixFooter={fixFooter} heightCallback={footerHeightCallback} />
        </div>
    );
}

function RequireAuth(props) {
    if (!props.loggedUser) {
        return <Navigate to="/login"/>
    }
    return <Outlet />
}

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDSjUgcZJgVaXAnFLkQgvv8CBMLreO6yCU",
//   authDomain: "lets-find-dinner.firebaseapp.com",
//   projectId: "lets-find-dinner",
//   storageBucket: "lets-find-dinner.appspot.com",
//   messagingSenderId: "257731440186",
//   appId: "1:257731440186:web:42aa4c3756372abf648f03"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);