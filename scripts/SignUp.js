import React from 'react'
import Input from "./Input";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
      load: false,
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
    let country_c = this.countries
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

    this.setState({
      load: true
    })

    let response = await fetch('http://localhost:3002/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });

    let result = await response.json();

    let inputs = document.querySelectorAll(".input > input");
    [...inputs].forEach((elem) => {
      elem.value = "";
      elem.classList.remove('entered');
    })

    this.setState({
      submitted: true,
      load: false
    })

    setTimeout(() => {
      this.setState({
        submitted: false
      })
    }, 7000)
  }

  async componentDidMount() {
    let response = await fetch('http://localhost:3002/countries');
    let result = await response.json();
    this.countries = result.map(elem => {
      return {
        code: elem.dial_code,
        name: elem.name,
        country_code: elem.country_code
      }
    })

    let countries =  this.countries
      .sort((a,b) => a.name - b.name)
    this.setState({
      countries,
      codes: countries
    })
  }

  enteredText = (event) => {
    const input  = event.target;
    const id = input.id;
    if(input.classList.contains("label") || input.value){
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

  findingCode = (event) => {
    const value = event.target.value;
    this.enteredText(event);
    let filteredResult = this.countries.filter((item) => {
      return ("+" + item.code+"").includes(value);
    });
    this.setState( {
      codes: filteredResult,
    })
  }

  findingCountries = (event) => {
    const value = event.target.value;
    this.enteredText(event);

    let timer = null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      let filteredResult = this.countries.filter((item) => {
        return item.name.toLowerCase()
                .includes(value.toLowerCase());
        })
      this.setState({
        countries: filteredResult,
      })
    }, 1000)

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
          <div className='input code'>
            <input list="code-select"
                   id="code"
                   type="text"
                   onInput={this.findingCode}
            />
            <datalist id="code-select"
            >
              {this.state.codes.map((elem) => {
                return  (<option
                  value={"+" + elem.code }
                  key={elem.name + elem.code}/>)
              })}
            </datalist>
            <label className='label'
                   htmlFor="code"
                   id="countryLabel">
              Code
            </label>
              <Input type='tel'
                     name="Phone"
                     id="phone"
                     pattern="^[0-9]+$"
                     minLength="9" maxLength="11"
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
            <datalist id="country-select"
                      onClick={this.enteredText}>
              {this.state.countries.map((elem) => {
                return  (<option
                  value={elem.name}
                  key={elem.name + elem.code}/>)
              })}
            </datalist>
            <label className='label'
                   htmlFor="country"
                   id="countryLabel"
                   onClick={this.enteredText}>
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
          <div className="submit">
            <input type="submit"
                   id="submit"
                   //
                   value={this.state.load?
                        ""
                      : "CREATE AN ACCOUNT"}/>
            <div className={this.state.load? "load" : ""}>
            </div>
          </div>
          <div className="LogIn">
            Already have a 24Slides account?
            Click here to <a>log in</a> to your existing
            account and join a company team
          </div>
      </form>
      <div className={`submitted ${this.state.submitted?
             "visible"
           : ""}`
      }>
        <div className="submitted__img" id="done">
        </div>
        <div className="submitted__text">
          <h2>Great!</h2>
          <p>your account has been successfully created.</p>
        </div>
        <div className="submitted__img"
             id="exit"
             onClick={()=>{
               this.setState({
                 submitted: false
               })
             }}>
        </div>
      </div>
    </div>
  )}
};

export default SignUp;
