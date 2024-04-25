import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useModal } from '../../../context/Modal';
import { addNewProvider } from '../../../store/providers';


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
      return dispatch(addNewProvider({title, specialty})
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
  const specialties = ["Family Medicine", "Internal Medicine", "Pediatrics", "Endocrinology"]

  return (
    <>
      <h1>Tell us a bit about yourself!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
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
          Specialty:
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
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default ProviderSignupFormModal;
