const regForm = document.getElementById('regForm');
if (regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const feedback = document.getElementById('feedback');

        if (name.trim() === "" || email.trim() === "") {
            feedback.innerHTML = `<span style="color:#e74c3c">Sila isi semua medan!</span>`;
            return;
        }

        if (!email.includes("@")) {
            feedback.innerHTML = `<span style="color:#e74c3c">Emel tidak sah!</span>`;
            return;
        }

        feedback.innerHTML = `<span style="color:#27ae60">Pendaftaran ${name} Berjaya!</span>`;
        regForm.reset();
    });
}

const fetchBtn = document.getElementById('fetchBtn');
if (fetchBtn) {
    fetchBtn.addEventListener('click', async () => {
        const grid = document.getElementById('resultGrid');
        const loading = document.getElementById('loading');
        const errorArea = document.getElementById('errorArea');

        grid.innerHTML = '';
        errorArea.innerText = '';
        loading.style.display = 'block';

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            if (!response.ok) {
                throw new Error("Gagal menyambung ke pelayan API");
            }

            const users = await response.json();
            console.log("Data Diterima:", users); // Penting untuk kriteria laporan

            users.forEach(user => {
                const card = document.createElement('div');
                card.className = 'user-card';
                card.innerHTML = `
                    <h4>${user.name}</h4>
                    <p>📧 ${user.email}</p>
                    <p>🏢 ${user.company.name}</p>
                `;
                grid.appendChild(card);
            });

        } catch (error) {
            errorArea.innerText = "Ralat: " + error.message;
        } finally {
            loading.style.display = 'none';
        }
    });
}