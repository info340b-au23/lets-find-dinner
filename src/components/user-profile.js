export default function UserProfile(props) {
    return (
        <div>
        <section class="profile-content">
                <h2>Profile Information</h2>

                <h3>Username</h3>
                <p>raysmith1234</p>

                <h3>Name</h3>
                <p>Raymond Smith</p>

                <h3>Email</h3>
                <p>email@email.com</p>
            
                <h3>Password</h3>
                <p class="profile-password-display">
                    ********
                    <button id="password-hide-btn" type="submit"><i aria-label="show-password" class="fa-solid fa-eye"></i></button>
                </p>

                <h3>Phone Number</h3>
                <p>123-456-7890</p>
            </section>
            <section class="profile-volunteer-history">
                <h2>Volunteer History</h2>
                <table class="table table-sm table-striped">
                    <tr>
                        <th>Food Bank</th>
                        <th>Date</th>
                        <th>Hours</th>
                    </tr>
                    <tr>
                        <td>Annie's Community Kitchen</td>
                        <td>04-25-2002</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Ballard Food Bank</td>
                        <td>12-04-2001</td>
                        <td>5</td>
                    </tr>
                </table>
            </section>
            <section class="profile-request-history">
                <h2>Request History</h2>
                <p>Here's all of the food banks from which you've requested from in the past:</p>
                <table class="table table-sm table-responsive table-striped">
                    <tr>
                        <th>Food Bank</th>
                        <th>Date</th>
                        <th>Requests</th>
                        <th>Fulfilled?</th>
                    </tr>
                    <tr>
                        <td>Snohomish Community Food Bank</td>
                        <td>11-01-2003</td>
                        <td>Fresh Fruit, Milk</td>
                        <th>Yes</th>
                    </tr>
                </table>
            </section>
        </div>
    )
}