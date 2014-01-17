function doCommand(action,args) {
  if(window.parent && window.parent.DG) {
    var x = window.parent.DG.currGameController.doCommand({action: action, args: args});
    return x;
  } else {
    alert("Not in datagames!");
  }
}

function updatePlots() {
  graph.addSamples([Prims.precision(Globals.getGlobal(6), 1), Prims.precision(Globals.getGlobal(11), 1)]);
}

function clearPlots() {
  graph.resetPoints();
  graph.update();
}

function record() {
  if(window.parent && window.parent.DG) {
    parentCase = doCommand('openCase', {
          collection: "Run",
          values: [
            Globals.getGlobal(2),
            Globals.getGlobal(0),
            Globals.getGlobal(1),
            Globals.getGlobal(3)
          ]
        });

        // Step 5. Create rows in the child table for each data point. Using 'createCases' we can
        // do this inline, so we don't need to call openCase, closeCase for each row.
        doCommand('createCases', {
          collection: "Year",
          values: yearlyData,
          parent: parentCase.caseID
        });

        // Step 6. Close the case.
        doCommand('closeCase', {
          collection: "Run",
          caseID: parentCase.caseID
        });
  } else {
    alert("Not in datagames!");
  }
}

function clearCODAPData() {
  yearlyData = [];
}

var yearlyData = [];
graph = LabGrapher('#labgraph', {
  title: 'Global Temperature',
  xlabel: 'Year',
  ylabel: 'Temperature',
  xmax: 2124,
  xmin: 2014,
  dataSampleStart: 2014,
  xTickCount: 5,
  ymax: 30,
  ymin: 10,

  dataType: 'samples',
  dataSamples: [[],[]],

  xFormatter: '.',
  yFormatter: '.'
});

graph.resize(286, 325);

if(window.parent && window.parent.DG) {
  doCommand('initGame', {
    name: "Climate Change",
    collections: [
      { name: "Run",
        attrs: [ { name: "CO2 Level", type: "numeric", description: "AA", precision: 0, units:"ppm" },
                 { name: "Sun Brightness", type: "numeric", description: "BB", precision: 0 },
                 { name: "Albedo", type: "numeric", description: "BB", precision: 2 },
                 { name: "Cloud Amount", type: "numeric", description: "BB", precision: 0 } ],
                 childAttrName: "yar" },
      { name: "Year",
        attrs: [ { name: "Year", type: "numeric", description: "XX", precision: 0, units:"ppm" },
                 { name: "Yearly Temp", type: "numeric", description: "YY", precision: 1 },
                 { name: "10-year Avg. Temp", type: "numeric", description: "ZZ", precision: 1 } ],
        labels: {
          singleCase: "year",
          pluralCase: "years",
          singleCaseWithArticle: "a year",
          setOfCases: "run",
          setOfCasesWithArticle: "a run"
        },
        defaults: {
          xAttr: "run",
          yAttr: "year"
                  } }
               ]
  })
}
