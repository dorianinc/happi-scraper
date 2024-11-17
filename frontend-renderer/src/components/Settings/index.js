import React, { useEffect, useState } from "react";
import * as settingsActions from "../../store/settingsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../context/DarkModeContext";
import "./Settings.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GeneralSettings from "./GeneralSettings";
import ScriptBuilder from "./ScriptBuilder";
import ScriptProvider from "../../context/ScriptContext";

function Settings() {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const [tab, setTab] = useState("general");

  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(settingsActions.getSettingsThunk());
  }, []);

  const handleSelect = (key) => {
    setTab(key);
  };

  if (!settings) return null;
  return (
    <div className="settings-container">
      <div className="inner-content">
        <h1
          className={`header-tag ${darkMode ? "dark-mode" : "light-mode"}`}
          style={{ padding: "2px" }}
        >
          Settings
        </h1>
        <div className="centered-div settings">
          <ScriptProvider>
            <ScriptBuilder />
          </ScriptProvider>
          {/* <GeneralSettings settings={settings}/> */}
          {/* <Tabs
            defaultActiveKey="target"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(key) => handleSelect(key)}
          >
            <Tab.Container
              eventKey="general"
              title="General"
            >
              {tab === "general" && <GeneralSettings settings={settings} />}
            </Tab.Container>
            <Tab.Container
              eventKey="target"
              title="Script Builder"
            >
              {tab === "target" && <ScriptBuilder />}
            </Tab.Container>
          </Tabs> */}
        </div>
        <p id="version">Version 0.5</p>
      </div>
    </div>
  );
}

export default Settings;
