import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { createAdmin } from "@/api/admin";
import { useToast } from "../ui/use-toast";

const Forms = () => {
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminCompany, setAdminCompany] = useState("");
  const { toast } = useToast(); // ✅ Notification system

  const handleAdminAdd = async (e) => {
    e.preventDefault();
    

  
    try {
      await createAdmin({
        first_name: adminFirstName,
        last_name: adminLastName,
        email: adminEmail,
        company_id: adminCompany,
      });

      // ✅ Success feedback
      toast({ title: "Succès", description: "Admin ajouté avec succès !" });

      // ✅ Clear form
      setAdminFirstName("");
      setAdminLastName("");
      setAdminEmail("");
      setAdminCompany("");
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout d'un admin:", error);
      toast({ title: "Erreur", description: "Impossible d'ajouter l'admin.", variant: "destructive" });
    }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-blue-500 transition-all"
      whileHover={{ y: -5 }}
      whileTap={{ y: 0 }}
    >
      <form onSubmit={handleAdminAdd}>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span className="text-blue-400">Ajouter un administrateur</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Prénom</span>
              </div>
            </label>
            <input
              type="text"
              value={adminFirstName}
              onChange={(e) => setAdminFirstName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="John"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Nom</span>
              </div>
            </label>
            <input
              type="text"
              value={adminLastName}
              onChange={(e) => setAdminLastName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </div>
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="admin@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-300">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Société</span>
              </div>
            </label>
            <input
              type="text"
              value={adminCompany}
              onChange={(e) => setAdminCompany(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Entreprise X"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Ajouter
        </button>
      </form>
    </motion.div>
  );
};

export default Forms;