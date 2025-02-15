async function updateQuantity(productId, change) {
    const qtyElement = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtyElement.innerText);
    let newQty = currentQty + change;

    if (newQty < 1) return; // Prevent quantity from going below 1

    // Send update request to backend
    const response = await fetch('/update-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity: newQty })
    });

    const result = await response.json();

    if (result.success) {
        qtyElement.innerText = newQty; // Update UI
    } else {
        alert('Failed to update quantity');
    }
}