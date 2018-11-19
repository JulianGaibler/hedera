<template>
	<div>
		<div>Main Module</div>
		<hr>
	</div>
</template>

<script>

export default {
	name: 'module',
	props: ['sheet', 'data'],
	/**
	 * Data-Prop
	 * {string} data.path - full path of collection
	 * {array} [data.callOnMount] - methods that should be called after mount
	 * {string} data.callOnMount.name - method name
	 * {array} data.callOnMount.args - method arguments
	 */
	data: function () {
		return {

		}
	},
	components: { },
	methods: { }
}
</script>
