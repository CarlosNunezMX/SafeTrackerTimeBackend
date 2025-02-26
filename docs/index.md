# Backend docs :D
This is a complete rewrite of the backend, and how to how with it.
Feel free to ask anything.

## Sections
There is a little index with the most important endpoints
* [Users](./user.md)
* [Contacts](./contacts.md)
* [Auth](./auth.md)


## Response details
We use a common interface to wrap all of our responses.
```typescript
interface ResponseWrapper<T> {
  data: T,
  ok: boolean
}
```
```
