<template>
	<div style="padding: 20px">
		<h1 style="margin: 0px">I'm a PerfectChild™</h1>
		<p>My number is {{sheet.nr}}, my Number is {{rid}}</p>
		<button v-on:click="sheet.spawnChild(sheet.nr, 'perfect-child', {});sheet.focusChild();">spawnChild()</button>
		<button v-on:click="sheet.closeChild(sheet.nr)">closeChild()</button>
		<button v-on:click="sheet.closeSelf(sheet.nr)">closeSelf()</button>
		<button v-on:click="sheet.focusChild(sheet.nr)">focusChild()</button>
		<button v-on:click="sheet.focusParent(sheet.nr)">focusParent()</button>
	</div>
</template>

<script>

  export default {
    name: 'perfect-child',
    props: ['sheet'],
    data: function () {
			return {
				rid: Math.random()
		}
	},
    components: { },
    methods: { }
  }
</script>

<style>

</style>
