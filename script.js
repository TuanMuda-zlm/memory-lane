// Fungsi untuk mengunduh foto dengan ukuran asli
function downloadImage(imageUrl, imageName) {
    // Buat elemen anchor
    const link = document.createElement('a');
    link.href = imageUrl;
    
    // Tentukan nama file yang akan diunduh (hapus path, ambil hanya nama file)
    const fileName = imageName.replace(/\s+/g, '_') + '.jpg';
    link.download = fileName;
    
    // Tambahkan ke DOM (diperlukan untuk beberapa browser)
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Hapus dari DOM
    document.body.removeChild(link);
    
    // Tampilkan notifikasi
    showNotification(`📥 Mengunduh: ${imageName}`);
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    // Cek apakah notifikasi sudah ada
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    // Sembunyikan notifikasi setelah 2 detik
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Tambahkan CSS animation ke head
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Buka modal untuk preview foto (opsional)
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card .image-container img');
    
    cards.forEach(img => {
        img.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                previewImage(this.src, this.alt);
            }
        });
    });
});

// Fungsi untuk preview foto dalam modal
function previewImage(imageUrl, imageName) {
    // Buat modal container
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        cursor: pointer;
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Buat gambar di modal
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = imageName;
    image.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
    `;
    
    // Buat tombol close
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.background = '#f0f0f0';
    });
    
    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.background = 'white';
    });
    
    // Tutup modal ketika klik X atau background
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Tutup modal dengan tombol ESC
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscKey);
        }
    };
    document.addEventListener('keydown', handleEscKey);
    
    // Tambahkan elemen ke modal
    modal.appendChild(image);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Tambahkan CSS untuk fade animation
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
