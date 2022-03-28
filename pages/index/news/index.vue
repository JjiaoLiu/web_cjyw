<template>
  <section class="container">
    <div>
      <h1 class="title">news</h1>
      <ul class="news">
        <li v-for="(n, index) in news" :key="index" class="news">
          <nuxt-link :to="{ name: 'news-id', params: { id: index } }">
            {{ n.title }}
          </nuxt-link>
        </li>
      </ul>
      <nuxt-link class="button" to="/"> Homepage </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "News",
  async asyncData({ $http }) {
    const { data } = await $http.$get("/api/news/list");
    return { news: data };
  },
  head() {
    return {
      title: "News",
    };
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  margin: 30px 0;
}
.news {
  list-style: none;
  margin: 0;
  padding: 0;
}
.news {
  margin: 10px 0;
}
.button {
  display: inline-block;
  margin-top: 50px;
}
</style>
