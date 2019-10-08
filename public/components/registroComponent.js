Vue.component('item-activity', {
    data: function () {
      return {
        count: 0
      }
    },
    props: ['id', 'idUser', 'title','color'],
    methods: {

        playTask : function(event){
            
            app.$refs.focousMode.setData(this.idUser,this.id, this.title);

            //app.$refs.listActivities.forceUpdate();
        }

    },
    template: `
    
    <div v-else :class="'au-task__item au-task__item--' + color">

    <div  class="au-task__item-inner">

    <div class="row">

    <div class="col-9">
        <h5 class="task">
            <a href="#">{{ title }}</a>
        </h5>

        <span class="time">Duração recomendada</span>
        
    </div>
    <!-- Button trigger modal -->

    <div class="col-1">
 
        <button 
        type="button" 
        v-on:click="playTask"
         data-toggle="modal" 
          data-target="#myModal" 
        class="btn btn-success btn-sm buttonsTask open-FocousModeDialog"
        :data-id="id"
        >
        
        <i class="fa fa-play"></i>
        
        </button>

    </div>
    

    <div class="col-1">
 
        <a :href="'/dashboard/task/edit/' + id" >
        <button 
        id="btnPlay"
        type="button" 
        class="btn btn-info btn-sm buttonsTask"
        >

        <i class="fa fa-edit"></i>

        </button>
        </a>
    </div>

</div>
</div>
</div>

    `
})

Vue.component('registros-recentes',{
	props: {
		idUser: Number,
	},
	template:
    `
    <div class="row">
    <!-- column -->
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Registros recentes</h4>
            </div>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="border-top-0">COLABORADOR</th>
                            <th class="border-top-0">REGISTRO</th>
                            <th class="border-top-0">DATA</th>
                            <th class="border-top-0">AÇÃO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            
                            <td class="txt-oflo">Elite admin</td>
                            <td><span class="label label-success label-rounded">Entrada</span> </td>
                            <td class="txt-oflo">April 18, 2017</td>
                            <td><span class="font-medium">$24</span></td>
                        </tr>
                        <tr>
                            
                            <td class="txt-oflo">Real Homes WP Theme</td>
                            <td><span class="label label-info label-rounded">EXTENDED</span></td>
                            <td class="txt-oflo">April 19, 2017</td>
                            <td><span class="font-medium">$1250</span></td>
                        </tr>
                        <tr>
                            
                            <td class="txt-oflo">Ample Admin</td>
                            <td><span class="label label-purple label-rounded">Saída</span></td>
                            <td class="txt-oflo">April 19, 2017</td>
                            <td><span class="font-medium">$1250</span></td>
                        </tr>
                        <tr>
                            
                            <td class="txt-oflo">Medical Pro WP Theme</td>
                            <td><span class="label label-success label-rounded">Sale</span></td>
                            <td class="txt-oflo">April 20, 2017</td>
                            <td><span class="font-medium">-$24</span></td>
                        </tr>
                        <tr>
                            
                            <td class="txt-oflo">Hosting press html</td>
                            <td><span class="label label-success label-rounded">SALE</span></td>
                            <td class="txt-oflo">April 21, 2017</td>
                            <td><span class="font-medium">$24</span></td>
                        </tr>
                        <tr>
                            
                            <td class="txt-oflo">Digital Agency PSD</td>
                            <td><span class="label label-danger label-rounded">Tax</span> </td>
                            <td class="txt-oflo">April 23, 2017</td>
                            <td><span class="font-medium">-$14</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

  `,
	data: function () {
		return {
      items: [], 
      timeParaComparar: '',
      
      
		}
	},
  
  created() {
	//get data from API
    //this.getActivitiesFromServer();
  },

  methods: {
    //id, title, status, userId, createdAt, updatedAt

    getActivitiesFromServer(){
        fetch('/api/task/list?idUser=' + this.idUser)
        .then(response => response.json())
        .then(json => {
  
        this.items = json.tasks; 
        })
    },
    forceUpdate() {
        
      this.getActivitiesFromServer();

      }
    },
})

