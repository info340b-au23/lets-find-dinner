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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Setup } from './AccountSetup';

export default function App(props) {
    const [loggedUser, setLoggedUser] = useState(null);
    const [bankList, setBankList] = useState([]);
    const [pageHeight, setPageHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);
    const [bodyHeight, setBodyHeight] = useState(0);

    useEffect(() => {
        const auth = getAuth();

        const unregisterFunction = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                firebaseUser.name = firebaseUser.displayName;
                firebaseUser.uid = firebaseUser.uid;
                firebaseUser.email = firebaseUser.email;
                setLoggedUser(firebaseUser);
            } else {
                setLoggedUser(null);
            }
        });

        function cleanup() {
            unregisterFunction();
        }
        return cleanup;
    }, []);

    useEffect(() => {
        const onResize = function() {
            if (window.innerHeight > (footerHeight + pageHeight)) {
                setBodyHeight(window.innerHeight - footerHeight - 10);
            } else {
                setBodyHeight(0);
            }
        }
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [pageHeight, footerHeight]);

    const pageHeightCallback = function(height) {
        setPageHeight(height);
    };

    const footerHeightCallback = function(height) {
        setFooterHeight(height);
    };

    useEffect(() => {
        const db = getDatabase();
        const bankListRef = ref(db, "banks");

        const unregisterFunction = onValue(bankListRef, (snapshot) => {
            const updatedList = snapshot.val();
            setBankList(updatedList);
        });

        function cleanup() {
            unregisterFunction();
        }
        return cleanup;
    }, []);

    const uniqueCities = [...new Set(bankList.map((bankData) => {
        return bankData.city;
    }))].sort();

    return (
        <div>
            <div id="page-body" style={{"minHeight": bodyHeight}}>
                <NavBar user={loggedUser} />
                <Routes>
                    <Route index element={<Home heightCallback={pageHeightCallback} />} />
                    <Route path="about" element={<About heightCallback={pageHeightCallback} />} />
                    <Route
                        path="volunteer"
                        element={
                            <VolunteerForm
                                user={loggedUser}
                                heightCallback={pageHeightCallback}
                                bankList={bankList}
                            />
                        }
                    />
                    <Route
                        path="find-a-food-bank"
                        element={
                            <BankFinder
                                banks={bankList}
                                cities={uniqueCities}
                                heightCallback={pageHeightCallback}
                            />
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <Login
                                user={loggedUser}
                                heightCallback={pageHeightCallback}
                            />
                        }
                    />
                    <Route element={<RequireAuth loggedUser={loggedUser} />}>
                        <Route path="account" element={<FoodBankProfile bankList={bankList} user={loggedUser} heightCallback={pageHeightCallback} />} />
                        <Route path="account-setup" element={<Setup user={loggedUser} heightCallback={pageHeightCallback} bankList={bankList} />} />
                    </Route>
                    <Route path="*" element={<MisDirect heightCallback={pageHeightCallback} />} />
                </Routes>
            </div>
            <Footer heightCallback={footerHeightCallback} />
        </div>
    );
}

function RequireAuth(props) {
    if (!props.loggedUser) {
        return <Navigate to="/login"/>
    }
    return <Outlet />
}