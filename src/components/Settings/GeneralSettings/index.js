import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDarkMode } from "../../../context/DarkModeContext";
import * as settingsActions from "../../../store/settingsReducer";
import RangeSlider from "react-bootstrap-range-slider";
import TargetsTable from "./TargetsTable";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "../Settings.css";

function GeneralSettings({ settings }) {
  const dispatch = useDispatch();
  const { darkMode, setDarkMode } = useDarkMode();
  const [similarityThreshold, setSimilarityThreshold] = useState(80);
  const [filterLimit, setFilterLimit] = useState(5); // Default to 5
  const [selectHighest, setSelectHighest] = useState(false);

  useEffect(() => {
    if (settings) {
      setDarkMode(settings.darkMode);
      setSimilarityThreshold(settings.similarityThreshold ?? 80); 
      setFilterLimit(settings.filterLimit ?? 5); 
      setSelectHighest(settings.selectHighest ?? false); 
    }
  }, [settings]);

  const handleDarkModeChange = (e, value) => {
    e.preventDefault();
    setDarkMode(value);
    dispatch(settingsActions.updateSettingsThunk({ darkMode: value }));
  };

  const handleSimilarityThresholdChange = (e, value) => {
    const numericValue = Number(value); // Ensure it's a number
    setSimilarityThreshold(numericValue);
    dispatch(settingsActions.updateSettingsThunk({ similarityThreshold: numericValue }));
  };

  const handleFilterLimitChange = (e, value) => {
    const numericValue = Number(value); // Ensure it's a number
    setFilterLimit(numericValue);
    dispatch(settingsActions.updateSettingsThunk({ filterLimit: numericValue }));
  };

  const handleSelectHighestChange = (e, value) => {
    e.preventDefault();
    setSelectHighest(value);
    dispatch(settingsActions.updateSettingsThunk({ selectHighest: value }));
  };

  if (!settings) return null;

  return (
    <>
      <div className="settings-items full">
        <h5 className={`settings-header ${darkMode ? "dark-mode" : "light-mode"}`}>
          Similarity Rating Threshold
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip className={`tooltip ${darkMode ? "dark-mode" : "light-mode"}`}>Sets the strictness for matching search results to the queried product.</Tooltip>}
          >
            <i className="fa-regular fa-circle-question fa-xs" />
          </OverlayTrigger>
        </h5>
        <RangeSlider
          min={1}
          tooltip="auto"
          value={similarityThreshold}
          onChange={(e) => handleSimilarityThresholdChange(e, e.target.value)}
        />
      </div>
      <div className="settings-items flex">
        <div style={{ flex: "1" }}>
          <h5 className={`settings-header ${darkMode ? "dark-mode" : "light-mode"}`}>
            Match Selects on Start
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip className={`tooltip ${darkMode ? "dark-mode" : "light-mode"}`}>Choose to include all matches or only the most similar.</Tooltip>}
            >
              <i className="fa-regular fa-circle-question fa-xs" />
            </OverlayTrigger>
          </h5>
          <label className="radio-label">
            <input
              type="radio"
              name="match"
              checked={!selectHighest}
              onChange={(e) => handleSelectHighestChange(e, false)}
              disabled
            />
            <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>All</p>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="match"
              checked={selectHighest}
              onChange={(e) => handleSelectHighestChange(e, true)}
              disabled
            />
            <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>Highest Rating</p>
          </label>
        </div>
        <div style={{ flex: "1" }}>
          <h5 className={`settings-header ${darkMode ? "dark-mode" : "light-mode"}`}>
            Dark Mode
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip className={`tooltip ${darkMode ? "dark-mode" : "light-mode"}`}>Set darker color scheme for the interface.</Tooltip>}
            >
              <i className="fa-regular fa-circle-question fa-xs" />
            </OverlayTrigger>
          </h5>
          <label className="radio-label">
            <input
              type="radio"
              name="theme"
              checked={darkMode}
              onChange={(e) => handleDarkModeChange(e, true)}
            />
            <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>Enabled</p>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="theme"
              checked={!darkMode}
              onChange={(e) => handleDarkModeChange(e, false)}
            />
            <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>Disabled</p>
          </label>
        </div>
        <div style={{ flex: "2" }}>
          <h5 className={`settings-header ${darkMode ? "dark-mode" : "light-mode"}`}>
            Filter Limit
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip className={`tooltip ${darkMode ? "dark-mode" : "light-mode"}`}>Choose how many search results to look through.</Tooltip>}
            >
              <i className="fa-regular fa-circle-question fa-xs" />
            </OverlayTrigger>
          </h5>
          <RangeSlider
            min={1}
            max={10}
            tooltip="auto"
            value={filterLimit}
            onChange={(e) => handleFilterLimitChange(e, e.target.value)}
          />
        </div>
      </div>
      <div className="settings-items full">
        <h5 className={`settings-header ${darkMode ? "dark-mode" : "light-mode"}`}>
          Targets
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip className={`tooltip ${darkMode ? "dark-mode" : "light-mode"}`}>Toggle to enable or disable querying a specific website.</Tooltip>}
          >
            <i className="fa-regular fa-circle-question fa-xs" />
          </OverlayTrigger>
        </h5>
        <TargetsTable />
      </div>
    </>
  );
}

export default GeneralSettings;