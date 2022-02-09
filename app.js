console.log("Hello from Back 2 School! 👏");

// TODO
// 1. Create a url variable for storing the dashboard
// 2. Grab the container from the HTML
// 3. Set some dashboard options (width, height, etc)

const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
const vizContainer = document.getElementById("vizContainer");
const vizOptions = {
  device: "desktop",
  Region: ["North", "South"],
};
let viz;
// 1. Grab button from HTML
const pdfButton = document.getElementById("exportPDF");
const powerPointButton = document.getElementById("exportPowerPoint");

function initViz() {
  console.log("Hello from initViz");
  viz = new tableau.Viz(vizContainer, url, vizOptions);
}

// 2. Create a function to generate PDF
function exportPDF() {
  console.log("Generating a PDF...");
  viz.showExportPDFDialog();
}
function exportPowerPoint() {
  viz.showExportPowerPointDialog();
}

// wait till content has loaded and execute initViz
document.addEventListener("DOMContentLoaded", initViz);
pdfButton.addEventListener("click", exportPDF);
powerPointButton.addEventListener("click", exportPowerPoint);

// one-line event listener
document.getElementById("download").addEventListener("click", function () {
  viz.showDownloadDialog();
});

// function to grab the filter values and filter the viz
function getRangeValues() {
  // 1. Get the values from the input boxes
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log({ minValue, maxValue });
  // get the workbook
  const workbook = viz.getWorkbook();
  // get active sheet - dashboard
  const activeSheet = workbook.getActiveSheet();
  // get all sheets in active sheet
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  console.log(sheetToFilter);
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(alert("FILTER APPLIED!!!!!"));
}

// filter the dashboard for sales
document.getElementById("filterBtn").addEventListener("click", getRangeValues);
