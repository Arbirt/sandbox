import BatchManager from "../pages/batch-manager";
import ScanningAndAcquisision from "../pages/scanning-and-acquisision";

export const appRoutes = () => {
  const routes = [
    { path: "/BatchManager", element: <BatchManager /> },
    { path: "/", element: <BatchManager /> },
    { path: "/Scanning", element: <ScanningAndAcquisision /> },
  ];
  return routes;
};
