# CRUD in React Redux Typescript

### Typescript

- `!` is a way to tell the `Typescript` compiler "this expression cannot be null or undefined here, so don't complain about the possibility of it being null or undefined."
- `?` is to mark the parameter as optional in `Typescript`.

### Resetting the database

```dos
dotnet ef database drop -p Persistence/ -s API/
```

Choose `y` and then `dotnet watch run` in the `API` project.
