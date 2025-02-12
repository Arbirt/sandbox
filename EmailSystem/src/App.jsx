import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./config/app-routes";

function App() {
  const routes = appRoutes();
  return (
    <>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
