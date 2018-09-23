<template>
	<div id="compFlow">
		<horizontal-anim :callback="_animEnded">
			<div
				v-for="sheet in sheets"
				:key="sheet.nr"
				:class="['sheet', (sheet.nr===0)?'first':'child']"
				:ref="'s'+sheet.nr"
				:style="{ 'z-index': sheet.nr }"
			>
				<component :sheet="sheet" :ref="'c'+sheet.nr" :is="sheet.comp" :data="sheet.data" @compFlow="sheetCall($event)"></component>
			</div>
		</horizontal-anim>
	</div>
</template>

<script>
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

import horizontalAnim from './elements/HorizontalAnim'
import perfectChild from './PerfectChild'
import collectionOverview from './CollectionOverview'
import collectionIndex from './CollectionIndex'
import createCollection from './CreateCollection'

export default {
	name: 'comp-flow',
	components: {
		horizontalAnim,

		perfectChild,
		collectionOverview,
		createCollection,
		collectionIndex
	},
	data: function () {
		// Settings for Vue-ScrollTo
		let scrollOptions = {
			container: '#compFlow',
			easing: [0.45, 0.05, 0.55, 0.95],
			offset: -60,
			force: true,
			cancelable: true,
			x: true,
			y: false,
		}

		return {
			focus: 0,
			nextFocus: null,
			sheets: [],
			scrollOptions,
		}
	},
	mounted: function () {
		this._spawnNext('collection-overview', {});
		//this.spawnNext('collection-index', { path:'/Users/Julian/Documents/StGB.ivy' });
	},
	methods: {
		/**
		 * Appends component as last child
		 * @param {string} comp - name of component to be opened
		 * @param {object} data - data to give to the child
		 */
		_spawnNext: function(comp, data) {
			let len = this.sheets.length;
			this.sheets.splice(len, 0, {
				nr: len,
				comp: comp,
				data: data,
				get: this.getSheet,
				spawnChild: this.spawnChild,
				closeChild: this.closeChild,
				closeSelf: this.closeSelf,
				focusChild: this.focusChild,
				focusParent: this.focusParent,
			})
			this.focus = len;
		},
		/**
		 * Closes all existing children and created new one
		 * @param {object} sheet - sheet that wants to create child
		 * @param {string} comp - name of component to be opened
		 * @param {object} data - data to give to the child
		 */
		spawnChild: function(sheet, comp, data) {
			let len = this.sheets.length;
			if (len > sheet.nr+1) this.closeChild(sheet);
			Vue.nextTick(() => {
				this._spawnNext(comp, data);
			});
		},
		/**
		 * @param {number} sheet-nr
	 	 * @returns {object} Vue-Instance of sheet
		 */
		getSheet: function(nr) {
			if (this.$refs['c'+nr]) 
				return this.$refs['c'+nr][0];
			else
				return undefined;
		},
		/**
		 * Closes given sheets child and all of it's children
		 * @param {object} sheet-object of the callee
		 */
		closeChild: function(sheet) {
			this.sheets.splice(sheet.nr+1)
		},
		/**
		 * Closes given sheet and all children
		 * @param {object} sheet-object of the callee
		 */
		closeSelf: function(sheet) {
			this.sheets.splice(sheet.nr)
		},
		/**
		 * Focus and scroll to child of sheet
		 * @param {object} sheet-object of the callee
		 */
		focusChild: function(sheet) {
			if (this.sheets.length > sheet.nr)
				this.focusSheet(sheet.nr+1);
		},
		/**
		 * Focus and scroll to parent of sheet
		 * @param {number} nr - sheet-nr to scroll to
		 */
		focusParent: function(sheet) {
			if (sheet.nr > 0)
				this.focusSheet(sheet.nr-1);
		},
		/**
		 * Focus and scroll to sheet
		 * @param {number} nr - sheet-nr to scroll to
		 */
		focusSheet: function(nr) {
			let time = Math.abs(this.focus - nr)*300;
			this.focus = nr;
			if (this.sheets.length > 1) VueScrollTo.scrollTo(this.$refs['s'+nr][0], time, this.scrollOptions);
		},
		/**
		 * Callback for when horizontal-animation is finished
		 */
		_animEnded: function() {
			if (this.sheets.length > 1)
				VueScrollTo.scrollTo(this.$refs['s'+this.focus][0], 500, this.scrollOptions);
		}
	}
}
</script>

<style>

</style>
