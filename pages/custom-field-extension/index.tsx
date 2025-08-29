import { useEffect, useState } from "react";
import { useMarketplaceClient } from "@/utils/hooks/useMarketplaceClient";

function CustomFieldExtension() {
  const { client, isInitialized, error } = useMarketplaceClient();
  const [value, setValue] = useState<string>("");

  // Preset options as buttons
  const options = ["Option A", "Option B", "Option C"];

  useEffect(() => {
    if (isInitialized && client) {
      client.getValue()
        .then((val: string) => setValue(val || ""))
        .catch(err => console.error("Error retrieving value:", err));
    }
  }, [client, isInitialized]);

  const handleClick = (selected: string) => {
    setValue(selected);
    if (client) client.setValue(selected);
    setTimeout(() => client?.closeApp(), 1000);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>Select an option:</h3>
      {isInitialized ? (
        <div style={{ display: "flex", gap: "10px" }}>
          {options.map(opt => (
            <button
              key={opt}
              style={{
                padding: "10px 20px",
                backgroundColor: value === opt ? "#0078d4" : "#eee",
                color: value === opt ? "#fff" : "#000",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px"
              }}
              onClick={() => handleClick(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <p>Initializing extension...</p>
      )}
      {error && <p style={{ color: "red" }}>Error: {String(error)}</p>}
    </div>
  );
}

export default CustomFieldExtension;
