import ENV from "../env.js";


export default function payment() {
    return {
        user: null,
        loading: false,
        message: '',
        success: false,
    
        async submit() {
            const token = localStorage.getItem('token');

            const storedData = localStorage.getItem('paketDipilih');
            const paket = JSON.parse(storedData);
    
            try {
                const res = await fetch(`/api/v1/payment`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({ 
                        amount: parseInt(paket.price),
                        product: paket.plan
                     })
                });
    
                const data = await res.json()
                if(data.status.code === 201){
                    this.success = true;
                    this.message = data.status.message;

                    this.user = data.data;

                    setTimeout(() => {
                        window.location.href = data.data.payment_url;
                    }, 3000);
                } else {
                    this.success = false;
                    this.message = data.status.message;
                }

                    // console.log(data);
    
                if(!data) throw new Error()
                    
                this.user = data
            } catch (e) {
                this.user = null;
                console.error(e.message);
            }
        },

        async fetchNameAndHandphone() {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const res = await fetch('/api/v1/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await res.json()
                document.getElementById('namaPelanggan').innerText = data.data.nama;
                document.getElementById('nomorPelanggan').innerText = data.data.nomor_pelanggan;

            
                if(!data) throw new Error()
                }catch (e) {
                console.error(e.message);
            }
        }
    }

};
