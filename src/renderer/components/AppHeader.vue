<template>
	<header>
		<div class="darwin" />
		<div class="menu">
			<div class="container left" />
			<div class="container center">
				<div class="logo"><IconLogo /></div>
			</div>
			<div class="container right">
				<span>TODO</span>
			</div>
		</div>
	</header>
</template>

<script>
import IconLogo from '../assets/logo.svg'

export default {
	name: 'appHeader',
	components: {
		IconLogo
	},
	methods: { }
}
</script>

<style>

</style>
