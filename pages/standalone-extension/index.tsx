import { useState, useEffect } from "react";
import type { ApplicationContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "@/utils/hooks/useMarketplaceClient";

function StandaloneExtension() {
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
    <>
      <h1>Standalone Extension</h1>
      {isInitialized && (
        <>
          <p><strong>App Name:</strong> {appContext?.name ?? "N/A"}</p>
          <p><strong>App ID:</strong> {appContext?.id ?? "N/A"}</p>
        </>
      )}
    </>
  );
}

export default StandaloneExtension;
