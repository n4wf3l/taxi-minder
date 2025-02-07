import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil } from "lucide-react";
import Essence from "@/components/dashboard/Essence";

const Settings = () => {
  const [showDrivers, setShowDrivers] = useState(false);
  const [showAdmins, setShowAdmins] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const drivers = ["Driver 1", "Driver 2", "Driver 3"];
  const admins = ["Admin 1", "Admin 2"];

  return (
    <div className="min-h-screen bg-background flex">
      <div className="fixed z-50 md:relative md:translate-x-0 transition-transform duration-300">
        <Sidebar />
      </div>

      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-8 mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-center md:text-left">
            Paramètres
          </h1>
          <Essence />
        </motion.div>

        <hr className="hr-light-effect mt-10 mb-10" />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <Card
              className="p-4 cursor-pointer hover:bg-secondary/50 text-center"
              onClick={() => setShowDrivers(!showDrivers)}
            >
              <h3 className="text-xl font-bold">Chauffeurs</h3>
              <p className="text-7xl font-bold text-primary">
                {drivers.length}
              </p>
            </Card>
            <AnimatePresence>
              {showDrivers && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-secondary rounded-md mt-2"
                >
                  <ul className="space-y-2">
                    {drivers.map((driver, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        {driver}
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setEditingUser(driver)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <Card
              className="p-4 cursor-pointer hover:bg-secondary/50 text-center"
              onClick={() => setShowAdmins(!showAdmins)}
            >
              <h3 className="text-xl font-bold">Admins</h3>
              <p className="text-7xl font-bold text-primary">{admins.length}</p>
            </Card>
            <AnimatePresence>
              {showAdmins && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-secondary rounded-md mt-2"
                >
                  <ul className="space-y-2">
                    {admins.map((admin, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        {admin}
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setEditingUser(admin)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-4 sm:p-6 mb-10">
            <h2 className="text-xl font-bold mb-4">Mon Compte</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Nouveau mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
              <Button type="submit" className="w-full md:w-auto">
                Enregistrer les modifications
              </Button>
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-4 sm:p-6">
            <h2 className="text-xl font-bold mb-4">
              Ajouter un Administrateur
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="newAdminEmail"
                  className="block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="newAdminEmail"
                  type="email"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="newAdminPassword"
                  className="block text-sm font-medium "
                >
                  Mot de passe
                </label>
                <input
                  id="newAdminPassword"
                  type="password"
                  className="w-full p-2 border rounded-md bg-background"
                />
              </div>
              <Button type="submit" className="w-full md:w-auto">
                Ajouter Administrateur
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Modale d'édition */}
        <AnimatePresence>
          {editingUser && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 bg-background w-96">
                <h2 className="text-xl font-bold mb-4">
                  Modifier {editingUser}
                </h2>
                <Button
                  onClick={() => setEditingUser(null)}
                  className="mt-4 w-full"
                >
                  Fermer
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Settings;
