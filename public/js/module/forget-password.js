import ENV from '../env.js'

export default function forgetPassword(){
    return {
        email: '',
        loading: false,
        message: '',
        success: false,

        async submit () {
            this.message = '';
            this.success = false;
            this.loading = true;
            try {
                const res = await fetch(`${ENV.backend_url}/api/v1/forget-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: this.email,
                    })
                });

                const data = await res.json();
                if(data.status.code == 400){
                    this.message = data.status.message;
                    this.success = false;
                    this.email= '';
                } else {
                    this.message = data.status.message;
                    this.success = true;
                    this.email = '';
                }

            } catch (err) {
                console.error("fail forget password :", err);
                this.message = 'server error.';
                this.success = false;
            } finally {
                this.loading = false
            }
        }
    }
}