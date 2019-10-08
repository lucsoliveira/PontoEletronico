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
    name: "registrosRecentes",
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

    <!--
    <div class="col-lg-6">
        <div class="au-card au-card--no-shadow au-card--no-pad m-b-40">
            <div class="au-card-title" style="background-image:url('/misc/images/bg-title-01.jpg');">
                <div class="bg-overlay bg-overlay--blue"></div>
                <h3>
                    <i class="zmdi zmdi-account-calendar"></i>Minhas Atividades</h3>

                <button 
                class="au-btn-plus"
                data-toggle="modal" 
                data-target="#addActivityModal"
                >
                    <i class="zmdi zmdi-plus"></i>
                </button>


            </div>

            <div class="au-task js-list-load">

                <div class="au-task__title">
                    <p>Cronometre suas atividades para gerar estatísticas</p>
                </div>
            <div class="au-task-list js-scrollbar3">

                <div style="margin:50px;" v-if="!items || items.length == null">
            
                    <center>
                        <h3>Ops! Você ainda não cadastrou atividades :( </h3>
                        <p>Clique no botão verde para adicionar.</p>
                    </center>
                </div>

                
                <item-activity 

                    v-for="item in items" 
                    v-bind:key="item.id" 
                    :id="item.id" 
                    :idUser="idUser"
                    :title="item.titleTask"
                    :color="item.color">
                </item-activity>

            </div> 
            
            </div>
            </div>
        </div>

        list tasks-->
  `,
	data: function () {
		return {
      items: [], 
      timeParaComparar: '',
      
      
		}
	},
  
  created() {
	//get data from API
    this.getActivitiesFromServer();
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

