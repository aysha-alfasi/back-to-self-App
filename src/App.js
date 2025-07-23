import { useState } from "react";
import CoverPage from "./components/CoverPage";
import OptionsPage from "./components/OptionsPage";

function App() {
  const [page, setPage] = useState('cover');

  return (
    <>
      {page === 'cover' && <CoverPage onDiveIn={() => setPage('options')} />}
      {page === 'options' && <OptionsPage setPage={setPage} />}
      </>
  );
}

export default App;
