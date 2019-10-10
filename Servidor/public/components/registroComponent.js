Vue.component('registro-item', {
    data: function () {
      return {
        count: 0,
        colaboradorDados: [],
        naoExisteColaborador: false
      }
    },

    /*

                            :id="item.id" 
                        :colaboradorId="item.colaboradorId"
                        :tipo="item.tipo"
                        :createdAt="item.createdAt"

                        */
    props: ['id', 'colaboradorId', 'tipo','createdAt'],
    created() {
        //get data from API
        this.getDadosColaboradorDoServidor();
    },
    methods: {


        getDadosColaboradorDoServidor(){
            fetch('api/get/colaborador/' + this.colaboradorId)
            .then(response => response.json())
            .then(res => {
      
                if(res.type == 'success'){
        
                    this.colaboradorDados = res.data;//salva os dados em forma de lista em items

                }
        
                if(res.type == 'error'){
        
                    this.naoExisteRegistros = true;
                }
            })
        },

    },
    template: `
    <tr>
                           
    <td class="txt-oflo">#{{ id }}</td> 
    <td class="txt-oflo">{{ colaboradorDados.id }} - {{ colaboradorDados.nomeCompleto }}</td>

    <td>
    <span v-if="tipo == 1" class="label label-success label-rounded">ENTRADA</span> 
    <span v-else class="label label-purple label-rounded">SAÍDA</span> 
    
    </td>
    <td class="txt-oflo">{{ createdAt }}</td>
    <td>
        
        <button alt="Dados do colaborador"  title="Dados do colaborador" type="button" class="btn btn-info btn-md">
        <i class="mdi mdi-face"></i>
        </button>

        <button alt="Re-enviar comprovante"  title="Re-enviar comprovante" type="button" class="btn btn-warning btn-md" data-toggle="modal" data-target="#myModal">
        <i class="mdi mdi-email"></i>
        </button>
    
    </td>
    </tr>

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
                        <th class="border-top-0">REGISTRO</th>
                            <th class="border-top-0">COLABORADOR</th>
                            <th class="border-top-0">REGISTRO</th>
                            <th class="border-top-0">DATA</th>
                            <th class="border-top-0">AÇÃO</th>
                        </tr>
                    </thead>
                    <tbody>

                        <!--item registro-->
                        <registro-item

                        v-for="item in items" 
                        v-bind:key="item.id" 
                        :id="item.id" 
                        :colaboradorId="item.colaboradorId"
                        :tipo="item.tipo"
                        :createdAt="item.createdAt">
                         </registro-item>

                        <!--fim item registro-->

                       
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
      dadosColaborador: [],
      timeParaComparar: '',
      naoExisteRegistros: false
      
      
		}
	},
  
  created() {
	//get data from API
    this.getRegistrosDoServidor();
  },

  methods: {
    

    getRegistrosDoServidor(){

        fetch('api/get/registro/recentes?limit=10')
        .then(response => response.json())
        .then(res => {
  
        if(res.type == 'success'){

            this.items = res.data;//salva os dados em forma de lista em items
        }

        if(res.type == 'error'){

            this.naoExisteRegistros = true;
        }

        })

    },
    forceUpdate() {
        
      this.getRegistrosDoServidor();

      }
    },
})

