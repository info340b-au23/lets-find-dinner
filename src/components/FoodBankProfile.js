import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { Header } from "./Header";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

export function FoodBankProfile({heightCallback, user, bankList}){
    const [userInfo, setUserInfo] = useState(null);
    const [userVolunteerHistory, setUserVolHistory] = useState(null);
    const [bankVolunterApps, setBankAppHistory] = useState(null);

    const navigate = useNavigate();

    const containerRef = useRef(null);

    useEffect(() => {
        heightCallback(containerRef.current.clientHeight);
    })

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, "users/" + user.uid);
        const unregisterFunction = onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const userInfo = snapshot.val();
                setUserInfo(snapshot);
            } else {
                console.log("An error occurred while retrieivng the user's profile.");
            }
        })

        function cleanup() {
            unregisterFunction();
        }

        return cleanup;
    })

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
        
        const unregisterFunction = onValue(userRef, (snapshot) => {
            if (!snapshot.exists()) {
                navigate("/account-setup");
            }
        });

        function cleanup() {
            unregisterFunction()
        }

        return cleanup;
    });

    useEffect(() => {
        const db = getDatabase();
        const userVolRef = ref(db, "volunteer-apps-users/" + user.uid);

        const unregisterFunction = onValue(userVolRef, (snapshot) => {
            if (snapshot.exists()) {
                const history = snapshot.val();
                const historyKeys = Object.keys(history);
                const appList = historyKeys.map((key) => {
                    const app = {...history[key]};
                    app.key = key;
                    return app;
                });
                setUserVolHistory(appList);
            } else {
                setUserVolHistory(null);
            }
        });

        function cleanup() {
            unregisterFunction();
        }

        return cleanup;
    })

    useEffect(() => {
        if (userInfo && userInfo.bid) {
            const db = getDatabase();
            const bankVolRef = ref(db, "volunteer-apps-providers/" + userInfo.bid);

            const unregisterFunction = onValue(bankVolRef, (snapshot) => {
                if (snapshot.exists()) {
                    const bankHistory = snapshot.val();
                    const bankHistoryKeys = Object.keys(bankHistory);
                    const bankApps = bankHistoryKeys.map((key) => {
                        const app = {...bankHistory[key]};
                        app.key = key;
                        return app;
                    });
                    setBankAppHistory(bankApps);
                } else {
                    console.log("An error occurred while retrieving food bank volunteer history.");
                }
            });

            function cleanup() {
                unregisterFunction();
            }

            return cleanup;
        }
    });

    const profileInfo = !userInfo ?
        <p>Loading profile information...</p> :
        <div>
            <h3>Name</h3>
            <p>{userInfo.name}</p>

            <h3>Email</h3>
            <p>{userInfo.email}</p>

            <h3>Phone Number</h3>
            <p>{userInfo.phone}</p>
        </div>

    const userVolRows = !userVolunteerHistory ?
        <tr>
            <td colSpan={7}>You have not submitted any volunteer applications.</td>
        </tr>
        :
        userVolunteerHistory.map((app) => {
            const res = 
                <tr key={app.key}>
                    <td>{app.date}</td>
                    <td>{app.name}</td>
                    <td>{app.age}</td>
                    <td>{app.email}</td>
                    <td>{app.phone}</td>
                    <td>{app.zip}</td>
                    <td>{app.foodBankName}</td>
                </tr>;
            return res;
        })

    // const foodBankInfo 
        // <h3>Bank Name</h3>
        // <p>{bankData.name}</p>

        // <h3>Bank ID</h3>
        // <p>{bankData.bid}</p>

        // <h3>Bank Address</h3>
        // <p>{bankData.address}</p>

        // {bankData.phone &&
        //     <div>
        //         <h3>Bank Phone</h3>
        //         <p>{bankData.phone}</p>
        //     </div>
        // }

        // {bankData.email &&
        //     <div>
        //         <h3>Bank Email</h3>
        //         <p>{bankData.email}</p>
        //     </div>
        // }

        // {bankData.website &&
        //     <div>
        //         <h3>Bank Website URL</h3>
        //         <p><a href={bankData.website}>{bankData.website}</a></p>
        //     </div>
        // }

        // <h3>Donation Requests</h3>
        // {donationElement};

    return (
        <div ref={containerRef}>
            <Header title="Account Overview" />
            <Container className="text-content pb-4">
                <Row>
                    <section className="profile-content">
                        <h2>Profile Information</h2>
                        <hr />
        
                        {profileInfo}

                        <h3 className="mb-3">Volunteer Application History</h3>
                        <Table responsive bordered>
                            <thead className="table-dark">
                                <tr>
                                    <th className="py-3">Application Date</th>
                                    <th className="py-3">Name</th>
                                    <th className="py-3">Age</th>
                                    <th className="py-3">Email</th>
                                    <th className="py-3">Phone</th>
                                    <th className="py-3">Zip Code</th>
                                    <th className="py-3">Food Bank</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userVolRows}
                            </tbody>
                        </Table>
                    </section>
                    <section className="profile-bank-info">
                        <h2>Food Bank Dashboard</h2>
                        <hr />

                    </section>
                </Row>
            </Container>
        </div>
    )
}
