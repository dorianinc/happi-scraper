import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  getSettingsThunk,
  updateSettingsThunk,
} from "../../store/settingsReducer";
import RangeSlider from "react-bootstrap-range-slider";
import SearchBar from "../SearchBar";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "./Settings.css";

function Settings() {
  const dispatch = useDispatch();
  const { darkMode,setDarkMode } = useDarkMode();
  const [changed, setChanged] = useState(false);
  const [localDarkMode, setLocalDarkMode] = useState(false);
  const [similarityThreshold, setSimilarityThreshold] = useState(80);
  const [filterLimit, setFilterLimit] = useState(5);
  const [selectHighest, setSelectHighest] = useState(false);

  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getSettingsThunk()).then((settings) => {
      setLocalDarkMode(settings.dark_mode);
      setSimilarityThreshold(settings.similarity_threshold);
      setFilterLimit(settings.filter_limit);
      setSelectHighest(settings.select_highest);
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      localDarkMode !== settings.dark_mode ||
      similarityThreshold != settings.similarity_threshold ||
      filterLimit != settings.filter_limit ||
      selectHighest !== settings.select_highest
    ) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [localDarkMode, similarityThreshold, filterLimit, selectHighest]);

  const handleClick = (e) => {
    e.preventDefault();
    const newSettings = {};

    if(darkMode !== localDarkMode){
      setDarkMode(localDarkMode)
    }

    newSettings.dark_mode = localDarkMode;
    newSettings.similarity_threshold = similarityThreshold;
    newSettings.filter_limit = filterLimit;
    newSettings.select_highest = selectHighest;

    dispatch(updateSettingsThunk(newSettings));
  };

  if (!settings) return null;
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
        <hr />
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
              onChange={(e) => setSimilarityThreshold(e.target.value)}
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
                  value="all"
                  checked={!selectHighest}
                  onClick={() => setSelectHighest(false)}
                />
                <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>
                  All
                </p>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="match"
                  value="highest"
                  checked={selectHighest}
                  onClick={() => setSelectHighest(true)}
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
                  value="light"
                  checked={!localDarkMode}
                  onClick={() => setLocalDarkMode(false)}
                />
                <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>
                  Light Mode
                </p>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={localDarkMode}
                  onClick={() => setLocalDarkMode(true)}
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
                onChange={(e) => setFilterLimit(e.target.value)}
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
            <table class="websites-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Include</th>
                  <th>Exclude</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Amazon</td>
                  <td>
                    <input type="radio" name="amazon" value={true} checked />
                  </td>
                  <td>
                    <input type="radio" name="amazon" value={false} />
                  </td>
                </tr>
                <tr>
                  <td>Crunchyroll</td>
                  <td>
                    <input type="radio" name="crunchy" value={true} checked />
                  </td>
                  <td>
                    <input type="radio" name="crunchy" value={false} />
                  </td>
                </tr>
                <tr>
                  <td>eBay</td>
                  <td>
                    <input type="radio" name="ebay" value={true} checked />
                  </td>
                  <td>
                    <input type="radio" name="ebay" value={false} />
                  </td>
                </tr>
                <tr>
                  <td>Japan Figure</td>
                  <td>
                    <input
                      type="radio"
                      name="japan_figure"
                      value={true}
                      checked
                    />
                  </td>
                  <td>
                    <input type="radio" name="japan_figure" value={false} />
                  </td>
                </tr>
                <tr>
                  <td>Kotous</td>
                  <td>
                    <input type="radio" name="kotous" value={true} checked />
                  </td>
                  <td>
                    <input type="radio" name="kotous" value={false} />
                  </td>
                </tr>
                <tr>
                  <td>Otaku Mode</td>
                  <td>
                    <input
                      type="radio"
                      name="otaku_mode"
                      value={true}
                      checked
                    />
                  </td>
                  <td>
                    <input type="radio" name="otaku_mode" value={false} />
                  </td>
                </tr>
                <tr>
                  <td>Super Anime Store</td>
                  <td>
                    <input
                      type="radio"
                      name="super_anime_store"
                      value={true}
                      checked
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="super_anime_store"
                      value={false}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            id="save-button"
            disabled={!changed}
            onClick={(e) => handleClick(e)}
          >
            <p className={`p-tag ${darkMode ? "dark-mode" : "light-mode"}`}>
              Save Settings
            </p>
          </button>
        </div>
        <p id="version">Version 0.5</p>
      </div>
    </div>
  );
}

export default Settings;
