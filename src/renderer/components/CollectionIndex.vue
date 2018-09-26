<template>
	<div class="listMenu">
		<div class="dist spacer hAlign">
			<h1 :style="h1Style">{{collection.data?collection.data.title_short:'???'}}</h1>
			<h2 class="flexGrow">{{collection.data?collection.data.title:'???'}}</h2>
			<div @click="editCollection()"><vector class="iconButton" src="~@/assets/icons/outline-edit-24px.svg" /></div>
		</div>
		<hr class="spacer">
		<div>
			<div class="dist hAlign">
				<h3 class="flexGrow">{{ $t('info.modules.main') }}</h3>
				<div @click="collection.createModule(1)"><vector class="iconButton" src="~@/assets/icons/outline-add-24px.svg" /></div>
			</div>
			<ul>
				<li>Dancing in a Room</li>
				<li>River</li>
				<li>Talk to Me</li>
			</ul>
			<div class="dist hAlign">
				<h3 class="flexGrow">{{ $t('info.modules.reuseable') }}</h3>
				<div @click="editCollection()"><vector class="iconButton" src="~@/assets/icons/outline-add-24px.svg" /></div>
			</div>
			<ul>
				<li>Los Angeles</li>
				<li>Das ist Berlin</li>
				<li>Hillside Boys</li>
			</ul>
			<div class="dist hAlign">
				<h3 class="flexGrow">{{ $t('info.terms.reuseable') }}</h3>
				<div @click="editCollection()"><vector class="iconButton" src="~@/assets/icons/outline-add-24px.svg" /></div>
			</div>
			<ul>
				<li>You Don't Know Me</li>
				<li>This Body</li>
				<li>Nothing burns like the Cold</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Collection from '../classes/Collection'
import Helpers from '../classes/Helpers'
import { remote } from 'electron'

export default {
	name: 'collectionIndex',
	props: ['sheet', 'data'],
	/**
	 * Data-Prop
	 * {string} data.path - full path of collection
	 * {array} [data.callOnMount] - methods that should be called after mount
	 * {string} data.callOnMount.name - method name
	 * {array} data.callOnMount.args - method arguments
	 */
	data: function () {
		return {
			collection: {}
		}
	},
	components: { },
	mounted: function() {
		this.collection = {}
		try {
			Vue.set(this, 'collection', new Collection(this.data.path))
			this._updateInfo()

			if (this.data.callOnMount) {
				for (var i = 0; i < this.data.callOnMount.length; i++) {
					this[this.data.callOnMount[i].name].apply(this, this.data.callOnMount[i].args)
				}
			}

		} catch (err) {
			//TODO
		}
		remote.getCurrentWindow().setRepresentedFilename(this.data.path)
	},
	beforeDestroy: function() {
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
		 */
		_updateInfo: function() {
			this.collection.save()
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
		}
	},
	computed: {
		h1Style: function() {
			if (this.collection.data) return {
				background: this.getColor(parseInt(this.collection.data.color)),
				'-webkit-background-clip': 'text',
				'-webkit-text-fill-color': 'transparent'
			}
			else return {}
		}
	},
}
</script>

<style>

</style>
