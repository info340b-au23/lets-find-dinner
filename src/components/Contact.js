export default function ContactForm(props) {
 return (
      <form>
        <h2 className="text-small">Fill out the form below.</h2>
        <div className="contact-information">
          <section class="contact-field">
            <label for="name_input">Name</label>
            < input id ="name_input" type="name" name="name">
              </input>
          </section>
          <section className="contact-field">
            <label for="email_input">Email</label>
            < input id ="email_input" type="email" name="email">
              </input>
          </section>
          <section className="contact-field">
            <label for="age_input">Age</label>
            < input id ="age_input" type="age" name="age">
              </input>
          </section>
          <section className="contact-field">
            <label for="phone_input">Phone</label>
            < input id ="phone_input" type="input" name="age">
              </input>
          </section>
          <section className="contact-field">
            <label for="zip_code_input">Zip Code</label>
            < input id ="zip_code_input" type="zip_code_input" name="zip_code_input">
              </input>
          </section>
          <section className="contact-field">
            <label for="food_bank_input">Food Bank Name</label>
            < input id ="food_bank_input" type="food_bank_input" name="food_bank_input">
              </input>
          </section>
        </div>
        <button id="contact-submit-btn" className="rounded non-search-btn btn--darkred" type="button">Apply</button>
      </form>
 )
}

