import { useState } from "react";
import "./App.css";

import All from "./components/All";
import Scene from "./components/Scene";
import CoreElement from "./components/CoreElement";
import NonCoreElement from "./components/NonCoreElement";
import KeyAction from "./components/KeyAction";

import ContainsCoreElement from "./components/ContainsCoreElement";
import ContainsNonCoreElement from "./components/ContainsNonCoreElement";
import InvolvesKeyAction from "./components/InvolvesKeyAction";

import Inheritance from "./components/Inheritance";
import Subframe from "./components/Subframe";
import Using from "./components/Using";
import PerspectiveOn from "./components/PerspectiveOn";
import InchoativeOf from "./components/InchoativeOf";
import SeeAlso from "./components/SeeAlso";
import Precedes from "./components/Precedes";
import CausativeOf from "./components/CausativeOf";

function App() {
  const [select, setSelect] = useState("All");

  return (
    <div className="container">
      <h1>SceneNet</h1>
      <div className="select-container">
        <p>Select:</p>
        <div className="select-btn-container">
          <button onClick={e => setSelect(e.target.textContent)}>All</button>
          <button onClick={e => setSelect(e.target.textContent)}>Scene</button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Core Element
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Non Core Element
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Key Action
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Contains Core Element
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Contains Non Core Element
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Involves Key Action
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Inheritance
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Subframe
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>Using</button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Perspective On
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Inchoative Of
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Causative Of
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>
            See Also
          </button>
          <button onClick={e => setSelect(e.target.textContent)}>
            Precedes
          </button>
        </div>
      </div>
      <div className="show-case">
        {select === "All" && <All />}
        {select === "Scene" && <Scene />}
        {select === "Core Element" && <CoreElement />}
        {select === "Non Core Element" && <NonCoreElement />}
        {select === "Key Action" && <KeyAction />}
        {select === "Contains Core Element" && <ContainsCoreElement />}
        {select === "Contains Non Core Element" && <ContainsNonCoreElement />}
        {select === "Involves Key Action" && <InvolvesKeyAction />}
        {select === "Inheritance" && <Inheritance />}
        {select === "Subframe" && <Subframe />}
        {select === "Using" && <Using />}
        {select === "Perspective On" && <PerspectiveOn />}
        {select === "Inchoative Of" && <InchoativeOf />}
        {select === "Causative Of" && <CausativeOf />}
        {select === "See Also" && <SeeAlso />}
        {select === "Precedes" && <Precedes />}
      </div>
    </div>
  );
}

export default App;
