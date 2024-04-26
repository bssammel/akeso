import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './SignupForm.css'

import { addNewProvider } from '../../store/providers';
import * as sessionActions from '../../store/session';

function ProviderSignupFormModal() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [title, setTitle] = useState("MD");
  const [specialty, setSpecialty] = useState("Family Medicine");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState({});
  
  const { closeModal } = useModal();

  const asyncSignUp = async () => {
    await dispatch(sessionActions.signup({
      email,
      firstName,
      lastName,
      password,
      providerBool: true,
      phone
    }))
  }

  const asyncLogin = async () => {
    await dispatch(sessionActions.login({credential: email, password }))
  }
  const asyncNewProvider = async () => {
    await dispatch(addNewProvider({title, specialty}))
  }
  // const asyncGetPts = async () => {
  //   await dispatch(getAbbvPtsByPvdr)
  // }
  // const staggeredClose = async () => {
  //   console.log("staggered close is running")
  //   closeModal
  // }

const runDispatches = async() => {
  await asyncSignUp()
  .then(await asyncLogin())
  .then(await asyncNewProvider())
  // .then(await asyncGetPts())
  // .then(await asyncClose())
  // .then(await staggeredClose())
  .then(closeModal)
  .catch(async (res) => {
    const data = await res.json();
    if (data?.errors) {
      setErrors(data.errors);
    }});
}

  const handleSubmit = (e) => {
    e.preventDefault();
      setErrors({});
      return  runDispatches()
  };

  const titles = ["MD", "DO", "NP", "PA", "RN", "LPN"];
  const specialties = ["Family Medicine", "Internal Medicine", "Pediatrics", "Endocrinology", "None"]

  return (
    <>
      <h1>Sign Up as Provider</h1>
      <form onSubmit={handleSubmit}>
      <label>
          Email
          <input
            type="email"
            value={email}
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
            placeholder='Digits only, 10 total'
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
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
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
        <div id='signup-submit'>
          <button 
            id='signup-submit' 
            type="submit"
            disabled={
              password.length < 6 ||
              email.length < 3 ||
              confirmPassword.length < 6 ||
              lastName.length < 1 ||
              firstName.length < 1 ||
              confirmPassword !== password ||
              phone.length !== 10 
            }>
              Sign Up as a Provider
          </button>
        </div>
      </form>
    </>
  );
}

export default ProviderSignupFormModal;
