import React, { useEffect } from "react";
import { useDarkMode } from "../../../../context/DarkModeContext";
import { useDispatch, useSelector } from "react-redux";
import * as TargetActions from "../../../../store/searchTargetsReducer";

const TargetDetails = () => {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const target = useSelector((state) => {
    console.log("🖥️  state: ", state)
    return state.searchTargets
  })
  console.log("🖥️  target in target details: ", target);

  useEffect(() => {
    dispatch(TargetActions.getSingleTargetThunk());
  }, [dispatch]);

  return <></>;
};

export default TargetDetails;
