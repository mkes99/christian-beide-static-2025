export const site = {
  name: "Christian Biede",
  title: "Christian Biede 2025",
  description:
    "Christian Biede is a tattoo artist at Dead West Tattoo Studio in Tucson, Arizona, specializing in black and gray, color, realism and cover-up tattoos.",
  studio: "Dead West Tattoo Studio",
  address: {
    street: "2470 W Ruthrauff Rd Suite 100",
    city: "Tucson",
    state: "Arizona",
    stateCode: "AZ",
    zip: "85705",
  },
  email: "christianbiedetattoos@gmail.com",
  hours: ["Tues, Wed, Fri, Sat", "12:00AM - 6:00PM"],
  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/Christianbiedetattoo/",
      icon: "",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/christianbiede/",
      icon: "",
    },
  ],
  recaptchaSiteKey: import.meta.env.PUBLIC_RECAPTCHA_SITEKEY,
};

const { street, city, stateCode, zip } = site.address;

/** One-line address, used for the map embed. */
export const fullAddress = `${site.studio}, ${street}, ${city}, ${stateCode} ${zip}`;
