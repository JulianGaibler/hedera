<template>
	<div class="bottombar">
		<div class="listMenu">
			<div class="headline">
				<h2 v-if="data" class="grey">{{ $t('action.edit.collection') }}</h2>
				<h2 v-else class="grey">{{ $t('action.new.collection') }}</h2>
			</div>
			
			<actionBar :actions="actionButtons" />

			<div class="dist form">
				<formInput v-model="buttons.title.value" :config="buttons.title" />
				<formInput v-model="buttons.title_short.value" :config="buttons.title_short" />
				<formInput v-if="!data" v-model="buttons.directory.value" :config="buttons.directory" />
				<formInput v-model="buttons.color.value" :config="buttons.color">
					<div class="colorPreview" :style="{background: _getColor(parseInt(buttons.color.value))}" />
				</formInput>
			</div>
		</div>
	</div>
</template>

<script>
import formInput from './elements/FormInput'
import actionBar from './elements/ActionBar'

import Helpers from '../classes/Helpers'
import AppData from '../classes/AppData'
import { remote } from 'electron'

import iconClose from '../assets/icons/outline-close-24px.svg'

export default {
	name: 'createCollection',
	props: ['sheet', 'data'],
	/**
	 * Data-Prop
	 * {string} [data] - will edit parent-components collection
	 * {string} data.title
	 * {string} data.title_short
	 * {number} data.color
	 */
	data: function () {
		let actionButtons = {
			left: [{
				icon: iconClose,
				callback: () => this.sheet.closeSelf(this.sheet)
			}],
			right: [{
				label: this.$t(this.data ? 'action.change' : 'action.create'),
				callback: this._submit
			}]
		}
		let buttons = {
			title: {
				value: this.data ? this.data.title : '',
				type: 'text',
				label: this.$t('label.title'),
				placeholder: this.$t('label.placeholder.title_example')
			},
			title_short: {
				value: this.data ? this.data.title_short : '',
				type: 'text',
				label: this.$t('label.abbreviation'),
				placeholder: this.$t('label.placeholder.abbreviation_example')
			},
			directory: {
				value: '/Users/Julian/Documents/untitled.ivy',
				type: 'text',
				label: this.$t('label.location'),
				placeholder: 'Absolute path of location',
				button: {
					src: require('../assets/icons/outline-folder_open-24px.svg'),
					callback: this._setPath,
				}
			},
			color: {
				value: this.data ? this.data.color : Helpers.getRandomInt(0,359),
				type: 'range',
				min: 0,
				max: 359,
				step: 1,
				label: this.$t('label.color')
			},
		}

		return {
			path: '/Users/Julian/Documents',
			buttons,
			actionButtons
		}
	},
	components: { formInput, actionBar },
	methods: {
		/**
		 * Look at Helper-Class
		 */
		_getColor: hue => Helpers.getCssGradient(hue),
		/**
		 * Opens dialog to select a folder
		 */
		_setPath: function() {
			let newPath = remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
			if (newPath) {
				this.path = newPath[0]
				this._updatePathInput()
			}
		},
		/**
		 * Concats path with file-name and updates input-field
		 */
		_updatePathInput: function() {
			let a = this.buttons.title_short.value.replace(/[^a-zA-Z-]/g, '')
			let filename = (a!=='') ? a : 'untitled'
			this.buttons.directory.value = `${this.path}/${filename}.ivy`
		},
		/**
		 * Checks if values of inputs are valid and creates/edits collection
		 */
		_submit: function() {
			let valid = true

			// title
			let title = this.buttons.title.value.replace(/^\s+|\s+$/g, '')
			if (title.length < 1) {
				this.$set(this.buttons.title, 'error', {info: this.$t('error.title_required')})
				valid = false
			}
			else if ((Helpers.titleRegex()).test(title)) {
				this.$set(this.buttons.title, 'error', {info: this.$t('error.only_letters_numbers_hyphens')})
				valid = false
			}
			else this.$set(this.buttons.title, 'error', undefined)

			// title_short
			let title_short = this.buttons.title_short.value.replace(/^\s+|\s+$/g, '')
			if (title_short.length < 1) {
				this.$set(this.buttons.title_short, 'error', {info: this.$t('error.abbreviation_required')})
				valid = false
			}
			else if ((/[^a-zA-Z0-9\- ]/g).test(title_short)) {
				this.$set(this.buttons.title_short, 'error', {info: this.$t('error.only_letters_numbers_hyphens_whitespace')})
				valid = false
			}
			else this.$set(this.buttons.title_short, 'error', undefined)

			// location
			let file
			if (!this.data) {
				file = this.buttons.directory.value.replace(/^\s+|\s+$/g, '')
				file = file.replace(/(.*)\.(.*?)$/, '$1')
				let idx = file.lastIndexOf('/')
				file = `${file.substring(0, idx)}/${file.substring(idx+1)}.ivy`
			}

			// color
			let color = parseInt(this.buttons.color.value)
			if (isNaN(color)) {
				this.$set(this.buttons.color, 'error', {info: this.$t('error.unknown_error')})
				valid = false
			}
			else this.$set(this.buttons.color, 'error', undefined)

			if (valid && !this.data) {
				let saved = AppData.createCollection({title, title_short, file, color})
				if (saved === 0) {
					this.sheet.closeSelf(this.sheet)
					this.sheet.get(0).open(file)
				}
				else {
					if (saved === 1) this.$set(this.buttons.directory, 'error', {info: this.$t('error.file_already_exists')})
					if (saved === 2) this.$set(this.buttons.directory, 'error', {info: this.$t('error.read_only_directory')})
					else this.$set(this.buttons.directory, 'error', {info: this.$t('error.unknown_error')})
				}
			} else if (valid && this.data) {
				this.sheet.get(this.sheet.nr-1)._editCollection(title, title_short, color)
			}

		},
	},
	watch: {
		'buttons.title_short.value': function() {
			this._updatePathInput()
		}
	},
}
</script>

<style>

</style>
