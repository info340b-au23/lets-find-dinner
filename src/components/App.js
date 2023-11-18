import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { BankFinder } from './bank-filter-components/BankFinder';
import Volunteer from './Contact';
import Home from './Home';
import { useState } from 'react';

export default function App(props) {
    const [loggedIn, setLoginStatus] = useState(false);

    const handleLogin = function() {
        setLoginStatus(!loggedIn);
    };

    return (
        <div>
            <NavBar logginIn={loggedIn} />
            {/* <Home /> */}
            {/* <About /> */}
            {/* <Volunteer /> */}
            <BankFinder />
            {/* <Login /> */}
            {/* <Profile /> */}
            <Footer />
        </div>
    );
}