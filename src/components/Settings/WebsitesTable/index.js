import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../../context/DarkModeContext";
import * as searchTargetActions from "../../../store/searchTargetsReducer";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "./WebsitesTable.css";

function WebsitesTable() {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const searchTargets = useSelector((state) =>
    Object.values(state.searchTargets)
  );

  useEffect(() => {
    dispatch(searchTargetActions.getSearchTargetsThunk());
  }, [dispatch]);

  const handleWebsiteExclusions = (_e, searchTargetId, excluded) => {
    dispatch(
      searchTargetActions.updateSearchTargetsThunk({
        searchTargetId,
        payload: { excluded },
      })
    );
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

  if (!searchTargets) return null;
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
        {searchTargets.map((searchTarget, i) => (
          <tr key={i}>
            <td>{searchTarget.siteName}</td>
            <td>
              <input
                type="radio"
                name={searchTarget.siteName}
                onChange={(e) =>
                  handleWebsiteExclusions(e, searchTarget.id, false)
                }
                checked={!searchTarget.isExcluded}
                disabled={disabledSites(searchTarget.siteName)}
              />
            </td>
            <td>
              <input
                type="radio"
                name={searchTarget.name}
                onChange={(e) =>
                  handleWebsiteExclusions(e, searchTarget.id, true)
                }
                checked={searchTarget.isExcluded}
                disabled={disabledSites(searchTarget.siteName)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WebsitesTable;
