import { useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import Table from "react-bootstrap/Table";
import SearchBar from "../SearchBar";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import "./Settings.css";

function Settings() {
  const [value, setValue] = useState(80);

  return (
    <div className="settings-container">
      <SearchBar />
      <div className="inner-content">
        <h1 style={{ padding: "2px" }}>Settings</h1>
        <hr />
        <div className="centered-div settings">
          <div className="settings-items full">
            <h5 className="settings-header">
              Similarity Rating Threshold{" "}
              <i class="fa-regular fa-circle-question fa-xs" />
            </h5>
            <RangeSlider
              tooltip="auto"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="settings-items flex">
            <div>
              <h5 className="settings-header">
                Match Selects on Start{" "}
                <i class="fa-regular fa-circle-question fa-xs" />
              </h5>
              <label className="radio-label">
                <input type="radio" name="match" value="all" checked />
                <p>All</p>
              </label>
              <label className="radio-label">
                <input type="radio" name="match" value="highest" />
                <p>Highest Rating</p>
              </label>
            </div>
            <div>
              <h5 className="settings-header">
                Theme <i class="fa-regular fa-circle-question fa-xs" />
              </h5>
              <label className="radio-label">
                <input type="radio" name="theme" value="light" checked />
                <p>Light Mode</p>
              </label>
              <label className="radio-label">
                <input type="radio" name="theme" value="dark" />
                <p>Dark Mode</p>
              </label>
            </div>
          </div>
          <div className="settings-items full">
            <h5 className="settings-header">
              Websites <i class="fa-regular fa-circle-question fa-xs" />
            </h5>
            <Table striped bordered>
              <thead>
                <tr>
                  <th colSpan={2}>Name</th>
                  <th>Include</th>
                  <th>Exclude</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2}>Amazon</td>
                  <td>
                    <input type="radio" name="amazon" value={true} checked />
                  </td>
                  <td>
                    <input type="radio" name="amazon" value={false} />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>AAA SuperStore</td>
                  <td>
                    <input type="radio" name="aaa" value={true} checked />
                  </td>
                  <td>
                    <input type="radio" name="aaa" value={false} />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>CrunchyRoll</td>
                  <td>
                    <input type="radio" name="crunchy" value={true} checked />
                  </td>
                  <td>
                    <input type="radio" name="crunchy" value={false} />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <button id="save-button" disabled="true">
            Save Settings
          </button>
        </div>
        <p id="version">Version 0.5</p>
      </div>
    </div>
  );
}

export default Settings;
