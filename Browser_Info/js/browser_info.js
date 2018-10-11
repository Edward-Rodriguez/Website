var txt = "";
var txt2 = "";
var txt3 = "";
var openP = '<p class="head">';
var closedP = '</p>';
const strongOpen = '<strong>'
const strongClosed = '</strong>'

/*Get browser Info*/
txt += openP + strongOpen + "Browser CodeName: " + strongClosed + navigator.appCodeName + closedP;
txt += openP + strongOpen + "Browser Name: " + strongClosed + navigator.appName + closedP;
txt += openP + strongOpen + "Browser Version: " + strongClosed + navigator.appVersion + closedP;
txt += openP + strongOpen + "Cookies Enabled: " + strongClosed + navigator.cookieEnabled + closedP;
txt += openP + strongOpen + "Browser Language: " + strongClosed + navigator.language + closedP;
txt += openP + strongOpen + "Browser Online: " + strongClosed + navigator.onLine + closedP;
txt += openP + strongOpen + "Platform: " + strongClosed + navigator.platform + closedP;
txt += openP + strongOpen + "User-agent header: " + strongClosed + navigator.userAgent + closedP;

document.getElementById("navigator").innerHTML = txt;

/*Get Screen Info*/
txt2 += openP + strongOpen + "Total width/height: " + strongClosed + screen.width + "*"  + screen.height + closedP;
txt2 += openP + strongOpen + "Available width/height: " + strongClosed + screen.availWidth + "*"  +  screen.availHeight + closedP;
txt2 += openP + strongOpen + "Color depth: " + strongClosed + screen.colorDepth + closedP;
txt2 += openP + strongOpen + "Color resolution: " + strongClosed + screen.pixelDepth + closedP;

document.getElementById("screen").innerHTML = txt2;

/*Get Window Info*/
txt3 += openP + strongOpen + "innerWidth: " + strongClosed + window.innerWidth + closedP;
txt3 += openP + strongOpen + "innerHeight: " + strongClosed + window.innerHeight + closedP;
txt3 += openP + strongOpen + "outerWidth: " + strongClosed + window.outerWidth + closedP;
txt3 += openP + strongOpen + "outerHeight: " + strongClosed + window.outerHeight + closedP;

document.getElementById("window").innerHTML = txt3;
