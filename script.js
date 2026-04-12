document.addEventListener('DOMContentLoaded', function() {
    const pickupRadio = document.getElementById('pickup');
    const dropoffRadio = document.getElementById('dropoff');
    const addressSection = document.getElementById('addressSection');

    function toggleAddressFields() {
        if (pickupRadio.checked) {
            addressSection.classList.remove('d-none');
        } else {
            addressSection.classList.add('d-none');
        }
    }

    pickupRadio.addEventListener('change', toggleAddressFields);
    dropoffRadio.addEventListener('change', toggleAddressFields);
});