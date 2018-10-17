<template>
	<div class="dist">
		<h3>Language</h3>
		<formOptions v-model="useDefault.value" :config="useDefault" />
	</div>
</template>

<script>
import formOptions from './elements/FormOptions'

export default {
	name: 'perfectChild',
	props: ['sheet'],
	data: function () {
		return {
			useDefault: {
				value: []
				type: 'checkbox',
				options: [
					{value: 'disable', label: 'use System default'}				]
			}
		}
	},
	components: { formOptions },
	methods: { }
}
</script>

<style>

</style>
