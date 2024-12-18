import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../../../context/DarkModeContext";
import {
  getScriptsThunk,
  updateScriptThunk,
} from "../../../../store/scriptsReducer";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "./ScriptsTable.css";

function ScriptsTable() {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const scripts = useSelector((state) => Object.values(state.script.allScripts));

  useEffect(() => {
    dispatch(getScriptsThunk());
  }, [dispatch]);

  const handleWebsiteExclusions = (_e, scriptId, excluded) => {
    dispatch(
      updateScriptThunk({
        scriptId,
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

  if (!scripts) return null;
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
        {scripts.map((script, i) => (
          <tr key={i}>
            <td>{script.siteName}</td>
            <td>
              <input
                type="radio"
                name={script.siteName}
                onChange={(e) =>
                  handleWebsiteExclusions(e, script.id, false)
                }
                checked={!script.isExcluded}
                disabled={disabledSites(script.siteName)}
              />
            </td>
            <td>
              <input
                type="radio"
                name={script.name}
                onChange={(e) =>
                  handleWebsiteExclusions(e, script.id, true)
                }
                checked={script.isExcluded}
                disabled={disabledSites(script.siteName)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ScriptsTable;
