import React, { Component } from 'react';
import FormInput from '../../components/FormInput/FormInput';
import { auth, signInWithGoogle } from '../../firebase/FireBaseUtils';
import CustomButton from '../CustomButton/CustomButton';

import './signIn.scss';

class SignIn extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       email: '',
       password: ''
    }
  }
  
  handleSubmit = async e => {
    e.preventDefault()

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email,password)
      this.setState({ email: '', password: '' })
    } catch (err) {
      console.error(err)
    }
  }
  
  handleChange = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className='sign-in'>
        <h2>I have already an account</h2>
        <span>Sign in with your email and pasword</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput 
          type="email" 
          name="email" 
          value={this.state.email}
          handleChange={this.handleChange}
          label='email' 
          required/>
          <FormInput 
          type="password" 
          name="password" 
          value={this.state.password} 
          handleChange={this.handleChange} 
          label='password' 
          required/>
          <div className="buttons">
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignin>
            {' '}
            Sign In with Google
            {' '}
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;

