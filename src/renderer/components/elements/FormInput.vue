<template>
	<div :class="['textBox', config.error?'error':'', disabled?'disabled':'']">
		<div class="horizontalFlex">
			<label v-if="config.label">{{config.label}}</label>
			<label v-else-if="config.label18">{{$t(config.label18)}}</label>
			<input :value="value"
				@input="$emit('input', $event.target.value)"
				:type="config.type"
				:disabled="disabled"
				:min="config.min"
				:max="config.max"
				:step="config.step"
				:placeholder="config.placeholder?config.placeholder:$t(config.placeholder18)"
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
		<div v-if="config.error">{{config.error.info ? config.error.info : $t(config.error.info18)}}</div>
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
	 * {string}  config.label - Label of Input (label18 to use i18n plugin)
	 * {string}  config.type - type of input
	 * {string} [config.placeholder] - text-placeholder (placeholder18 to use i18n plugin)
	 * {number} [config.min] - slider-min
	 * {number} [config.max] - slider-max
	 * {number} [config.step] - slider-step
	 * {object} [config.error] - input turns red and shows error message if not undefined
	 * {string}  config.error.info - error message (info18 to use i18n plugin)
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