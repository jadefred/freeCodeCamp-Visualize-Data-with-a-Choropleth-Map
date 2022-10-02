const educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let svg = d3.select("svg");

const drawMap = () => {};

//fetch country url first, then call function to fetch the education data
async function fetchMap() {
  const countyResponse = await fetch(countyURL);
  const countryData = await countyResponse.json();

  //d3 only supports geoJSON so here we need to covert it
  //only the data > objects > counties will be use in this project, only convert this part
  //the geometry field of each object has an array of coordinates from which we can draw lines to draw a map outline of that county
  //and after converted as geoJSON, we only need features parts, so extrait it only
  const geojson = topojson.feature(countryData, countryData.objects.counties).features;

  fetchEducation();
}

async function fetchEducation() {
  const educationResponse = await fetch(educationURL);
  const educationData = await educationResponse.json();
  console.log(educationData);
}

fetchMap();
