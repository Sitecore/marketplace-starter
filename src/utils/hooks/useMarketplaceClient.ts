import { ClientSDK } from "@sitecore-marketplace-sdk/client";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { XMC } from "@sitecore-marketplace-sdk/xmc";

export interface MarketplaceClientState {
  client: ClientSDK | null;
  appContext: any;
  error: Error | null;
  isLoading: boolean;
  isInitialized: boolean;
}

export interface UseMarketplaceClientOptions {
  retryAttempts?: number;
  retryDelay?: number;
  autoInit?: boolean;
}

const DEFAULT_OPTIONS: Required<UseMarketplaceClientOptions> = {
  retryAttempts: 3,
  retryDelay: 1000,
  autoInit: true,
};

let client: ClientSDK | undefined = undefined;

async function getMarketplaceClient() {
  
if (window === window.parent) {
    console.warn("App is not running inside an iframe. SDK will not initialize.");
  }

  if (client) return client;

  const config = {
    target: (window as any).parent,
    modules: [XMC],
  };

  console.log("Initializing SDK with config:", config);
  client = await ClientSDK.init(config);
  return client;
}

export function useMarketplaceClient(options: UseMarketplaceClientOptions = {}) {
  const opts = useMemo(() => ({ ...DEFAULT_OPTIONS, ...options }), [options]);

  const [state, setState] = useState<MarketplaceClientState>({
    client: null,
    appContext: null,
    error: null,
    isLoading: false,
    isInitialized: false,
  });

  const isInitializingRef = useRef(false);

  const initializeClient = useCallback(async (attempt = 1): Promise<void> => {
    let shouldProceed = false;
    setState(prev => {
      if (prev.isLoading || prev.isInitialized || isInitializingRef.current) {
        return prev;
      }
      shouldProceed = true;
      isInitializingRef.current = true;
      return { ...prev, isLoading: true, error: null };
    });

    if (!shouldProceed) return;

    try {
      const c = await getMarketplaceClient();
      const contextRes = await c.query("application.context");
      const appContext = contextRes.data;

      console.log("SDK initialized. App context:", appContext);

      setState({
        client: c,
        appContext,
        error: null,
        isLoading: false,
        isInitialized: true,
      });
    } catch (error) {
      console.error("SDK initialization failed:", error);
      if (attempt < opts.retryAttempts) {
        await new Promise(resolve => setTimeout(resolve, opts.retryDelay));
        return initializeClient(attempt + 1);
      }

      setState({
        client: null,
        appContext: null,
        error: error instanceof Error ? error : new Error("Failed to initialize MarketplaceClient"),
        isLoading: false,
        isInitialized: false,
      });
    } finally {
      isInitializingRef.current = false;
    }
  }, [opts.retryAttempts, opts.retryDelay]);

  useEffect(() => {
    if (opts.autoInit) {
      initializeClient();
    }

    return () => {
      isInitializingRef.current = false;
      setState({
        client: null,
        appContext: null,
        error: null,
        isLoading: false,
        isInitialized: false,
      });
    };
  }, [opts.autoInit, initializeClient]);

  return useMemo(() => ({
    ...state,
    initialize: initializeClient,
  }), [state, initializeClient]);
}
