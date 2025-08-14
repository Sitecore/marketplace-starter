import { useState, useEffect } from "react";
import type { ApplicationContext, PagesContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "../utils/hooks/useMarketplaceClient";

function App() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [appContext, setAppContext] = useState<PagesContext>();

  useEffect(() => {
    if (!error && isInitialized && client) {
      console.log("Marketplace client initialized successfully.", client);

      // Make a query to retrieve the page context
      client.query("pages.context")
        .then((res) => {
          console.log("Success retrieving pages.context:", res.data);
        })
        .catch((error) => {
          console.error("Error retrieving pages.context:", error);
        });
    } else if (error) {
      console.error("Error initializing Marketplace client:", error);
    }
  }, [client, error, isInitialized]);

  return (
    <>
    <div>
      <p>{isInitialized}</p>
    </div>
      <h1>Welcome to {appContext?.pageInfo?.name}</h1>
      <h1>Sitecore Marketplace GraphQL Demo</h1>
    </>
  );
}

export default App;
