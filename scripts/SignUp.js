import React from 'react'
import Input from "./Input";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      submited: false,
      name: '',
      phone: '',
      email: '',
      country: '',
      password: '',
      passConfirm: '',
      code: '',
      id: ''
    };

    this.id = 0;
    this.codes = [];
    this.password = '';
    this.submit = this.submit.bind(this)
  }

  enteredText = (event) => {
    const input  = event.target;
    const id = input.id;
    if(input.value){
      input.classList.add('entered');
    } else {
      input.classList.remove('entered');
    }
    let value = input.value;
    if(id === 'country'){
      value = this.codes
        .find((elem) => elem.name === value)
        .country_code;
      console.log(value)
    }

    let timer = null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.setState({
        [id]: value
      })
    }, 1000);

  }

  enterPass = (event) => {
    this.password = event.target.value;
    this.enteredText(event);
  }

  checkPass = (event) => {
    let timer = null;
    clearTimeout(timer);
    const input  = event.target;
    timer = setTimeout(() => {
      if(this.password === input.value){
        input.classList.remove("invalid")
      } else {
        input.classList.add("invalid")
      }
    }, 600);
    this.enteredText(event);
  }

  async submit(event) {
    event.preventDefault();
    const {
      name,
      phone,
      code,
      country,
      email,
      password,
      passConfirm
    } = this.state;
    this.id += 1;
    let user = {
      id: this.id,
      name,
      phone,
      dialCode: code,
      country,
      email,
      password,
      passwordConfirmation: passConfirm
    };
    let response = await fetch('http://localhost:3002/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });
    let result = await response.json();
  }

  async componentDidMount() {
    let response = await fetch('http://localhost:3002/countries');
    let result = await response.json();
    this.codes = result.map(elem => {
      return {
        code: elem.dial_code,
        name: elem.name,
        country_code: elem.country_code
      }
    })
  }

  render() {
    return (
      <div className='SignUp'>
        <h1>Sign Up</h1>
        <form className='SignUp__form'
              onSubmit={this.submit}>
          <div className='input name'>
           <Input type='name'
                  name="Name"
                  minLength="3"
                  maxLength="30"
                  required={true}
                  onInput={this.enteredText}
           />
          </div>
          <div className='input phone'>
            <Input type='tel'
                   name="Code"
                   id="code"
                   required={false}
                   pattern="^\+?\d{1,4}$"
                   onInput={this.enteredText}
            />
            <select className='select code' >
              <option>380</option>
            </select>
            <Input type='tel'
                   name="Phone"
                   id="phone"
                   required={false}
                   pattern="^[0-9]+$"
                   minLength="9" maxLength="9"
                   onInput={this.enteredText}
            />
          </div>
          <div className='input email'>
            <Input type='email'
                   name="Email address"
                   required={true}
                   onInput={this.enteredText}
            />
          </div>
          <div className='input country'>
            <Input type='text'
                   id="country"
                   name="Select country"
                   required={false}
                   onInput={this.enteredText}
            />
            <select className='select country' >
              <option>Ukraine</option>
            </select>
          </div>
          <div className='input pass'>
            <Input type='password'
                   name="Password"
                   required={true}
                   pattern='^[^s]+$'
                   minLength="5"
                   maxLength="128"
                   onInput={this.enterPass}
            />
          </div>
          <div className='input pass'>
            <Input type='password'
                   id="passConfirm"
                   name="Password confirmation"
                   required={true}
                   // minLength="8"
                   onInput={this.checkPass}
            />
          </div>
          <div className='check'>
            <Input type='checkbox'
                   id="checkbox"
                   required={true}
            />
            <p className='label check' htmlFor='checkbox'>
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
