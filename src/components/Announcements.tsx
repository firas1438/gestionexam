const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Logs</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Modification</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-13 <br/> 20:08
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Islem Chammakhi a modifié la date d'examen: "ALGEBRE3" du filière: "CPI2"
          </p>
        </div>
        <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Ajout</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2024-01-01 <br/> 08:17
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Islem Chammakhi a ajouté un examen: "SYSTEMES LOGIQUES" au filière: "CPI1"
          </p>
        </div>
        <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Suppression</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2024-05-12 <br/> 15:39
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Islem Chammakhi a supprimé un examen: "SYSTEME D'EXPLOITATION" du filière: "L1_INFO"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
