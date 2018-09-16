<template>
	<div id="app">
		<app-header></app-header>
		<comp-flow></comp-flow>
	</div>
</template>

<script>
	import appHeader from './components/AppHeader'
	import compFlow from './components/CompFlow'

	export default {
		name: 'hedera',
		components: { appHeader, compFlow },
	}
</script>

<style>
	/* CSS */
</style>
