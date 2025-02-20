import BatchManager from "../pages/batch-manager";
import ManualDocumentEditing from "../pages/manual-document-editing";
import ScanningAndAcquisision from "../pages/scanning-and-acquisision";

export const appRoutes = () => {
  const routes = [
    { path: "/BatchManager", element: <BatchManager /> },
    { path: "/", element: <BatchManager /> },
    { path: "/Scanning", element: <ScanningAndAcquisision /> },
    { path: "/Manual", element: <ManualDocumentEditing /> },
  ];
  return routes;
};
