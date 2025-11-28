export default function authNavbar() {
    return {
        user: null,
        loading: false,
        message: '',
        success: false,
    
        async checkLogin() {
            const token = localStorage.getItem('token');
            if (!token) return;
    
            try {
                const res = await fetch('/api/v1/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                const data = res.json()
    
                if(!data) throw new Error()
                    
                this.user = data
            } catch (e) {
                this.user = null;
                localStorage.removeItem('token');
            }
        },

         async logout() {
            try {
                await fetch('/api/v1/logout', { method: 'POST' });

                localStorage.removeItem('token');
                this.user = null;


                setTimeout(() => {
                    window.location.href = "/auth/login";
                },500)
            } catch (err) {
                console.error("Logout gagal:", err);
            }
        },
    }

};
