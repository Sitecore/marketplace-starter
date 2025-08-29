# Sitecore Marketplace Starter

This project is the starter template for building Sitecore Marketplace extensions. It demonstrates five extension points: **Custom Field**, **Dashboard Widget**, **Fullscreen**, **Pages Context Panel**, and **Standalone**. Each extension point has its own UI and integration with the Sitecore Marketplace SDK.

---

## Extension Points

### 1. Custom Field Extension

- **Location:** `pages/custom-field-extension/index.tsx`
- **Description:**  
  Provides a button-based UI for selecting preset options in Sitecore XM Cloud custom fields.
  - Initializes the Marketplace SDK client using a custom hook.
  - Fetches the current field value with client.getValue() and displays it.
  - Presents predefined options as buttons (Option A, Option B, Option C).
  - On selection, updates the field value using client.setValue(selected) and closes the app after a short delay.
  - Displays loading and error states for better user feedback.

---

### 2. Dashboard Widget Extension

- **Location:** `pages/dashboard-widget-extension/index.tsx`
- **Description:**  
  Displays a widget in the XM Cloud dashboard.
  - Initializes the Marketplace SDK client.
  - Shows relevant dashboard information or actions.
  - Handles loading and error states.

---

### 3. Fullscreen Extension

- **Location:** `pages/fullscreen-extension/index.tsx`
- **Description:**  
  Provides a fullscreen experience for advanced extension scenarios.
  - Initializes the Marketplace SDK client.
  - Renders content in fullscreen mode.
  - Handles loading and error states.

---

### 4. Pages Context Panel Extension

- **Location:** `pages/pages-contextpanel-extension/index.tsx`
- **Description:**  
  Displays context information about the current page in the XM Cloud Pages editor.
  - Initializes the Marketplace SDK client.
  - Subscribes to `pages.context` using the SDK.
  - Shows page ID, title, language, and path.
  - Handles loading and error states.

---

### 5. Standalone Extension

- **Location:** `pages/standalone-extension/index.tsx`
- **Description:**  
  Runs as a standalone app outside of other extension points.
  - Initializes the Marketplace SDK client.
  - Can be used for custom tools or utilities.
  - Handles loading and error states.

---

## Access Extension Points

- **You cannot access extension point routes directly in the browser (e.g., localhost:3000/...). These routes must be invoked within the Sitecore XM Cloud environment through the configured extension points.To learn how to properly configure and hook up your app to extension points, refer to the official Sitecore documentation:**  
  - (https://doc.sitecore.com/mp/en/developers/marketplace/extension-points.html)
---

## Shared Utilities

- **Marketplace Client Hook:**  
  - Location: `src/utils/hooks/useMarketplaceClient.ts`
  - Provides a reusable React hook for initializing and interacting with the Sitecore Marketplace SDK client.
  - Handles initialization, error, and loading states.

---

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```
---

## How to Use
1. **Create Your Own Repository:**
- You can either fork this repository or create a new template based on it.
- This gives you a clean starting point with all the necessary scaffolding for Marketplace extension development.


2. **Customize Your Module:**
- Remove any extension points you don’t plan to support by deleting their respective folders inside the pages directory.
- Each folder in pages corresponds to a specific extension point (e.g., custom-field-extension, dashboard-widget-extension, etc.).


3. **Structure Overview:**
- The app uses the Sitecore Marketplace SDK and is designed to run inside an iframe provided by XM Cloud Marketplace for full functionality.
- Shared hooks and utilities are located in `src/utils/hooks`.
- You can add more extension points by creating new folders inside `pages`.
- Each folder in `pages` becomes a route, and each `.tsx` file inside those folders becomes a sub-route.


---