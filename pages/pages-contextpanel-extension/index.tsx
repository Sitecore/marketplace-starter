import { useState, useEffect } from "react";
import type { PagesContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "@/utils/hooks/useMarketplaceClient";

function PagesContextPanel() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [pagesContext, setPagesContext] = useState<PagesContext>();

  useEffect(() => {
    if (!error && isInitialized && client) {
      client.query("pages.context", {
        subscribe: true,
        onSuccess: (res) => {
          console.log("Success retrieving pages.context:", res);
          setPagesContext(res);
        },
      }).catch((error) => {
        console.error("Error retrieving pages.context:", error);
      });
    } else if (error) {
      console.error("Error initializing Marketplace client:", error);
    }
  }, [client, error, isInitialized]);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "600px", margin: "2rem auto" }}>
      <h2>📄 Pages Context Panel</h2>
      {isInitialized && pagesContext ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li><strong>Page ID:</strong> {pagesContext.pageInfo?.id}</li>
          <li><strong>Title:</strong> {pagesContext.pageInfo?.name}</li>
          <li><strong>Language:</strong> {pagesContext.pageInfo?.language}</li>
          <li><strong>Path:</strong> {pagesContext.pageInfo?.path}</li>
        </ul>
      ) : (
        <p>No page context available yet.</p>
      )}
    </div>
  );
}

export default PagesContextPanel;
