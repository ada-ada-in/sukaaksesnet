import ENV from '../env.js'

 export default function register() {
            return {
                nama: '',
                email: '',
                nomor_pelanggan: '',
                confirm_password: '',
                password: '',
                alamat: '',
                agree: false,
                loading: false,
                message: '',
                success: false,

                async submit() {
                    this.message = '';
                    this.success = false;

                    if (!this.nama || !this.email || !this.nomor_pelanggan || !this.password) {
                        this.message = 'Semua field wajib diisi.';
                        this.success = false;
                        return;
                    }

                    if (!this.agree) {
                        this.message = 'Harap setujui syarat & ketentuan.';
                        this.success = false;
                        return;
                    }

                    this.loading = true;

                    try {
                        const res = await fetch(`${ENV.backend_url}/api/v1/register`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                nama: this.nama,
                                email: this.email,
                                alamat: this.alamat,
                                nomor_pelanggan: this.nomor_pelanggan,
                                password: this.password,
                                confirm_password: this.confirm_password
                            })
                        });

                        const data = await res.json();

                        console.log(data)

                        if (data.status.code == 400) {
                            this.message = data.status.message;
                            this.success = false;
                        } else {
                            this.message = data.status.message;
                            this.success = true;

                            this.nama = '';
                            this.email = '';
                            this.nomor_pelanggan = '';
                            this.alamat= '';
                            this.password = '';
                            this.confirm_password = '';

                            setTimeout(() => {
                                window.location.href = `${ENV.frontend_url}/auth/login`;
                            }, 1500);
                        }

                    } catch (err) {
                        console.error(err);
                        this.message = 'Terjadi kesalahan pada server.';
                        this.success = false;
                    } finally {
                        this.loading = false;
                    }
                },

                showPassword: false,
            }
        }