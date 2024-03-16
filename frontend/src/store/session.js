export const fetchCsrfToken = async () => {
	try {
	  const response = await fetch("/api/auth/generate-token");
	  if (response.ok) {
		const data = await response.json();
		return data;
	  } else {
		throw new Error("Failed to fetch CSRF token");
	  }
	} catch (error) {
	  console.log("Error fetching CSRF token:", error.message);
	}
  };
