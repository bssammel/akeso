import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';


// import * as sessionActions from '../../store/session';

function ProviderSignupFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [specialty, setSpecialty] = useState("");

  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  // const handleOnChange = () => {
  //   setProviderBool(!providerBool)
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
      setErrors({});
      return dispatch(
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        }
      );
  };

  const titles = ["MD", "DO", "NP", "PA", "RN", "LPN"];

  return (
    <>
      <h1>Tell us a bit about yourself!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Please choose the most accurate title for you: 
          <input
            type="text"
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
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Phone
          <input
            type="text"
            value={phone}
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
          I am signing up as Provider
          <input
            type="checkbox"
            value={providerBool}
            onChange={handleOnChange}
            
          />
        </label>
        {errors.providerBool && <p>{errors.providerBool}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default ProviderSignupFormModal;
