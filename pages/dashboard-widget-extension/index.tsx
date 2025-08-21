import { useState, useEffect } from "react";
import type { ApplicationContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "@/utils/hooks/useMarketplaceClient";

function DashboardWidgetExtension() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [appContext, setAppContext] = useState<ApplicationContext>();

  useEffect(() => {
    if (!error && isInitialized && client) {
      client.query("application.context")
        .then((res) => {
          console.log("Success retrieving application.context:", res.data);
          setAppContext(res.data);
        })
        .catch((error) => {
          console.error("Error retrieving application.context:", error);
        });
    } else if (error) {
      console.error("Error initializing Marketplace client:", error);
    }
  }, [client, error, isInitialized]);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", maxWidth: "600px", margin: "2rem auto" }}>
      <h2>📊 Dashboard Widget Extension</h2>
      {isInitialized && (
        <>
          <p><strong>App Name:</strong> {appContext?.name ?? "N/A"}</p>
          <p><strong>App ID:</strong> {appContext?.id ?? "N/A"}</p>
          <p>This widget can be used to display contextual data inside dashboards.</p>
        </>
      )}
    </div>
  );
}

export default DashboardWidgetExtension;
