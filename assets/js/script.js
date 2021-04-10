function openSidebar() {
  document.getElementById("mySidebar").style.display = "block";
}
function closeSidebar() {
  document.getElementById("mySidebar").style.display = "none";
}

var today = new Date();
document.getElementById("dateTime").innerHTML = today;
