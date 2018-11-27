<template>
	<div>
		<div class="listMenu">
			<div class="sheetHeader">Main Module</div>
			<hr>

			<div class="dist module">
				<h3>§35b</h3>
				<h2>Brandstiftung in Internationalen Gewässern</h2>
				<p>Einwirkung auf die strukturelle Integrität eines Gebäudes durch Feuer in tiefen Gewässern oder luftleeren Räumen welche keinem Staatsgebiet zugeordet sind sofern Arnold keinen Impliziten Anspruch auf sie hat.</p>
			</div>

			<buttons class="actionBar" :actions="config.actionButtons" />
		</div>
	</div>
</template>

<script>
import Buttons from '../../elements/Buttons'

import iconClose from '../../../assets/icons/outline-close-24px.svg'
import typeAnd from '../../../assets/icons/type_and.svg'
import typeBool from '../../../assets/icons/type_bool.svg'
import typeExclusive from '../../../assets/icons/type_exclusive.svg'

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
		let actionButtons = {
			left: [{
				icon: iconClose,
				callback: () => this.sheet.closeSelf(this.sheet)
			}],
			right: [
				{
					icon: typeAnd,
					class: 'selected',
					callback: () => {}
				},
				{
					icon: typeBool,
					callback: () => {}
				},
				{
					icon: typeExclusive,
					callback: () => {}
				},
			]
		}
		return {
			config: {
				actionButtons,
			},
		}
	},
	components: {
		Buttons
	},
	methods: { }
}
</script>
