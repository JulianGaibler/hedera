<template>
	<div id="compFlow">
		<horizontal-anim :callback="animEnded">
			<div v-for="sheet in sheets" :key="sheet.nr" :class="['sheet', (sheet.nr===1)?'first':'child']" :ref="'s'+sheet.nr" :style="{ 'z-index': sheet.nr }">
				<div class="inactive"></div>
				<component :sheet="sheet" :is="sheet.comp"></component>
			</div>
		</horizontal-anim>
	</div>
</template>

<script>
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

import perfectChild from './PerfectChild'
import horizontalAnim from './elements/HorizontalAnim'

export default {
	name: 'comp-flow',
	components: { perfectChild, horizontalAnim },
		data: function () {

			let scrollOptions = {
				container: '#compFlow',
				easing: [0.45, 0.05, 0.55, 0.95],
				offset: -60,
				force: true,
				cancelable: true,
				x: true,
				y: false
			}

			return {
				focus: 0,
				nextFocus: null,
				sheets: [],
				scrollOptions,
		}
	},
	mounted: function () {
		this.spawnNext('perfect-child', {});
	},
	methods: {
		spawnNext: function(comp, data) {
			let len = this.sheets.length;
			this.sheets.splice(len, 0, {
				nr: len+1,
				comp: comp,
				data: data,
				spawnChild: this.spawnChild,
				closeChild: this.closeChild,
				closeSelf: this.closeSelf,
				focusChild: this.focusChild,
				focusParent: this.focusParent,
			})
			this.focus = len+1;
		},
		spawnChild: function(nr, comp, data) {
			let len = this.sheets.length;
			if (len > nr+1) 
				this.closeChild(nr+1);
			if (len > nr) {
				this.sheets[nr+1].data = data;
				Vue.set(sheets[nr+1], 'comp', comp);
			} else {
				this.spawnNext(comp, data);
			}
		},
		closeChild: function(nr) {
			this.sheets.splice(nr)
		},
		closeSelf: function(nr) {
			this.sheets.splice(nr-1)
		},
		focusChild: function(nr) {
			if (this.sheets.length > nr)
				this.focusSheet(nr+1);
		},
		focusParent: function(nr) {
			if (nr > 0)
				this.focusSheet(nr-1);
		},
		focusSheet: function(nr) {
			let time = Math.abs(this.focus - nr)*300;
			this.focus = nr;
			VueScrollTo.scrollTo(this.$refs['s'+nr][0], time, this.scrollOptions);
		},
		animEnded: function() {
			VueScrollTo.scrollTo(this.$refs['s'+this.focus][0], 500, this.scrollOptions);
		}
	}
	}
</script>

<style>

</style>
