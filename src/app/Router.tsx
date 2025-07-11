import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LibrariesPage } from "@/pages/LibrariesPage";

function Router() {
  return (
    <BrowserRouter basename="/cdnjs-browser/">
      <Routes>
        <Route path="/" element={<LibrariesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
