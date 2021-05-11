<template>
  <div class="v-card-wrapper">
    <div class="card">
      <div class="face face1">
        <div class="content">
          <h2>
            {{ title.toUpperCase() }}
          </h2>
        </div>
      </div>
      <div class="face face2">
        <h2> {{ numberCards }} </h2>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'v-card',
    comments: {},
    props: ['title', 'numberCards'],
    data() {
      return {
        // title: 'initialCounter'
      }
    }
  }
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900');

body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(45deg, #24006b, #f42f8c);
}

.v-card-wrapper {
  margin-top: 100px;
}

.v-card-wrapper .card {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 300px;
  height: 400px;
  margin: 0 auto;
  background: #fff;
  text-shadow: 0 15px 60px rgba(0, 0, 0, .5);
  cursor: pointer;
}

.v-card-wrapper .card .face {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-card-wrapper .card .face.face1 {
  box-sizing: border-box;
  padding: 20px;
}

.v-card-wrapper .card .face.face1 h2 {
  margin: 0;
  padding: 0;
}

.v-card-wrapper .card .face.face2 {
  background: #111;
  transition: .5s;
}

.v-card-wrapper .card:first-child .face.face2 {
  background: linear-gradient(45deg, #3503ad, #f7308c);
}

.v-card-wrapper .card:nth-child(2) .face.face2 {
  background: linear-gradient(45deg, #ccff00, #09afff);
}

.v-card-wrapper .card:last-child .face.face2 {
  background: linear-gradient(45deg, #e91e63, #ffeb3b);
}

.v-card-wrapper .card:hover .face.face2 {
  height: 60px;
}

.v-card-wrapper .card .face.face2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, .1);
}

.v-card-wrapper .card .face.face2 h2 {
  margin: 0;
  padding: 0;
  font-size: 10em;
  color: #ffffff;
  transition: .5s;
  text-shadow: 0 2px 5px rgba(0, 0, 0, .2);
}

.v-card-wrapper .card:hover .face.face2 h2 {
  font-size: 2em;
}
</style>