const baseURL = process.env.REACT_APP_API_URL;

// Function to fetch scenarios
export const fetchScenarios = () => {
  return fetch(`${baseURL}/Scenarios`)
    .then(handleResponse)
    .catch(handleError);
};

export const addScenario = (scenarioData) => {
    return fetch(`${baseURL}/Scenarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scenarioData),
    })
    .then(handleResponse)
    .catch(handleError);
  };

const handleResponse = response => {
  if (!response.ok) {
    throw new Error('Scenarios Service response was not ok');
  }
  return response.json();
};


const handleError = error => {
  console.error('Fetch Error:', error);
  throw error;
};
