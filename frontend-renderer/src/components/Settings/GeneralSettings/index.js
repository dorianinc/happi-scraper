import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../../context/DarkModeContext";
import * as settingsActions from "../../../store/settingsReducer";
import RangeSlider from "react-bootstrap-range-slider";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "../Settings.css";
import ScriptsTable from "./ScriptsTable";

function GeneralSettings() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const { darkMode, setDarkMode } = useDarkMode(true);
  const [similarityThreshold, setSimilarityThreshold] = useState(80);
  const [filterLimit, setFilterLimit] = useState(5);
  const [selectHighest, setSelectHighest] = useState(false);

  useEffect(() => {
    dispatch(settingsActions.getSettingsThunk());
  }, []);

  useEffect(() => {
    if (settings) {
      setDarkMode(settings.darkMode);
      setSimilarityThreshold(settings.similarityThreshold);
      setFilterLimit(settings.filterLimit);
      setSelectHighest(settings.selectHighest);
    }
  }, [settings]);

  // Reusable handle change function
  const handleSettingChange = (key, value) => {
    const numericValue = typeof value === "boolean" ? value : Number(value);
    const setterMap = {
      darkMode: setDarkMode,
      similarityThreshold: setSimilarityThreshold,
      filterLimit: setFilterLimit,
      selectHighest: setSelectHighest,
    };

    setterMap[key](numericValue); // Update local state
    dispatch(settingsActions.updateSettingsThunk({ [key]: numericValue })); // Dispatch update
  };

  if (!settings) return <div>Loading settings...</div>;

  return (
    <div className="settings-container">
      <div className="inner-content">
        <h1
          className={`header-tag ${darkMode ? "dark-mode" : ""}`}
          style={{ padding: "2px" }}
        >
          Settings
        </h1>
        <div className="centered-div settings">
          <div className="settings-items full">
            <h5 className={`settings-header ${darkMode ? "dark-mode" : ""}`}>
              <p>Similarity Rating Threshold</p>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip className={`tooltip ${darkMode ? "dark-mode" : ""}`}>
                    Sets the strictness for matching search results to the
                    queried product.
                  </Tooltip>
                }
              >
                <i className="fa-regular fa-circle-question fa-xs" />
              </OverlayTrigger>
            </h5>
            <RangeSlider
              min={1}
              tooltip="auto"
              value={similarityThreshold}
              onChange={(e) =>
                handleSettingChange("similarityThreshold", e.target.value)
              }
            />
          </div>

          <div className="settings-items flex">
            <div style={{ flex: "1" }}>
              <h5 className={`settings-header ${darkMode ? "dark-mode" : ""}`}>
                <p>Match Selects on Start</p>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip
                      className={`tooltip ${darkMode ? "dark-mode" : ""}`}
                    >
                      Choose to include all matches or only the most similar.
                    </Tooltip>
                  }
                >
                  <i className="fa-regular fa-circle-question fa-xs" />
                </OverlayTrigger>
              </h5>
              <label className="radio-label">
                <input
                  type="radio"
                  name="match"
                  className={`${
                    darkMode ? "dark-mode" : ""
                  }`}
                  checked={!selectHighest}
                  onChange={() => handleSettingChange("selectHighest", false)}
                  disabled
                />
                <p className={`p-tag ${darkMode ? "dark-mode" : ""}`}>All</p>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="match"
                  checked={selectHighest}
                  onChange={() => handleSettingChange("selectHighest", true)}
                  disabled
                />
                <p className={`p-tag ${darkMode ? "dark-mode" : ""}`}>
                  Highest Rating
                </p>
              </label>
            </div>

            <div style={{ flex: "1" }}>
              <h5 className={`settings-header ${darkMode ? "dark-mode" : ""}`}>
                <p>Dark Mode</p>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip
                      className={`tooltip ${darkMode ? "dark-mode" : ""}`}
                    >
                      Set darker color scheme for the interface.
                    </Tooltip>
                  }
                >
                  <i className="fa-regular fa-circle-question fa-xs" />
                </OverlayTrigger>
              </h5>
              <label className="radio-label">
                <input
                  type="radio"
                  name="theme"
                  checked={darkMode}
                  onChange={() => handleSettingChange("darkMode", true)}
                />
                <p className={`p-tag ${darkMode ? "dark-mode" : ""}`}>
                  Enabled
                </p>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="theme"
                  checked={!darkMode}
                  onChange={() => handleSettingChange("darkMode", false)}
                />
                <p className={`p-tag ${darkMode ? "dark-mode" : ""}`}>
                  Disabled
                </p>
              </label>
            </div>

            <div style={{ flex: "2" }}>
              <h5 className={`settings-header ${darkMode ? "dark-mode" : ""}`}>
                <p>Filter Limit</p>
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip
                      className={`tooltip ${darkMode ? "dark-mode" : ""}`}
                    >
                      Choose how many search results to look through.
                    </Tooltip>
                  }
                >
                  <i className="fa-regular fa-circle-question fa-xs" />
                </OverlayTrigger>
              </h5>
              <RangeSlider
                min={1}
                max={10}
                tooltip="auto"
                value={filterLimit}
                onChange={(e) =>
                  handleSettingChange("filterLimit", e.target.value)
                }
              />
            </div>
          </div>

          <div className="settings-items full">
            <h5 className={`settings-header ${darkMode ? "dark-mode" : ""}`}>
              <p>Targets</p>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip className={`tooltip ${darkMode ? "dark-mode" : ""}`}>
                    Toggle to enable or disable querying a specific website.
                  </Tooltip>
                }
              >
                <i className="fa-regular fa-circle-question fa-xs" />
              </OverlayTrigger>
            </h5>
            <ScriptsTable />
          </div>
        </div>
        <p id="version">Version 0.5</p>
      </div>
    </div>
  );
}

export default GeneralSettings;
