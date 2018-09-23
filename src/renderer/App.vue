<template>
	<div id="app">
		<appHeader />
		<compFlow />
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
