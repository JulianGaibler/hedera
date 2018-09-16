<template>
  <transition-group
	name="expand"
	@enter="enter"
	@after-enter="afterEnter"
	@leave="leave"
	@after-leave="afterLeave"
  >
	<slot/>
  </transition-group>
</template>

<script>
	export default {
	  name: 'horizontal-anim',
	  props: ['callback'],
	  methods: {
		enter(element) {
		  const height = getComputedStyle(element).height;

		  element.style.height = height;
		  element.style.position = 'absolute';
		  element.style.visibility = 'hidden';
		  element.style.width = 'auto';

		  const width = getComputedStyle(element).width;

		  element.style.height = null;
		  element.style.position = null;
		  element.style.visibility = null;
		  element.style.width = 0;

		  setTimeout(() => {
			element.style.width = width;
		  });
		},
		afterEnter(element) {
	    	element.style.width = 'auto';
	    	this.callback();
	    },
	    afterLeave(element) {
	    	this.callback();
	    },
	    leave(element) {
	    	const width = getComputedStyle(element).width;
	      	
	    	element.style.width = width;

	    	setTimeout(() => {
	    		element.style.width = 0;
	    	});
	  },
	}
}
</script>

<style>
	.expand-enter-active,
	.expand-leave-active {
		transition: width .3s cubic-bezier(0.45, 0.05, 0.55, 0.95);
		overflow: hidden;
	}

	.expand-enter,
	.expand-leave-to {
		width: 0;
	}
</style>