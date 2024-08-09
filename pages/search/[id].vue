<template>{{ postId }}</template>
<script>
const route = useRoute()
const postId = route.params.id
console.log(postId)
</script>