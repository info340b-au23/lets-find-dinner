// import Header from './Header';
export default function About() {
    return (
        <div>
            {/* <Header /> */}
            <div className="container text-content">
                <section className="about">
                    <div className="row">
                        <p><em className="em--pink">Let's Find Dinner!</em> is a platform dedicated to addressing food insecurity in King County. Our mission is to connect individuals and families in need with local food banks and volunteers.</p>
                        <p>Through our user-friendly interface, users can easily locate nearby food banks, discover the specific items and resources that each food bank requires, and contribute their time and resources to make a positive impact in their community.</p>
                        <p>We believe that no one should go hungry, and with Let's Find Dinner, we're working towards a more inclusive, nourished, and resilient community for all.</p>
                        <img id="uw-food-bank-img" src="img/foodbank.jpg" alt="the UW community food bank" />
                    </div>
                </section>
            </div>
        </div>
    );
}
