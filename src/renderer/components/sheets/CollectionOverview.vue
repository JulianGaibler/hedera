<template>
	<div class="collectionOverview bottomBar">
		<div>
			<div v-for="doc in recentDocuments" :key="doc.file" class="collectionBook">
				<div class="cover" @click="open(doc.file)" :style="{'background': _getColor(doc.color)}">
					<div>{{doc.title_short}}</div>
					<div>{{doc.title}}</div>
					<div>
						<div>{{ $tc('info.modules._', doc.stats.modules) }}</div>
						<div>{{ $tc('info.terms._', doc.stats.terms) }}</div>
					</div>
				</div>
				<div class="bar">
					<div class="button" @click="edit(doc.file)"><IconEdit /></div>
					<div class="button" @click="folder(doc.file)"><IconOpen /></div>
					<div class="fillH" />
					<div class="button" @click="trash(doc.file)"><IconDelete /></div>
				</div>
			</div>
		</div>
		<div>
			<div class="cornerBtn" @click="sheet.spawnChild(sheet ,'createCollection')">{{ $t('action.open') }}</div>
			<div class="cornerBtn" @click="sheet.spawnChild(sheet ,'createCollection')">{{ $t('action.new.collection') }}</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Helpers from '../../classes/Helpers'
import AppData from '../../classes/AppData'
import { shell } from 'electron'

import IconEdit from '../../assets/icons/outline-edit-24px.svg'
import IconOpen from '../../assets/icons/outline-folder_open-24px.svg'
import IconDelete from '../../assets/icons/outline-delete-24px.svg'

export default {
	name: 'collectionOverview',
	props: ['sheet'],
	data: function () {
		return { }
	},
	components: {
		IconEdit,
		IconOpen,
		IconDelete,
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
		 * Opens Collection and calls editCollection
		 * if file exists and not already open
		 * @param {string} full path of file
		 */
		edit: function(path) {
			if (this._exists(path)) {
				let nextSheet = this._alreadyOpen(path)
				if (nextSheet) {
					nextSheet.editCollection()
				} else {
					this.sheet.spawnChild(this.sheet, 'collection', {
						path,
						callOnMount: [{ name: 'editCollection',args: [] }]
					})
				}
			}
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
		_getColor: hue => Helpers.getCssGradient(hue),
	},
	computed: {
		...mapState({
			recentDocuments: state => state.Settings.recentDocuments
		})
	},
}
</script>

<style>

</style>
