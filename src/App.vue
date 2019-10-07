<template>
    <div id="app">
        <loader v-if="!quotes.length"></loader>
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
                        >
                            <path d="M16 15L24 15 20 20zM8 9L0 9 4 4z"></path>
                            <path d="M21 6c0-1.654-1.346-3-3-3H7.161l1.6 2H18c.551 0 1 .448 1 1v10h2V6zM3 18c0 1.654 1.346 3 3 3h10.839l-1.6-2H6c-.551 0-1-.448-1-1V8H3V18z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="mt-12 mb-5 flex justify-center">
                <div v-if="quote" class="max-w-2xl">
                    <p class="text-2xl">{{ quote.quote }}</p>
                    <div class="flex text-xl text-indigo-200 pt-3 justify-between">
                        <p class="">
                            — {{ quote.byline}}
                            <a v-if="quote.url" :href="quote.url">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                     class="inline h-5 hover:text-blue-200 text-white fill-current ml-3">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 11.701c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701zm6 0c0 2.857-1.869 4.779-4.5 5.299l-.498-1.063c1.219-.459 2.001-1.822 2.001-2.929h-2.003v-5.008h5v3.701z"></path>
                                </svg>
                            </a>
                        </p>
                        <p class="text-sm text-gray-500">Quote <span class="text-xl ml-2">#{{ quoteNum }}</span></p>
                    </div>
                </div>

            </div>
            <div class="mt-16 justify-center flex">
                <div class="max-w-3xl">
                    <h2 class="text-xl text-gray-400">All Quotes</h2>
                    <quote-list @load="setQuote" :quotes="quotes"></quote-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Axios from 'axios'
  import Loader from './components/Loader'
  import QuoteList from './components/QuoteList'

  export default {
    name: 'app',
    components: { QuoteList, Loader },
    data () {
      return {
        quote: null,
        quoteNum: null,
        quotes: [],
      }
    },
    created () {
      Axios.get('https://indie-hackers.firebaseio.com/loadingQuotes.json').then(res => {
        this.quotes = res.data

        window.location.hash
          ? this.loadQuote(window.location.hash.replace('#', ''))
          : this.randomiseQuote()
      })
    },
    methods: {
      getQuoteNumFromUrl() {
        return window.location.hash.replace('#', '')
      },
      loadQuote(num) {
        if (!this.quotes[num]) {
          return;
        }

        this.quote = this.quotes[num-1]
        this.quoteNum = num
      },
      setQuote(id) {
        this.quote = this.quotes[id]
        this.quoteNum = id + 1;
        window.location.hash = this.quoteNum;
        window.scrollTo(0,0);
      },
      randomiseQuote () {
        const quoteId = Math.floor(Math.random() * this.quotes.length);
        this.quote = this.quotes[quoteId]
        this.quoteNum = quoteId + 1;
        window.location.hash = quoteId + 1;
      },
    },
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
</style>
