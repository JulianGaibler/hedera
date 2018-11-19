<template>
	<transition name="modal">
		<div class="modal">
			<div>
				<div class="up">
					<h1>{{data.title ? data.title : $t(data.title18)}}</h1>
					<p>{{data.desc ? data.desc : $t(data.desc18)}}</p>
				</div>
				<hr>
				<buttons class="down" :actions="data.actions" @clicked="$emit('pop')" />
			</div>
		</div>
	</transition>
</template>

<script>
import Buttons from './Buttons'

export default {
	name: 'modal',
	/**
	 * Data-Props
	 * {array} title - title of modal (title18 to use i18n-plugin)
	 * {array} desc - description of modal (desc18 to use i18n-plugin)
	 * {array} actions - actions (see elements/Buttons.vue)
	 */
	props: [ 'data' ],
	components: {
		Buttons
	},
	data () {
		return {
			
		}
	},
	methods: { }
}

</script>