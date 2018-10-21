<template>
	<div :class="['itemList', disabled?'disabled':'']">
		<div v-for="option in config.options" :key="option.value" class="item">
			<label :for="option.value">
				<input :type="config.type"
					:id="option.value"
					:disabled="disabled"
					:value="option.value"
					v-model="selectedOptions"
					@change="onChange"
				>
				{{option.label}}
			</label>
		</div>
	</div>
</template>

<script>

export default {
	name: 'formInput',
	/**
	 * Data-Props
	 * {string} value - this will get propagated back to the parent
	 *
	 * {boolean} disabled - if disabled
	 * 
	 * {string} config.type - checkbox or radio
	 * {array} config.options - array of options
	 * {string} config.options.label - label of one option
	 * {(number|string)} config.options.value - value of one option
	 */
	props: [ 'value', 'config', 'disabled' ],
	data () {
		return {
			selectedOptions: this.value
		}
	},
	watch: {
		value: function(value) {
			this.selectedOptions = value
		}
	},
	methods: {
		onChange: function() {
			this.$emit('input', this.selectedOptions)
		}
	}
}
</script>