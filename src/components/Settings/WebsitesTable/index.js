import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../../context/DarkModeContext";
import * as websiteActions from "../../../store/websitesReducer";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "./WebsitesTable.css";

function WebsitesTable() {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const websites = useSelector((state) => Object.values(state.websites));

  useEffect(() => {
    dispatch(websiteActions.getWebsitesThunk());
  }, [dispatch]);

  const handleWebsiteExclusions = (_e, websiteId, excluded) => {
    dispatch(websiteActions.updateWebsitesThunk({websiteId, payload: {excluded}}));
  };

  const disabledSites = (name) => {
    const excludedSites = [
      "AAA Anime",
      "Big Bad Toy Store",
      "Entertainment Earth",
      "GK Figure Worldwide",
      "HLJ",
      "Solaris Japan",
    ];
    return excludedSites.includes(name);
  };

  if (!websites) return null;
  return (
    <table
      className={`websites-table ${darkMode ? "dark-mode" : "light-mode"}`}
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
                onChange={(e) => handleWebsiteExclusions(e, website.id, false)}
                checked={!website.excluded}
                disabled={disabledSites(website.name)}
              />
            </td>
            <td>
              <input
                type="radio"
                name={website.name}
                onChange={(e) => handleWebsiteExclusions(e, website.id, true)}
                checked={website.excluded}
                disabled={disabledSites(website.name)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WebsitesTable;
