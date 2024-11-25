import { Clients } from "../types/client";
import connectAirtable from "./connect";

const deleteClient = (
  clientId: string,
  setClients: React.Dispatch<React.SetStateAction<Clients>>
) => {
  const base = connectAirtable();
  const TABLE_NAME = "Table 1";
  const table = base(TABLE_NAME);

  table.destroy([clientId], (err) => {
    if (err) {
      console.error("Erreur lors de la suppression du client :", err);
      return;
    }

    setClients((previousClients) =>
      previousClients.filter((client) => client.id !== clientId)
    );

    console.log("Client supprimé avec succès");
  });
};

export default deleteClient;