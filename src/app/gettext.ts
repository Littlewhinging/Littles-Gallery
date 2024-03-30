"use server";
export const getText = async (url: string) => {
	const response = await fetch(url);
	return response.text();
};

export const getJSON = async (url: string) => {
	const response = await fetch(url);
	return JSON.stringify(await response.json(), null, "\t");
};
