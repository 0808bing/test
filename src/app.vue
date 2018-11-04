<template>
    <div class="cover">
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import Content from './components/content.vue'
export default {
    data() {
        return {
        }
    },
    components: {
        Header,
        Content,
        Footer,
    }
}
</script>
<style>
    
</style>


