// यहाँ अपनी Google Apps Script की URL डालें
const apiURL = "https://script.google.com/macros/s/AKfycbxaK_JU_MaNCu_Gb_x_V5Xmvm7wZGv_cpVTFlPfxzwE5uTuOP6JPDyIHdbOXxH8ja5M/exec"; 

const list = document.getElementById('productList');
const modal = document.getElementById('orderModal');
const form = document.getElementById('orderForm');

// 1. प्रोडक्ट्स लोड करना
window.onload = () => {
    fetch(apiURL)
    .then(res => res.json())
    .then(data => {
        list.innerHTML = ""; 
        data.forEach(item => {
            list.innerHTML += `
                <div class="card">
                    <img src="${item.image}">
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price} <span class="old-price">₹${item.oldPrice}</span></p>
                    <button class="buy-btn" onclick="openForm('${item.name}')">Buy Now</button>
                </div>`;
        });
    }).catch(err => list.innerHTML = "सामान लोड नहीं हो पाया।");
};

function openForm(name) {
    document.getElementById('p_name').value = name;
    modal.style.display = 'block';
}

function closeForm() {
    modal.style.display = 'none';
}

// 2. ऑर्डर सबमिट करना
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerText = "भेजा जा रहा है...";
    btn.disabled = true;

    fetch(apiURL, { method: 'POST', body: new FormData(this) })
    .then(() => {
        alert("ऑर्डर सफल! हम WhatsApp पर संपर्क करेंगे।");
        location.reload();
    });
});

