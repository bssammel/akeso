## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s). This will be critical when it comes to limiting patient and provider actions. 

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/auth/user
  - Body: none

- Successful Response when there is a logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "imageURL": "stringforurlfrompotentialawsimplementation"
        "providerBool": TRUE
      }
    }
    ```

### Get User by ID

Returns the information about a user by ID.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/users/:id
  - Body: none

- Successful Response when user with matching ID exists

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "Keiran",
        "lastName": "Krawa",
        "email": "keirankrawa@gmail.com",
        "imageURL": "stringforurlfrompotentialawsimplementation"
        "providerBool": TRUE
        "provider" : {
          "title": "MD",
          "specialty": "Family Medicine"
          "911card"
          "location"
          "activePatient" Agg
          "currentDateApptCount" AGG
          "weeklyApptCount" AGG
        }
      }
    }
    ```
OR 
  ```json
   {
      "user": {
        "id": 2,
        "firstName": "Simon",
        "lastName": "Krawa",
        "email": "simonkrawa@gmail.com",
        "imageURL": "stringforurlfrompotentialawsimplementation"
        "providerBool": FALSE
        "patient": {
          "very long list of patient data": I need to fill this in correctly
        }
      }
    }
  ```


- Error Response: Couldn't find a User with specified ID

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User couldn't be found"
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/auth/login
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "providerBool": TRUE
      }
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", //
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/auth/signup
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "first_name": "John",
      "last_name": "Smith",
      "email": "john.smith@gmail.com",
      "password": "secret password",
      "providerBool" : TRUE
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "first_name": "John",
        "last_name": "Smith",
        "email": "john.smith@gmail.com"
        "providerBool" : TRUE
      }
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```


- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "firstName": "First Name is required",
        "lastName": "Last Name is required",
        "providerBool": "Must know if user is provider or not",      }
    }
    ```

## Patients

### Get all Patients 

Returns all the patients.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/search
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "patients": [
        {
          "id": 1,
          "age": 25,
          "firstName":"Simon",
          "lastName":"Krawa",
          "sex": "Male",
          "email":"bssammel@gmail.com",
          "phone":"3524155409",
        },
        {
          "id": 3,
          "age": 30,
          "firstName":"Sarah",
          "lastName":"Smith",
          "sex": "Female",
          "email":"sarahtest@aa.io",
          "phone":"1234567890",
        },
        {
          "id": 5,
          "age": 52,
          "firstName":"Sean",
          "lastName":"Kozlowski",
          "sex": "Male",
          "email":"sean@aa.io",
          "phone":"1234567891",
        },
      ]
    }
    ```

### Get all abbv patients of the Current User Provider

Returns all the patients assigned to the current user who must be a provider.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/patients/current
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "patients": [
        {
          "id": 1,
          "age": 25,
          "firstName":"Simon",
          "lastName":"Krawa",
          "sex": "Male",
          "email":"bssammel@gmail.com",
          "phone":"3524155409",
        },
        {
          "id": 5,
          "age": 52,
          "firstName":"Sean",
          "lastName":"Kozlowski",
          "sex": "Male",
          "email":"sean@aa.io",
          "phone":"1234567891",
        },
      ]
    }
    ```

### Get details of a patient from an id

Returns the details of a patient specified by their id.

- Require Authentication: True
- Require Authourization: True, patient must belong to current provider or be the current patient
- Request

  - Method: GET
  - URL: /api/patients/:patientId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "age": 25,
      "firstName":"Simon",
      "lastName":"Krawa",
      "sex": "Male",
      "email":"bssammel@gmail.com",
      "phone":"3524155409",
      "gender":"Transgender man",
      "insurance": "BCBS Federal",
      "religion": "Jewish",
      "relationshipStatus": "Married",
      "language":"English",
      "ethnicity":"White",
      "street":"23 Dunkard Ave",
      "city":"Uniontown",
      "state":"PA",
      "name911":"Keiran Krawa",
      "phone911":"4077937788",
      "street911":"23 Dunkard Ave",
      "city911":"Uniontown",
      "state911":"PA",
      "relationship911":"Spouse",
      "pharmName":"Hixenbaugh's Drug Store",
      "pharmStreet":"304 Morgantown St",
      "pharmCity":"Uniontown",
      "pharmState":"PA",
    },
    ```

- Error response: Couldn't find a patient with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Patient couldn't be found"
    }
    ```

