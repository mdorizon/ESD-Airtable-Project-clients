import ClientForm from "@/components/ClientForm/ClientForm";
import Menu from "@/components/menu/Menu";
import { Clients } from "@/utils/types/client";
import { useState } from "react";

const ClientFormPage = () => {
  const [clients, setClients] = useState<Clients>([]);

  return (
    <>
      <Menu />
      <ClientForm setClients={setClients} />
    </>
  );
}

export default ClientFormPage;