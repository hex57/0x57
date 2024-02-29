import { PasskeyClient } from "@0x57/passkey";

const hex57 = new PasskeyClient(process.env.HEX57_KEY!, {
	rpid: "localhost",
	origin: "https://localhost:3000",
});

export default hex57;
