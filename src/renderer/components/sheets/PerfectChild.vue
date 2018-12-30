<template>
	<div style="padding: 20px">
		<h1 style="margin: 0px">I'm a PerfectChild™</h1>
		<p>My number is {{sheet}}, my Number is {{rid}}</p>
		<button @click="sheet.spawnChild(sheet, 'perfectChild', {});">spawnChild()</button>
		<button @click="sheet.closeChild(sheet)">closeChild()</button>
		<button @click="sheet.closeSelf(sheet)">closeSelf()</button>
		<button @click="sheet.focusChild(sheet)">focusChild()</button>
		<button @click="sheet.focusParent(sheet)">focusParent()</button>
	</div>
</template>

<script>
export default {
	name: 'perfectChild',
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
