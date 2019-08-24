import React from 'react'
import Input from "./Input";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
      name: '',
      phone: '',
      email: '',
      country: '',
      password: '',
      passConfirm: '',
      code: '',
      id: '',
      codes: [],
      countries: []
    };

    this.id = 0;
    this.countries = [];
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

    let timer = null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.setState({
        [id]: input.value
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
    let country_c = this.codes
        .find((elem) => elem.name === country)
        .country_code;

    this.id += 1;
    let user = {
      id: this.id,
      name,
      phone,
      dialCode: code,
      country: country_c,
      email,
      password,
      passwordConfirmation: passConfirm
    };
    let response = await fetch('0.0.0.0:3002/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });

    let result = await response.json();
    console.log(result);

    this.setState({
      submitted: true,
      name: '',
      phone: '',
      email: '',
      country: '',
      password: '',
      passConfirm: '',
      code: '',
    })

    let inputs = document.querySelectorAll(".input > input");
    [...inputs].forEach((elem) => {
      elem.value = "";
      elem.classList.remove('entered');
    })

  }

  async componentDidMount() {
    let response = await fetch('0.0.0.0:3002/countries');
    let result = await response.json();
    this.countries = result.map(elem => {
      return {
        code: elem.dial_code,
        name: elem.name,
        country_code: elem.country_code
      }
    })
    this.getCodes();
    this.getCountries();
  }

  getCodes = () => {
    let codes =  this.countries
      .sort((a,b) => a.name - b.name)
      .map((elem) => {
        return  <option value={"+" + elem.code + " " + elem.name} />
      })
    this.setState({
      codes
    })
  }

  getCountries = () => {
    let countries =  this.countries
      .sort((a,b) => a.name - b.name)
      .map((elem) => {
     return  <option value={elem.name} />
    })
    this.setState({
      countries
    })
  }

  findingCode = (event) => {
    const value = event.target.value;
    this.enteredText();
    this.setState(prevState => {
      let filteredResult = prevState.filter((item) => {
        return item.toLowerCase().includes(value.toLowerCase());
      });
      codes: filteredResult;
    })
  }

  findingCountries = (event) => {
    const value = event.target.value;
    this.enteredText();
    this.setState(prevState => {
      let filteredResult = prevState.filter((item) => {
        return item.toLowerCase().includes(value.toLowerCase());
      });
      countries: filteredResult;
    })
  }

  render() {
    return (
      <div className='SignUp'>
        <h1>Sign Up</h1>
        <form className='SignUp__form'
              onSubmit={this.submit}
        >
          <div className='input name'>
           <Input type='name'
                  name="Name"
                  minLength="3"
                  maxLength="30"
                  onInput={this.enteredText}
           />
          </div>
          <div className='input phone'>
            <input list="code-select"
                   id="code"
                   type="tel"
                   pattern="^\+?\d{1,4}$"
                   onInput={this.findingCode}
            />
            <datalist id="code-select">
              {this.state.codes}
            </datalist>
            <label className='label'
                   htmlFor="code"
                   id="codeLabel">
              Code
            </label>
            <Input type='tel'
                   name="Phone"
                   id="phone"
                   pattern="^[0-9]+$"
                   minLength="9" maxLength="9"
                   onInput={this.enteredText}
            />
          </div>
          <div className='input email'>
            <Input type='email'
                   name="Email address"
                   onInput={this.enteredText}
            />
          </div>
          <div className='input country'>
            <input list="country-select"
                   id="country"
                   type="text"
                   onInput={this.findingCountries}
            />
            <datalist id="country-select">
              <select>{this.state.countries}</select>
            </datalist>
            <label className='label'
                              htmlFor="country"
                              id="countryLabel">
            Select country
            </label>
          </div>
          <div className='input pass'>
            <Input type='password'
                   name="Password"
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
                   onInput={this.checkPass}
            />
          </div>
          <div className='check'>
            <Input type='checkbox'
                   id="checkbox"
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
      <div className="submitted"
           style={{display :
           this.state.submitted?
             "flex"
           : "none"}}>
        <div className="submitted__img">
          <img src="../styles/shape.svg"/>
        </div>
        <div className="submitted__text">
          <h2>Great!</h2>
          <p>your account has been successfully created.</p>
        </div>
        <div className="submitted__img">
          <img src="../styles/arrow-dropdown-copy-11.svg"/>
        </div>
      </div>
    </div>
  )}
};

export default SignUp;
