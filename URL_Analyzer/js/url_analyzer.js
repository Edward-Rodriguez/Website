const openSpan = '<span class="URLComponents">';
const closingSpan = '</span>';
const DNS = "https://dns.google.com/resolve?name=";
var urlLookup;
var ipTextPlaceHolder = 'IPADDRESS';
var distinctHostArray;
var distinctNumOfHostnames;
var listOfIPAddresses = new Array();

//2d Array containing url and componnts
var urlArray;

//regex to extract ip address
var regEx = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

document.getElementById('file').onchange = function(e) {
  var file = this.files[0];
  getFile(file);
}

function getFile(file) {
  var reader = new FileReader();
  reader.onload = function(progressEvent) {
    var lines = this.result.split('\n');
    urlArray = new Array(lines.length - 1);
    for (var line = 0; line < lines.length - 1; line++) {
      var componentsOfURLArray = parseURL(lines[line]);
      urlArray[line] = componentsOfURLArray;
      displayURLComponents(urlArray[line]);
    }
    for (var line = 0; line < urlArray.length; line++) {
      hostname = urlArray[line][3];
      getIPAddress(hostname, two);
    }
    analyzeArray();
    drawChart();
  };
  reader.readAsText(file);
}

//function to parse a URL string and return an array of the components
function parseURL(x) {
  const url = new URL(x);
  var URLComponents = [
    url.href, url.protocol, url.username, url.host, url.port,
    url.pathname, url.search, url.hash
  ]
  // If component is empty set it to 'N/A'
  for (var i = 0; i < URLComponents.length; i++) {
    if (URLComponents[i] == "") URLComponents[i] = "N/A";
  }
  // console.log(URLComponents);
  return URLComponents;
}

// create a header and an anchor tag for the url then
// a <p> tag for the given URL and its parsed components (Array)
// append to the end its parent, which is a div in the html
function displayURLComponents(url) {
  var parent = document.getElementById('URL_List');
  var newChild =
    '<hr class="divisor"><br>' +
    '<p class = "newURL">' +
    '<h4 class="URLHeaders">' +
    '<a href="' + url[0] + '">' + '"' + url[0] + '"' + '</a>' + '</h4>' +
    '<strong>Scheme: </strong>' + openSpan + url[1] + closingSpan + '<br>' +
    '<strong>Username: </strong>' + openSpan + url[2] + closingSpan + '<br>' +
    '<strong>Host: </strong>' + openSpan + url[3] + closingSpan + '<br>' +
    '<strong>Port: </strong>' + openSpan + url[4] + closingSpan + '<br>' +
    '<strong>Path: </strong>' + openSpan + url[5] + closingSpan + '<br>' +
    '<strong>Query: </strong>' + openSpan + url[6] + closingSpan + '<br>' +
    '<strong>Fragment: </strong>' + openSpan + url[7] + closingSpan + '</p>' +
    '<p class="' + url[3] + '"><strong>IP Address: </strong>' + openSpan + ipTextPlaceHolder + closingSpan + '</p>';
  parent.insertAdjacentHTML('beforeend', newChild);
}

function getIPAddress(hostname, callback) {
  urlLookup = DNS + hostname;
  $.get(urlLookup, function(result) {
    var obj = JSON.parse(result);
    //variable to store ip from 'data' field
    var answer;
    if (obj.Comment != null) {
      //"COMMENT" FROM GOOGLE DNS RESPONSE THAT CONTAINS IPADDRESS
      var comment = obj.Comment;
      // USE REG EX DECLARED ABOVE TO EXTRACT IP
      var ip = comment.match(regEx);
      answer = ip[0];
    } else { //get ip from 'data' field if 'Comment' doesn't exist
      // loop through array of the 'Answer' field of Google DNS
      // until you find data that has ip
      for (var i = 0; i < obj.Answer.length; i++) {
        if (obj.Answer[i].data.match(/[0-9]+/)) {
          answer = obj.Answer[i].data;
          i = obj.Answer.length;
        }
      }
    }
    var x = document.getElementsByClassName(hostname);
    for (var i = 0; i < x.length; i++) {
      x[i].innerHTML = x[i].innerHTML.replace('IPADDRESS', answer);
    }
    callback(answer);
  });
}

function two(response) {
  console.log("response = " + response);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// return total count of distinct elements
function uniqueElements() {
  var copyArray = new Array();
  for (var i = 0; i < urlArray.length; i++) {
    copyArray.push(urlArray[i][3]);
  }
  var unique = copyArray.filter(onlyUnique);
  console.log("copyArray= " + unique);
  return unique.length;
}


// Get a count of each TLD in the list - stats will be used for pie chart
function analyzeArray() {
  var tempArray = new Array(urlArray.length);
  for (var i = 0; i < urlArray.length; i++) {
    tempArray[i] = urlArray[i][3].match(/(\.\w+)$/)[0];
  }
  //console.log("tempArray= " + JSON.stringify(tempArray))
  distinctHostArray = new Array(uniqueElements);
  results = new Counter(tempArray);
  var i = 0;
  for (let [hostname, times] of results.entries()) {
    var array = [hostname, times];
    distinctHostArray[i] = array;
    i++;
  }
}

class Counter extends Map {
  constructor(iter, key = null) {
    super();
    this.key = key || (x => x);
    for (let x of iter) {
      this.add(x);
    }
  }
  add(x) {
    x = this.key(x);
    this.set(x, (this.get(x) || 0) + 1);
  }
}

// Load the Visualization API and the corechart package.
google.charts.load('current', {
  'packages': ['corechart']
});

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'TopLevelDomian');
  data.addColumn('number', 'count');
  data.addRows(distinctHostArray);

  // Optional; add a title and set the width and height of the chart
  var options = {
    titleTextStyle: {
      color: 'black', // any HTML string color ('red', '#cc00cc')
      fontName: 'Muli', // i.e. 'Times New Roman'
      fontSize: 20, // 12, 18 whatever you want (don't specify px)
      bold: true, // true or false
      italic: false // true of false
    },
    'title': 'Top Level Domains',
    'width': 700,
    'height': 500,
    backgroundColor: 'transparent',
    is3D: true
  };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}
