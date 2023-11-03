function gaugeChart(selection) {
  // Fetch the JSON data and print it in console
  d3.json(url).then((data) => {
    // An array of metadata objects
    let metadata = data.metadata;

    let metadataList = metadata.filter((meta) => meta.id == selection);
    // the first metadata 
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