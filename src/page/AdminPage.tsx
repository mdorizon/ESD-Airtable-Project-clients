import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Client, Status } from "@/utils/types/client";
import { getClients } from "@/utils/airtable";
import deleteClient from "@/utils/airtable/deleteClient";
import updateClient from "@/utils/airtable/updateClient";

const AdminPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteValue, setNoteValue] = useState<string>("");

  useEffect(() => {
    getClients(setClients);
  }, []);

  // Modification du statut d'un client
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

  // Début de modification de la note
  const startEditingNote = (clientId: string, currentNote: string) => {
    setEditingNoteId(clientId);
    setNoteValue(currentNote);
  };

  // Enregistrement de la note mise à jour
  const saveNote = (clientId: string) => {
    updateClient(clientId, { notes: noteValue }, () => {
      console.log(`La note du client ${clientId} a été mise à jour sur Airtable`);
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.id === clientId ? { ...client, notes: noteValue } : client
        )
      );
      setEditingNoteId(null);
    });
  };

  // Annuler la modification de la note
  const cancelEditingNote = () => {
    setEditingNoteId(null);
    setNoteValue("");
  };

  // Couleurs des statuts
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

  // Triage des clients par statut
  const sortedClients = [...clients].sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Gestion des Clients</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="p-2 text-left">Prénom</th>
            <th className="p-2 text-left">Nom</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Téléphone</th>
            <th className="p-2 text-left">Note</th>
            <th className="p-2 text-left">Statut</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client) => (
            <tr key={client.id} className={`${statusColors[client.status]} border-b border-gray-300 hover:bg-gray-200`}>
              <td className="p-2">{client.firstname}</td>
              <td className="p-2">{client.lastname}</td>
              <td className="p-2">{client.email}</td>
              <td className="p-2">{client.phone_number}</td>
              <td className="p-2">
                {editingNoteId === client.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={noteValue}
                      onChange={(e) => setNoteValue(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    <Button variant="outline" onClick={() => saveNote(client.id)}>
                      Confirmer
                    </Button>
                    <Button variant="destructive" onClick={cancelEditingNote}>
                      Annuler
                    </Button>
                  </div>
                ) : (
                  <span>{client.notes}</span>
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
                <Button variant="outline" onClick={() => startEditingNote(client.id, client.notes || "")}>
                  Modifier la Note
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(client.id)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;