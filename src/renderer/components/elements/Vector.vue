<template>
	<div v-once v-html="src" />
</template>

<script>
// see vue-loader.conf
export default {
	props: [ 'src' ]
}
</script>