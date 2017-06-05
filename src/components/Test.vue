<template>
  <contact :info="info"></contact>
</template>

<script>
  import Contact from './Contact';

  export default {
    data() {
      return {
        info: {
          name: 'lulu',
          mobile: '13522315114',
          call: [
            {
              mobile: '13522315114',
              direction: 1,
              duration: 200,
              call_time: '2016-10-29T05:55:13.000Z',
            },
            {
              mobile: '13522315114',
              direction: 1,
              duration: 400,
              call_time: '2016-11-17T13:02:25.000Z',
            },
            {
              mobile: '13522315114',
              direction: 2,
              duration: 600,
              call_time: '2016-11-17T13:02:25.000Z',
            },
          ],
          sms: [],
          totalCallTime: 1200,
        },
      };
    },
    components: {
      contact: Contact,
    },
  };
</script>

<style lang="scss" scoped>

</style>
