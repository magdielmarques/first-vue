const app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/black-socks.jpg',
        inStock: true,
        inventory:10,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'white',
                variantImage: './assets/white-socks.jpg',
            },
            {
                variantId: 2235,
                variantColor: 'black',
                variantImage: './assets/black-socks.jpg',
            }
        ],
        cart: 0,
    },
    methods: {
        // anonymous functions
        // addToCart () {
        //     this.cart += 1
        // }
        addToCart: function () {
            this.cart += 1
        },
        updateProduct: function (variantImage) {
            this.image = variantImage
        }
    }
})