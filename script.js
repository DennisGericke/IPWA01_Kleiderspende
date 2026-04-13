document.addEventListener('DOMContentLoaded', function() {
    const pickupRadio = document.getElementById('pickup');
    const dropoffRadio = document.getElementById('dropoff');
    const addressSection = document.getElementById('addressSection');
    const registrationForm = document.getElementById('registrationForm');
    const confirmationArea = document.getElementById('confirmationArea');
    const confirmationDetails = document.getElementById('confirmationDetails');

    function toggleAddressFields() {
        if (pickupRadio.checked) {
            addressSection.classList.remove('d-none');
        } else {
            addressSection.classList.add('d-none');
        }
    }

    toggleAddressFields();

    pickupRadio.addEventListener('change', toggleAddressFields);
    dropoffRadio.addEventListener('change', toggleAddressFields);

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const clothing = document.getElementById('clothingType').value;
        const region = document.getElementById('crisisRegion').value;
        const street = document.getElementById('street').value;
        const plz = document.getElementById('zipCode').value;
        const city = document.getElementById('city').value;
        const userDate = document.getElementById('preferredDate').value;

        if (pickupRadio.checked && !plz.startsWith('14')) {
            alert("Leider liegt Ihre PLZ nicht in unserem Einzugsgebiet (Potsdam: 14xxx).");
            return;
        }

        const formattedDate = new Date(userDate).toLocaleDateString('de-DE');
        const fullAddress = `${street}, ${plz} ${city}`;

        const logisticsHint = pickupRadio.checked 
            ? "Ihr Termin ist fest eingeplant! Da unser Team diese Route zweimal täglich anfährt, bitten wir Sie, in den oben genannten Zeitfenstern zu Hause zu sein. Wir klingeln direkt bei Ihnen, um die Spende persönlich entgegenzunehmen." 
            : "Wir freuen uns auf Ihren Besuch! Bitte klingeln Sie am gewählten Tag einfach beim <strong>'Kleiderspende Potsdam e. V.'</strong>. Unser Empfang im Erdgeschoss nimmt Ihre Spende gerne entgegen.";

        const welcomeName = (firstName && lastName) ? `, <strong>${firstName} ${lastName}</strong>` : "";

        confirmationDetails.innerHTML = `
            <p>Vielen Dank${welcomeName}!</p>
            <p>Deine Spende (<strong>${clothing}</strong>) für die Region <strong>${region}</strong> wurde erfolgreich registriert.</p>
            <hr style="border-color: rgba(0,0,0,0.1)">
            <p><strong>Logistik-Details:</strong></p>
            <p>Gewähltes Datum: <strong>${formattedDate}</strong></p>
            <p>Zeitfenster: <strong>08:00 – 11:00 Uhr</strong> oder <strong>15:00 – 18:00 Uhr</strong></p>
            <p>Ort: <strong>${pickupRadio.checked ? fullAddress : 'Berliner Str. 1, 14467 Potsdam (Geschäftsstelle)'}</strong></p>
            <p class="mt-3"><small>${logisticsHint}</small></p>
        `;

        registrationForm.classList.add('d-none');
        confirmationArea.classList.remove('d-none');
    });
});