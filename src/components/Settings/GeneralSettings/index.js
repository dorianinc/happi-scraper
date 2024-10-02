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
  const [similarityThreshold, setSimilarityThreshold] = useState(0); // 80
  const [filterLimit, setFilterLimit] = useState(0); // 5
  const [selectHighest, setSelectHighest] = useState(false);

  useEffect(() => {
    setDarkMode(settings.darkMode);
    setSimilarityThreshold(settings.similarityThreshold);
    setFilterLimit(settings.filterLimit);
    setSelectHighest(settings.selectHighest);
  }, [settings]);

  const handleDarkModeChange = (e, value) => {
    e.preventDefault();
    setDarkMode(value);
    dispatch(settingsActions.updateSettingsThunk({ darkMode: value }));
  };

  const handleSimilarityThresholdChange = (e, value) => {
    e.preventDefault();
    setSimilarityThreshold(value);
    dispatch(
      settingsActions.updateSettingsThunk({ similarityThreshold: value })
    );
  };

  const handleFilterLimitChange = (e, value) => {
    e.preventDefault();
    setFilterLimit(value);
    dispatch(settingsActions.updateSettingsThunk({ filterLimit: value }));
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
        <h5
          className={`settings-header ${darkMode ? "dark-mode" : "light-mode"}`}
        >
          Similarity Rating Threshold{" "}
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip
                className={`tooltip ${darkMode ? "dark-mode" : "light-mode"}`}
                style={{ padding: "5px", width: "200px" }}
              >
                Sets the strictness for matching search results to the queried
                product. The lower threshold the less similiar a product name
                has to be to the queried name to be considered a match.
              </Tooltip>
            }
          >
            <i class="fa-regular fa-circle-question fa-xs" />
          </OverlayTrigger>
        </h5>
        <RangeSlider
          min="1"
          tooltip="auto"
          value={similarityThreshold}
          onChange={(e) => handleSimilarityThresholdChange(e, e.target.value)}
        />
      </div>
      <div className="settings-items flex">
        <div style={{ flex: "1" }}>
          <h5
            className={`settings-header ${
              darkMode ? "dark-mode" : "light-mode"
            }`}
          >
            Match Selects on Start{" "}
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip
                  className={`tooltip ${darkMode ? "dark-mode" : "light-mode"}`}
                  style={{ padding: "5px", width: "200px" }}
                >
                  Choose to either include all matches or only the most similar
                  matching products from each website upon a successful query.
                </Tooltip>
              }
            >
              <i class="fa-regular fa-circle-question fa-xs" />
            </OverlayTrigger>
          </h5>
          <label className="radio-label">
            <input
              type="radio"
              name="match"
              checked={!selectHighest}
              onClick={(e) => handleSelectHighestChange(e, false)}
              disabled
            />
            <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>
              All
            </p>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="match"
              checked={selectHighest}
              onClick={(e) => handleSelectHighestChange(e, true)}
              disabled
            />
            <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>
              Highest Rating
            </p>
          </label>
        </div>
        <div style={{ flex: "1" }}>
          <h5
            className={`settings-header ${
              darkMode ? "dark-mode" : "light-mode"
            }`}
          >
            Dark Mode{" "}
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip
                  className={`tooltip ${darkMode ? "dark-mode" : "light-mode"}`}
                  style={{ padding: "5px", width: "200px" }}
                >
                  Set darker color scheme for the interface, reducing eye strain
                  in low-light environments and enhancing visibility in darker
                  settings.
                </Tooltip>
              }
            >
              <i class="fa-regular fa-circle-question fa-xs" />
            </OverlayTrigger>
          </h5>
          <label className="radio-label">
            <input
              type="radio"
              name="theme"
              checked={darkMode}
              onClick={(e) => handleDarkModeChange(e, true)}
            />
            <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>
              Enabled
            </p>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="theme"
              checked={!darkMode}
              onClick={(e) => handleDarkModeChange(e, false)}
            />
            <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>
              Disabled
            </p>
          </label>
        </div>
        <div style={{ flex: "2" }}>
          <h5
            className={`settings-header ${
              darkMode ? "dark-mode" : "light-mode"
            }`}
          >
            Filter Limit{" "}
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip
                  className={`tooltip ${darkMode ? "dark-mode" : "light-mode"}`}
                  style={{ padding: "5px", width: "200px" }}
                >
                  Choose how many search results to look through on each website
                </Tooltip>
              }
            >
              <i class="fa-regular fa-circle-question fa-xs" />
            </OverlayTrigger>
          </h5>
          <RangeSlider
            min="1"
            max="10"
            tooltip="auto"
            value={filterLimit}
            onChange={(e) => handleFilterLimitChange(e, e.target.value)}
          />
        </div>
      </div>
      <div className="settings-items full">
        <h5
          className={`settings-header ${darkMode ? "dark-mode" : "light-mode"}`}
        >Targets{" "}
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip
                className={`tooltip ${darkMode ? "dark-mode" : "light-mode"}`}
                style={{ padding: "5px", width: "200px" }}
              >
                Toggle to enable or disable querying a specific website during
                the matching process.
              </Tooltip>
            }
          >
            <i class="fa-regular fa-circle-question fa-xs" />
          </OverlayTrigger>
        </h5>
        <TargetsTable />
      </div>
    </>
  );
}

export default GeneralSettings;
