# Contacts
* **🔒 Requires authentication**
> API Gateway: `/api/v1/contacts`

## List contacts
* **Gateway:** `/api/v1/contacts/`
* **Method:** `GET`
* **Headers**:
  * Authentication: `Baerer <token>`
* Response: [`Contacts[]`](#contacts)

## Create contact
* **Gateway:** `/api/v1/contacts/`
* **Method:** `POST`
* **Headers:**
  * Authentication: `Baerer <token>`
* **Response:** [`Contact`](#contacts)
* **Request:** [`ContactDTO`](#contactdto)

## Update contact
* **Gateway:** `/api/v1/contacts/:contact-id`
* **Method:** `PATCH`
* **Headers:**
  * Authentication: `Baerer <token>`
* **Response:** [`Contact`](#contacts)
* **Request:** [`Partial<ContactDTO>`](#contactdto)

## Types
### Contacts
```typescript
interface Contact {
  id: string;
  name: string;
  phone: string;
  userID: string;
};
```
### ContactDTO
```typescript
type ContactDTO = Omit<Contact, "id"|"userID">;
```
