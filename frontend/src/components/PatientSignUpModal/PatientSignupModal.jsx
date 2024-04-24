import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { addNewPatient } from '../../store/patients';


// import * as sessionActions from '../../store/session';

function PatientSignupFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [dob, setDob] = useState("")
  const [sex, setSex] = useState("");
  const [gender, setGender] = useState("");
  const [insurance, setInsurance] = useState("");
  const [religion, setReligion] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [language, setLanguage] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [name911, setName911] = useState("");
  const [phone911, setPhone911] = useState("");
  const [street911, setStreet911] = useState("");
  const [city911, setCity911] = useState("");
  const [state911, setState911] = useState("");
  const [relationship911, setRelationship911] = useState("");
  const [pharmName, setPharmName] = useState("");  
  const [pharmStreet, setPharmStreet] = useState("");
  const [pharmCity, setPharmCity] = useState("");
  const [pharmState, setPharmState] = useState("");


  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
      setErrors({});
      return dispatch(
        addNewPatient({
            dob,
            sex,
            gender,
            insurance,
            religion,
            relationshipStatus,
            language,
            ethnicity,
            street,
            city,
            state,
            name911,
            phone911,
            street911,
            city911,
            state911,
            relationship911,
            pharmName,  
            pharmStreet,
            pharmCity,
            pharmState,
        })
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


  const sexMarkerArr = ["M", "F", "X"] 
  const genderArr = ["Cisgender Man","Cisgender Woman","Transgender Man","Transgender Woman","Nonbinary"]
  const religionArr = ["Agnostic", "Atheist", "Hindu", "Buddhist", "Muslim", "Christian (any denomination)", "Jehovah's Witness", "Jewish"]
  const relationshipStatusArr = ["Divorced", "Legally Separated", "Married", "Other", "Significant Other", "Single", "Widowed"]
  const languageArr = ["English", "Mandarin Chinese", "Spanish", "Hindi", "French", "Standard Arabic", "Bengali", "Russian", "Portuguese", "Urdu","German", "Japanese", "Other"];
  const ethnicityArr = ["White", "Black", "Asian", "Native American or Alaska Native", "Native Hawaiian or Other Pacific Islander", "Some other race", "Two or more races"];
  const relationship911Arr = ["Spouse", "Parent", "Child", "Sibling", "Grandparent", "Close Friend", "Partner", "Other Relative"];




  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <h1>Tell us a bit about yourself!</h1>
      <form onSubmit={handleSubmit}>

        <h3>Basic Details</h3>
      <label>
          Date of Birth
          <input
            type="date"
            name= "dob"
            value={dob}
            min="1900-01-01"
            max={currentDate}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </label>
        {errors.dob && <p>{errors.dob}</p>}
        <label>
          Please select your legal sex marker:
          <select
          name='sex' id='sex-marker-select'
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required>
            {sexMarkerArr.map((sexMarker) => (
                  <option key={sexMarker} value={sexMarker}>{sexMarker}
                  </option>))}
          </select>
        </label>
        {errors.sex && <p>{errors.sex}</p>}
        <label>
          Please select the gender you identify most with:
          <select
          name='gender' id='gender-select'
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required>
            {genderArr.map((genderOpt) => (
                  <option key={genderOpt} value={genderOpt}>{genderOpt}
                  </option>))}
          </select>
        </label>
        {errors.gender && <p>{errors.gender}</p>}
        <label>
          Insurance
          <input
            type="text"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
            required
          />
        </label>
        {errors.insurance && <p>{errors.insurance}</p>}
        <label>
          Religion:
          <select
          name='religion' id='religion-select'
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
          required>
            {religionArr.map((religionOpt) => (
                  <option key={religionOpt} value={religionOpt}>{religionOpt}
                  </option>))}
          </select>
        </label>
        {errors.religion && <p>{errors.religion}</p>}
        <label>
          Relationship Status:
          <select
          name='relationshipStatus' id='relationshipStatus-select'
          value={relationshipStatus}
          onChange={(e) => setRelationshipStatus(e.target.value)}
          required>
            {relationshipStatusArr.map((relationshipStatusOpt) => (
                  <option key={relationshipStatusOpt} value={relationshipStatusOpt}>{relationshipStatusOpt}
                  </option>))}
          </select>
        </label>
        {errors.relationshipStatus && <p>{errors.relationshipStatus}</p>}
        <label>
          Language:
          <select
          name='language' id='language-select'
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required>
            {languageArr.map((languageOpt) => (
                  <option key={languageOpt} value={languageOpt}>{languageOpt}
                  </option>))}
          </select>
        </label>
        {errors.language && <p>{errors.language}</p>}
        <label>
          Race:
          <select
          name='ethnicity' id='ethnicity-select'
          value={ethnicity}
          onChange={(e) => setEthnicity(e.target.value)}
          required>
            {ethnicityArr.map((ethnicityOpt) => (
                  <option key={ethnicityOpt} value={ethnicityOpt}>{ethnicityOpt}
                  </option>))}
          </select>
        </label>
        {errors.ethnicity && <p>{errors.ethnicity}</p>}
        
        <h3>Contact Information</h3>
        <label>
          Street
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </label>
        {errors.street && <p>{errors.street}</p>}
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        {errors.city && <p>{errors.city}</p>}
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        {errors.state && <p>{errors.state}</p>}

        <h3>Emergency Contact</h3>
        <label>
          Name:
          <input
            type="text"
            value={name911}
            onChange={(e) => setName911(e.target.value)}
            required
          />
        </label>
        {errors.name911 && <p>{errors.name911}</p>}
        <label>
          Phone:
          <input
            type="text"
            value={phone911}
            onChange={(e) => setPhone911(e.target.value)}
            required
          />
        </label>
        {errors.phone911 && <p>{errors.phone911}</p>}
        <label>
          Street:
          <input
            type="text"
            value={street911}
            onChange={(e) => setStreet911(e.target.value)}
            required
          />
        </label>
        {errors.street911 && <p>{errors.street911}</p>}
        <label>
          City:
          <input
            type="text"
            value={city911}
            onChange={(e) => setCity911(e.target.value)}
            required
          />
        </label>
        {errors.city911 && <p>{errors.city911}</p>}
        <label>
          State:
          <input
            type="text"
            value={state911}
            onChange={(e) => setState911(e.target.value)}
            required
          />
        </label>
        {errors.state911 && <p>{errors.state911}</p>}
        <label>
          State:
          <input
            type="text"
            value={state911}
            onChange={(e) => setState911(e.target.value)}
            required
          />
        </label>
        {errors.state911 && <p>{errors.state911}</p>}
        <label>
          Relationship of Emergency Contact:
          <select
          name='relationship911' id='relationship911-select'
          value={relationship911}
          onChange={(e) => setRelationship911(e.target.value)}
          required>
            {relationship911Arr.map((relationship911Opt) => (
                  <option key={relationship911Opt} value={relationship911Opt}>{relationship911Opt}
                  </option>))}
          </select>
        </label>
        {errors.relationship911 && <p>{errors.relationship911}</p>}

        <h3>Pharmacy Information</h3>
        <label>
          Name:
          <input
            type="text"
            value={pharmName}
            onChange={(e) => setPharmName(e.target.value)}
            required
          />
        </label>
        {errors.pharmName && <p>{errors.pharmName}</p>}
        <label>
          Street Address
          <input
            type="text"
            value={pharmStreet}
            onChange={(e) => setPharmStreet(e.target.value)}
            required
          />
        </label>
        {errors.pharmStreet && <p>{errors.pharmStreet}</p>}
        <label>
          City
          <input
            type="text"
            value={pharmCity}
            onChange={(e) => setPharmCity(e.target.value)}
            required
          />
        </label>
        {errors.pharmCity && <p>{errors.pharmCity}</p>}
        <label>
          State
          <input
            type="text"
            value={pharmState}
            onChange={(e) => setPharmState(e.target.value)}
            required
          />
        </label>
        {errors.pharmState && <p>{errors.pharmState}</p>}

        <button type="submit">Add Patient</button>
      </form>
    </>
  );
}

export default PatientSignupFormModal;
