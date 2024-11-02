// script.js

function searchData() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();

    // Filter your data based on the search query
    const filteredData = data.filter(item => {
        // Assuming item is an object, adjust the properties you search
        return item.rgb.includes(searchQuery) || item.hex.includes(searchQuery);
    });

    // Display the filtered data
    displayData(filteredData);
}

function uploadImage() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image file.");
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => displayData(data))
    .catch(error => console.error("Error:", error));
}

function displayData(data) {
    const standardSample = document.getElementById('standardSample');
    const testedSample = document.getElementById('testedSample');
    const deltaValues = document.getElementById('deltaValues');

    // Standard sample data
    standardSample.innerHTML = `
        <div class="sample-data">RGB: ${data.standard_sample.rgb}</div>
        <div class="sample-data">CMYK: ${data.standard_sample.cmyk}</div>
        <div class="sample-data">HEX: ${data.standard_sample.hex}</div>
        <div class="sample-data">CIELAB: ${data.standard_sample.cielab}</div>
        <div class="sample-data">LCH(ab): ${data.standard_sample.lch_ab}</div>
    `;

    // Tested sample data
    testedSample.innerHTML = `
        <div class="sample-data">RGB: ${data.tested_sample.rgb}</div>
        <div class="sample-data">CMYK: ${data.tested_sample.cmyk}</div>
        <div class="sample-data">HEX: ${data.tested_sample.hex}</div>
        <div class="sample-data">CIELAB: ${data.tested_sample.cielab}</div>
        <div class="sample-data">LCH(ab): ${data.tested_sample.lch_ab}</div>
    `;

    // Delta values
    deltaValues.innerHTML = `
        <div class="delta-values ${data.delta.delta_e2000 > 10 ? 'highlight-danger' : ''}">Delta E2000: ${data.delta.delta_e2000}</div>
        <div class="delta-values ${data.delta.delta_e76 > 10 ? 'highlight-danger' : ''}">Delta E76: ${data.delta.delta_e76}</div>
    `;
}
