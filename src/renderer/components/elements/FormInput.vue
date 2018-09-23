<template>
<div :class="['textBox', config.error?'error':'']">
	<div>
		<div><label>{{config.label}}</label><span v-if="config.error">{{config.error.info}}</span></div>
		<input :value="value" @input="$emit('input', $event.target.value)" :type="config.type" :min="config.min" :max="config.max" :step="config.step" :placeholder="config.placeholder">
	</div>
	<div v-if="config.button">
		<div v-once v-html="config.button.src" @click="config.button.callback"></div>
	</div>
	<div v-else-if="this.$slots.default">
		<slot></slot>
	</div>
</div>
</template>

<script>

export default {
	name: 'form-input',
	props: [ 'value', 'config' ],
	data () {
		return {
			
		}
	},
	methods: { }
}
</script>