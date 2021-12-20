# Solution to second_test

Hi Stuart team, here you can find my proposition of the solution to the second test.

## Getting started

First, get a local copy of this repo. Next, navigate to it's root folder and install all dependencies

```bash
npm i
```

To run service in development mode use

```bash
npm run dev
```

For production mode use. You'll notice that main difference here is the formatting of the logs, that are not prettified in prod environment.

```bash
npm run dev
```

## Usage

This service assumes very dummy authentication, just to show that I'm aware of the topic, however with the full awareness of its silliness.

**To authenticate** you'll need to send with each request a header containing `user` property depending. The value of `user` will be a jwt token and will differ depending if you are using the service as Dispatcher or Stuart API. You can generate the tokens [here](https://jwt.io/) by adding the field `user` in the payload section of token generator. Below the necessary values:

- authenticate as Stuart API set `{ user: 'stuart_api' }`
- authenticate as Dispatcher set `{ user: 'dispatcher' }`

The token does not expire and the behavior of the service will not differ for different user, again supper dummy stuff.

### Available endpoints

All methods on all endpoints require header parameter `user` to be a valid. jwt token. See [how to authenticate](#usage) for details.

Base URL is `http://localhost:3000`

Path `/couriers`

Methods:

- POST/PUT
  - Request body:
  ```json
  {
    "id": Number (required),
    "max_capacity": Number (required)
  }
  ```
  - Response body:
  ```json
  {
    "id": Number,
    "max_capacity": Number
  }
  ```
  - Status: 200 or 201
- DELETE
  - Request body:
  ```json
    {
      "id": Number (required)
    }
  ```
  - Response body - empty
  - Status: 200 or 204

Path `/couriers/lookup`

Methods:

- GET
  - Parameters:
    - query parameter: `capacity_required: number`
  - Response body:
  ```json
  {
    "id": Number,
    "max_capacity": Number,
    "current_load": Number (optional)
  }
  ```

Path `/couriers/:id/update`
Methods:

- PUT
  - Request body:
  ```json
  {
    "current_load": Number
  }
  ```
  - Response body:
  ```json
  {
    "id": Number,
    "max_capacity": Number,
    "current_load": Number
  }
  ```

## If I had more time I would

- Make some proper authentication
- Add more test, like integration resolver tests or e2e test with running a test db, populating it first and executing tests against fixtured environment
- Improve exception handling
- Improve logs
