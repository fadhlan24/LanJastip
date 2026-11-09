const CURRENCY_RATES = {
    IDR: 1,
    SGD: 12100,
    THB: 460,
    JPY: 108,
    KRW: 12,
    USD: 16200
};

const CURRENCY_SYMBOLS = {
    IDR: 'Rp',
    SGD: 'S$',
    THB: '฿',
    JPY: '¥',
    KRW: '₩',
    USD: '$'
};

function toggleShopeeChat() {
    const chatBox = document.getElementById('shopeeChatBox');
    chatBox.classList.toggle('hidden');
    chatBox.classList.toggle('flex');
}

function updateCurrencyDisplay(selectedCurr) {
    document.getElementById('itemCurrency').value = selectedCurr;
    recalculateForm();
}

function quickAddOrder(name, price, currency, origin) {
    document.getElementById('itemName').value = name;
    document.getElementById('itemPrice').value = price;
    document.getElementById('itemCurrency').value = currency;
    document.getElementById('itemOrigin').value = origin;
    
    recalculateForm();
    document.getElementById('kalkulator').scrollIntoView({ behavior: 'smooth' });
}

function recalculateForm() {
    const price = parseFloat(document.getElementById('itemPrice').value) || 0;
    const qty = parseInt(document.getElementById('itemQty').value) || 1;
    const currency = document.getElementById('itemCurrency').value;
    const packingFee = parseFloat(document.getElementById('packingType').value) || 5000;

    const rateToIDR = CURRENCY_RATES[currency] || 1;
    const baseIDR = price * qty * rateToIDR;
    const jastipFee = baseIDR * 0.15; // 15% Fee
    const totalIDR = baseIDR + jastipFee + packingFee;

    const fmt = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

    document.getElementById('sumBaseIDR').innerText = fmt(baseIDR);
    document.getElementById('sumJastipFee').innerText = fmt(jastipFee);
    document.getElementById('sumPackingFee').innerText = fmt(packingFee);
    document.getElementById('finalTotalIDR').innerText = fmt(totalIDR);
}

function submitToWhatsApp(e) {
    e.preventDefault();

    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const item = document.getElementById('itemName').value;
    const origin = document.getElementById('itemOrigin').value || '-';
    const price = document.getElementById('itemPrice').value;
    const curr = document.getElementById('itemCurrency').value;
    const qty = document.getElementById('itemQty').value;
    const totalIDR = document.getElementById('finalTotalIDR').innerText;

    const targetWA = "6285846732091";

    const msg = `Halo Admin LanJastipNusantara! ☕🍱%0A` +
        `Saya ingin memesan jastip makanan berikut:%0A%0A` +
        `*--- DATA PEMESAN ---*%0A` +
        `👤 Nama: ${encodeURIComponent(name)}%0A` +
        `📱 No WhatsApp: ${encodeURIComponent(phone)}%0A%0A` +
        `*--- DETAIL KULINER ---*%0A` +
        `🍱 Produk: *${encodeURIComponent(item)}*%0A` +
        `📍 Asal: ${encodeURIComponent(origin)}%0A` +
        `🔢 Jumlah: ${qty} Pcs%0A` +
        `💵 Harga Satuan: ${CURRENCY_SYMBOLS[curr]} ${price} (${curr})%0A%0A` +
        `💰 *TOTAL ESTIMASI IDR:* ${encodeURIComponent(totalIDR)}%0A%0A` +
        `Mohon diproses pesanan saya. Terima kasih!`;

    window.open(`https://wa.me/${targetWA}?text=${msg}`, '_blank');
}

function sendQuickMsg(questionText) {
    const targetWA = "6285846732091";
    const encodedText = encodeURIComponent(`Halo Admin LanJastipNusantara, saya mau tanya dari website: ${questionText}`);
    window.open(`https://wa.me/${targetWA}?text=${encodedText}`, '_blank');
}

function handleUserChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const val = input.value.trim();
    if(!val) return;

    const targetWA = "6285846732091";
    const encodedText = encodeURIComponent(`Halo Admin LanJastipNusantara, ${val}`);
    input.value = '';
    window.open(`https://wa.me/${targetWA}?text=${encodedText}`, '_blank');
}

window.addEventListener('DOMContentLoaded', () => {
    recalculateForm();
});
