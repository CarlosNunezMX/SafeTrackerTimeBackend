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
* Response: [🎟️ Auth token](#auth-ok)

### Request body
```typescript
interface LoginBody {
  email: string,
  password: string
}
```
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

### Auth Error
If you have an error, the returned code will be 400 or 500(if has a database error, or unknown Error).
```typescript
interface AuthError {
  ok: false,
  data: string
};
```
