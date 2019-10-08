Vue.component('colaborador-modal', {
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

                    console.log(this.colaboradorDados.nomeCompleto)
                }
        
                if(res.type == 'error'){
        
                    this.naoExisteRegistros = true;
                }
            })
        },

    },
    template: `

    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog">
          
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Modal Header</h4>
              </div>
              <div class="modal-body">
                <p>Some text in the modal.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
            
          </div>
        </div>
    

    `
})