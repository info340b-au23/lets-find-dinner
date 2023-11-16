export default function Home(props) {
    return (
      <div>
        <div className="container">
          <div className="row shadow-lg page-title home-page-hook">
            <div className="col">
              <h2>Because families deserve not to worry about their next meal.</h2>
            </div>
          </div>
        </div>
        <div className="container text-content">
          <div className="row">
            <img id="pantry-shopping-img" src="img/pantry.jpg" alt="a woman inspecting a food pantry" />
            <h1>Welcome to Let's Find Dinner!</h1>
          </div>
          <section className="home-page-introduction">
            <p>Food insecurity is a pressing issue that affects thousands of residents in King County. Many families and individuals struggle to access nutritious meals for themselves and their loved ones. In 2021, approximately 33.8 million Americans experienced food insecurity, highlighting the urgent need for effective solutions.</p>
          </section>
          <section className="home-page-selection">
            <div className="row sub-section-title home-title">
              <h2>How can we help?</h2>
            </div>
            <p>Anyone can explore food banks in King County and help fight food insecurity. Below are some resources for combating food insecurity in your local community.</p>
            <button className="rounded non-search-btn btn--darkred"><a href="contact.html">Volunteer</a></button>
            <button className="rounded non-search-btn btn--tan"><a href="find-a-bank.html">Donate/Find Food</a></button>
          </section>
          <section className="home-page-why">
            <div className="row sub-section-title home-title">
              <h2>Why Let's Find Dinner?</h2>
            </div>
            <p>Let's Find Dinner aims to address this challenge by providing a centralized platform that connects those in need with local food banks and volunteers. Our mission is to bridge the gap between resources and those who require them, making it easier for people to access essential food assistance.</p>
          </section>
        </div>
      </div>
    );
  }
   
   
   