import React from 'react'

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      submited: false,
    };
  }



  render() {
    return (
      <div className='SignUp'>
        <h1>Sign Up</h1>
        <form className='SignUp__form'>
          <div className='input name'>
            <input type="text" id="name" required/>
            <label className='label' for="name">
              Name
            </label>
          </div>
          <div className='input phone'>
            <input type="tel" id="code"
                   minlength="3"
                   maxlength="3"
                   pattern="^[0-9]+$"/>
            <label className='label' for="code">
              Code
            </label>
            <select className='select code' >
              <option>380</option>
            </select>
            <input type="tel" id="phone" pattern="^[0-9]+$"
                   minlength="9" maxlength="9" />
            <label className='label' id="phoneLabel" for="phone">
              Phone number
            </label>
          </div>
          <div className='input email'>
            <input type="email" id="email" required/>
            <label className='label' for="email">
              Email address
            </label>
          </div>
          <div className='input country'>
            <input type="text" id="country"/>
            <label className='label' for="country">
              Select country
            </label>
            <select className='select country'>
              <option>Ukraine</option>
            </select>
          </div>
          <div className='input pass'>
            <input type="password" id="pass" minlength="6"/>
            <label className='label' for="pass">
              Password
            </label>
          </div>
          <div className='input pass'>
            <input type="password" id="passConfirm" minlength="6"/>
            <label className='label' for="passConfirm">
              Password сonfirmation
            </label>
          </div>
          <div className='check'>
            <input type="checkbox" id="checkbox" required />
            <label for="checkbox"></label>
            <p className='label check'>
              Yes, I'd like to recieve the very occasional email
              with information on new services and discounts
            </p>
          </div>
          <input type="submit" id="submit" value="CREATE AN ACCOUNT"/>
          <div className="LogIn">
            Already have a 24Slides account?
            Click here to <a>log in</a> to your existing
            account and join a company team
          </div>
      </form>
      </div>
  )}
};

export default SignUp