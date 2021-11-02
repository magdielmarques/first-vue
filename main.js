Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        } 
    },

    template: `
                <div class="product">
                <div class="product-image">
                    <img :src="image">
                </div>

                <div class="product-info">
                    <!-- <h1>{{brand}} {{ product }}</h1> -->
                    <h1> {{ title }} </h1>
                    <p v-if="variants[selectedVariant].variantQuantity > 10">In stock</p>
                    <p v-else-if="variants[selectedVariant].variantQuantity <= 10 && variants[selectedVariant].variantQuantity > 0">Almost sold out!</p> 
                    <p v-else>Out of Stock</p>
                    <p>Shipping: {{ shipping }} </p>

                    <ul>
                        <li v-for="indexDetail in details"> {{ indexDetail }} </li>
                    </ul>

                    <div 
                        v-for="(variant, index) in variants"
                        :key="index"
                        class="color-box"
                        :style="{ backgroundColor: variant.variantColor }"
                        @mouseover="updateProduct(index)"
                    >
                        <!-- <p @mouseover="updateProduct(variant.variantImage)">{{ variant.variantColor }}</p> -->
                    </div>

                    <!-- <button v-on:click="cart += 1">Add to Cart</button> -->
                    <button 
                        v-on:click="addToCart"
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                    >
                        Add to Cart
                    </button>

                    <div class="cart">
                        <p>Cart({{cart}})</p>
                    </div>

                </div>

            </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Tabajara',
            selectedVariant: 0,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'white',
                    variantImage: './assets/white-socks.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'black',
                    variantImage: './assets/black-socks.jpg',
                    variantQuantity: 0
                }
            ],
            cart: 0,
        }
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },

        image() {
            return this.variants[this.selectedVariant].variantImage
        },

        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },

        shipping() {
            if (this.premium) {
                return "Free"
            }
            else {
                return 2.99
            }
        }
    }
})

const app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})