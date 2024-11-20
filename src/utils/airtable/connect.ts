import Airtable from "airtable";

const connectAirtable = () => {
  if (!import.meta.env.VITE_APP_AIRTABLE_API_TOKEN) {
    throw new Error("Artable API token is missing");
  }

  Airtable.configure({
    apiKey: import.meta.env.VITE_APP_AIRTABLE_API_TOKEN,
  });

  if (!import.meta.env.VITE_APP_AIRTABLE_BASE_ID) {
    throw new Error("AIRTABLE_BASE_ID is not set");
  }

  const base = Airtable.base(import.meta.env.VITE_APP_AIRTABLE_BASE_ID);

  console.log("connected to airtable");

  return base;
};

export default connectAirtable;
