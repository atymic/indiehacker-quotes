<template>
    <div id="app">
        <div v-if="!quotes.length">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
        <div v-else>
            <div class="flex justify-between">
                <h1 class="text-xl text-white">IndieHackers Quotes</h1>
                <div class="hover:text-blue-200 text-white">
                    <div @click="randomiseQuote" class="font-light">
                        <button class="hover:text-grey-300">Randomise Quote</button>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             class="inline h-10 fill-current ml-3"
                             width="24" height="24"
                             viewBox="0 0 24 24"
                        ><path d="M16 15L24 15 20 20zM8 9L0 9 4 4z"></path><path d="M21 6c0-1.654-1.346-3-3-3H7.161l1.6 2H18c.551 0 1 .448 1 1v10h2V6zM3 18c0 1.654 1.346 3 3 3h10.839l-1.6-2H6c-.551 0-1-.448-1-1V8H3V18z"></path></svg>
                    </div>
                </div>
            </div>
            <div class="mt-12 mb-5 flex justify-center">
                <div v-if="quote" class="max-w-2xl">
                    <p class="text-2xl">{{ quote.quote }}</p>
                    <p class="text-xl text-indigo-200 pt-3">
                        — {{ quote.byline}}
                        <a v-if="quote.url" :href="quote.url">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 class="inline h-5 hover:text-blue-200 text-white fill-current ml-3">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 11.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701zm6 0c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701z"></path>
                            </svg>
                        </a>
                    </p>
                </div>

            </div>
            <div class="mt-16 justify-center flex">
                <div class="max-w-3xl">
                    <h2 class="text-xl text-gray-400">All Quotes</h2>
                    <div v-for="(q, i) in quotes" class="max-w-2xl my-10 flex items-center">
                        <div class="pr-8 text-indigo-500 items-center">
                            {{ i + 1}})
                        </div>
                        <div>
                            <p class="text-lg">{{ q.quote }}</p>
                            <p class="text-indigo-200 pt-2">
                                — {{ q.byline}}
                                <a v-if="q.url" :href="q.url">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         class="inline h-4 hover:text-blue-200 text-white fill-current ml-3">
                                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 11.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701zm6 0c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701z"></path>
                                    </svg>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Axios from 'axios';

  export default {
    name: 'app',
    data() {
      return {
        quote: null,
        quotes: [],
      }
    },
    created() {
      Axios.get('https://indie-hackers.firebaseio.com/loadingQuotes.json').then(res => {
        this.quotes = res.data;
        this.randomiseQuote()
      })
    },
    methods: {
      randomiseQuote() {
        this.quote = this.quotes[Math.floor(Math.random()*this.quotes.length)];
      }
    }
  }
</script>

<style>
    body {
        background-color: #0e2439;
        color: white;
    }
    html {
        font-family: "Lucida Grande", Verdana, sans-serif;
    }

    #app {
        padding: 5em;
    }


    .spinner {
        width: 40px;
        height: 40px;

        position: relative;
        margin: 100px auto;
    }

    .double-bounce1, .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;

        -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
        animation: sk-bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    @-webkit-keyframes sk-bounce {
        0%, 100% { -webkit-transform: scale(0.0) }
        50% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bounce {
        0%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        } 50% {
              transform: scale(1.0);
              -webkit-transform: scale(1.0);
          }
    }
</style>
