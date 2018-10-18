<template>
	<div class="actionBar">
		<div v-for="pos in sides" :key="pos" :class="pos">
			<div
				v-for="(item, index) in actions[pos]" 
				:key="index"
				@click="item.callback"
				class="btn"
			>
				<component v-if="item.icon" :is="item.icon" />
				<span v-else-if="item.label">{{item.label}}</span>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'actionBar',
	/**
	 * Data-Props
	 * {array} actions.left - buttons to be placed on the left
	 * {array} actions.right - buttons to be placed on the right
	 *
	 * {string} [actions.(left/right).label] - button text
	 * {svg} [actions.(left/right).icon] - button icon
	 * {function} actions.(left/right).callback - callback when clicked
	 */
	props: [ 'actions' ],
	data () {
		return {
			
		}
	},
	methods: { },
	computed: {
		sides: function() {
			let sides = []
			if (this.actions.left) sides.push('left')
			if (this.actions.right) sides.push('right')
			return sides
		}
	}
}

</script>