import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../context/DarkModeContext";
import * as settingsActions from "../../store/settingsReducer";
import * as websiteActions from "../../store/WebsitesReducer";
import RangeSlider from "react-bootstrap-range-slider";
import SearchBar from "../SearchBar";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "./Settings.css";

function Settings() {
  const dispatch = useDispatch();
  const { darkMode, setDarkMode } = useDarkMode();
  const [similarityThreshold, setSimilarityThreshold] = useState(80);
  const [filterLimit, setFilterLimit] = useState(5);
  const [selectHighest, setSelectHighest] = useState(false);

  const settings = useSelector((state) => state.settings);
  const websites = useSelector((state) => Object.values(state.websites));

  useEffect(() => {
    dispatch(settingsActions.getSettingsThunk()).then((settings) => {
      setDarkMode(settings.dark_mode);
      setSimilarityThreshold(settings.similarity_threshold);
      setFilterLimit(settings.filter_limit);
      setSelectHighest(settings.select_highest);
    });
    dispatch(websiteActions.getWebsitesThunk());
  }, [dispatch]);

  const handleDarkModeChange = (e, value) => {
    e.preventDefault();
    setDarkMode(value);
    dispatch(settingsActions.updateSettingsThunk({ dark_mode: value }));
  };

  const handleSimilarityThresholdChange = (e, value) => {
    e.preventDefault();
    setSimilarityThreshold(value);
    dispatch(
      settingsActions.updateSettingsThunk({ similarity_threshold: value })
    );
  };

  const handleFilterLimitChange = (e, value) => {
    e.preventDefault();
    setFilterLimit(value);
    dispatch(settingsActions.updateSettingsThunk({ filter_limit: value }));
  };

  const handleSelectHighestChange = (e, value) => {
    e.preventDefault();
    setSelectHighest(value);
    dispatch(settingsActions.updateSettingsThunk({ select_highest: value }));
  };

  const handleWebsiteExclusions = (e, id, excluded) => {
    e.preventDefault();
    dispatch(websiteActions.updateWebsitesThunk(id, { excluded }));
  };

  const disabledSites = (name) => {
    console.log("🖥️  name: ", name);
    const excludedSites = [
      "AAA Anime",
      "Big Bad Toy Store",
      "Entertainment Earth",
      "GK Figure Worldwide",
      "HLJ",
      "Solaris Japan",
    ];
    if (excludedSites.includes(name)) return true;
    else return false;
  };

  if (!settings || !websites) return null;
  return (
    <div className="settings-container">
      <SearchBar />
      <div className="inner-content">
        <h1
          className={`header-tag ${darkMode ? "dark-mode" : "light-mode"}`}
          style={{ padding: "2px" }}
        >
          Settings
        </h1>
        <hr className={`line ${darkMode ? "dark-mode" : "light-mode"}`} />
        <div className="centered-div settings">
          <div className="settings-items full">
            <h5
              className={`settings-header ${
                darkMode ? "dark-mode" : "light-mode"
              }`}
            >
              Similarity Rating Threshold{" "}
              <i class="fa-regular fa-circle-question fa-xs" />
            </h5>
            <RangeSlider
              min="1"
              tooltip="auto"
              value={similarityThreshold}
              onChange={(e) =>
                handleSimilarityThresholdChange(e, e.target.value)
              }
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
                <i class="fa-regular fa-circle-question fa-xs" />
              </h5>
              <label className="radio-label">
                <input
                  type="radio"
                  name="match"
                  checked={!selectHighest}
                  onClick={(e) => handleSelectHighestChange(e, false)}
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
                Theme <i class="fa-regular fa-circle-question fa-xs" />
              </h5>
              <label className="radio-label">
                <input
                  type="radio"
                  name="theme"
                  checked={!darkMode}
                  onClick={(e) => handleDarkModeChange(e, false)}
                />
                <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>
                  Light Mode
                </p>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="theme"
                  checked={darkMode}
                  onClick={(e) => handleDarkModeChange(e, true)}
                />
                <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>
                  Dark Mode
                </p>
              </label>
            </div>
            <div style={{ flex: "2" }}>
              <h5
                className={`settings-header ${
                  darkMode ? "dark-mode" : "light-mode"
                }`}
              >
                Filter Limit <i class="fa-regular fa-circle-question fa-xs" />
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
              className={`settings-header ${
                darkMode ? "dark-mode" : "light-mode"
              }`}
            >
              Websites <i class="fa-regular fa-circle-question fa-xs" />
            </h5>
            <table
              className={`websites-table ${
                darkMode ? "dark-mode" : "light-mode"
              }`}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Include</th>
                  <th>Exclude</th>
                </tr>
              </thead>
              <tbody>
                {websites.map((website, i) => (
                  <tr key={i}>
                    <td>{website.name}</td>
                    <td>
                      <input
                        type="radio"
                        name={website.name}
                        onClick={(e) =>
                          handleWebsiteExclusions(e, website.id, false)
                        }
                        checked={!website.excluded}
                        disabled={disabledSites(website.name)}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name={website.name}
                        onClick={(e) =>
                          handleWebsiteExclusions(e, website.id, true)
                        }
                        checked={website.excluded}
                        disabled={disabledSites(website.name)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p id="version">Version 0.5</p>
      </div>
    </div>
  );
}

export default Settings;
