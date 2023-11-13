export default function ContactForm(props) {
 return (
    <form>
        <h2 class="text-small">Fill out the form below.</h2>
        <div class="contact-information">
          <section class="contact-field">
            <label for="name_input">Name</label>
            <div className="name_input" type="name" name="name">
             </div>
          </section>
          <section class="contact-field">
            <label for="email_input">Email</label>
            <div className="email_input" type="email" name="email">
            </div>
          </section>
          <section class="contact-field">
            <label for="age_input">Age</label>
            <div className="age_input" type="age" name="age">
                </div>
          </section>
          <section class="contact-field">
            <label for="phone_input">Phone</label>
            <div className="phone_input" type="input" name="age">
                </div>
          </section>
          <section class="contact-field">
            <label for="zip_code_input">Zip Code</label>
            <div className="zip_code_input" type="zip_code_input" name="zip_code_input">
            </div>
          </section>
        </div>
        <button id="contact-submit-btn" class="rounded non-search-btn btn--darkred" type="button">Apply</button>
      </form>
 )
}

function checkValidity() {
    
}


