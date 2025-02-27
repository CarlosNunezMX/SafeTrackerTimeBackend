# Location
* **🔒 Requires authentication**
> API Gateway: `/api/v1/location`

## Get location
Returns current location.
* **Gateway:** `/api/v1/location/`
* **Method:** `GET`
* **Headers**:
  * Authentication: `Baerer <token>`
* Response: [`Location`](#location)

## Update location
Returns current location.
* **Gateway:** `/api/v1/location/`
* **Method:** `PATCH`
* **Headers**:
  * Authentication: `Baerer <token>`
* **Body:** [`LocationDTO`](#locationdto)
* Response: [`Location`](#location)


## Types
### Location
```typescript
interface Location {
  userID: string,
  id: string,
  x: number,
  y: number, 
  date: Date
};
```

### LocationDTO
```typescript
type LocationDTO = Pick<Location, "x" | "y">;
```
