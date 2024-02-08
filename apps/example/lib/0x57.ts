import { Hex57 } from "0x57/auth";

const hex57 = new Hex57(process.env.HEX57_KEY!, {
	rpid: "localhost",
	origin: "https://localhost:3000",
});

export default hex57;
