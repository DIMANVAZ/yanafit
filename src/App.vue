<template>
    <the-gallery></the-gallery>
  <!-- ниже это ссылки для шаблона слайдера влево-вправо-->
  <img-comparison-slider>
    <img class="slider" slot="before" src="../src/assets/pics/skoliozRight.jpg" />
    <img class="slider" slot="after" src="../src/assets/pics/skoliozLeft.jpg" />
<!--    <img slot="handle" class="custom-handle" src="../public/logofit.png">-->
  </img-comparison-slider>
  <!-- закончились-->
</template>

<script>

  import TheGallery from "./TheGallery";

export default {
  name: 'App',
  data(){
    return {
      name:'Яна',
      surname:'Ковальчук',
    }
  },
  methods:{},
  components: {
    TheGallery
  }
}

</script>

