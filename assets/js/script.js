function openSidebar() {
    document.getElementById("mySidebar").style.display = "block";
  }
  function closeSidebar() {
    document.getElementById("mySidebar").style.display = "none";
  }


  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".big-text", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");

var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(event) {
    event.preventDefault()
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "admin" && password == "user") {
        window.location.href = "./home.html"; // Redirecting to other page.
        return false;
    }
    else {
        attempt--;// Decrementing by one.
        alert("You have left " + attempt + " attempt;");
        // Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}
document.getElementById("login-submit").addEventListener('click', validate)