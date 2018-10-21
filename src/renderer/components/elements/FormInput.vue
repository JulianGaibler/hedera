<template>
	<div :class="['textBox', config.error?'error':'', disabled?'disabled':'']">
		<div class="horizontalFlex">
			<label>{{config.label}}</label>
			<input :value="value"
				@input="$emit('input', $event.target.value)"
				:type="config.type"
				:disabled="disabled"
				:min="config.min"
				:max="config.max"
				:step="config.step"
				:placeholder="config.placeholder"
			>
			<div v-if="config.button" class="button">
				<button :disabled="disabled" @click="config.button.callback">
					<component :is="config.button.src" />
				</button>
			</div>
			<div v-else-if="this.$slots.default">
				<slot />
			</div>
		</div>
		<div v-if="config.error">{{config.error.info}}</div>
	</div>
</template>

<script>

export default {
	name: 'formInput',
	/**
	 * Data-Props
	 * {string}  value - this will get propagated back to the parent
	 *
	 * {boolean} disabled - if disabled
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
	props: [ 'value', 'config', 'disabled' ],
	data () {
		return {
			
		}
	},
	methods: { }
}
</script>