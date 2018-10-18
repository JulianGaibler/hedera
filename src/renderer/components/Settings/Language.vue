<template>
	<div class="dist form">
		<h3>Language</h3>
		<p>This action requires an Application restart. I'm testing a line-break with this way too long explanation about the language-setting.</p>
		<formOptions v-model="useDefault.value" :config="useDefault" />
		<formOptions v-model="languages.value" :config="languages" />
		<formInput v-model="textinput.value" :config="textinput" />
	</div>
</template>

<script>
import formOptions from '../elements/FormOptions'
import formInput from '../elements/FormInput'

export default {
	name: 'language',
	props: ['sheet'],
	data: function () {
		return {
			useDefault: {
				value: [],
				type: 'checkbox',
				options: [
					{value: 'disable', label: 'use System default'},
				]
			},
			languages: {
				value: [],
				type: 'radio',
				options: [
					{value: 'de', label: 'German'},
					{value: 'en', label: 'English'},
					{value: 'fr', label: 'French'},
				]
			},
			textinput: {
				value: '',
				type: 'text',
				label: this.$t('label.title'),
				placeholder: 'eg. Grundgesetz'
			},
		}
	},
	components: { formOptions, formInput },
	methods: { }
}
</script>

<style>

</style>
