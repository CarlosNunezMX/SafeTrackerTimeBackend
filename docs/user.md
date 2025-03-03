# Users 
* **🔒 Requires authentication**
> API Gateway: `/api/v1/users`


## About me 
This route returns basic data of the logged user
* **Gateway**: `/api/v1/users/`
* **Method**: `GET`
* **Headers**:
  * Authentication: `session token`

This route returns the following data:
```typescript
```typescript
interface AboutMeResponse{
  ok: boolean,
  data: {
    id: string,
    username: {
      firstName: string,
      lastName: string
    },
    phone: string,
    email: string,
    verified: boolean,
    createdAt: number,
    password: "" // always be empty,
    contact: Contact[]
  }
}
```
## Update 
This route modifies basic user data
* **Gateway:** `/api/v1/users`
* **Method:** `PATCH`
* **Headers:**
  * Authentication: `session token`
* **Body:** `Partial<[UserDTO](#userdto)>`

## Types
### UserDTO
```typescript
interface UserDTO {
   email: string,
   phone: string,
   firstName: string,
   lastName: string,
   password: string
};
```
