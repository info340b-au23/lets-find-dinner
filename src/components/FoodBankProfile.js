import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Header } from "./Header";
import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

export function FoodBankProfile({heightCallback, user}){
    // const [displayPassword, setDisplayPassword] = useState(false);

    const navigate = useNavigate();

    const containerRef = useRef(null);

    useEffect(() => {
        heightCallback(containerRef.current.clientHeight);
    })

    useEffect(() => {
        
    })

    // const currentBank = "West Seattle Food Bank";
    // const password = <p>examplePassword</p>
    // const hiddenPassword = <p>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</p>

    // const handlePasswordToggle = (event) => {
    //     setDisplayPassword(!displayPassword);
    // }

    // const bankData = bankList.reduce((acc, curr) => {
    //     if (curr.name === currentBank) {
    //         return curr;
    //     }
    //     return acc;
    // }, {});

    // const donationRequests = bankData.requests.map((request, idx) => {
    //     return <li key={bankData.bid + "-profile-request-" + idx}>{request}</li>
    // });

    // const donationElement = donationRequests.length > 0 ?
    //     <ul>
    //         {donationRequests}
    //     </ul> :
    //     <p>There are currently no donation requests for your bank.</p>

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, "users/" + user.uid);
        
        onValue(userRef, (snapshot) => {
            console.log("here");
            if (!snapshot.exists()) {
                console.log("here2");
                navigate("/account-setup");
            }
        });
    });

    return (
        <div ref={containerRef}>
            <Header title="Account Overview" />
            <Container className="text-content pb-4">
                <Row>
                    <section className="profile-content">
                        <h2>Profile Information</h2>
                        <hr />

                        <h2>You're almost there...</h2>
                        
                        {/* <h3>Username</h3>
                        <p>cooltestbank340</p> */}

                        {/* <h3>Password</h3>
                        <div className="profile-password-display">
                            {displayPassword ? password : hiddenPassword}
                            <div onClick={handlePasswordToggle}>
                                {displayPassword ?
                                    <i aria-label="hide-password" className="fa-solid fa-eye-slash"></i> :
                                    <i aria-label="show-password" className="fa-solid fa-eye"></i>
                                }
                            </div>
                        </div> */}
        
                        <h3>Name</h3>
                        <p>{user.name}</p>
        
                        <h3>Email</h3>
                        <p>{user.email}</p>

                        <h3>Phone Number</h3>
                        <p>123-456-7890</p>
                    </section>
                    {/* <section className="profile-bank-info">
                        <h2>Food Bank Dashboard</h2>
                        <hr />

                        <h3>Bank Name</h3>
                        <p>{bankData.name}</p>

                        <h3>Bank ID</h3>
                        <p>{bankData.bid}</p>

                        <h3>Bank Address</h3>
                        <p>{bankData.address}</p>

                        {bankData.phone &&
                            <div>
                                <h3>Bank Phone</h3>
                                <p>{bankData.phone}</p>
                            </div>
                        }

                        {bankData.email &&
                            <div>
                                <h3>Bank Email</h3>
                                <p>{bankData.email}</p>
                            </div>
                        }

                        {bankData.website &&
                            <div>
                                <h3>Bank Website URL</h3>
                                <p><a href={bankData.website}>{bankData.website}</a></p>
                            </div>
                        }

                        <h3>Donation Requests</h3>
                        {donationElement}

                    </section> */}
                </Row>
            </Container>
        </div>
    )
}
