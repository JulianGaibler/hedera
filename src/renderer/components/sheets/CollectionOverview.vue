<template>
	<div class="collectionOverview listMenu">
		<div v-for="doc in recentDocuments" :key="doc.file" class="collectionPreview">
			<div class="title" @click="open(doc.file)">
				<h1 :style="_getColor(doc.color)">{{doc.title_short}}</h1>
				<h2>{{doc.title}}</h2>
			</div>
			<div class="stats">
				<div>{{ $tc('info.modules._', doc.stats.modules) }}</div>
				<div>{{ $tc('info.terms._', doc.stats.terms) }}</div>
			</div>
			<div class="controls bottomAction">
				<buttons :actions="{
					right: [
						{
							icon: icons.IconOpen,
							callback: () => {folder(doc.file)}
						},
						{
							icon: icons.IconDelete,
							callback: () => {trash(doc.file)}
						},
						{
							label18: 'action.open._',
							callback: () => {open(doc.file)}
						},
					]
				}"
				/>
			</div>
		</div>
		<div class="actions bottomAction">
			<buttons :actions="config.actionButtons" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Helpers from '../../classes/Helpers'
import AppData from '../../classes/AppData'
import { shell } from 'electron'

import Buttons from '../elements/Buttons'

import IconOpen from '../../assets/icons/outline-folder_open-24px.svg'
import IconDelete from '../../assets/icons/outline-delete-24px.svg'

export default {
	name: 'collectionOverview',
	props: ['sheet'],
	data: function () {
		let actionButtons = {
			right: [
				{
					label18: 'action.open.collection',
					callback: () => {this.sheet.spawnChild(this.sheet ,'createCollection')}
				},
				{
					label18: 'action.new.collection',
					callback: () => {this.sheet.spawnChild(this.sheet ,'createCollection')}
				},
			]
		}
		return {
			config: {
				actionButtons
			},
			icons: {
				IconOpen,
				IconDelete,
			}
		}
	},
	components: {
		Buttons,
	},
	methods: {
		/**
		 * Opens Collection if file exists and not already open
		 * @param {string} full path of file
		 */
		open: function(path) {
			if (this._exists(path))
				if (!this._alreadyOpen(path))
					this.sheet.spawnChild(this.sheet, 'collection', { path })
		},
		/**
		 * Opens folder of collection if file exists
		 * @param {string} full path of file
		 */
		folder: function(path) {
			if (this._exists(path)) {
				shell.showItemInFolder(path)
			}
		},
		/**
		 * Checks if the file exists
		 * @param {string} full path of file
		 * @returns {boolean} true if file exists
		 */
		_exists: function(path) {
			let exists = AppData.checkForFile(path)
			if (!exists) {
				//TODO notification
				this.$store.dispatch('Settings/removeDocument', path)
			}
			return exists
		},
		/**
		 * Checks if the collection is already open
		 * @param {string} full path of file
		 * @returns {object} false if not open or vue-instance if open
		 */
		_alreadyOpen: function(path) {
			let nextSheet = this.sheet.get(this.sheet.nr+1)
			if (!nextSheet) return false
			if (!nextSheet.data) return false
			if (!nextSheet.data.path) return false
			if (nextSheet.data.path !== path) return false
			return nextSheet
		},
		/**
		 * Look at Helper-Class
		 */
		_getColor: function(hue) {
			return {
				'background-image': Helpers.getCssGradient(parseInt(hue)),
				'-webkit-background-clip': 'text',
				'-webkit-text-fill-color': 'transparent'
			}
		}
	},
	computed: {
		...mapState({
			recentDocuments: state => state.Settings.recentDocuments
		}),
	},
}
</script>

<style>

</style>
