export const generateInviteCode = () => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
	let inviteCode = "";

	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		inviteCode += characters[randomIndex];
	}

	return inviteCode;
};
