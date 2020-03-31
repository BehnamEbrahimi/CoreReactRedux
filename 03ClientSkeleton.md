# Client Skeleton

### Create React App

To make the app support Typescript, provide the following switch:

```Dos
npx create-react-app client --use-npm --typescript
```

And then:

```Dos
cd client
npm start
```

### Typescript

In React, we use Typescript instead of PropTypes (legacy). In the `car.ts`:

```ts
export interface ICar {
  color: string;
  model: string;
  topSpeed?: number;
}
```

In the parent component (`CarList.tsx`):

```tsx
import React from 'react';
import CarItem from './CarItem';
import { ICar } from './car';

const car1: ICar = {
  color: 'blue',
  model: 'BMW',
  topSpeed: 200
};

const car2: ICar = {
  color: 'white',
  model: 'Benz'
};

const cars = [car1, car2];

const CarList: React.FC = () => {
  return (
    <ul>
      {cars.map(car => (
        <CarItem car={car} />
      ))}
    </ul>
  );
};

export default CarList;
```

In the child component (`CarItem.tsx`):

```tsx
import React from 'react';
import { ICar } from './car';

interface IProps {
  car: ICar;
}

const CarItem: React.FC<IProps> = ({ car }) => {
  return (
    <li>
      {car.color} {car.model}
    </li>
  );
};

export default CarItem;
```

### Install axios

In the client folder install `axios`:

```Dos
npm i axois
```

### Add support for CORS

Now to add Cross Origin Resource Sharing (`CORS`) support, in the `ConfigureServices` method in `Startup` add the followings:

```c#
services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
});
```

and in the `Configure` method in `Startup` add the following middleware:

```c#
app.UseCors("CorsPolicy");
```

### Install Semantic UI

In the client folder install `semantic-ui-react`:

```Dos
npm i semantic-ui-react
```

From [here](https://react.semantic-ui.com/usage) copy `Default theme (CDN)` and paste it in the head of `index.html`:

```html
<link
  rel="stylesheet"
  href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
/>
```
