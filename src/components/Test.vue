<template>
  <photo-viewer :images="imgs"></photo-viewer>
</template>

<script>
  import PhotoViewer from './PhotoViewer';

  export default {
    data() {
      return {
        imgs: [
          'http://cdnqiniu.caifuhanshu.com/image_88612_d56d38f2b0bc4338997f9aa6732ab353bd3a9661cf1df8b3cd028d8cfbe5978f_*&_640multiply480',
          'http://cdnqiniu.caifuhanshu.com/image_88612_f638e60a79f5400c8c6e98e3aaab1fa11d2ec587fb595d927d8195817c38fad0_*&_634multiply476',
          'http://cdnqiniu.caifuhanshu.com/image_88612_dd366d20e9ce4d1894e8bbd62c27c31020f473e4a1876d92ef616eb3308e8b8e_*&_677multiply1201',
        ],
      };
    },
    components: {
      photoViewer: PhotoViewer,
    },
  };
</script>

<style lang="scss" scoped>

</style>
