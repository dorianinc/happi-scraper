document.addEventListener("DOMContentLoaded", () => {
  initializeSettings();
  console.log("Modal is ready");
});

const initializeSettings = async () => {
  const credentialsField = document.getElementById("#credentials");
  const passwordField = document.getElementById("#password");

  try {
    console.log("in try for initialize settings");
    const res = await window.api.getLoginInfo();
    console.log("🖥️  res: ", res);
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
};
