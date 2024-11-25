import { Client, ClientDTO, Clients } from "../types/client";
import connectAirtable from "./connect";

const updateClient = (
  clientId: string,
  updatedClientData: ClientDTO,
  setClients: React.Dispatch<React.SetStateAction<Clients>>
) => {
  const base = connectAirtable();
  const TABLE_NAME = "Table 1";
  const table = base(TABLE_NAME);

  const updatedFields = {
    fields: {
      ...updatedClientData,
    },
  };

  table.update([{
    id: clientId,
    ...updatedFields
  }], (err, records) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du client :", err);
      return;
    }

    if (!records) {
      return;
    }
    setClients((previousClients) =>
      previousClients.map((client) =>
        client.id === clientId
          ? { ...client, ...updatedClientData }
          : client
      )
    );

    console.log("Client mis à jour avec succès");
  });
};

export default updateClient;