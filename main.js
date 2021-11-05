
// COMPONENT FILHO 
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        test: {
            type: String,
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
                    <h1> {{ title }} {{ test }}</h1>
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
                    <!-- v-on:click="eventTest" -->
                    <button 
                        v-on:click="addToCart"
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                    >
                        Add to Cart
                    </button>
            </div>
        
            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>

        </div>
 
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Tabajara',
            selectedVariant: 0,
            vModelTest: 'v-model é diferente de v-bind',
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
            reviews: []
        }
    },

    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        eventTest() {
            this.$emit('show-message')
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

// COMPONENTE PARA AVALIZAÇÃO DOS PRODUTOS - COMPONENTE FILHO DE PRODUCT
Vue.component('product-review', {
    template: `
            <form class="review-form" @submit.prevent="onSubmit">
            
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            
            <p> 
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
            </p>
            
            <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
            </p>
            
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
                
            <p>
            <input type="submit" value="Submit">  
            </p>    
        
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
            }
            }
    }    
})

// ELEMENTO PAI - RAIZ  DO PROJETO 
const app = new Vue({
    el: '#app',
    data: {
        premium: true,
        testRoot: 'Olá, testando props',
        cart: [],
        eventTestString: 'Evento acionado com sucesso'
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        showMessageRoot() {
            console.log('Teste realizado com sucesso!')
        }
    }
})
