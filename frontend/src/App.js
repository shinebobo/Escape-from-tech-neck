import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import Step1 from "./components/step1/step1";
import Exercise from "./components/exercise/exercise";
import Step2 from "./components/step2/step2";
import Step3 from "./components/step3/step3";
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
  <Router>
    <div className="App">
      <Header />
      <Routes>
      <Route path="/" element = {<Main/>} />
      <Route path="/start/step1" element = {<Step1/>} />
      <Route path="/start/step2" element = {<Step2/>} />
      <Route path="/start/step3" element = {<Step3/>} />
      <Route path="/exercise" element = {<Exercise/>} />
      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default App;