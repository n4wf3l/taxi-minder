import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Commune, Taxi } from "../../utils/mapData";

// Import refactored components
import CommuneFilter from "./CommuneFilter";
import SearchInput from "../map/SearchInput";
import ViewToggle from "../map/ViewToggle";
import SidebarStats from "../map/SidebarStats";
import StatusFilter from "../map/StatusFilter";
import TaxiList from "../map/TaxiList";
import StatsView from "../map/StatsView";
import TaxiDetail from "../map/TaxiDetail";
import SidebarFooter from "../map/SidebarFooter";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  communes: Commune[];
  selectedCommunes: string[];
  onToggleCommune: (communeId: string) => void;
  onSelectAllCommunes: () => void;
  onClearAllCommunes: () => void;
  taxis: Taxi[];
  selectedTaxi: Taxi | null;
  onSelectTaxi: (taxi: Taxi | null) => void;
  onFlyToTaxi: (taxi: Taxi) => void;
  statusFilter: "disponible"[];
  onToggleStatusFilter: (status: "disponible") => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  communes,
  selectedCommunes,
  onToggleCommune,
  onSelectAllCommunes,
  onClearAllCommunes,
  taxis,
  selectedTaxi,
  onSelectTaxi,
  onFlyToTaxi,
  statusFilter,
  onToggleStatusFilter,
}) => {
  const [activeView, setActiveView] = useState<"map" | "list" | "stats">("map");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtre les taxis en fonction de la recherche
  const filteredTaxis = taxis.filter(
    (taxi) =>
      (selectedCommunes.length === 0 ||
        selectedCommunes.includes(taxi.commune)) &&
      (statusFilter.length === 0 || statusFilter.includes(taxi.status)) &&
      (searchQuery === "" ||
        taxi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        taxi.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        communes
          .find((c) => c.id === taxi.commune)
          ?.name.toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      {/* Bouton pour ouvrir/fermer la barre latérale */}
      <button
        onClick={onToggle}
        className="fixed right-4 top-4 z-[1500] p-2 backdrop-blur-md bg-background/70 rounded-full shadow-lg transition-transform hover:scale-105"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Barre latérale */}
      <aside
        className={`bg-background fixed right-0 top-0 h-full z-40 glassmorphism transition-all duration-300 ease-in-out border border-gray-700 ${
          isOpen ? "translate-x-0 w-80" : "translate-x-full w-0"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Recherche */}
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Navigation */}
          <ViewToggle activeView={activeView} setActiveView={setActiveView} />

          {/* Statistiques */}
          <SidebarStats filteredTaxis={filteredTaxis} />

          {/* Filtres par statut */}
          <StatusFilter
            statusFilter={statusFilter}
            onToggleStatusFilter={onToggleStatusFilter}
          />

          {/* Contenu principal */}
          <div className="flex-1 overflow-hidden">
            {activeView === "map" && (
              <CommuneFilter
                communes={communes}
                selectedCommunes={selectedCommunes}
                onToggleCommune={onToggleCommune}
                onSelectAll={onSelectAllCommunes}
                onClearAll={onClearAllCommunes}
              />
            )}

            {activeView === "list" && (
              <TaxiList
                filteredTaxis={filteredTaxis}
                communes={communes}
                selectedTaxi={selectedTaxi}
                onSelectTaxi={onSelectTaxi}
                onFlyToTaxi={onFlyToTaxi}
                activeView={activeView} // ✅ Ajouté
                setActiveView={setActiveView} // ✅ Ajouté
              />
            )}

            {activeView === "stats" && <StatsView communes={communes} />}
          </div>

          {/* Info du taxi sélectionné */}
          {selectedTaxi && (
            <TaxiDetail
              selectedTaxi={selectedTaxi}
              communes={communes}
              onSelectTaxi={onSelectTaxi}
            />
          )}

          {/* Pied de page */}
          <SidebarFooter />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
