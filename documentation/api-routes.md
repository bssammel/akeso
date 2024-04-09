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

Create and return a new review for a business specified by id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/businesses/:business_id/reviews
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "review": "This was an awesome business!",
      "url": "url",
      "stars": 5
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
      "userId": 1,
      "business_id": 1,
      "review": "This was an awesome business!",
      "stars": 5,
      "url": "url",
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
        "review": "Review text is required and must be between 85-2000 chars",
        "stars": "Stars must be an integer from 1 to 5"
      }
    }
    ```

- Error response: Couldn't find a business with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "business couldn't be found"
    }
    ```

- Error response: Review from the current user already exists for the business

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already has a review for this business"
    }
    ```

### Add an Image to a Review based on the Review's id

Create and return a new image for a review specified by id.

- Require Authentication: true
- Require proper authorization: Review must belong to the current user
- Request

  - Method: POST
  - URL: /api/reviews/:review_id/images
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "url": "image url"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "url": "image url"
    }
    ```

- Error response: Couldn't find a Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

- Error response: Cannot add any more images because there is a maximum of 10
  images per resource

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Maximum number of images for this resource was reached"
    }
    ```

### Edit a Review

Update and return an existing review.

- Require Authentication: true
- Require proper authorization: Review must belong to the current user
- Request

  - Method: PUT
  - URL: /api/reviews/:review_id/
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "review": "This was an awesome business!",
      "stars": 5,
      "url": "url",
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "business_id": 1,
      "review": "This was an awesome business!",
      "stars": 5,
      "created_at": "2021-11-19 20:39:36",
      "updated_at": "2021-11-20 10:06:40"
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
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5"
      }
    }
    ```

- Error response: Couldn't find a Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

### Delete a Review

Delete an existing review.

- Require Authentication: true
- Require proper authorization: Review must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/reviews/:review_id/
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
      "message": "Review couldn't be found"
    }
    ```

## IMAGES

### Delete a business Image

Delete an existing image for a business.

- Require Authentication: true
- Require proper authorization: business must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/businesses/:business_id/images/:image_id
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

- Error response: Couldn't find a business Image with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Business Image couldn't be found"
    }
    ```

### Delete a Review Image

Delete an existing image for a Review.

- Require Authentication: true
- Require proper authorization: Review must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/reviews/:review_id/images/:image_id
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

- Error response: Couldn't find a Review Image with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review Image couldn't be found"
    }
    ```

## Add Query Filters to Get All businesses

Return businesses filtered by query parameters.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/businesses
  - Query Parameters
    - page: integer, minimum: 1, maximum: 10, default: 1
    - size: integer, minimum: 1, maximum: 10, default: 10
    - avg_rating: integer, optional
    - price: integer, optional
    - open: boolean, optional
    - subcategory: string, optional
    - features: string, optional
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "businesses": [
        {
          "id": 1,
          "owner_id": 1,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 123,
          "created_at": "2021-11-19 20:39:36",
          "updated_at": "2021-11-19 20:39:36",
          "avg_rating": 4.5,
          "num_ratings": 12,
          "category":{
            "id":1,
            "name":"Veterinarian",
            "Subcategories": [
                {
                  "id":1,
                  "name":"Exotic Vet",
                },
                {
                  "id":2,
                  "name":"General Vet",
                },
              ],
            },
          "hours":{
            "monday_open":"0900",
            "monday_close":"1700",
            "tuesday_open":"0900",
            "tuesday_close":"1630",
            "wednesday_open":"0900",
            "wednesday_close":"1700",
            "thursday_open":"0915",
            "thursday_close":"1700",
            "friday_open":"0900",
            "friday_close":"1745",
            "saturday_open":"1000",
            "saturday_close":"1600",
            "sunday_open":null,
            "sunday_close":null,
          },
        }
      ],
      "page": 1,
      "size": 5
    }
    ```

- Error Response: Query parameter validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "page": "Page must be greater than or equal to 1",
        "size": "Size must be greater than or equal to 1"
      }
    }
    ```
