import React from "react";
import  bankList from"../data/banks.json";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export default function FoodBankProfile(props){
    let currentBank = "West Seattle Food Bank";
    return (
        <div>
            <NavBar />
            <div>{ReturnBankData(currentBank)}</div>
            <Footer />
        </div>
    )
}

function ReturnBankData(bankName) {
    return (
            
        <div>
        <h2>Profile Information</h2>
        
        <section className="profile-content">
                {bankList.filter(d => d.name === bankName).map(item => {
                    let hoursOpen = item.hoursOpen;
                    return (
                        <table>
                            <tr>
                                <td>ID number</td>
                                <td>{item.bid}</td> 
                            </tr>
                            <tr>
                                <td>Name :</td>
                                <td>{item.name}</td> 
                            </tr>
                            <tr>
                                <td>Phone:</td>
                                <td>{item.phone}</td> 
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{item.email}</td> 
                            </tr>
                            <tr>
                                <td>Website:</td>
                                <td>{item.website}</td> 
                            </tr>
                            <tr>
                                <td>Hours Open</td>
                                <td>{
                                    <ul>{Object.keys(hoursOpen).map((key, data) => {
                                        return (
                                            <li>{key}: {data}</li>
                                        )
                                    })}</ul> 
                                }</td> 
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td>{item.address}, {item.city}, {item.zip}</td> 
                            </tr>
                            <tr>
                                <td>Requests:</td>
                                <td>{item.requests}</td> 
                            </tr>
                        </table>
                    );
                })}
        </section>
        </div>
    )
}