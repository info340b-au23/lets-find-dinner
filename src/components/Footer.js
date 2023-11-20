export function Footer(props) {
    return (
        <footer>
            <div className="container">
                <p>Let's Find Dinner! was created by Soha Sultana, Richard Tran, Carol Yan, Raymond Smith.</p>
                <address>
                    Contact us at <a className="footer-link" href="mailto:informatics@uw.edu">informatics@uw.edu</a>, 
                    or at <a className="footer-link" href="tel:555-123-4567">(555)-123-4567</a>.
                </address>
                <p className="copyright">&copy; 2023 Let's Find Dinner!</p>
            </div>
        </footer>
    );
}