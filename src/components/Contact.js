export default function ContactForm() {
  const handleFormSubmit = () => {
    const emailInput = document.getElementById("email_input");
    const emailValue = emailInput.value;
    if (!isValidEmail(emailValue)) {
      alert("Please enter a valid email address.");
      return;
    }

    const zipCodeInput = document.getElementById("zip_code_input");
    const zipCodeValue = zipCodeInput.value;
    if (!isValidZipCode(zipCodeValue)) {
      alert("Please enter a valid 6-digit zip code.");
      return;
    }

    const isValidEmail = (email) => {
      const atIndex = email.indexOf('@');
      const dotIndex = email.lastIndexOf('.');
    
      return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
    }
    const isValidZipCode = (zipCode) => {
      if (zipCode.length === 6) {
        for (let i = 0; i < zipCode.length; i++) {
          if (!isDigit(zipCode[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    };
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
        <button id="contact-submit-btn" className="rounded non-search-btn btn--darkred" type="button" onClick={handleFormSubmit}>Apply</button>
      </form>
 );
}
}

