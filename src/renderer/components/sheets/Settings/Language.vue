<template>
	<div class="dist form">
		<h3>{{ $t('settings.language') }}</h3>
		<p>{{ $t('settings.language_desc') }}</p>
		<formOptions v-model="isDefault" :config="useDefault" />
		<formOptions v-model="settingValue" :config="languages" :disabled="this.isDefault.length > 0" />
	</div>
</template>

<script>
import formOptions from '../../elements/FormOptions'

export default {
	name: 'language',
	data: function () {
		return {
			useDefault: {
				type: 'checkbox',
				options: [
					{value: 'languages', label: 'use System default'},
				]
			},
			languages: {
				type: 'radio',
				options: [
					{value: 'de', label: 'German'},
					{value: 'en', label: 'English'},
					{value: 'fr', label: 'French'},
				]
			},
		}
	},
	components: { formOptions },
	methods: { },
	computed: {
		isDefault: {
			get () {
				return (this.$store.state.Settings.lang === 'default') ? ['languages'] : []
			},
			set (value) {
				this.$store.dispatch('Settings/toogleDefaultField', {field: 'lang', toDefault: (value.length > 0)})
			}
		},
		settingValue: {
			get () {
				return this.$store.getters['Settings/getField']('lang')
			},
			set (value) {
				this.$store.dispatch('Settings/updateField', {field: 'lang', value})
			}
		}
	},
}
</script>

<style>

</style>
