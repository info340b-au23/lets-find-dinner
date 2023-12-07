import { NavBar } from './NavBar';
import { Home } from './Home';
import { Footer } from './Footer';
import { About } from './About';
import { VolunteerForm } from './Contact';
import { BankFinder } from './bank-filter-components/BankFinder';
import { Login } from './Login';
import { FoodBankProfile } from './FoodBankProfile';
import { MisDirect } from './Misdirect';
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import bankList from '../data/banks.json';

export default function App(props) {
    const [loggedUser, setLoginStatus] = useState(null);
    const [fixFooter, setFixFooter] = useState(false);

    const bodyRef = useRef(null);

    useEffect(() => {
        const defaultHeight = bodyRef.current.clientHeight;
        const onResize = () => {
            if (window.innerHeight > defaultHeight) {
                setFixFooter(true);
            } else {
                setFixFooter(false);
            }
        }
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);

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
        <div ref={bodyRef}>
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
            <Footer fixFooter={fixFooter} />
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