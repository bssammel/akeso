import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';


import * as sessionActions from '../../store/session';
import './SignupForm.css'

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [providerBool, setProviderBool] = useState(false)
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState({});
  
  const { closeModal } = useModal();

  // if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleOnChange = () => {
    setProviderBool(!providerBool)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      console.log(`phone: ${phone}`);
      console.log(`providerBool: ${providerBool}`)
      return dispatch(
        sessionActions.signup({
          email,
          firstName,
          lastName,
          password,
          providerBool,
          phone
        })
      )
        .then(closeModal)
        .then(navigate)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        }
      );
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
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

export default SignupFormModal;
