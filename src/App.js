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
import Menu from "./Components/Menu/Menu";
import Latesnews from "./Components/Latest news/Latesnews";
import Investorrepresentation from "./Components/Investor representation/Investorrepresentation";

const items = [
  {
    name: "Business segments",
    color: "#f44336",
    href: "http://localhost:3000/businesssegments",
  },
  {
    name: "Latest news",
    color: "#e91e63",
    href: "http://localhost:3000/latestnews",
  },
  {
    name: "Investor Representation",
    color: "#9c27b0",
    href: "http://localhost:3000/investorrepresentation",
  },
  {
    name: "Experience",
    color: "#673ab7",
    href: "#",
  },
  {
    name: "Interface",
    color: "#3f51b5",
    href: "#",
  },
];
function App() {
  return (
    <div className="App">
      <Menu items={items} />

      <Routes>
        <Route
          path="/businesssegments"
          render={<Businesssegmentstabs />}
          element={<Businesssegmentstabs />}
        />

        <Route
          path="/latestnews"
          render={<Latesnews />}
          element={<Latesnews />}
        />

        <Route
          path="/investorrepresentation"
          render={<Investorrepresentation />}
          element={<Investorrepresentation />}
        />
      </Routes>
    </div>
  );
}

export default App;
