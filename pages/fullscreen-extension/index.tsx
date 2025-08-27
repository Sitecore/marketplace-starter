import { useState, useEffect } from "react";
import type { ApplicationContext, PagesContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "@/utils/hooks/useMarketplaceClient";

function App() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [appContext, setAppContext] = useState<ApplicationContext>();
  const [pagesContext, setPagesContext] = useState<PagesContext>();

  // Following are the pages extension points available
  const pageExtensionPoints = [
    "xmc:pages:contextpanel",
    "xmc:pages:customfield"
  ];

  useEffect(() => {
    if (!error && isInitialized && client) {
      console.log("Marketplace client initialized successfully.", client);

      // Always query the application context
      client.query("application.context")
        .then((res) => {
          console.log("Success retrieving application.context:", res.data);
          setAppContext(res.data);

          if (pageExtensionPoints.includes(res.data?.extensionPoint)) {
            client.query("pages.context", {
              subscribe: true,
              onSuccess: (res) => {
                console.log("Success retrieving pages.context:", res);
                setPagesContext(res);
              },
            }).catch((error) => {
              console.error("Error retrieving pages.context:", error);
            });
          }
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
      <h1>Sitecore Marketplace GraphQL Demo</h1>
      {isInitialized && (
        <>
          <h2>Application Info</h2>
          <p><strong>Name:</strong> {appContext?.name ?? "N/A"}</p>
          <p><strong>ID:</strong> {appContext?.id ?? "N/A"}</p>

          <h2>Page Context</h2>
          {pageExtensionPoints.includes(appContext?.extensionPoint) ? (
            pagesContext ? (
              <ul>
                <li><strong>Page ID:</strong> {pagesContext?.pageInfo?.id}</li>
                <li><strong>Title:</strong> {pagesContext?.pageInfo?.name}</li>
                <li><strong>Language:</strong> {pagesContext?.pageInfo?.language}</li>
                <li><strong>Path:</strong> {pagesContext?.pageInfo?.path}</li>
              </ul>
            ) : (
              <p>No page context available yet.</p>
            )
          ) : (
            <p>This extension does not use page context.</p>
          )}
        </>
      )}
    </>
  );
}

export default App;
