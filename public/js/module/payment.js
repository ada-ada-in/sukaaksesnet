import ENV from "../env.js";

export default function payment() {
  return {
    product: null,
    user: null,
    loading: false,
    message: "",
    success: false,

    async init() {
      await this.fetchUser();
      await this.fetchProductById();
    },

    async fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      this.user = data.data;
    },

    async fetchProductById() {
      const id = window.location.pathname.split("/").pop();
      const res = await fetch(`/api/v1/products/${id}`);
      const data = await res.json();
      this.product = data.data;
    },

    formatToIDR(amount) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);
    },

    async submit() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.message = "Silakan login terlebih dahulu";
        return;
      }

      this.loading = true;

      const res = await fetch(`${ENV.frontend_url}/api/v1/payment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(this.product.price),
          product: this.product.name,
        }),
      });

      const data = await res.json();
      this.loading = false;

      if (data.status.code === 201) {
        this.success = true;
        this.message = data.status.message;
        setTimeout(() => {
          window.location.href = data.data.payment_url;
        }, 1500);
      } else {
        this.success = false;
        this.message = data.status.message;
      }
    },
  };
}
