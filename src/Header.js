function NavBar(props) {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <a href="index.html" className="navbar-brand ps-lg-4">Let's Find Dinner!</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-content">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><a className="nav-link active" href="about.html">Our Mission</a></li>
                        <li className="nav-item"><a className="nav-link active" href="contact.html">Volunteer</a></li>
                        <li className="nav-item"><a className="nav-link active" href="find-a-bank.html">Find a Food Bank</a></li>
                    </ul>
                    <ul className="navbar-nav d-flex pe-lg-4">
                        <li className="nav-item"><a className="nav-link active" href="login.html">Sign In</a></li>
                        <li className="nav-item"><a className="nav-link active" href="user-profile.html">Account</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default function Header(props) {    
    let titleClassList = "container-fluid m-lg-0";
    if (props.background) {
        titleClassList += " " + props.background + "-title";
    }
    
    return (
        <div className="header">
            <NavBar />
            <div className={titleClassList}>
                <div className="row shadow page-title">
                    <div className="col">
                        <h1>{props.title}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}