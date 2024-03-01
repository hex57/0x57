import { useEffect, useState } from "react";

export function useChallengeAction(action: () => Promise<string>) {
	const [challenge, setChallenge] = useState<string | null>(null);

	useEffect(() => {
		const getChallenge = async () => {
			const challenge = await action();
			setChallenge(challenge);
		};

		void getChallenge();
	}, []);

	return challenge;
}
