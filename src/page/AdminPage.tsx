import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Client, ClientDTO, Status } from "@/utils/types/client";
import { getClients } from "@/utils/airtable";
import deleteClient from "@/utils/airtable/deleteClient";
import updateClient from "@/utils/airtable/updateClient";
import Menu from "@/components/menu/Menu";

const AdminPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [editClientId, setEditClientId] = useState<string | null>(null);
  const [editedClient, setEditedClient] = useState<Partial<Client>>({});

  useEffect(() => {
    getClients(setClients);
  }, []);

  // Modification du status d'un client
  const updateClientStatus = (clientId: string, newStatus: Status) => {
    const updatedClients = clients.map((client) =>
      client.id === clientId ? { ...client, status: newStatus } : client
    );
    setClients(updatedClients);

    updateClient(clientId, { status: newStatus }, () => {
      console.log(`Le statut du client ${clientId} a été mis à jour sur Airtable`);
    });
  };

  // Suppression d'un client
  const handleDelete = (clientId: string) => {
    deleteClient(clientId, setClients);
  };

  // Modification d'un client
  const handleEdit = (clientId: string) => {
    setEditClientId(clientId);
    const client = clients.find((client) => client.id === clientId);
    if (client) {
      setEditedClient({
        firstname: client.firstname,
        lastname: client.lastname,
        email: client.email,
        phone_number: client.phone_number,
      });
    }
  };

  // Confirmer la modification du client
  const handleConfirmEdit = () => {
    if (editClientId) {
      updateClient(editClientId, editedClient as ClientDTO, () => {
        console.log("Client mis à jour");
        setEditClientId(null);
        setEditedClient({});
      });
    }
  };

  // Couleurs des status
  const statusColors: { [key in Status]: string } = {
    [Status.NOT_CONTACTED]: "text-red-500", // Rouge pour "Not Contacted"
    [Status.CONTACT_IN_FUTURE]: "text-orange-500", // Orange pour "Contact in Future"
    [Status.CONTACTED]: "text-green-500", // Vert pour "Contacted"
  };

  // Ordre du tri des clients
  const statusOrder: { [key in Status]: number } = {
    [Status.NOT_CONTACTED]: 1,
    [Status.CONTACT_IN_FUTURE]: 2,
    [Status.CONTACTED]: 3,
  };
  
  // Triage des clients par status
  const sortedClients = [...clients].sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <>
      <Menu />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Gestion des Clients</h1>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="p-2 text-left">Prénom</th>
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Téléphone</th>
              <th className="p-2 text-left">Statut</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedClients.map((client) => (
              <tr key={client.id} className={`${statusColors[client.status]} border-b border-gray-300 hover:bg-gray-200`}>
                <td className="p-2">
                  {editClientId === client.id ? (
                    <input
                      className="w-full"
                      type="text"
                      value={editedClient.firstname}
                      onChange={(e) => setEditedClient({ ...editedClient, firstname: e.target.value })}
                    />
                  ) : (
                    client.firstname
                  )}
                </td>
                <td className="p-2">
                  {editClientId === client.id ? (
                    <input
                      className="w-full"
                      type="text"
                      value={editedClient.lastname}
                      onChange={(e) => setEditedClient({ ...editedClient, lastname: e.target.value })}
                    />
                  ) : (
                    client.lastname
                  )}
                </td>
                <td className="p-2">
                  {editClientId === client.id ? (
                    <input
                      className="w-full"
                      type="email"
                      value={editedClient.email}
                      onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })}
                    />
                  ) : (
                    client.email
                  )}
                </td>
                <td className="p-2">
                  {editClientId === client.id ? (
                    <input
                      className="w-full"
                      type="text"
                      value={editedClient.phone_number}
                      onChange={(e) => setEditedClient({ ...editedClient, phone_number: e.target.value })}
                    />
                  ) : (
                    client.phone_number
                  )}
                </td>
                <td className="p-2">
                  <Select onValueChange={(value) => updateClientStatus(client.id, value as Status)} defaultValue={client.status}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Status.NOT_CONTACTED}>Not Contacted</SelectItem>
                      <SelectItem value={Status.CONTACT_IN_FUTURE}>Contact In Future</SelectItem>
                      <SelectItem value={Status.CONTACTED}>Contacted</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-2 flex gap-2">
                  {editClientId === client.id ? (
                    <Button variant="outline" onClick={handleConfirmEdit}>Confirmer</Button>
                  ) : (
                    <Button variant="outline" onClick={() => handleEdit(client.id)}>Modifier</Button>
                  )}
                  <Button variant="destructive" onClick={() => handleDelete(client.id)}>Supprimer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPage;