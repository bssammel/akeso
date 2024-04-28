import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './SignupForm.css'

import { addNewProvider } from '../../store/providers';
import * as sessionActions from '../../store/session';

function ProviderSignupFormModal() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("MD");
  const [specialty, setSpecialty] = useState("Family Medicine");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("")
  const [formView, setFormView] = useState("user")
  const [errors, setErrors] = useState({});
  
  const { closeModal } = useModal();

  const handleProviderSubmit = async (e) => {
    e.preventDefault();
      setErrors({});
      return await dispatch(addNewProvider({title, specialty}))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }});
  };

  const runUserDispatch = async () => {
    return await dispatch(sessionActions.signup({
      email,
      firstName,
      lastName,
      password,
      providerBool: true,
      phone
    })) 
    // .catch(async (res) => {
    //   const data = await res.json();
    //   if (data?.errors) {
    //     setErrors(data.errors);
    //   }});    
  }

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    const signupRes = await runUserDispatch() 


    if(signupRes.errors){
      setErrors(signupRes)
    } else {
      setFormView("provider")
    }
    // await dispatch(sessionActions.signup({
    //   email,
    //   firstName,
    //   lastName,
    //   password,
    //   providerBool: true,
    //   phone
    // })) 
    // .then(() => setFormView("provider"))
    // .catch(async (res) => {
    //   const data = await res.json();
    //   if (data?.errors) {
    //     setErrors(data.errors);
    //   }});
  } 

  const titles = ["MD", "DO", "NP", "PA", "RN", "LPN"];
  const specialties = ["Family Medicine", "Internal Medicine", "Pediatrics", "Endocrinology", "None"]

  return (
    <>
      <h1 style={{justifyContent:"center"}}>Sign Up as Provider</h1>
      <form>
        { formView === "user" &&
      <div className='user-creation'>
      <label>
          Email
          <input
            type="email"
            value={email}
            placeholder='address123@email.com'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
            pattern='^[^0-9]+$'
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            pattern='^[^0-9]+$'
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Phone
          <input
            type="tel"
            value={phone}
            placeholder='Digits only, 10 total. EX: 8005555555'
            pattern='^[0-9]+$'
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        {errors.phone && <p>{errors.phone}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {(errors.confirmPassword || confirmPassword !== password) && <p>{errors.confirmPassword}</p>}
        <div id='signup-submit'>
          <button 
            id='signup-submit' 
            type="button"
            disabled={
              password.length < 6 ||
              email.length < 3 ||
              confirmPassword.length < 6 ||
              lastName.length < 1 ||
              firstName.length < 1 ||
              confirmPassword !== password ||
              phone.length !== 10 
            }
            onClick={handleUserSubmit}>
              Next
          </button>
        </div>
        </div>}
        { formView === "provider" &&      
        <div className='provider-creation'>
        <label>
          Title
          <select
          name='title' id='title-select'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required>
            {titles.map((title) => (
                  <option key={title} value={title}>{title}
                  </option>))}
          </select>
        </label>
        {errors.title && <p>{errors.title}</p>}
        <label>
          Specialty
          <select
          name='specialty' id='specialty-select'
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          required>
            {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}
                  </option>))}
          </select>
        </label>
        {errors.specialty && <p>{errors.specialty}</p>}
        <div id='provider-submit'>
        <button 
            id='provider-submit' 
            type="button"
            disabled={
              password.length < 6 ||
              email.length < 3 ||
              confirmPassword.length < 6 ||
              lastName.length < 1 ||
              firstName.length < 1 ||
              confirmPassword !== password ||
              phone.length !== 10 
            }
            onClick={handleProviderSubmit}>
              Complete Sign Up
          </button>
          </div>
        </div>}
      </form>
    </>
  );
}

export default ProviderSignupFormModal;
