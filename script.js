const educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let svg = d3.select("svg");

const drawMap = (countryData) => {
  //d attribute in svg - the instructions to draw the path
  //then call d3.geoPath() to generates path instructions from the data
  svg.selectAll("path").data(countryData).enter().append("path").attr("d", d3.geoPath()).attr("class", "county");
};

//fetch country url first, then call function to fetch the education data
async function fetchMap() {
  const countyResponse = await fetch(countyURL);
  const countryData = await countyResponse.json();

  //d3 only supports geoJSON so here we need to covert it
  //only the data > objects > counties will be use in this project, only convert this part
  //the geometry field of each object has an array of coordinates from which we can draw lines to draw a map outline of that county
  //and after converted as geoJSON, we only need features parts, so extrait it only
  const geojson = topojson.feature(countryData, countryData.objects.counties).features;
  drawMap(geojson);
  fetchEducation();
}

async function fetchEducation() {
  const educationResponse = await fetch(educationURL);
  const educationData = await educationResponse.json();
  console.log(educationData);
}

fetchMap();
