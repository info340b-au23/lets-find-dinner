export function NavBar(props) {
    const navItemClass = "nav-item";
    const navLinkActiveClass = "nav-link active";

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <a href="index.html" className="navbar-brand ps-lg-4">Let's Find Dinner!</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar-content">
                    <ul className="navbar-nav me-auto">
                        <li className={navItemClass}><a className={navLinkActiveClass} href="about.html">Our Mission</a></li>
                        <li className={navItemClass}><a className={navLinkActiveClass} href="contact.html">Volunteer</a></li>
                        <li className={navItemClass}><a className={navLinkActiveClass} href="find-a-bank.html">Find a Food Bank</a></li>
                    </ul>
                    <ul className="navbar-nav d-flex pe-lg-4">
                        <li className={navItemClass}>
                            <a className={navLinkActiveClass} href="login.html">
                                {props.loggedIn ? "Sign Out" : "Sign In"}
                            </a>
                        </li>
                        <li className={navItemClass}><a className={navLinkActiveClass} href="user-profile.html">Account</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}