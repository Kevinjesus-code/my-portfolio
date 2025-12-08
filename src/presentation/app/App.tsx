import { useState } from "react";
import { Home, Portfolio, AboutMe, Contact } from "../ui";
import { DSANavBar } from "../components";
import { useComments } from "../hooks/useComments";
import "./App.css";

function App() {
  const [page, setPage] = useState(0);
  const commentsData = useComments();

  const renderPage = () => {
    switch (page) {
      case 0:
        return <Home setPage={setPage} />;
      case 1:
        return <AboutMe setPage={setPage} />;
      case 2:
        return <Portfolio />;
      case 3:
        return <Contact commentsData={commentsData} />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <>
      <div className="global-blob-container">
        <div className="global-blob global-blob-1"></div>
        <div className="global-blob global-blob-2"></div>
        <div className="global-blob global-blob-3"></div>
        <div className="global-blob global-blob-4"></div>
        <div className="global-blob global-blob-5"></div>
      </div>
      <DSANavBar setPage={setPage} currentPage={page} />
      <main className="main">{renderPage()} </main>
    </>
  );
}

export default App;
