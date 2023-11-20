import BankFinder from './BankFinder';
import Volunteer from './Contact';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import { useState } from 'react';

export default function App(props) {
    return (
        <div>
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