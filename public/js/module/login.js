import ENV from '../env.js'

export default function login(){
    return {
        email: '',
        password: '',
        loading: false,
        message: '',
        success: false,

        async submit () {
            this.message = '';
            this.success = false;
            if (!this.nama || !this.email || !this.nomor_pelanggan || !this.password) {
                this.message = 'Semua field wajib diisi.';
                this.success = false;
                return;
            }
            this.loading = true;
            try {
                const res = await fetch(`${ENV.backend_url}/api/v1/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                });

                const data = await res.json();
                console.log(data)

            } catch (err) {
                console.error("login gagal:", err);
            }
        }
    }
}