### Create a patient

Creates and returns a new patient.

- Require Authentication: true, current user will become the patient user
- Request

  - Method: POST
  - URL: /api/patients
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "userId": 1,
      "sex": "Male",
      "dob":"01/15/1999",
      "gender":"Transgender man",
      "insurance": "BCBS Federal",
      "religion": "Jewish",
      "relationshipStatus": "Married",
      "language":"English",
      "ethnicity":"White",
      "street":"23 Dunkard Ave",
      "city":"Uniontown",
      "state":"PA",
      "name911":"Keiran Krawa",
      "phone911":"4077937788",
      "street911":"23 Dunkard Ave",
      "city911":"Uniontown",
      "state911":"PA",
      "relationship911":"Spouse",
      "pharmName":"Hixenbaugh's Drug Store",
      "pharmStreet":"304 Morgantown St",
      "pharmCity":"Uniontown",
      "pharmState":"PA",
    },
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "age": 25,
      "firstName":"Simon",
      "lastName":"Krawa",
      "sex": "Male",
      "email":"bssammel@gmail.com",
      "phone":"3524155409",
      "gender":"Transgender man",
      "insurance": "BCBS Federal",
      "religion": "Jewish",
      "relationshipStatus": "Married",
      "language":"English",
      "ethnicity":"White",
      "street":"23 Dunkard Ave",
      "city":"Uniontown",
      "state":"PA",
      "name911":"Keiran Krawa",
      "phone911":"4077937788",
      "street911":"23 Dunkard Ave",
      "city911":"Uniontown",
      "state911":"PA",
      "relationship911":"Spouse",
      "pharmName":"Hixenbaugh's Drug Store",
      "pharmStreet":"304 Morgantown St",
      "pharmCity":"Uniontown",
      "pharmState":"PA",
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "address": "Street address is required",
        "dob":"Date of Birth is required",
        "city": "City is required",
        "state": "State is required",
        "sex": "Sex is required",
      }
    }
    ```

### Edit a patient

Updates and returns an existing patient.

- Require Authentication: true
- Require proper authorization: business must belong to the current user, whether they are a provider for the patient or the patient themselves
- Request

  - Method: POST
   - URL: /api/patients/:patientId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "userId": 1,
      "sex": "Male",
      "dob":"01/15/1999",
      "gender":"Transgender man",
      "insurance": "BCBS Federal",
      "religion": "Jewish",
      "relationshipStatus": "Married",
      "language":"English",
      "ethnicity":"White",
      "street":"23 Dunkard Ave",
      "city":"Uniontown",
      "state":"PA",
      "name911":"Keiran Krawa",
      "phone911":"4077937788",
      "street911":"23 Dunkard Ave",
      "city911":"Uniontown",
      "state911":"PA",
      "relationship911":"Spouse",
      "pharmName":"Hixenbaugh's Drug Store",
      "pharmStreet":"304 Morgantown St",
      "pharmCity":"Uniontown",
      "pharmState":"PA",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "age": 25,
      "firstName":"Simon",
      "lastName":"Krawa",
      "sex": "Male",
      "email":"bssammel@gmail.com",
      "phone":"3524155409",
      "gender":"Transgender man",
      "insurance": "BCBS Federal",
      "religion": "Jewish",
      "relationshipStatus": "Married",
      "language":"English",
      "ethnicity":"White",
      "street":"23 Dunkard Ave",
      "city":"Uniontown",
      "state":"PA",
      "name911":"Keiran Krawa",
      "phone911":"4077937788",
      "street911":"23 Dunkard Ave",
      "city911":"Uniontown",
      "state911":"PA",
      "relationship911":"Spouse",
      "pharmName":"Hixenbaugh's Drug Store",
      "pharmStreet":"304 Morgantown St",
      "pharmCity":"Uniontown",
      "pharmState":"PA",
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "address": "Street address is required",
        "dob":"Date of Birth is required",
        "city": "City is required",
        "state": "State is required",
        "sex": "Sex is required",
      }
    }
    ```

- Error response: Couldn't find a patient with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Patient couldn't be found"
    }
    ```

### Delete a patient???????

Deletes an existing patint.

- Require Authentication: true
- Require proper authorization: business must belong to the current user
- Request

  - Method: POST
  - URL: /api/businesses/:business_id
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a business with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Business couldn't be found"
    }
    ```

