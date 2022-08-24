import { Route, Routes, Router } from "react-router";
import Businesssegmentstabs from "./Components/Business-segments-tabs/Businesssegmentstabs";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/businesssegments"
          render={<Businesssegmentstabs />}
          element={<Businesssegmentstabs />}
        />
      </Routes>
    </div>
  );
}

export default App;
