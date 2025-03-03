# Auth Service
**🔓 Free**
> API Gateway: `/api/v1/auth`

## Register 
* **Gateway:** `/api/v1/auth/register`
* Method: **POST**
* **Headers**: Common Headers
* Returns: [🎟️ Auth token](#auth-ok) 

### Request body
```typescript
// JSON
inteface RegisterBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};
```

## Login 
* **Gateway:** `/api/v1/auth/login`
* **Method:** `POST`
* **Headers:** Common Headers
* Request: [LoginBody](#login-request-body)
* Response: [🎟️ Auth token](#auth-ok)


## Request verification email
This route request a verification mail to the server, it will send **if and only if**:
* User wasn't recived an verification email.
* User is not verified

> First condition is not implemented, i am thinking on account deletion if you don't verify in 5 days

* **Gateway:** `/api/v1/auth/verify`
* **Method:** `PUT`
* **Headers:** Auth Headers
* Response: `string`

--- 

## Types
### Auth OK
* **Response Code:** `200`
* **Interface**:
```typescript
interface AuthOK {
  data: string, // The generated token, include it in all request.
  ok: true
}
```

### Login Request Body
```typescript
interface LoginBody {
  email: string,
  password: string
}
```

### Auth Error
If you have an error, the returned code will be 400 or 500(if has a database error, or unknown Error).
```typescript
interface AuthError {
  ok: false,
  data: string
};
```

