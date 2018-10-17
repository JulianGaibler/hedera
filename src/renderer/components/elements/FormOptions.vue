<template>
	<div class="itemList">
		<div v-for="option in config.options" :key="option.value" class="item">
			<label :for="option.value">
				<input :type="config.type"
					:id="option.value"
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
	 * {string} config.type - checkbox or radio
	 * {array} config.options - array of options
	 * {string} config.options.label - label of one option
	 * {(number|string)} config.options.value - value of one option
	 */
	props: [ 'value', 'config' ],
	data () {
		return {
			selectedOptions: this.value
		}
	},
	methods: {
		onChange: function() {
			this.$emit('input', this.selectedOptions)
		}
	}
}
</script>