# base32

An implementation of Crockford's base32 for encoding UInt8Array data.

```ts
import { encode, decode } from "@0x57/base32";

const data = new TextEncoder().encode("Hello, World!");
const encoded = encode(data);
console.log(encoded); // 91JPRV3F5GG5EVVJDHJ22
const decoded = decode(encoded);
console.log(new TextDecoder().decode(decoded)); // Hello, World!
```
