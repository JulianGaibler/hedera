<template>
	<div class="bottomBar">
		<div class="listMenu">
			<div class="headline">
				<h2 v-if="data" class="grey">{{ $t('action.edit.collection') }}</h2>
				<h2 v-else class="grey">{{ $t('action.new.collection') }}</h2>
			</div>
			
			<buttons class="actionBar" :actions="actionButtons" />

			<div class="dist form">
				<formInput v-model="formButtons.title.value" :config="formButtons.title" />
				<formInput v-model="formButtons.title_short.value" :config="formButtons.title_short" />
				<formInput v-if="!data" v-model="formButtons.directory.value" :config="formButtons.directory" />
				<formInput v-model="formButtons.color.value" :config="formButtons.color">
					<div class="colorPreview" :style="{background: _getColor(parseInt(formButtons.color.value))}" />
				</formInput>
			</div>
		</div>
	</div>
</template>

<script>
import { remote } from 'electron'

import formInput from '../elements/FormInput'
import Buttons from '../elements/Buttons'

import Helpers from '../../classes/Helpers'
import AppData from '../../classes/AppData'

import iconClose from '../../assets/icons/outline-close-24px.svg'

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
				label18: this.data ? 'action.change' : 'action.create',
				callback: this._submit
			}]
		}
		let formButtons = {
			title: {
				value: this.data ? this.data.title : '',
				type: 'text',
				label18: 'label.title',
				placeholder18: 'label.placeholder.title_example'
			},
			title_short: {
				value: this.data ? this.data.title_short : '',
				type: 'text',
				label18: 'label.abbreviation',
				placeholder18: 'label.placeholder.abbreviation_example'
			},
			directory: {
				value: '',
				type: 'text',
				label18: 'label.location',
				placeholder: 'Absolute path of location',
				button: {
					src: require('../../assets/icons/outline-folder_open-24px.svg'),
					callback: this._setPath,
				}
			},
			color: {
				value: this.data ? this.data.color : Helpers.getRandomInt(0,359),
				type: 'range',
				min: 0,
				max: 359,
				step: 1,
				label18: 'label.color'
			},
		}

		return {
			path: this.intermediaryValue = this.$store.getters['Settings/getField']('defaultDirectory'),
			formButtons,
			actionButtons
		}
	},
	components: { formInput, Buttons },
	created: function() {
		this._updatePathInput()
	},
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
			let a = this.formButtons.title_short.value.replace(/[^a-zA-Z-]/g, '')
			let filename = (a!=='') ? a : this.$t('state.untitled')
			this.formButtons.directory.value = `${this.path}/${filename}.ivy`
		},
		/**
		 * Checks if values of inputs are valid and creates/edits collection
		 */
		_submit: function() {
			let valid = true

			// title
			let title = this.formButtons.title.value.replace(/^\s+|\s+$/g, '')
			if (title.length < 1) {
				this.$set(this.formButtons.title, 'error', {info18: 'error.title_required'})
				valid = false
			}
			else if ((Helpers.titleRegex()).test(title)) {
				this.$set(this.formButtons.title, 'error', {info18: 'error.only_letters_numbers_hyphens'})
				valid = false
			}
			else this.$set(this.formButtons.title, 'error', undefined)

			// title_short
			let title_short = this.formButtons.title_short.value.replace(/^\s+|\s+$/g, '')
			if (title_short.length < 1) {
				this.$set(this.formButtons.title_short, 'error', {info18: 'error.abbreviation_required'})
				valid = false
			}
			else if ((/[^a-zA-Z0-9\- ]/g).test(title_short)) {
				this.$set(this.formButtons.title_short, 'error', {info18: 'error.only_letters_numbers_hyphens_whitespace'})
				valid = false
			}
			else this.$set(this.formButtons.title_short, 'error', undefined)

			// location
			let file
			if (!this.data) {
				file = this.formButtons.directory.value.replace(/^\s+|\s+$/g, '')
				file = file.replace(/(.*)\.(.*?)$/, '$1')
				let idx = file.lastIndexOf('/')
				file = `${file.substring(0, idx)}/${file.substring(idx+1)}.ivy`
			}

			// color
			let color = parseInt(this.formButtons.color.value)
			if (isNaN(color)) {
				this.$set(this.formButtons.color, 'error', {info18: 'error.unknown_error'})
				valid = false
			}
			else this.$set(this.formButtons.color, 'error', undefined)

			if (valid && !this.data) {
				let saved = AppData.createCollection({title, title_short, file, color})
				if (saved === 0) {
					this.sheet.closeSelf(this.sheet)
					this.sheet.get(0).open(file)
				}
				else {
					if (saved === 1) this.$set(this.formButtons.directory, 'error', {info18: 'error.file_already_exists'})
					if (saved === 2) this.$set(this.formButtons.directory, 'error', {info18: 'error.read_only_directory'})
					else this.$set(this.formButtons.directory, 'error', {info18: 'error.unknown_error'})
				}
			} else if (valid && this.data) {
				this.sheet.get(this.sheet.nr-1)._editCollection(title, title_short, color)
			}

		},
	},
	watch: {
		'formButtons.title_short.value': function() {
			this._updatePathInput()
		}
	},
}
</script>

<style>

</style>
