import { useState, useEffect } from "react";
import type { ApplicationContext, PagesContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "../utils/hooks/useMarketplaceClient";

function App() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [appContext, setAppContext] = useState<ApplicationContext>();
  const [pagesContext, setPagesContext] = useState<PagesContext>();

  useEffect(() => {
    if (!error && isInitialized && client) {
      console.log("Marketplace client initialized successfully.", client);

      // Query the application context:
      client.query("application.context")
        .then((res) => {
          console.log("Success retrieving application.context:", res.data);
          setAppContext(res.data);
        })
        .catch((error) => {
          console.error("Error retrieving application.context:", error);
        });

      // Query the page context:
      client.query("pages.context", {
        //  Subscribe to page events:
        subscribe: true,
        onSuccess: (res) => {
          console.log("Success retrieving pages.context:", res);
          setPagesContext(res);
        },
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
        <p>
          {isInitialized
            ? "Marketplace client initialized."
            : "Initializing Marketplace client..."}
        </p>
      </div>
      <h1>Sitecore Marketplace GraphQL Demo</h1>
      {isInitialized && (
        <>
          <h2>Application Info</h2>
          <p><strong>Name:</strong> {appContext?.name ?? "N/A"}</p>
          <p><strong>ID:</strong> {appContext?.id ?? "N/A"}</p>

          <h2>Page Context</h2>
          {pagesContext ? (
            <ul>
              <li><strong>Page ID:</strong> {pagesContext?.pageInfo?.id}</li>
              <li><strong>Title:</strong> {pagesContext?.pageInfo?.name}</li>
              <li><strong>Language:</strong> {pagesContext?.pageInfo?.language}</li>
              <li><strong>Path:</strong> {pagesContext?.pageInfo?.path}</li>
            </ul>
          ) : (
            <p>No page context available yet.</p>
          )}
        </>
      )}
    </>
  );
}

export default App;
