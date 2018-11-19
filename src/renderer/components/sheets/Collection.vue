<template>
	<!-- TODO, loading animation -->
	<div class="listMenu">
		<div class="headline flex">
			<h1 :style="h1Style">{{collection.data?collection.data.title_short:'???'}}</h1>
			<h2 class="flexGrow">{{collection.data?collection.data.title:'???'}}</h2>
		</div>
		
		<buttons class="actionBar" :actions="config.actionButtons" />

		<div class="dist form">
			<formInput v-model="searchQuery" :config="config.searchInput" />
		</div>

		<items v-if="!loading" :collection="collection" />
	</div>
</template>

<script>
import Vue from 'vue'
import { remote } from 'electron'

import Buttons from '../elements/Buttons'
import formInput from '../elements/FormInput'
import items from './Collection/Items'

import Collection from '../../classes/Collection'
import Helpers from '../../classes/Helpers'

import iconClose from '../../assets/icons/outline-close-24px.svg'
import iconAdd from '../../assets/icons/outline-add-24px.svg'

export default {
	name: 'collection',
	props: ['sheet', 'data'],
	/**
	 * Data-Prop
	 * {string} data.path - full path of collection
	 * {array} [data.callOnMount] - methods that should be called after mount
	 * {string} data.callOnMount.name - method name
	 * {array} data.callOnMount.args - method arguments
	 */
	data: function () {
		let actionButtons = {
			left: [{
				icon: iconClose,
				callback: () => this.sheet.closeSelf(this.sheet)
			}],
			right: [{
				label18: 'action.edit._',
				callback: this.editCollection
			}]
		}
		let searchInput = {
			type: 'text',
			placeholder18: 'label.search',
		}
		return {
			collection: {},
			loading: true,
			config: {
				actionButtons,
				searchInput

			},
			searchQuery: '',
		}
	},
	components: {
		iconAdd,
		Buttons,
		formInput,
		items
	},
	mounted: function() {
		// 1. Loading Collection
		Vue.set(this, 'collection', new Collection(this.data.path, this.$menubar))
		Vue.set(this.collection, 'data', this.collection.data)
		
		// 2. Loading collection file and setting up database
		this.collection.init().then(() => {
			// 3. Updating stats in Collection-Overview
			this._updateInfo(false)

			// 6. We're done with the setup
			this.loading = false

			// 7. Executing additionaly passed methods
			if (this.data.callOnMount) {
				for (var i = 0; i < this.data.callOnMount.length; i++) {
					this[this.data.callOnMount[i].name].apply(this, this.data.callOnMount[i].args)
				}
			}
		}).catch(() => {
			// TODO
		})

		remote.getCurrentWindow().setRepresentedFilename(this.data.path)
	},
	beforeDestroy: function() {
		this.collection.close()
		remote.getCurrentWindow().setRepresentedFilename('')
	},
	methods: {
		/**
		 * Look at Helper-Class
		 */
		getColor: hue => Helpers.getCssGradient(hue),
		/**
		 * Opens 'create-collection'-sheet as child
		 */
		editCollection: function() {
			this.sheet.spawnChild(this.sheet, 'createCollection', {
				title: this.collection.data.title, 
				title_short: this.collection.data.title_short, 
				color: this.collection.data.color,
			})
		},
		/**
		 * Gets called by 'create-collection'-sheet with updated information
		 */
		_editCollection: function(title, title_short, color) {
			this.collection.data.title = title
			this.collection.data.title_short = title_short
			this.collection.data.color = color

			this._updateInfo()
			this.sheet.closeChild(this.sheet)
		},
		/**
		 * Updates Shortcut-Info in Vuex-Store and saves changes to file
		 * @param  {Boolean} [triggerSave=true] - If updated changes should be saved to the file
		 */
		_updateInfo: function(triggerSave=true) {
			if (triggerSave) this.collection.save()
			let info = {
				title: this.collection.data.title,
				title_short: this.collection.data.title_short,
				file: this.data.path,
				color: this.collection.data.color,
				stats: {
					modules: this.collection.data.main_modules.length + this.collection.data.reusable_modules.length,
					terms: this.collection.data.terms.length,
				}
			}
			this.$store.dispatch('Settings/updateDocument', info)
		},
	},
	computed: {
		h1Style: function() {
			if (this.collection.data) return {
				'background-image': this.getColor(parseInt(this.collection.data.color)),
				'-webkit-background-clip': 'text',
				'-webkit-text-fill-color': 'transparent'
			}
			else return {}
		}
	},
}
</script>
