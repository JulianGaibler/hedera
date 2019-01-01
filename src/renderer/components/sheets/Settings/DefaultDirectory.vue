<template>
	<div class="dist form">
		<h3>{{ $t('settings.defaultdirectory') }}</h3>
		<p>{{ $t('settings.defaultdirectory_desc') }}</p>
		<formOptions v-model="isDefault" :config="useDefault" />
		<formInput v-model="settingValue" :config="defaultDirectory" :disabled="this.isDefault.length > 0" />
	</div>
</template>

<script>
import { remote } from 'electron'
import debounce from 'debounce'
import Jetpack from 'fs-jetpack'

import formOptions from '../../elements/FormOptions'
import formInput from '../../elements/FormInput'

export default {
	name: 'defaultDirectory',
	data: function () {
		return {
			intermediaryValue: '',
			useDefault: {
				type: 'checkbox',
				options: [
					{value: 'defaultDirectory', label18: 'settings.use_system_default'},
				]
			},
			defaultDirectory: {
				type: 'text',
				label18: 'label.location',
				placeholder18: 'label.placeholder.absolute_path',
				button: {
					src: require('../../../assets/icons/outline-folder_open-24px.svg'),
					callback: this._setPath,
				}
			},
		}
	},
	components: { formOptions, formInput },
	mounted: function() {
		this._updateIntermediary()
	},
	methods: {
		/**
		 * Opens dialog to select a folder
		 */
		_setPath: function() {
			let newPath = remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
			if (newPath) {
				this.settingValue = newPath[0]
			}
		},
		_updateIntermediary: function() {
			this.intermediaryValue = this.$store.getters['Settings/getField']('defaultDirectory')
		}
	},
	computed: {
		isDefault: {
			get () {
				return (this.$store.state.Settings.defaultDirectory === 'default') ? ['defaultDirectory'] : []
			},
			set (value) {
				this.$store.dispatch('Settings/toogleDefaultField', {field: 'defaultDirectory', toDefault: (value.length > 0)})
				this.$set(this.defaultDirectory, 'error', undefined)
				this._updateIntermediary()
			}
		},
		settingValue: {
			get () {
				return this.intermediaryValue
			},
			set: debounce(function(value) {
				Jetpack.existsAsync(value).then(result => {
					if (result === 'dir') {
						this.$set(this.defaultDirectory, 'error', undefined)
						this.$store.dispatch('Settings/updateField', 
							{
								field: 'defaultDirectory',
								value: value.replace(/^(.+?)\/*?$/, '$1')
							})
					}
					else {
						this.$set(this.defaultDirectory, 'error', {info18: 'error.path_invalid'})
					}
					this.intermediaryValue = value
				})
			}, 400)
		}
	},
}
</script>

<style>

</style>
