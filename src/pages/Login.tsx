import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/api"; // ✅ Import axios API instance

const Login = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");

    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message on new attempt

    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken } = response.data;
      localStorage.setItem("token", accessToken);

      const payload = JSON.parse(atob(accessToken.split(".")[1])); // Decode JWT
      console.log("🔍 Decoded Token:", payload);

      if (payload.role === "admin") {
        navigate("/dashboard");
        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${email}!`,
        });

        setTimeout(() => {
          const input = document.createElement("input");
          input.setAttribute("type", "password");
          input.setAttribute("name", "password");
          input.setAttribute("autocomplete", "current-password");
          document.body.appendChild(input);
          input.focus();
          input.blur();
          document.body.removeChild(input);
        }, 500);
      } else {
        navigate("/unauthorized");
        localStorage.removeItem("token");
        setLoading(false);
      }
    } catch (error) {
      console.error("❌ Login Failed:", error);
      setErrorMessage("Email ou mot de passe incorrect. Veuillez réessayer.");
      toast({
        title: "Erreur",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative p-4">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-900 z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <motion.img
              src="/taxitimelogo.png"
              alt="Taxi Time"
              className="h-40"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, yoyo: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && (
        <>
          {/* Background with neon effect */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500 rounded-full filter blur-[150px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-orange-500 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
          </div>

          <motion.div
            className="w-full max-w-4xl flex flex-col lg:flex-row bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl relative z-10" // Added z-10 to ensure it stays above the background
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
              <motion.img
                src="/taxitimelogo.png"
                alt="Taxi Time"
                className="h-10 mb-6 mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
              <motion.h2
                className="text-2xl font-bold mb-4 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Se connecter
              </motion.h2>

              <motion.form
                onSubmit={handleLogin}
                className="space-y-4"
                autoComplete="on"
                animate={errorMessage ? { x: [-10, 10, -5, 5, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  style={{ display: "none" }}
                />

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="text-white"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {errorMessage && (
                  <motion.p
                    className="text-red-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {errorMessage}
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Button
                    type="submit"
                    className="bg-gray-800 text-white hover:bg-yellow-800 w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      "Connexion..."
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" /> Se connecter
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              <motion.a
                href="/forget-password"
                className="text-yellow-400 text-sm mt-4 block text-center hover:text-yellow-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                Mot de passe oublié?
              </motion.a>
            </div>

            <motion.div
              className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-black p-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <a
                href="https://www.taxitime.be"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-lg font-bold hover:text-yellow-400"
              >
                Taxi Time.
              </a>
              <p className="text-sm mt-2 text-center">
                La plateforme dédiée aux sociétés de taxi.
              </p>
              <p className="text-xs mt-10 text-gray-400">
                Made with love in Brussels.
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Login;
