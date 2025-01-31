// Function to get the user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateLocationLink, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to update the href with the dynamic "from" location
function updateLocationLink(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Destination location (fixed)
    const destination = "10111+Market+St,+North+Lima,+OH+44452";

    // Construct Google Maps URL with dynamic "from" location
    const googleMapsURL = `https://www.google.com/maps/dir/${latitude},${longitude}/${destination}`;

    // Update the link's href
    document.getElementById("location-link").href = googleMapsURL;
}

// Error handling if geolocation fails
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

document.getElementById('availabilityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const rooms = document.getElementById('rooms').value;
    const guests = document.getElementById('guests').value;
    
    console.log("CISel" + checkin);
    console.log("COSel" + checkout);
    
    const checkinDate = new Date(checkin + 'T00:00');
    const checkoutDate = new Date(checkout + 'T00:00');

    console.log("CIDt" + checkinDate);
    console.log("CODt" + checkoutDate);
    const checkinDay = checkinDate.getDate();
    const checkinMonth = ('0' + (checkinDate.getMonth())).slice(-2) + checkinDate.getFullYear();
    const checkoutDay = checkoutDate.getDate();
    const checkoutMonth = ('0' + (checkoutDate.getMonth())).slice(-2) + checkoutDate.getFullYear();
    
    console.log("CID" + checkinDay);
    console.log("COD" + checkoutDay);
    console.log("CIMY" + checkinMonth);
    console.log("COMY" + checkoutMonth);

    const url = `https://www.ihg.com/holidayinnexpress/hotels/us/en/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qDest=Holiday%20Inn%20Express%20&%20Suites%20Youngstown%20(N.%20Lima/Boardman)=&qErm=false&qSlH=LIMMS&qRms=${rooms}&qAdlt=${guests}&qChld=0&qCiD=${checkinDay}&qCiMy=${checkinMonth}&qCoD=${checkoutDay}&qCoMy=${checkoutMonth}&qAAR=6CBARC&qRtP=6CBARC&setPMCookies=true&qSHBrC=EX&qpMbw=0&qpMn=1&srb_u=1&qChAge=&qRmFltr=`;
    window.location.href = url;
});


document.addEventListener("DOMContentLoaded", function() {
    const today = new Date().toISOString().split('T')[0];

    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");

    // Set min attributes to prevent past date selection
    checkinInput.setAttribute("min", today);
    checkoutInput.setAttribute("min", today);

    // Restore previous selections if available
    if (localStorage.getItem("checkin")) {
        checkinInput.value = localStorage.getItem("checkin");
    }
    if (localStorage.getItem("checkout")) {
        checkoutInput.value = localStorage.getItem("checkout");
    }

    // Set default checkout date to the same month as check-in
    checkinInput.addEventListener("change", function() {
        const checkinDate = new Date(this.value);
        localStorage.setItem("checkin", this.value);

        if (checkoutInput.value === "" || new Date(checkoutInput.value) < checkinDate) {
            checkinDate.setDate(checkinDate.getDate() + 1); // Default checkout to next day
            checkoutInput.value = checkinDate.toISOString().split('T')[0];
        }

        checkoutInput.setAttribute("min", this.value); // Ensure checkout is after check-in
    });

    checkoutInput.addEventListener("change", function() {
        if (new Date(this.value) < new Date(checkinInput.value)) {
            alert("Checkout date cannot be before check-in date!");
            this.value = checkinInput.value; // Reset to check-in if invalid
        }
        localStorage.setItem("checkout", this.value);
    });
});


// Call the function to get the user's location when the page loads
window.onload = getLocation;

