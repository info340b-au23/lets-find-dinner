import React from "react";
import userList from "../data/users.json";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export default function UserProfile(props) {
    let currentUser = "raysmith1234";
    return (
        <div>
            <NavBar />
            <div>{ReturnUserData(currentUser)}</div>
            <Footer />
        </div>
    )
}

function ReturnUserData(userName){
    return (
        <div>
        <h2>Profile Information</h2>

        <section className="profile-content">
            {userList.filter(data => data.username === userName).map(item => {
                let shifts = item.volunteerHistory;
                return (
                    <table>
                        <tr>
                            <td>Username:</td>
                            <td>{item.username}</td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td>{item.name}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{item.email}</td>
                        </tr>
                        <tr>
                            <td>Phone:</td>
                            <td>{item.phone}</td>
                        </tr>
                        <tr>
                            <td>Volunteer History:</td>
                            <td>{
                                <table>{Object.keys(shifts).map((key, data) => {
                                    return (
                                        <tr>
                                            <td>{key}:</td>
                                            <td>{
                                                <ul>{Object.keys(data).map((key, data) => {
                                                    return (
                                                        <li>{key}: {data}</li>
                                                    )
                                                })}</ul>
                                            }</td>
                                        </tr>
                                    )
                                })}</table>
                            }</td>
                        </tr>
                    </table>
                )
            })}
        </section>
        </div>
    )
}
