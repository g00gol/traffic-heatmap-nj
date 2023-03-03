import axios from "axios";

export async function getTrafficCounts() {
  let url = "https://data.nj.gov/resource/c74r-6c8d.json?$limit=5000";
  let config = {
    headers: {
      Accept: "application/json",
      "X-App-Token": process.env.REACT_APP_app_token,
    },
  };

  let { data } = await axios.get(url, config);
  return data;
}
