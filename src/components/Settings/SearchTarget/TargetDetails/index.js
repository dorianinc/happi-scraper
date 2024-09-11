import React, { useEffect } from "react";
import { useDarkMode } from "../../../../context/DarkModeContext";
import { useDispatch, useSelector } from "react-redux";
import * as TargetActions from "../../../../store/searchTargetsReducer";

const TargetDetails = () => {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const target = useSelector((state) => state.searchTarget.currentTarget)
  console.log("🖥️  target: ", target)

  useEffect(() => {
    dispatch(TargetActions.getSingleTargetThunk());
  }, [dispatch]);

  if(!target) return null;
  return (
    <div>
        <h1>{`Target: ${target.siteName}`}</h1>      
                   
    </div>
  );
};

export default TargetDetails;
