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

// Call the function to get the user's location when the page loads
window.onload = getLocation;