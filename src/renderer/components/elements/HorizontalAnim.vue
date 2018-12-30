<template>
	<transition-group name="expand">
		<slot />
	</transition-group>
</template>

<script>
export default {
	name: 'horizontalAnim',
}
</script>

<style>
	.expand-enter-active,
	.expand-leave-active {
		transition: transform .6s cubic-bezier(0.45, 0.05, 0.55, 0.95);
		
	}

	.expand-enter,
	.expand-leave-to {
		transform: translate(30vw);
	}
</style>