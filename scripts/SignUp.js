import React from 'react'

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      submited: false,
    };

    this.password = '';
  }

  enteredText(event) {
    const elem  = event.target;
    if(elem.value){
      elem.classList.add('entered');
    } else {
      elem.classList.remove('entered');
    }
    console.log(event)

  }

  enterPass(event) {
    console.log(event)
    this.password = event.target.value;
    this.enteredText(event);
  }


  checkPass(event) {
    event.persist();
    const input  = event.target.value;
    // const enterdText = () => {
      if(this.password === input.value){
        return  input.validity.valid = true;
      } else return  input.validity.valid = false;
    // }
    // debounce(enterdText(),500);
    this.enteredText(event);
  }

  render() {
    return (
      <div className='SignUp'>
        <h1>Sign Up</h1>
        <form className='SignUp__form'>
          <div className='input name'>
            <input type="text" id="name"
                   onInput={this.enteredText}
                   required/>
            <label className='label' htmlFor="name">
              Name
            </label>
          </div>
          <div className='input phone'>
            <input type="tel" id="code"
                   minLength="2"
                   maxLength="4"
                   onChange={this.enteredText}
                   pattern="^[0-9]+$"/>
            <label className='label' htmlFor="code">
              Code
            </label>
            <select className='select code' >
              <option>380</option>
            </select>
            <input type="tel" id="phone" pattern="^[0-9]+$"
                   minLength="9" maxLength="9"
                   onChange={this.enteredText}/>
            <label className='label' id="phoneLabel"
                   htmlFor="phone">
              Phone number
            </label>
          </div>
          <div className='input email'>
            <input type="email" id="email" required
                   onChange={this.enteredText}/>
            <label className='label' htmlFor="email">
              Email address
            </label>
          </div>
          <div className='input country'>
            <input type="text" id="country"
                   onChange={this.enteredText}/>
            <label className='label' htmlFor="country">
              Select country
            </label>
            <select className='select country'>
              <option>Ukraine</option>
            </select>
          </div>
          <div className='input pass'>
            <input type="password" id="pass" minLength="6"
                   onChange={this.enteredText}/>
            <label className='label' htmlFor="pass">
              Password
            </label>
          </div>
          <div className='input pass'>
            <input type="password" id="passConfirm"
                   minLength="6"
                   onChange={debounce(this.checkPass,500)}/>
            <label className='label' htmlFor="passConfirm">
              Password confirmation
            </label>
          </div>
          <div className='check'>
            <input type="checkbox" id="checkbox" required />
            <label htmlFor="checkbox"></label>
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

export default SignUp;

function debounce(f, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      f.call(this, ...args);
    }, delay);
  };
}