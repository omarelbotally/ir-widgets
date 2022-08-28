import { Route, Routes, Router } from "react-router";
import Businesssegmentstabs from "./Components/Business-segments-tabs/Businesssegmentstabs";
import "./fonts/fonts/Avenir-Black.woff";
import "./fonts/fonts/Avenir-Black.woff2";
import "./fonts/fonts/Avenir-Book.woff";
import "./fonts/fonts/Avenir-Book.woff2";
import "./fonts/fonts/Avenir-Heavy.woff";
import "./fonts/fonts/Avenir-Heavy.woff2";
import "./fonts/fonts/Avenir-Medium.woff";
import "./fonts/fonts/Avenir-Medium.woff2";

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
