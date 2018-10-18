<template>
	<!-- TODO, loading animation -->
	<div class="listMenu">
		<div class="headline flex">
			<h1 :style="h1Style">{{collection.data?collection.data.title_short:'???'}}</h1>
			<h2 class="flexGrow">{{collection.data?collection.data.title:'???'}}</h2>
		</div>
		
		<actionBar :actions="actionButtons" />

		<div>
			<div class="dist hAlign">
				<h3 class="flexGrow">{{ $t('info.modules.main') }}</h3>
				<div @click="collection.createModule(1)"><div class="iconButton"><iconAdd /></div></div>
			</div>
			<ul>
				<li v-for="obj in main_modules"
					:key="obj._id"
				>
					{{obj.title ? obj.title : $t('state.untitled')}}
				</li>
				<div v-if="main_modules.length < 1">
					{{$t('warning.empty.modules')}}
				</div>
			</ul>
			<div class="dist hAlign">
				<h3 class="flexGrow">{{ $t('info.modules.reuseable') }}</h3>
				<div @click="collection.createModule(2)"><div class="iconButton"><iconAdd /></div></div>
			</div>
			<ul>
				<li v-for="obj in reusable_modules"
					:key="obj._id"
				>
					{{obj.title ? obj.title : $t('state.untitled')}}
				</li>
				<div v-if="reusable_modules.length < 1">
					{{$t('warning.empty.modules')}}
				</div>
			</ul>
			<div class="dist hAlign">
				<h3 class="flexGrow">{{ $t('info.terms.reuseable') }}</h3>
				<div @click="collection.createTerm()"><div class="iconButton"><iconAdd /></div></div>
			</div>
			<ul>
				<li v-for="obj in reuseable_terms"
					:key="obj._id"
					@click="_openTerm(obj._id)"
				>
					{{obj.title ? obj.title : $t('state.untitled')}}
				</li>

				<div v-if="reuseable_terms.length < 1">
					{{$t('warning.empty.terms')}}
				</div>
			</ul>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'

import actionBar from './elements/ActionBar'

import Collection from '../classes/Collection'
import Helpers from '../classes/Helpers'
import { remote } from 'electron'

import iconClose from '../assets/icons/outline-close-24px.svg'
import iconEdit from '../assets/icons/outline-edit-24px.svg'
import iconAdd from '../assets/icons/outline-add-24px.svg'

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
		let actionButtons = {
			left: [{
				icon: iconClose,
				callback: () => this.sheet.closeSelf(this.sheet)
			}],
			right: [{
				label: this.$t('action.edit._'),
				callback: this.editCollection
			}]
		}
		return {
			collection: {},
			loading: true,

			actionButtons,

			main_modules: [],
			reusable_modules: [],
			reuseable_terms: [],
		}
	},
	components: {
		iconAdd,
		actionBar
	},
	mounted: function() {
		// 1. Loading Collection
		Vue.set(this, 'collection', new Collection(this.data.path, this.$menubar))
		
		// 2. Loading collection file and setting up database
		this.collection.init().then(() => {
			// 3. Updating stats in Collection-Overview
			this._updateInfo()

			// 4. Fetching existing modules
			this.updateModules()
			this.updateTerms()

			// 5. subscribing to changes in db
			this.collection.events.subscribe('modules', (changes) => {
				this.updateModules(changes)
			})
			this.collection.events.subscribe('terms', (changes) => {
				this.updateTerms(changes)
			})

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
		_openTerm: function(_id) {
		},
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
		},
		updateModules: function() {
			this.collection.db.modules.where('dependency_type').equals(1).toArray().then(array => {
				this.main_modules = array
			})
			this.collection.db.modules.where('dependency_type').equals(2).toArray().then(array => {
				this.reusable_modules = array
			})

		},
		updateTerms: function() {
			this.collection.db.terms.toArray().then(array => {
				this.reuseable_terms = array
			})
		},
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
