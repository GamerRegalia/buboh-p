let popup = document.getElementById("popup");
let backgroundBlur = document.getElementById('background-blur'); // Move this line outside the functions

function openPopup() {
    popup.classList.add("open-popup");
    
    // Apply the blur effect to the background
    backgroundBlur.classList.add("blur-filter");
}

function closePopup() {
    popup.classList.add('closed');
    
    // Remove the blur effect from the background
    backgroundBlur.classList.remove("blur-filter");
    
    setTimeout(() => {
        popup.classList.remove('open-popup', 'closed');
    }, 400);
}

document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close');
    const summaryTable = document.getElementById('summary-table');
    const totalSpan = document.getElementById('total');
    const showPopupButton = document.getElementById('show-popup-button'); // Add this line

    // Function to close the popup with animation
    function closePopup() {
        const popup = document.getElementById('popup');
        popup.classList.add('closed'); // Add the "closed" class to trigger the animation
    
        // Remove the blur effect from the background
        const backgroundBlur = document.getElementById('background-blur');
        backgroundBlur.style.backdropFilter = 'none'; // Remove the blur effect
    
        setTimeout(() => {
            popup.classList.remove('open-popup', 'closed'); // Remove classes to hide the popup and reset animation
        }, 400); // Adjust the duration to match your CSS transition duration
    }


    function showPopup() {
        // Get a reference to the background-blur element
        const backgroundBlur = document.getElementById('background-blur');
    
        // Apply the blur effect to the background
        backgroundBlur.style.backdropFilter = 'blur(5px)'; // Adjust the blur value as needed
    
        // Display the popup
        popup.style.display = 'block';
    }

    // Function to calculate and update subtotal and total
    function updateSummary() {
        let total = 0;
        const rows = summaryTable.querySelectorAll('tr');
        rows.forEach(row => {
            const quantityInput = row.querySelector('.quantity');
            const subtotalTd = row.querySelector('.subtotal');
            const unitPrice = parseFloat(row.querySelector('.unit-price').textContent);
            const quantity = parseInt(quantityInput.value);
            const subtotal = unitPrice * quantity;
            subtotalTd.textContent = subtotal.toFixed(2);
            total += subtotal;
        });
        totalSpan.textContent = total.toFixed(2);
    }

    // Add an event listener to the close button
    closeBtn.addEventListener('click', closePopup);

    // Function to fetch and populate data
async function fetchDataAndPopulateTable() {
    try {
        const response = await fetch('your-api-endpoint-here');
        const data = await response.json();

        // Clear the existing table rows
        summaryTable.innerHTML = '';

        // Populate the summary table with fetched data
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.item}</td>
                <td>${item.unit}</td>
                <td class="unit-price">${item.unitPrice}</td>
                <td><input class="quantity" type="number" value="1" min="1"></td>
                <td class="subtotal">0.00</td>
            `;
            summaryTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch and populate data
fetchDataAndPopulateTable();


    // Show the popup after populating data
    showPopup();


    // Add event listener to quantity inputs for real-time updates
    summaryTable.addEventListener('input', updateSummary);

    // Function to handle the checkout process
    function checkout() {
        // You can implement the checkout logic here.
        alert('Checkout button clicked. Implement the checkout logic.');
    }

    // Add an event listener to the checkout button
    const checkoutButton = document.getElementById('checkout');
    checkoutButton.addEventListener('click', checkout);

    // Add an event listener to the button to show the popup
    showPopupButton.addEventListener('click', showPopup);

    const submitButton = document.getElementById('submit-button');

    
    function showPopup() {
        // Apply the blur effect to the background
        backgroundBlur.style.backdropFilter = 'blur(5px)'; // Adjust the blur value as needed
    }
    
    submitButton.addEventListener('click', function(event) {
        openPopup();
        backgroundBlur.style.display = 'block'; // Show the background-blur element
        showPopup();
    });
    
    // Add an event listener to the button to show the popup
showPopupButton.addEventListener('click', showPopup);

});
