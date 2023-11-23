import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Header } from "./Header";
import { Footer } from "./Footer";

export function FoodBankProfile({bankList}){
    let currentBank = "West Seattle Food Bank";

    function ReturnBankData(bankName) {
        return (
            <Container className="text-content">
                <Row>
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
                                        <td>{
                                            <ol>{item.requests.map(item => {
                                            return (
                                                <li>{item} </li>
                                            )
                                            })}</ol>
                                        }</td> 
                                    </tr>
                                </table>
                            );
                        })}
                    </section>
                </Row>
            </Container>
        )
    }
    
    return (
        <div>
            <Header title="Account Overview" />
            <div>
                {ReturnBankData(currentBank)}
            </div>
            <Footer fixFooter={false} />
        </div>
    )
}
