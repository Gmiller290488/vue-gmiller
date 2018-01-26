<template>
  <div class="view-full-content" v-on:click="goHome">
    <router-link to="/" class="close-button">Close</router-link>
    <div class="character-pic">
      <img src="static/images/andrew-briggs.jpg" />
    </div>
    <div class="bio">Aliquam erat volutpat. Ut ultrices nisi enim, eget condimentum urna condimentum sit amet. Proin vulputate malesuada nisl nec elementum. Phasellus mi est, laoreet quis molestie sit amet, cursus sit amet enim.</div>
  </div>
</template>

<script>
export default {
  name: 'Character',
  data () {
    return {
      pageId: this.$route.params.pageId,
      character: {}
    }
  },
  methods: {
    getCharacter: function() {
      fetch('/static/characters.json').then((response) => {
        console.log(response.json);
        return response.json()
      
      }).then((r) => {
        this.character = r.characters.find(character => `${character.firstName.toLowerCase()}-${character.lastName.toLowerCase()}` === this.pageId);
      })
    },
    goHome: function() {
      this.$router.push('/');
    }
  },
  mounted () {
    this.getCharacter()
  }
}
</script>

<style scoped>
  .view-full-content {
    color: #fff;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z- index: 999;
    background: black;
  }
  .close-button {
    color: #fff;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
