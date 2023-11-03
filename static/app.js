// Put our URL in a URL variable
const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Demog function
function demog(selection) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    console.log(`Data:`, data);

    let metadatalist = data.metadata;

    // Filter based on the option selected
    let metaData = metadatalist.filter((meta) => meta.id == selection);

    // Get the first index from the array
    let firstDatavalue = metaData[0];

    d3.select("#sample-metadata").html("");

    let selectMetaData = Object.entries(firstDatavalue);

    // Iterate through the selectMetaData array
    selectMetaData.forEach(([key, value]) => {
      d3.select("#sample-metadata")
        .append("h5")
        .text(`${key}: ${value}`);
    });

    // Log the entries array
    console.log(selectMetaData);
  });
}

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// Function that builds the bar chart
function barChart(selection) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    console.log(`Data:`, data);

    let sample = data.samples;

    // Filter data where id = selection selected
    let selectSample = sample.filter((sample) => sample.id === selection);

    let firstSample = selectSample[0];

    // Trace data for the bar chart
    let trace = [
      {
        // Slice the top 10 otus
        x: firstSample.sample_values.slice(0, 10).reverse(),
        y: firstSample.otu_ids
          .slice(0, 10)
          .map((otu_id) => `OTU ${otu_id}`)
          .reverse(),
        text: firstSample.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        marker: {
          color: "rgb(255, 127, 14)",
        },
        orientation: "h",
      },
    ];

    // Use Plotly to plot the bar chart
    Plotly.newPlot("bar", trace);
  });
}

// Function that builds the bubble chart
function bubbleChart(selection) {
  // Fetch the JSON data 
  d3.json(url).then((data) => {
    console.log(`Data:`, data);
    // Create an array of sample data set
    let sample1 = data.samples;

    // Filter data where id = option taken
    let selectSample1 = sample1.filter((sample) => sample.id === selection);

    let firstSample1 = selectSample1[0];

    // Trace data for the bubble chart
    let trace = [
      {
        x: firstSample1.otu_ids,
        y: firstSample1.sample_values,
        text: firstSample1.otu_labels,
        mode: "markers",
        marker: {
          size: firstSample1.sample_values,
          color: firstSample1.otu_ids,
          },
      },
    ];

    // Apply the x-axis lengend to the layout
    let layout = {
      xaxis: { title: "OTU ID" },
    };

    // Use Plotly to plot the bubble chart
    Plotly.newPlot("bubble", trace, layout);
  });
}

function gaugeChart(selection) {
  // Fetch the JSON data and console log it
  d3.json(url).then((data) => {
    // An array of metadata objects
    let metadata = data.metadata;

    let metadataList = metadata.filter((meta) => meta.id == selection);

    let firstMetadata = metadataList[0];

    // Modify the gauge data to suit the range from 0 to 9
    let level = firstMetadata.wfreq * 20;

    // Trig to calc meter point
    let degrees = 180 - level,
      radius = 0.5;
    let radians = (degrees * Math.PI) / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    let mainPath = "M -.0 -0.025 L .0 0.025 L ",
      pathX = String(x),
      space = " ",
      pathY = String(y),
      pathEnd = " Z";
    let path = mainPath.concat(pathX, space, pathY, pathEnd);

    // Set up the data for the gauge chart
    let trace = [
      {
        type: "scatter",
        x: [0],
        y: [0],
        marker: { size: 14, color: "850000" },
        showlegend: false,
        name: "Washing Frequency",
        text: level,
        hoverinfo: "text+name",
      },
      {
        values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        rotation: 90,
        text: [
          "8-9",
          "7-8",
          "6-7",
          "5-6",
          "4-5",
          "3-4",
          "2-3",
          "1-2",
          "0-1",
          "",
        ],
        textinfo: "text",
        textposition: "inside",
        marker: {
          colors: [
            "rgba(0, 105, 11, .5)",
            "rgba(10, 120, 22, .5)",
            "rgba(14, 127, 0, .5)",
            "rgba(110, 154, 22, .5)",
            "rgba(170, 202, 42, .5)",
            "rgba(202, 209, 95, .5)",
            "rgba(210, 206, 145, .5)",
            "rgba(232, 226, 202, .5)",
            "rgba(240, 230, 215, .5)",
            "rgba(255, 255, 255, 0)",
          ],
        },
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverinfo: "label",
        hole: 0.5,
        type: "pie",
        showlegend: true,
      },
    ];

    // Set up the layout for the gauge chart
    let layout = {
      shapes: [
        {
          type: "path",
          path: path,
          fillcolor: "850000",
          line: {
            color: "850000",
          },
        },
      ],
      title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
      height: 500,
      width: 500,
      xaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1],
      },
      yaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1],
      },
    };

    // Plot the data in a gauge chart
    Plotly.newPlot("gauge", trace, layout);
  });
}


// function to  plots all charts when we have new selection 
function plot(selection) {
  console.log(selection);
  demog(selection);
  barChart(selection);
  bubbleChart(selection);
  gaugeChart(selection);
}
// initation function 
function init() {
  // dropdown Menu 
  let dropdownMenu = d3.select("#selDataset");
   
  // Fetch the JSON data and console log it
  d3.json(url).then(function (data) {
    
    let nameList = data.names;
    nameList.forEach((name) => {
      dropdownMenu.append("option").text(name).property("value", name);
    });

    let initialName = nameList[0];
    plot(initialName);
  });

  dropdownMenu.on("change", function () {
    let selectedName = d3.select("#selDataset").node().value;
    plot(selectedName);
  });
}


init();
