export default function resetPassword(){
    return {
        loading: false,
        message: '',
        success: false,
        newPassword: '',
        confirmPassword: '',

        async submit(){
            
            const data = {
                newPassword: this.newPassword,
                confirm_password: this.confirmPassword
            }

            console.log(data);
            const resetToken = new URLSearchParams(window.location.search).get('token');

            if(!resetToken){
                this.message = "Invalid or missing reset token.";
                this.success = false;
                return;
            }

            try {
                const res = await fetch(`/api/v1/reset-password/${resetToken}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                const result =  await res.json();
                if(result.status.code == 200){
                    this.message = result.status.message;
                    this.success = true;
                    setTimeout(() => {
                        window.location.href = '/auth/login';
                    }, 1500);
                } else {
                    this.message = result.status.message;
                    this.success = false;
                }

            }catch (e) {
                console.error(e.message);
            }
        }
    }
}