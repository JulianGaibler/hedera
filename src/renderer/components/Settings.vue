<template>
	<div class="listMenu">
		<div class="dist spacer">
			<h2 class="grey">{{ $t('sections.settings') }}</h2>
		</div>
		<hr class="spacer">
		<div class="dist">
			<h3>Language</h3>
			<formOptions v-model="va" :config="config" />
			<p>{{va}}</p>
			<h3>Default Directory</h3>
			<formInput v-model="defaultDirectory" :config="buttons.directory" />
		</div>
	</div>
</template>

<script>
import { remote } from 'electron'

import formInput from './elements/FormInput'

export default {
	name: 'settings',
	props: ['sheet'],
	data: function () {
		let buttons = {
			directory: {
				type: 'text',
				placeholder: 'Absolute path of location',
				button: {
					src: require('../assets/icons/outline-folder_open-24px.svg'),
					callback: this._setPath,
				}
			}
		}

		return {
			buttons,
			va: ['disable'],
			config: {
				type: 'checkbox',
				options: [
					{value: 'disable', label: 'use System default'}				]
			}
		}
	},
	components: {
		formInput
	},
	mounted: function() {

	},
	methods: {
		_setPath: function() {
			let newPath = remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
			if (newPath) {
				this.path = newPath[0]
				this._updatePathInput()
			}
		},
	},
	computed: {
		defaultDirectory: {
			get () {
				return this.$store.state.Settings.defaultDirectory
			},
			set (value) {
				this.$store.dispatch('Settings/updateField', {field: 'defaultDirectory', value})
			}
		}
	}
}
</script>

<style>

</style>
