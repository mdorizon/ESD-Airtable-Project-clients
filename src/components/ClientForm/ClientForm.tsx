import { useState } from "react";
import { ClientDTO, Clients } from "../../utils/types/client";
import { createClient } from "../../utils/airtable";

const ClientForm = ({
  setClients,
}: {
  setClients: React.Dispatch<React.SetStateAction<Clients>>;
}) => {
  const [formData, setFormData] = useState<ClientDTO>({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    createClient(formData, setClients);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setFormData((previousFormData) => {
      return {
        ...previousFormData,
        [event.target.name]: event.target.value,
      };
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstname"
        placeholder="Votre Prénom"
        onChange={handleChange}
        value={formData.firstname}
        required
      />
      <input
        type="text"
        name="lastname"
        placeholder="Votre Nom"
        onChange={handleChange}
        value={formData.lastname}
        required
      />
      <input
        type="text"
        name="email"
        placeholder="Votre email"
        onChange={handleChange}
        value={formData.email}
        required
      />
      <input
        type="text"
        name="phone_number"
        placeholder="Votre téléphone"
        onChange={handleChange}
        value={formData.phone_number}
        required
      />
      <button type="submit">Créer</button>
    </form>
  );
};

export default ClientForm;
