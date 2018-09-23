<template>
	<div style="padding: 20px">
		<h1 style="margin: 0px">I'm a PerfectChild™</h1>
		<p>My number is {{sheet}}, my Number is {{rid}}</p>
		<button v-on:click="sheet.spawnChild(sheet, 'perfect-child', {});sheet.focusChild();">spawnChild()</button>
		<button v-on:click="sheet.closeChild(sheet)">closeChild()</button>
		<button v-on:click="sheet.closeSelf(sheet)">closeSelf()</button>
		<button v-on:click="sheet.focusChild(sheet)">focusChild()</button>
		<button v-on:click="sheet.focusParent(sheet)">focusParent()</button>
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
