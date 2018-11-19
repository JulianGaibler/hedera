<template>
	<div>
		<div v-for="pos in sides" :key="pos" :class="['bar', pos]">
			<div
				v-for="(item, index) in actions[pos]" 
				:key="index"
				@click="clickButton(item.callback)"
				:class="'roundButton '+item.class"
			>
				<component v-if="item.icon" :is="item.icon" />
				<span v-else-if="item.label">{{item.label}}</span>
				<span v-else-if="item.label18">{{$t(item.label18)}}</span>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'buttons',
	/**
	 * Data-Props
	 * {array} actions.left - buttons to be placed on the left
	 * {array} actions.right - buttons to be placed on the right
	 *
	 * {string} [actions.(left/right).label] - button text
	 * {string} [actions.(left/right).class] - extra button css-classes
	 * {svg} [actions.(left/right).icon] - button icon
	 * {function} actions.(left/right).callback - callback when clicked
	 */
	props: [ 'actions' ],
	data () {
		return {
			
		}
	},
	methods: {
		clickButton: function(method) {
			this.$emit('clicked')
			method()
		}
	},
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