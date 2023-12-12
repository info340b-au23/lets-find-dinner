import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { Header } from "./Header";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, set as firebaseSet } from 'firebase/database';

export function FoodBankProfile({heightCallback, user, bankList}){
    const [userInfo, setUserInfo] = useState(null);
    const [userVolunteerHistory, setUserVolHistory] = useState(null);
    const [bankVolunterApps, setBankAppHistory] = useState(null);
    const [currApp, setCurrApp] = useState(null);
    const [showModal, setShow] = useState(false);

    const navigate = useNavigate();

    const containerRef = useRef(null);

    const handleVolAppToggle = (app) => {
        setCurrApp(app);
        setShow(true);
    }

    const handleVolAppClose = () => {
        setShow(false);
    }

    const handleApprove = () => {
        const db = getDatabase();
        const bankAppRef = ref(db, "volunteer-apps-providers/" + userInfo.bid + "/" + currApp.key + "/approval");
        firebaseSet(bankAppRef, "Approved");

        if (currApp.uid) {
            const userAppRef = ref(db, "volunteer-apps-users/" + currApp.uid + "/" + currApp.volKey + "/approval");
            firebaseSet(userAppRef, "Approved");
        }

        setShow(false);
        setCurrApp(false);
    }

    const handleReject = () => {
        const db = getDatabase();
        const bankAppRef = ref(db, "volunteer-apps-providers/" + userInfo.bid + "/" + currApp.key + "/approval");
        firebaseSet(bankAppRef, "Rejected");

        if (currApp.uid) {
            const userAppRef = ref(db, "volunteer-apps-users/" + currApp.uid + "/" + currApp.volKey + "/approval");
            firebaseSet(userAppRef, "Rejected");
        }
        
        setShow(false);
        setCurrApp(null);
    }

    useEffect(() => {
        heightCallback(containerRef.current.clientHeight);
    })

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, "users/" + user.uid);
        const unregisterFunction = onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const userInfo = snapshot.val();
                setUserInfo(userInfo);
            } else {
                console.log("An error occurred while retrieivng the user's profile.");
            }
        })

        function cleanup() {
            unregisterFunction();
        }

        return cleanup;
    })

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
                    <td>{app.approval}</td>
                </tr>;
            return res;
        })

    let bankData = undefined;
    if (userInfo && userInfo.bid) {
        bankData = bankList.reduce((acc, curr) => {
            if (curr.bid === userInfo.bid) {
                return curr;
            }
            return acc;
        }, undefined);
    }

    const donationRequests = !bankData ? 
        []
        :
        bankData.requests.map((request, idx) => {
            return <li key={bankData.bid + "-profile-request-" + idx}>{request}</li>
        });

    const donationElement = donationRequests.length !== 0 ?
        <ul>
            {donationRequests}
        </ul> :
        <p>There are currently no donation requests for your bank.</p>

    const foodBankInfo = !bankData ?
        <div></div>
        :
        <Row>
            <h2>Food Bank Dashboard</h2>
            <hr />

            <Col lg="6">
                <h3>Bank Name</h3>
                <p>{bankData.name}</p>

                <h3>Bank ID</h3>
                <p>{bankData.bid}</p>

                <h3>Bank Address</h3>
                <p>{bankData.address}</p>
            </Col>
            <Col lg="6">
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
            </Col>
            <Col lg="12">
                <h3>Donation Requests</h3>
                {donationElement}
            </Col>
        </Row>;

    const bankVolRows = !bankVolunterApps ?
    <tr>
        <td colSpan={5}>Your bank does not have any volunteer applications.</td>
    </tr>
    :
    bankVolunterApps.map((app) => {
        const res = 
            <tr key={app.key}>
                <td>{app.date}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>
                    {app.approval === "Pending" ?
                        <Button
                            variant="danger"
                            type="click"
                            onClick={() => handleVolAppToggle(app)}
                        >
                            Manage
                        </Button>
                        :
                        app.approval
                    }
                </td>
            </tr>;
        return res;
    })

    return (
        <div ref={containerRef}>
            <Header title="Account Overview" />
            <Container className="text-content pb-4">
                <Row>
                    <section className="profile-content mb-4">
                        <h2>Profile Information</h2>
                        <hr />
        
                        {profileInfo}

                        <h3 className="mb-3">Your Volunteer Application History</h3>
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
                                    <th className="py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userVolRows}
                            </tbody>
                        </Table>
                    </section>
                    <section className="profile-bank-info">
                        {foodBankInfo}
                        {bankData &&
                            <div>
                                <h3 className="mb-3">Bank Volunteer Applications</h3>
                                <Table responsive bordered>
                                    <thead className="table-dark">
                                        <tr>
                                            <th className="py-3">Application Date</th>
                                            <th className="py-3">Name</th>
                                            <th className="py-3">Email</th>
                                            <th className="py-3">Phone</th>
                                            <th className="py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bankVolRows}
                                    </tbody>
                                </Table>
                            </div>
                        }
                    </section>
                    {currApp &&
                        <Modal show={showModal} onHide={handleVolAppClose}>
                            <Modal.Header closeButton>
                                <Modal.Title><strong>Review Volunteer Application</strong></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p><strong>Name:</strong> {currApp.name}</p>
                                <p><strong>Email:</strong> {currApp.email}</p>
                                <p><strong>Phone:</strong> {currApp.phone}</p>
                                <p><strong>Age:</strong> {currApp.age}</p>
                                <p><strong>Zip:</strong> {currApp.zip}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={handleApprove}>Approve</Button>
                                <Button variant="danger" onClick={handleReject}>Reject</Button>
                                <Button variant="primary" onClick={handleVolAppClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    }
                </Row>
            </Container>
        </div>
    )
}