## CONDITIONS

### Get all Conditions of a Patient by ID

Returns all the conditions associated with a patient

- Require Authentication: true
- Requires that the current user be the patient or provider assigned to patient.
- Request

  - Method: GET
  - URL: /api/patients/:id/conditions
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "conditions": [
        {
          "id": 1,
          "patientId":1,
          "providerId":1,
          "name": "Hypermobility",
          "description": "Identified post ACFL tear",
          "status": "Chronic",
        },
        {
          "id": 2,
          "patientId":1,
          "providerId":1,
          "name": "Anxiety",
          "description": "Original DX with previous physician, managed",
          "status": "Chronic",
        },
        {
          "id": 3,
          "patientId":1,
          "providerId":1,
          "name": "Depression",
          "description": "Original DX with previous physician, managed",
          "status": "Chronic",
        }
      ]
    }

    ```
- Error response: Couldn't find a patient with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Patient couldn't be found"
    }
    ```

### Add a Condition to a Patient

Create and return a new condition for a patient specified by id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/patient/:patientId/conditions
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "providerId":1,
      "name": "Depression",
      "description": "Original DX with previous physician, managed",
      "status": "Chronic",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 3,
          "patientId":1,
          "providerId":1,
          "name": "Depression",
          "description": "Original DX with previous physician, managed",
          "status": "Chronic",
      "created_at": "2021-11-19 20:39:36",
      "updated_at": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "providerId":"Provider must be initiating request",
        "name": "Condtion name must be included",
        "status": "Status must be included for condition"
      }
    }
    ```

- Error response: Couldn't find a patient with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Patient couldn't be found"
    }
    ```
### Edit a condition by ID

Update and return a condition specified by id.

- Require Authentication: true
- Request

  - Method: PUT
  - URL: /api/patient/:patientId/conditions/:id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 3,
      "patientId":1,
      "providerId":1,
      "name": "Depression",
      "description": "Original DX with previous physician, managed, family history of SNRI usage more effective",
      "status": "Chronic",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 3,
      "patientId":1,
      "providerId":1,
      "name": "Depression",
      "description": "Original DX with previous physician, managed, family history of SNRI usage more effective",
      "status": "Chronic",
      "created_at": "2021-11-19 20:39:36",
      "updated_at": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "providerId":"Provider must be initiating request",
        "name": "Treatment name must be included",
        "dosage": "Dosage is required",
        "frequency": "Frequency is required",
      }
    }
    ```

- Error response: Couldn't find a condition with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Condition couldn't be found"
    }
    ```

### Delete a Condition

Delete an existing condition.

- Require Authentication: true
- Require proper authorization: Condition must belong to the current user or the provider of the patient
- Request

  - Method: DELETE
  - URL: /api/conditions/:conditionId/
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Condition couldn't be found"
    }
  

## TREATMENTS

### Get all Treatments of a Patient by ID

Returns all the treatments associated with a patient

- Require Authentication: true
- Requires that the current user be the patient or provider assigned to patient.
- Request

  - Method: GET
  - URL: /api/patients/:id/treatments
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "treatments": [
        {
          "id": 1,
          "patientId":1,
          "providerId": 1,
          "name": "Physical Therapy",
          "dosage": "Not Applicable",
          "frequency": "2 times a Week",
        },
        {
          "id": 2,
          "patientId":1,
          "providerId":1,
          "name": "Claritin",
          "dosage": "Whatever that dosage is",
          "frequency": "1 time a Day",
        }
      ]
    }

    ```
- Error response: Couldn't find a patient with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Patient couldn't be found"
    }
    ```

### Add a treatment to a Patient

Create and return a new treatment for a patient specified by id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/patient/:patientId/treatments
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "patientId":1,
      "providerId": 1,
      "name": "Physical Therapy",
      "dosage": "Not Applicable",
      "frequency": "2 times a Week",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "patientId":1,
      "providerId": 1,
      "name": "Physical Therapy",
      "dosage": "Not Applicable",
      "frequency": "2 times a Week",
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "providerId":"Provider must be initiating request",
        "name": "Treatment name must be included",
        "dosage": "Dosage is required",
        "frequency": "Frequency is required",
      }
    }
    ```

- Error response: Couldn't find a patient with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Patient couldn't be found"
    }
    ```

### Edit a treatment by ID

Update and return a treatment specified by id.

