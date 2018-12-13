<template>
	<div>
		<div v-if="moduleData" class="listMenu">
			<div class="sheetHeader">Main Module</div>
			<hr>

			<div class="dist module">
				<h3>{{moduleData.sortkey}}</h3>
				<h2>{{moduleData.title}}</h2>
				<p>{{moduleData.desc}}</p>
			</div>

			<buttons class="actionBar" :actions="config.actionButtons" />

			<div class="dist">
				<div class="moduleItem">
					<div class="icon"><typeBool /></div>
					<div class="info">
						<div class="top">Vermögensschaden</div>
						<div class="bottom">Jedes Handeln, Dulden oder Unterlassen, das sich unmittelbar vermögensmindernd für Arnold auswirkt.</div>
					</div>
				</div>
			</div>
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
			moduleData: undefined,
			config: {
				actionButtons,
			},
		}
	},
	components: {
		Buttons,
		typeBool,
	},
	mounted: function() {
		this.updateModule()

		this.data.collection.events.subscribe('modules', this.updateModule)
	},
	methods: {
		updateModule: function() {
			this.data.collection.db.modules.get(this.data._id).then(res => {
				this.moduleData = res
			})
		},
	}
}
</script>
