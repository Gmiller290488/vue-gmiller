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
         <router-link :to="{name:'Character', params: {pageId:character.id}}" class="view-full" ><i class="fa fa-expand"></i></router-link>
         <div class="character-pic animated fadeIn">
           <img :src="`static/images/${character.image}`" />
         </div>
         <button v-on:click="openBio(character, index)">View bio</button>
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
    openBio: function(character, index) {
      if (character.showBio == true) {
         character.showBio = false; 
      }
      else {
         character.showBio =true; 
         this.$set(this.characters, character, index)   
         
}
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: repeat(auto-fill, auto);
  }

  .character {
    position: relative;
    width: 100%;
    overflow: hidden;
    border: 3px solid #000;
  }

  .fadeIn {
    opacity: 1;
    margin-top: 25px;
    font-size: 21px;
    text-align: center;
    -webkit-transition: opacity 2s ease-in;
    -moz-transition: opacity 2s ease-in;
    -o-transition: opacity 2s ease-in;
    -ms-transition: opacity 2s ease-in;
    transition: opacity 2s ease-in;
  }
  
  i {
    font-size: 36px;
  }

  .bio {
    font-family: inconsolata;
   }
 
  h2 {
    text-align: center;
    font-family: tangerine;
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


@media screen and (max-width: 900px) {
  .character-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, auto);
    grid-template-rows: repeat(auto-fill, auto);
  }
 } 
</style>
