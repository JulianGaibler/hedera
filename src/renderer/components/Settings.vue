<template>
	<div class="listMenu">
		<div class="headline">
			<h2 class="grey">{{ $t('sections.settings') }}</h2>
		</div>

		<actionBar :actions="actionButtons" />

		<language />
		<!-- <defaultDirectory /> -->

	</div>
</template>

<script>
import { remote } from 'electron'

import actionBar from './elements/ActionBar'
import language from './Settings/Language'

import iconClose from '../assets/icons/outline-close-24px.svg'

export default {
	name: 'settings',
	props: ['sheet'],
	data: function () {

		return {
			actionButtons: {
				left: [{
					icon: iconClose,
					callback: () => this.sheet.closeSelf(this.sheet)
				}]
			}
		}
	},
	components: {
		actionBar,
		language
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
