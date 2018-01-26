<template>
  <div>
    <div class="controls">
      <div class="input-box">
        <button>Sort A-Z</button>
      </div>
      <div class="input-box">
        <input type="text" placeholder="Search...">
      </div>
      <div class="input-box">
      <p>How many characters to show?</p>
        <input id="slider1" type="range" min="0" max="10" step="1" v-model="characterCount"/> <input id="rangeValue1" size="2" type="text" :value="characterCount">
      </div>
    </div>
    <div class="character-container clearfix">
      <div class="character border-1" v-for='(character, index) in characters'>
       <h2>{{character.firstName}} {{character.lastName}}</h2>
       <div class="content">
         <router-link :to="{name:'Character', params: {pageId:character.id}}" class="view-full" >View full</router-link>
         <div class="character-pic">
           <img :src="`static/images/${character.image}`" />
         </div>
         <button v-on:click="openBio(character, $index)">View bio</button>
         <div class="bio" v-if="character.showBio"> {{character.bio}} </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      characters: {},
      showBio: false,
      characterCount: 10,
    }
  },
  methods: {
    openBio: function(character, $index) {
      character.showBio = true
      this.$set(this.characters, character, $index)   
},
    getCharacters: function() {
      fetch('/static/characters.json').then((response) => {
        return response.json()
      }).then((r) => {
        this.characters = r.characters;
        this.characters.map(character => character.id = `${character.firstName.toLowerCase()}-${character.lastName ? character.lastName.toLowerCase() : ''}`);
      })
    }
  },
  mounted () {
    this.getCharacters()
  }
}
</script>

<style scoped>
  .character-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: auto;
  }
  .character {
    position: relative;
    grid-column: 1; 
    width: 100%;
    overflow: hidden;
    border: 3px solid #000;
  }

  .character-pic {
    animation: fadein 2s;
    -webkit-animation: fadein 2s;
    width: 33%;
} 
 
  h2 {
    text-align: center;
   }

  .view-full {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  .border-1 {
    border-color: black;
  }
  .border-2 {
    border-color: blue;
  }
  .border-3 {
    border-color: pink;
  }
  .border-4 {
    border-color: green;
  }
  .border-5 {
    border-color: orange;
  }
</style>
