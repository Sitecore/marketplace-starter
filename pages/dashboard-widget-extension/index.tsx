import { useEffect, useState } from "react";
import { useMarketplaceClient } from "@/utils/hooks/useMarketplaceClient";

function DashboardWidget() {
  const { client, isInitialized, error } = useMarketplaceClient();
  const [data, setData] = useState<{ metric: string; value: number }[]>([]);

  useEffect(() => {
    if (isInitialized && client) {
      const sampleData = [
        { metric: "Page Views", value: 1200 },
        { metric: "Unique Visitors", value: 450 },
        { metric: "Conversions", value: 75 },
      ];
      setData(sampleData);
    }
  }, [client, isInitialized]);

  return (
    <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Site Performance Metrics</h3>
      {isInitialized ? (
        <ul>
          {data.map((item) => (
            <li key={item.metric}>
              <strong>{item.metric}:</strong> {item.value}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading widget...</p>
      )}
      {error && <p style={{ color: "red" }}>Error: {String(error)}</p>}
    </div>
  );
}

export default DashboardWidget;
