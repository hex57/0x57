# nanoid

```ts
import { nanoid } from "nanoid";

console.log(nanoid()); //=> "V1StGXR8_Z5jdHi6B-myT"
```

```ts
import * as NanoID from "nanoid";

const nanoid = NanoID.custom(10, "1234567890abcdef");

console.log(nanoid()); //=> "4f90d13a42"
```
