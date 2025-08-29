# 🏪 Sitecore Marketplace Starter

This project is the starter template for building Sitecore Marketplace extensions. It demonstrates five extension points: **Custom Field**, **Dashboard Widget**, **Fullscreen**, **Pages Context Panel**, and **Standalone**. Each extension point has its own UI and integration with the Sitecore Marketplace SDK.

## 🧩 Extension Points

### 1. Custom Field Extension

- **Location:** `pages/custom-field-extension/index.tsx`
- **Description:**  
  Provides a button-based UI for selecting preset options to showcase how to update field values.
  - Initializes the Marketplace SDK client.
  - On button click,, updates the field value using client.setValue(selected) and closes the app after a short delay.

---

### 2. Dashboard Widget Extension

- **Location:** `pages/dashboard-widget-extension/index.tsx`
- **Description:**  
  Displays a widget in the XM Cloud dashboard.
  - Initializes the Marketplace SDK client.
  - Displays sample dashboard information.

---

### 3. Fullscreen Extension

- **Location:** `pages/fullscreen-extension/index.tsx`
- **Description:**  
  Provides a fullscreen experience to be rendered in the Pages application.
  - Initializes the Marketplace SDK client.
  - Displays sample dashboard information.

---

### 4. Pages Context Panel Extension

- **Location:** `pages/pages-contextpanel-extension/index.tsx`
- **Description:**  
  Displays context information about the current page in the XM Cloud Pages editor.
  - Initializes the Marketplace SDK client.
  - Subscribes to `pages.context` using the SDK to handle events.
  - Shows page ID, title, language, and path.
  - Updates data automatically as the user changes selected page.

---

### 5. Standalone Extension

- **Location:** `pages/standalone-extension/index.tsx`
- **Description:**  
  Runs as a standalone app outside of other extension points.
  - Initializes the Marketplace SDK client.
  - Displays sample dashboard information.

# 📦 Getting Started

Note: You cannot access extension point routes directly in the browser (e.g., localhost:3000/...). These routes must be invoked within the Sitecore XM Cloud environment through the configured extension points.To learn how to properly configure and hook up your app to extension points, refer to the official [Sitecore Marketplace documentation](https://doc.sitecore.com/mp/en/developers/marketplace/extension-points.html)


1. Create Your Own Repository:
   - You can either fork this repository or create a new template based on it.
   - This gives you a clean starting point with all the necessary scaffolding for Marketplace extension development.

2. Remove the endpoints you dont require
   - Remove any extension points you don’t plan to support by deleting their respective folders inside the pages directory.
   - Each folder in pages corresponds to a specific extension point (e.g., custom-field-extension, dashboard-widget-extension, etc.).

3. Install dependencies:
   ```sh
   npm install
   ```

4. Run the development server:
   ```sh
   npm run dev
   ```

5. Install the application and test in the different extension points by following the [Sitecore documentation](https://doc.sitecore.com/mp/en/developers/marketplace/introduction-to-sitecore-marketplace.html)

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🐛 Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the repository.