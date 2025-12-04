export default function product() {
    return {
        products: [],
        async fetchProducts() {
            try {
                const res = await fetch(`/api/v1/products`, {
                    method: 'GET',
                    aplication: 'application/json'
                });
                const data = await res.json();
                if(!data) throw new Error()
                return this.products = data.data
            }catch (e) {
                console.error(e.message);
            }
        }, 
        async fetchProductsById(){
            const paramsUrl = window.location.pathname.split('/').pop();
            try {
                const res = await fetch(`/api/v1/products/${paramsUrl}`)
                const data = await res.json();
                if(!data) throw new Error()
                return this.products = data.data
            
            } catch (e) {
                console.error(e.message)
            }
        },

        formatToIDR(amount) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(amount);
        }
        
    }
}