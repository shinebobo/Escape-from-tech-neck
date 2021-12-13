import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import Step1 from "./components/step1/step1";
import Exercise from "./components/exercise/exercise";
import Step2 from "./components/step2/step2";
import Step3 from "./components/step3/step3";
import Help from "./components/help/help";
import Back from "./components/back/back";
import Wakeup from "./components/wakeup/wakeup";
import Record from "./components/record/record";
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import React, { useState } from "react";
function App() {
  const [sound, setSound] = useState("sound1");
  const [alertt, setAlertt] = useState(0);
  const [posture0, setPosture0] = useState(0);
  const [posture1, setPosture1] = useState(0);
  const [posture2, setPosture2] = useState(0);
  const [posture3, setPosture3] = useState(0);
  const [posture4, setPosture4] = useState(0);
  return (
  <Router>
    <div className="App">
      <Header sound = {sound} setSound = {setSound}/>
      <Routes>
      <Route path="/" element = {<Main/>} />
      <Route path="/start/step1" element = {<Step1/>} />
      <Route path="/start/step2" element = {<Step2 alertt = {alertt} setAlertt = {setAlertt} />} />
      <Route path="/start/step3" element = {<Step3 sound = {sound} alertt = {alertt} />} />
      <Route path="/exercise" element = {<Exercise/>} />
      <Route path="/exercise/back" element = {<Back/>} />
      <Route path="/exercise/wakeup" element = {<Wakeup/>} />
      <Route path="/help" element = {<Help/>} />
      <Route path="/record" element = {<Record/>} />
      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default App;