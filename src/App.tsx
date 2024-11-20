import "./App.css";
import { useEffect, useState } from "react";
import { Clients } from "./utils/types/client";
import { getClients } from "./utils/airtable";
import Chip from "./components/Chip/Chip";
import ClientForm from "./components/ClientForm/ClientForm";

function App() {
  const [clients, setClients] = useState<Clients>([]);
  useEffect(() => {
    getClients(setClients);
  }, []);

  return (
    <ul>
      {clients.map((client) => (
        <li key={client.id}>
          ID: {client.id} - {client.firstname} - {client.lastname} -{" "}
          {client.email} - {client.phone_number} -{" "}
          <Chip status={client.status} />
        </li>
      ))}
      <ClientForm setClients={setClients} />
    </ul>
  );
}

export default App;