- Require Authentication: true
- Request

  - Method: PUT
  - URL: /api/patient/:patientId/treatments/:treatmentid
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "patientId":1,
      "providerId": 1,
      "name": "Physical Therapy",
      "dosage": "Not Applicable",
      "frequency": "3 times a Week",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "patientId":1,
      "providerId": 1,
      "name": "Physical Therapy",
      "dosage": "Not Applicable",
      "frequency": "3 times a Week",
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "providerId":"Provider must be initiating request",
        "name": "Treatment name must be included",
        "dosage": "Dosage is required",
        "frequency": "Frequency is required",
      }
    }
    ```

- Error response: Couldn't find a treatment with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Treatment couldn't be found"
    }
    ```

### Delete a Treatment

Delete an existing treatment.

- Require Authentication: true
- Require proper authorization:  Treatment must belong to the current user or the provider of the patient
- Request

  - Method: DELETE
  - URL: /api/treaments/:treamentId/
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Treatment with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Treatment couldn't be found"
    }
    ```

## APPOINTMENTS -- To be completed 

### Get all Apppointments of a Patient by ID

!!!!-----***html type datetime-local***-----!!!!
 
Returns all the appointments associated with a patient

- Require Authentication: true
- Requires that the current user be the patient
- Request

  - Method: GET
  - URL: /api/patients/:id/appointments
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "appointments": [
        {
          "id": 1,
          "patientId":1,
          "providerId": 1,
          "apptType": "followup",
          "chiefComplaint": "Follow-up for ingrown/infected nail",
          "startTime": "2024-04-03T10:00",
          "endTime": "2024-04-03T10:30",
          "newPatient": false,
        },
        {
          "id": 2,
          "patientId":1,
          "providerId": 1,
          "apptType": "annual",
          "chiefComplaint": "Annual Wellness",
          "startTime": "2025-01-15T14:00",
          "endTime": "2025-01-15T14:30",
          "newPatient": false,
        },
        {
          "id": 3,
          "patientId":1,
          "providerId": 3,
          "apptType": "routine",
          "chiefComplaint": "Quarterly Labs and Monitoring",
          "startTime": "2024-10-T16:30",
          "endTime": "2024-10-15T17:00",
          "newPatient": true,
        }
      ]
    }

    ```
- Error response: Couldn't find a patient with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Patient couldn't be found"
    }
    ```

### Add an appointment for patient and provider

Create and return a new treatment for a patient specified by id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/patient/:patientId/treatments
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "patientId":1,
      "providerId": 1,
      "apptType": "followup",
      "chiefComplaint": "Follow-up for ingrown/infected nail",
      "startTime": "2024-04-03T10:00",
      "endTime": "2024-04-03T10:30",
      "newPatient": false,
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "patientId":1,
      "providerId": 1,
      "apptType": "followup",
      "chiefComplaint": "Follow-up for ingrown/infected nail",
      "startTime": "2024-04-03T10:00",
      "endTime": "2024-04-03T10:30",
      "newPatient": false,
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "providerId":"Provider must be initiating request",
        "name": "Treatment name must be included",
        "dosage": "Dosage is required",
        "frequency": "Frequency is required",
      }
    }
    ```

- Error response: Couldn't find a patient with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Patient couldn't be found"
    }
    ```

### Edit a treatment by ID

Update and return a treatment specified by id.

- Require Authentication: true
- Request

  - Method: PUT
  - URL: /api/patient/:patientId/treatments/:treatmentid
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "patientId":1,
      "providerId": 1,
      "name": "Physical Therapy",
      "dosage": "Not Applicable",
      "frequency": "3 times a Week",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "patientId":1,
      "providerId": 1,
      "name": "Physical Therapy",
      "dosage": "Not Applicable",
      "frequency": "3 times a Week",
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "providerId":"Provider must be initiating request",
        "name": "Treatment name must be included",
        "dosage": "Dosage is required",
        "frequency": "Frequency is required",
      }
    }
    ```

- Error response: Couldn't find a treatment with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Treatment couldn't be found"
    }
    ```

### Delete a Treatment

Delete an existing treatment.

- Require Authentication: true
- Require proper authorization:  Treatment must belong to the current user or the provider of the patient
- Request

  - Method: DELETE
  - URL: /api/treaments/:treamentId/
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Treatment couldn't be found"
    }
    ```
