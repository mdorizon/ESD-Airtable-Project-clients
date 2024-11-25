import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/airtable";
import { ClientDTO, Clients } from "@/utils/types/client";

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
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      createClient(formData, setClients);
      toast({
        title: "Client créé avec succès !",
        description: `Le client "${formData.firstname} ${formData.lastname}" a été ajouté.`,
        variant: "default"
      })
    } catch (e) {
      toast({
        title: "Erreur lors de la création du client !",
        description: `erreur: ${e}`,
        variant: "destructive"
      })
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-lg mx-auto w-full">
        <CardHeader>
          <CardTitle>Créer un client</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstname">Prénom</Label>
              <Input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="Votre Prénom"
                onChange={handleChange}
                value={formData.firstname}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastname">Nom</Label>
              <Input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Votre Nom"
                onChange={handleChange}
                value={formData.lastname}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Votre email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone_number">Téléphone</Label>
              <Input
                id="phone_number"
                type="text"
                name="phone_number"
                placeholder="Votre téléphone"
                onChange={handleChange}
                value={formData.phone_number}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Créer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientForm;