## Endpoint usage

### Register a New User

- **Endpoint:** `/register`
- **Method:** POST
- **Description:** Registers a new user with an email, username, and password.
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "username": "your_username",
    "password": "your_password"
  }
  ```

- **Sample Responses:**

  - **Successful Registration:**

    ```json
    {
      "message": "User registered successfully!"
    }
    ```

  - **Email or Username Already In Use:**

    ```json
    {
      "message": "Email or username already in use!"
    }
    ```

### Login

- **Endpoint:** `/login`
- **Method:** POST
- **Description:** Authenticates a user with either an email or username and password.
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "username": "your_username",
    "password": "your_password"
  }
  ```

- **Sample Responses:**

  - **Successful Login:**

    ```json
    {
      "message": "Login successful!"
    }
    ```

  - **User Not Found:**

    ```json
    {
      "message": "User not found!"
    }
    ```

  - **Invalid Password:**

    ```json
    {
      "message": "Invalid password!"
    }
    ```

## Example Usage with `curl`

**Register:**

```sh
curl -X POST http://localhost:8000/register \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "username": "newuser",
  "password": "newpassword"
}'
```

**Login:**

```sh
curl -X POST http://localhost:8000/login \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "username": "newuser",
  "password": "newpassword"
}'
```