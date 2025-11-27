export function getCountryFlagEmoji(Location:string): string{
	const cleanLocation = Location.trim().toLowerCase();

	const country = countryList.find((country) => 
	cleanLocation.includes(country.name.toLowerCase())
);

return country?.flagEmoji || "";
}

export function getFlagEmoji(countryCode: string){
	return countryCode
	.toUpperCase()
	.split("")
	.map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
	.join("");
}

export const countryList = [
  {
    name: "United States",
    code: "US",
    phoneCode: "+1",
    flagEmoji: "🇺🇸",
    flag: "https://flagcdn.com/h40/us.png",
  },
  {
    name: "China",
    code: "CN",
    phoneCode: "+86",
    flagEmoji: "🇨🇳",
    flag: "https://flagcdn.com/h40/cn.png",
  },
  {
    name: "India",
    code: "IN",
    phoneCode: "+91",
    flagEmoji: "🇮🇳",
    flag: "https://flagcdn.com/h40/in.png",
  },
  {
    name: "United Kingdom",
    code: "GB",
    phoneCode: "+44",
    flagEmoji: "🇬🇧",
    flag: "https://flagcdn.com/h40/gb.png",
  },
  {
    name: "Germany",
    code: "DE",
    phoneCode: "+49",
    flagEmoji: "🇩🇪",
    flag: "https://flagcdn.com/h40/de.png",
  },
  {
    name: "France",
    code: "FR",
    phoneCode: "+33",
    flagEmoji: "🇫🇷",
    flag: "https://flagcdn.com/h40/fr.png",
  },
  {
    name: "Japan",
    code: "JP",
    phoneCode: "+81",
    flagEmoji: "🇯🇵",
    flag: "https://flagcdn.com/h40/jp.png",
  },
  {
    name: "Canada",
    code: "CA",
    phoneCode: "+1",
    flagEmoji: "🇨🇦",
    flag: "https://flagcdn.com/h40/ca.png",
  },
  {
    name: "Brazil",
    code: "BR",
    phoneCode: "+55",
    flagEmoji: "🇧🇷",
    flag: "https://flagcdn.com/h40/br.png",
  },
  {
    name: "Russia",
    code: "RU",
    phoneCode: "+7",
    flagEmoji: "🇷🇺",
    flag: "https://flagcdn.com/h40/ru.png",
  },
	{
    name: "Ukraine",
    code: "UA",
    phoneCode: "+380",
    flagEmoji: "🇺🇦",
    flag: "https://flagcdn.com/h40/ua.png",
  }
];
