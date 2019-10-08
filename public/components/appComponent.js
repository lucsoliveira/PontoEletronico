var app = new Vue({
	el: '#app',
	methods: {

		//função para pegar o horário atual
		getTimeNow: function(){
			var currentDate = new Date();
			return currentDate;
		},

		updateComponentData: function() {
			//console.log('updateComponentData', this.$refs)
			this.$refs.cardListActivities.open = true
		  }

	}
})