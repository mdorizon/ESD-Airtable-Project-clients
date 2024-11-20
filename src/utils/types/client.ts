export enum Status {
  CONTACTED = "Contacted",
  NOT_CONTACTED = "Not Contacted",
  CONTACT_IN_FUTUR = "Contact in future",
}

export type Client = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  notes: string;
  status: Status;
};

export type Clients = Client[];
export type ClientDTO = {
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
};
