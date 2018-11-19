<template>
	<div>
		<div class="dist form">
			<div class="hflex">
				<h3 class="grow">{{ $t('info.modules.main') }}</h3>
				<div @click="collection.createModule(1)"><div class="iconButton"><iconAdd /></div></div>
			</div>
			<ul>
				<li v-for="obj in main_modules"
					:key="obj._id"
					@click="_openModule(obj._id)"
				>
					{{obj.title ? obj.title : $t('state.untitled')}}
				</li>
				<div v-if="main_modules.length < 1">
					{{$t('warning.empty.modules')}}
				</div>
			</ul>
		</div>

		<div class="dist form">
			<div class="hflex">
				<h3 class="grow">{{ $t('info.modules.reuseable') }}</h3>
				<div @click="collection.createModule(2)"><div class="iconButton"><iconAdd /></div></div>
			</div>
			<ul>
				<li v-for="obj in reusable_modules"
					:key="obj._id"
					@click="_openModule(obj._id)"
				>
					{{obj.title ? obj.title : $t('state.untitled')}}
				</li>
				<div v-if="reusable_modules.length < 1">
					{{$t('warning.empty.modules')}}
				</div>
			</ul>
		</div>

		<div class="dist form">
			<div class="hflex">
				<h3 class="grow">{{ $t('info.terms.reuseable') }}</h3>
				<div @click="collection.createTerm()"><div class="iconButton"><iconAdd /></div></div>
			</div>
			<ul>
				<li v-for="obj in reuseable_terms"
					:key="obj._id"
					@click="_openTerm(obj._id)"
				>
					{{obj.title ? obj.title : $t('state.untitled')}}
				</li>
		
				<div v-if="reuseable_terms.length < 1">
					{{$t('warning.empty.terms')}}
				</div>
			</ul>
		</div>
	</div>
</template>

<script>
import iconAdd from '../../../assets/icons/outline-add-24px.svg'

export default {
	name: 'items',
	props: ['collection'],
	/**
	 * Data-Prop
	 * {string} data.path - full path of collection
	 * {array} [data.callOnMount] - methods that should be called after mount
	 * {string} data.callOnMount.name - method name
	 * {array} data.callOnMount.args - method arguments
	 */
	data: function () {
		return {
			main_modules: [],
			reusable_modules: [],
			reuseable_terms: [],
		}
	},
	components: {
		iconAdd
	},
	mounted: function() {
		this.updateModules()
		this.updateTerms()

		this.collection.events.subscribe('modules', this.updateModules)
		this.collection.events.subscribe('terms', this.updateTerms)
	},
	beforeDestroy: function() {
		this.collection.events.unsubscribe('modules', this.updateModules)
		this.collection.events.unsubscribe('terms', this.updateTerms)
	},
	methods: {
		_openModule: function(_id) {
			this.$emit('openModule', _id)
		},
		_openTerm: function(_id) {
			this.$emit('openTerm', _id)
		},
		updateModules: function() {
			this.collection.db.modules.where('dependency_type').equals(1).toArray().then(array => {
				this.main_modules = array
			})
			this.collection.db.modules.where('dependency_type').equals(2).toArray().then(array => {
				this.reusable_modules = array
			})

		},
		updateTerms: function() {
			this.collection.db.terms.toArray().then(array => {
				this.reuseable_terms = array
			})
		},
	}
}
</script>
