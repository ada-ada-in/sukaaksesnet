export default function fetchdata() {
    return {

        loading: false,
        message: '',
        success: false,

        async getProfile() {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await fetch('/api/v1/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }) 
                const data = await res.json()
                document.getElementsByClassName('profile-nama')[0].innerText = data.data.nama;
                document.getElementsByClassName('profile-nama-card')[0].innerText = data.data.nama;
                document.getElementsByClassName('profile-handphone')[0].innerText = data.data.nomor_pelanggan;
                document.getElementsByClassName('profile-handphone-card')[0].innerText = data.data.nomor_pelanggan;
                document.getElementsByClassName('profile-email')[0].innerText = data.data.email;
                document.getElementsByClassName('profile-email-card')[0].innerText = data.data.email;
                document.getElementsByClassName('profile-alamat')[0].innerText = data.data.alamat;

                document.getElementsByName('fullname')[0].value = data.data.nama;
                document.getElementsByName('email')[0].value = data.data.email;
                document.getElementsByName('address')[0].value = data.data.alamat;
                document.getElementsByName('phone')[0].value = data.data.nomor_pelanggan;
            }catch (e) {
                console.error(e.message);
            }
        },

        async submit(){
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const fullname = document.getElementById('editFullname').value;
                const email = document.getElementById('editEmail').value;
                const phone = document.getElementById('editPhone').value;
                const address = document.getElementById('editAddress').value;  
                const data = {
                    nama: fullname,
                    email: email,
                    nomor_pelanggan: phone,
                    alamat: address
                };
                const res = await fetch('/api/v1/users/me', {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                const result =  await res.json();

                if(result.status.code == 200){
                    this.message = result.status.message;
                    this.success = true;    
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else {
                    this.message = result.status.message;
                    this.success = false;
                }

             }catch (e) {
                console.error(e.message);
             } 
            
        },

        async submitchangePassword(){
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const newPassword = document.querySelector('[name="newPassword"]').value;
                const confirmNewPassword = document.querySelector('[name="confirmPassword"]').value;
                const data = {
                    password: newPassword,
                    confirm_password: confirmNewPassword
                }
                console.log(data)
                const res = await fetch('/api/v1/users/me/password', {
                    method: 'PUT',
                    headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                const result =  await res.json();

                if(result.status.code == 200){
                    this.message = result.status.message;
                    this.success = true;    
                    setTimeout(() => {
                        window.location.reload();
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
