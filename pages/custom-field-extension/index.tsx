import { useState, useEffect } from "react";
import { useMarketplaceClient } from "@/utils/hooks/useMarketplaceClient";

function CustomFieldExtension() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [siteContext, setSiteContext] = useState<any>();

  useEffect(() => {
    if (!error && isInitialized && client) {
      client.query("site.context")
        .then((res) => {
          console.log("Success retrieving site.context:", res.data);
          setSiteContext(res.data);
        })
        .catch((error) => {
          console.error("Error retrieving site.context:", error);
        });
    } else if (error) {
      console.error("Error initializing Marketplace client:", error);
    }
  }, [client, error, isInitialized]);


  return (
    <>
      <h1>Custom Field Extension</h1>
      {isInitialized && siteContext ? (
        <>
          <p><strong>Site Name:</strong> {siteContext.siteName}</p>
          <p><strong>Site ID:</strong> {siteContext.siteId}</p>
        </>
      ) : (
        <p>No site context available yet.</p>
      )}
    </>
  );

}
export default CustomFieldExtension;
