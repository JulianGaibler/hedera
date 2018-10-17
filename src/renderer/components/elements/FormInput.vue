<template>
	<div :class="['textBox', config.error?'error':'']">
		<div>
			<div><label>{{config.label}}</label><span v-if="config.error">{{config.error.info}}</span></div>
			<input :value="value" @input="$emit('input', $event.target.value)" :type="config.type" :min="config.min" :max="config.max" :step="config.step" :placeholder="config.placeholder">
		</div>
		<div v-if="config.button">
			<div @click="config.button.callback">
				<component :is="config.button.src" />
			</div>
		</div>
		<div v-else-if="this.$slots.default">
			<slot />
		</div>
	</div>
</template>

<script>

export default {
	name: 'formInput',
	/**
	 * Data-Props
	 * {string}  value - this will get propagated back to the parent
	 *
	 * {string}  config.label - Label of Input
	 * {string}  config.type - type of input
	 * {string} [config.placeholder] - text-placeholder
	 * {number} [config.min] - slider-min
	 * {number} [config.max] - slider-max
	 * {number} [config.step] - slider-step
	 * {object} [config.error] - input turns red and shows error message if not undefined
	 * {string}  config.error.info - error message
	 * {object} [config.button] - shows button if not undefined
	 * {string}  config.button.callback - function to be called when clicked
	 * {svg}     config.button.src - svg-icon
	 */
	props: [ 'value', 'config' ],
	data () {
		return {
			
		}
	},
	methods: { }
}
</script>