<!DOCTYPE html>
<html lang="pt-br">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

      <link href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' rel='stylesheet'>

      <link rel="stylesheet" href="css/custom.css">
      <title>Agenda</title>
  </head>
  <body>

    <div class="container">

      <h2 class="mb-4">Agenda</h2>

      <span id="msg"></span>

      <div id='calendar'></div>

    </div>

    <!-- Modal Visualizar -->
    <div class="modal fade" id="visualizarModal" tabindex="-1" aria-labelledby="visualizarModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="visualizarModalLabel">Detalhes do Evento</h1>
            <h1 class="modal-title fs-5" id="editarModalLabel" style="display: none;">Editar o Evento</h1>

            <!-- lembrar de ajeitar o botão de close para fazer o mesmo que cancelar -->
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

          </div>
          <div class="modal-body">

            <span id="msgViewEvento"></span>

            <div id="visualizarEvento">
              <dl class="row">

                  <dt class="col-sm-3">ID: </dt>
                  <dd class="col-sm-9" id="visualizar_id"></dd>

                  <dt class="col-sm-3">Título: </dt>
                  <dd class="col-sm-9" id="visualizar_title"></dd>
                  
                  <dt class="col-sm-3">Observação: </dt>
                  <dd class="col-sm-9" id="visualizar_obs"></dd>

                  <dt class="col-sm-3">Início: </dt>
                  <dd class="col-sm-9" id="visualizar_start"></dd>

                  <dt class="col-sm-3">Fim: </dt>
                  <dd class="col-sm-9" id="visualizar_end"></dd>

              </dl>

              <button type="button" class="btn btn-warning" id="btnViewEditEvento">Editar</button>

              <button type="button" class="btn btn-danger" id="btnApagarEvento">Apagar</button>
            </div>

          <!-- Modal editar evento -->
            <div id="editarEvento" style="display: none;">

              <span id="msgEditEvento"></span>

                <form method="POST" id="formEditEvento">
                  <input type="hidden" name="edit_id" id="edit_id">

                    <div class="row mb-3">
                      <label for="edit_title" class="col-sm-2 col-form-label">Título</label>
                      <div class="col-sm-10">
                        <input type="text" name="edit_title" class="form-control" id="edit_title" placeholder="Título do evento" required>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label for="edit_obs" class="col-sm-2 col-form-label">Observação</label>
                      <div class="col-sm-10">
                        <input type="text" name="edit_obs" class="form-control" id="edit_obs" placeholder="Observação sobre o evento">
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label for="edit_end" class="col-sm-2 col-form-label">Início</label>
                      <div class="col-sm-10">
                        <input type="datetime-local" name="edit_start" class="form-control" id="edit_start">
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label for="edit_end" class="col-sm-2 col-form-label">Fim</label>
                      <div class="col-sm-10">
                        <input type="datetime-local" name="edit_end" class="form-control" id="edit_end">
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label for="edit_color" class="col-sm-2 col-form-label">Cor</label>
                      <div class="col-sm-10">
                          <select name="edit_color" id="edit_color" class="form-control">
                                <option value="">- Selecione -</option>
                                <option style="color:#FFD700;" value="#FFD700">Amarelo</option>
                                <option style="color:#0071c5;" value="#0071c5">Azul Turquesa</option>
                                <option style="color:#FF4500;" value="#FF4500">Laranja</option>
                                <option style="color:#8B4513;" value="#8B4513">Marrom</option>
                                <option style="color:#1C1C1C;" value="#1C1C1C">Preto</option>
                                <option style="color:#436EEE;" value="#436EEE">Royal Blue</option>
                                <option style="color:#A020F0;" value="#A020F0">Roxo</option>
                                <option style="color:#40E0D0;" value="#40E0D0">Turquesa</option>
                                <option style="color:#228B22;" value="#228B22">Verde</option>
                                <option style="color:#8B0000;" value="#8B0000">Vermelho</option>
                          </select> 
                      </div>
                    </div>

                    <button type="button" name="btnViewEvento" class="btn btn-primary" id="btnViewEvento">Cancelar</button>

                    <button type="submit" name="btnEditEvento" class="btn btn-warning" id="btnEditEvento">Salvar</button>
                  </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Cadastrar -->
    <div class="modal fade" id="cadastrarModal" tabindex="-1" aria-labelledby="cadastrarModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="cadastrarModalLabel">Cadastrar o Evento</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

              <span id="msgCadEvento"></span>

              <!-- Formulário Cadastrar -->
              <form method="POST" id="formCadEvento">
                <div class="row mb-3">
                  <label for="cad_title" class="col-sm-2 col-form-label">Título</label>
                  <div class="col-sm-10">
                    <input type="text" name="cad_title" class="form-control" id="cad_title" placeholder="Título do evento" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="cad_obs" class="col-sm-2 col-form-label">Observação</label>
                  <div class="col-sm-10">
                    <input type="text" name="cad_obs" class="form-control" id="cad_obs" placeholder="Observação sobre o evento">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="cad_end" class="col-sm-2 col-form-label">Início</label>
                  <div class="col-sm-10">
                    <input type="datetime-local" name="cad_start" class="form-control" id="cad_start">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="cad_end" class="col-sm-2 col-form-label">Fim</label>
                  <div class="col-sm-10">
                    <input type="datetime-local" name="cad_end" class="form-control" id="cad_end">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="cad_color" class="col-sm-2 col-form-label">Cor</label>
                  <div class="col-sm-10">
                      <select name="cad_color" id="cad_color" class="form-control">
                            <option value="">- Selecione -</option>
                            <option style="color:#FFD700;" value="#FFD700">Amarelo</option>
                            <option style="color:#0071c5;" value="#0071c5">Azul Turquesa</option>
                            <option style="color:#FF4500;" value="#FF4500">Laranja</option>
                            <option style="color:#8B4513;" value="#8B4513">Marrom</option>
                            <option style="color:#1C1C1C;" value="#1C1C1C">Preto</option>
                            <option style="color:#436EEE;" value="#436EEE">Royal Blue</option>
                            <option style="color:#A020F0;" value="#A020F0">Roxo</option>
                            <option style="color:#40E0D0;" value="#40E0D0">Turquesa</option>
                            <option style="color:#228B22;" value="#228B22">Verde</option>
                            <option style="color:#8B0000;" value="#8B0000">Vermelho</option>
                      </select> 
                  </div>
                </div>
                <button type="submit" name="btnCadEvento" class="btn btn-success" id="btnCadEvento">Cadastrar</button>
              </form>        
          </div>
        </div>
      </div>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src='js/index.global.min.js'></script>
    <script src="js/bootstrap5/index.global.min.js"></script>
    <script src="js/core/locales-all.global.min.js"></script>
    <script src="js/custom.js"></script>

  </body>
</html>