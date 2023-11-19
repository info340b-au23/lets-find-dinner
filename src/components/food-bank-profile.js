export default function FoodBankProfile(props) {
    return (
        <div>
            <h2>Profile Information</h2>
            <section className="profile-content">
                <h3>Username</h3>
                <p>ballardfoodbank</p>

                <h3>Name</h3>
                <p>Ballard Food Bank</p>

                <h3>Email</h3>
                <p>email@email.com</p>
            
                <h3>Password</h3>
                <p className="profile-password-display">
                    ********
                    <button id="password-hide-btn" type="submit"><i aria-label="show-password" className="fa-solid fa-eye"></i></button>
                </p>

                <h3>Phone Number</h3>
                <p>123-456-7890</p>
            </section>
            <section className="profile-volunteer-requests">
                <h2>Volunteer Requests</h2>
                <p>Here's all of the volunteer requests this food bank has made:</p>
                <table className="table table-sm table-striped">
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Job</th>
                    </tr>
                    <tr>
                        <td>12-06-2023</td>
                        <td>9:00AM-12:00PM</td>
                        <td>Food Sorter</td>
                    </tr>
                </table>
            </section>
            <section className="profile-donation-requests">
                <h2>Donation Requests</h2>
                <p>Here's all of the donation requests this food bank has made:</p>
                <table className="table table-sm table-striped">
                    <tr>
                        <th>Active Requests</th>
                        <th>Fulfilled?</th>
                        <th>Date of Request</th>
                    </tr>
                    <tr>
                        <td>Fresh Fruits</td>
                        <td>No</td>
                        <td>12-05-2023</td>
                    </tr>
                </table>
            </section>
        </div>
    )
}