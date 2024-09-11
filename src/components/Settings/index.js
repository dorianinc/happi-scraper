import React, { useEffect } from "react";
import * as settingsActions from "../../store/settingsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../context/DarkModeContext";
import "./Settings.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GeneralSettings from "./General";

function Settings() {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(settingsActions.getSettingsThunk());
  }, []);

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
          <Tabs
            defaultActiveKey="general"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="general" title="General">
              <GeneralSettings settings={settings} />
            </Tab>
            <Tab eventKey="website" title="Websites">
              Tab content for Profile
            </Tab>
          </Tabs>
        </div>
        <p id="version">Version 0.5</p>
      </div>
    </div>
  );
}

export default Settings;
