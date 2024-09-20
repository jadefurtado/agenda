// Executar quando o documento HTML for completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
  // Receber o seletor 'calendar' do atributo id
  var calendarEl = document.getElementById('calendar');

  // receber o seletor da janela modal
  const cadastrarModal = new bootstrap.Modal(document.getElementById("cadastrarModal"));

  // receber o seletor da janela modal
  const visualizarModal = new bootstrap.Modal(document.getElementById("visualizarModal"));

  // receber o seletor msgViewEvento
  const msgViewEvento = document.getElementById('msgViewEvento');

  // Instanciar FullCalendar.Calendar e atribuir a variável calendar
  var calendar = new FullCalendar.Calendar(calendarEl, {
    // incluindo o bootstrap5
    themeSystem: 'bootstrap5',
    // Cria o cabeçalho do calendário
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    // Traduz para o português
    locale: 'pt-br',
    // Permite clicar nos nomes dos dias da semana
    navLinks: true, 
    // Permite clicar e arrastar o mouse sobre um ou vários dias no calendário
    selectable: true,
    // Indicar visualmente a área que será selecionada antes que o usuário solte o botão do mouse para confirmar a seleção
    selectMirror: true,
    // Permite arrastar e redimensionar os eventos diretamente no calendário
    editable: true,
    // Número máximo de eventos em um determinado dia, se for true, o número de eventos será limitado à altura da célula do dia
    dayMaxEvents: true, 
    // chamar o arquivo php para recuperar os eventos
    events: 'listar_evento.php',
    // identificar o clique do usuário sobre o evento
    eventClick: function(info) {

        // Apresentar os detalhes do evento
        document.getElementById("visualizarEvento").style.display = 'block';
        document.getElementById("visualizarModalLabel").style.display = 'block';
  
        // Ocultar o formulário editar evento
        document.getElementById("editarEvento").style.display = "none";
        document.getElementById("editarModalLabel").style.display = "none";

        // enviar para a janela modal os dados do evento
        document.getElementById("visualizar_id").innerText = info.event.id;
        document.getElementById("visualizar_title").innerText = info.event.title;
        document.getElementById("visualizar_obs").innerText = info.event.extendedProps.obs;
        document.getElementById("visualizar_start").innerText = info.event.start.toLocaleString();
        document.getElementById("visualizar_end").innerText = info.event.end !== null ? info.event.end.toLocaleString() : info.event.start.toLocaleString();

        // enviar para os dados do evento para o formulário editar
        document.getElementById("edit_id").value = info.event.id;
        document.getElementById("edit_title").value = info.event.title;
        document.getElementById("edit_obs").value = info.event.extendedProps.obs;
        document.getElementById("edit_start").value = converterData(info.event.start);
        document.getElementById("edit_end").value = info.event.end !== null ? converterData(info.event.end) : converterData(info.event.start);
        document.getElementById("edit_color").value = info.event.backgroundColor;

        // abrir a janela modal
        visualizarModal.show();
    },
    // abrir a janela modal cadastrar quando clicar sobre o dia no calendário
    select: function(info) {

        document.getElementById("cad_start").value = converterData(info.start);
        document.getElementById("cad_end").value = converterData(info.start);
      // abrir uma janela modal cadastrar
      cadastrarModal.show();
    }
  });

  // renderizar o calendário
  calendar.render();

  // Converter a data
  function converterData(data) {
    // Converter a string em um objeto Date
    const dataObj = new Date(data);
    // Extrair o ano da data
    const ano = dataObj.getFullYear();
    // Obter o mês. +1 para não começar do 0 e padStart adiciona zeros à esquerda para garantir 2 dígitos
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    // Obter o dia do mês, padStart adiciona zeros à esquerda para garantir que o dia tenha dois dígitos
    const dia = String(dataObj.getDate()).padStart(2, '0');
    // Obter a hora, padStart..
    const hora = String(dataObj.getHours()).padStart(2, '0');
    // Obter minutos, padStart..
    const minuto = String(dataObj.getMinutes()).padStart(2, '0');
    // Retorna a data
    return `${ano}-${mes}-${dia} ${hora}:${minuto}`;
  }
  
  // Receber o SELETOR do formulário cadastrar evento
  const formCadEvento = document.getElementById('formCadEvento');

  // Receber o seletor da mensagem genérica
  const msg = document.getElementById("msg");
  //Receber o seletor da mensagem cadastrar evento
  const msgCadEvento = document.getElementById("msgCadEvento")

  // Receber o seletor do botão da janela modal cadastrar evento
  const btnCadEvento = document.getElementById("btnCadEvento");
  // Somente acessa quando existir o seletor formCadEvento
  if(formCadEvento) {
    // aguardar o usuário clicar no botão cadastrar
    formCadEvento.addEventListener("submit", async(e) => {
      // não permitir a atualização da página
    e.preventDefault();
    // Apresentar no botão o texto salvando
    btnCadEvento.value = "Salvando...";
    // receber os dados do formulário
    const dadosForm = new FormData(formCadEvento);
    // Chamar o arquivo PHP responsável em salvar o evento
    const dados = await fetch("cadastrar_evento.php", {
      method: "POST",
      body: dadosForm
      });
      // Realizar a leitura dos dados retornados pelo PHP
      const resposta = await dados.json();
      // Acessa o IF quando não cadastrar com sucesso
      if(!resposta['status']) {
        // Enviar a mensagem de erro para o HTML
        msgCadEvento.innerHTML = `<div class="alert alert-danger" role="alert">${resposta['msg']}</div>`;
        
      } else {
          // Enviar a mensagem de sucesso para o HTML
          msg.innerHTML = `<div class="alert alert-success" role="alert">${resposta['msg']}</div>`;

          // Após conseguir cadastrar, limpar a mensagem de erro (caso tenha)
          msgCadEvento.innerHTML = "";
          // Limpar o formulário
          formCadEvento.reset(); 
          // Recarregar automaticamente:
          // 1. criar o objeto com os dados do evento
          const novoEvento = {
            id: resposta['id'],
            title: resposta['title'],
            color: resposta['color'],
            start: resposta['start'],
            end: resposta['end'],
            obs: resposta['obs'],
          }
          // 2. adicionar o evento ao calendário
          calendar.addEvent(novoEvento);

          // chamar a função para remover a mensagem após 3s
          removerMsg();
          
          // Fechar a janela modal
          cadastrarModal.hide();
      }

    });
    btnCadEvento.value = "Cadastrar";
  }

  // Função para remover a mensagem após 3 segundos
  function removerMsg() {
      setTimeout(() => {
        document.getElementById('msg').innerHTML = "";
      }, 3000)
  }

    // Receber o seletor ocultar formulário editar evento e apresentar os detalhes do evento
  const btnViewEditEvento = document.getElementById("btnViewEditEvento");

  if(btnViewEditEvento) {
    // aguardar o usuário clicar no botão
    btnViewEditEvento.addEventListener("click", () => {
      
      // Ocultar os detalhes do evento
      document.getElementById("visualizarEvento").style.display = 'none';
      document.getElementById("visualizarModalLabel").style.display = 'none';

      // Apresentar o formulário editar evento
      document.getElementById("editarEvento").style.display = "block";
      document.getElementById("editarModalLabel").style.display = "block";
    });   
  }

  // Receber o seletor ocultar formulário editar evento e apresentar os detalhes do evento
  const btnViewEvento = document.getElementById("btnViewEvento");

  if(btnViewEvento) {
    // aguardar o usuário clicar no botão
    btnViewEvento.addEventListener("click", () => {
      
      // Apresentar os detalhes do evento
      document.getElementById("visualizarEvento").style.display = 'block';
      document.getElementById("visualizarModalLabel").style.display = 'block';

      // Ocultar o formulário editar evento
      document.getElementById("editarEvento").style.display = "none";
      document.getElementById("editarModalLabel").style.display = "none";
    });   
  }

  // receber o seletor do formulário editar evento
  const formEditEvento = document.getElementById("formEditEvento");

  //Receber o seletor da mensagem editar evento
  const msgEditEvento = document.getElementById("msgEditEvento");

  // Receber o seletor do botão editar evento
  const btnEditEvento = document.getElementById("btnEditEvento");

  // Somente acessa o IF quando existir o seletor formEditEvento
  if(formEditEvento) {
    // aguardar o usuário clicar no botão editar
    formEditEvento.addEventListener("submit", async (e) => {

    // não permitir a atualização da página
    e.preventDefault();
    // apresentar no botão o texto salvando
    btnEditEvento.value = 'Salvando...';
    // receber os dados do formulário
    const dadosForm = new FormData(formEditEvento);
    // chamar o arquivo php responsável em editar o evento
    const dados = await fetch("editar_evento.php", {
      method: "POST",
      body: dadosForm
    });

    // Realizar a leitura dos dados retornados pelo PHP
    const resposta = await dados.json();

    // Se não conseguiu editar com sucesso
    if(!resposta['status']) {
      msgEditEvento.innerHTML = `<div class="alert alert-danger" role="alert">${resposta['msg']}</div>`;
    } else {
      // Enviar a mensagem de sucesso para o HTML
      msg.innerHTML = `<div class="alert alert-success" role="alert">${resposta['msg']}</div>`;

      // Após conseguir cadastrar, limpar a mensagem de erro (caso tenha)
      msgEditEvento.innerHTML = "";
      // Limpar o formulário
      formEditEvento.reset(); 

      // Recuperar o evento no FullCalendar pelo id
      const eventoExiste = calendar.getEventById(resposta['id']);
      // Verificar se encontrou o evento no FullCalendar
      if(eventoExiste) {
        // Atualizar os atributos do evento com os novos valores do banco de dados
        eventoExiste.setProp('title', resposta['title']);
        eventoExiste.setProp('color', resposta['color']);
        eventoExiste.setExtendedProp('obs', resposta['obs']);
        // rever isso aqui
        eventoExiste.setStart(resposta['start']);
        eventoExiste.setEnd(resposta['end']);
      }

      // chamar a função para remover a mensagem após 3s
      removerMsg();
          
      // Fechar a janela modal
      visualizarModal.hide();
    }

    // apresentar no botão o texto salvar
    btnEditEvento.value = 'Salvar';
    });

    // Receber o seletor apagar evento
    const btnApagarEvento = document.getElementById("btnApagarEvento");

    if(btnApagarEvento) {
      // Aguardar o usuário clicar no botão apagar
      btnApagarEvento.addEventListener("click", async () => {
        const confirmacao = window.confirm("Tem certeza que deseja apagar este evento?");

        if(confirmacao) {
          // receber o id do evento
          var idEvento = document.getElementById("visualizar_id").textContent;
          // chamar o arquivo php responsável por apagar o evento
          const dados = await fetch("apagar_evento.php?id=" + idEvento);
          // Realizar a leitura dos dados retornados pelo PHP
          const resposta = await dados.json();

          // Acessa O IF quando não cadastrar com sucesso
          if(!resposta['status']) {
            // Enviar a mensagem de erro para o HTML
            msgViewEvento.innerHTML = `<div class="alert alert-danger" role="alert">${resposta['msg']}</div>`;
          } else {
            // Enviar a mensagem de sucesso para o HTML
            msg.innerHTML = `<div class="alert alert-success" role="alert">${resposta['msg']}</div>`;
            msgViewEvento.innerHTML = "";

            // Recuperar o evento no FullCalendar
            const eventoExisteRemover = calendar.getEventById(idEvento);
            // Verificar se encontrou o evento no FullCalendar
            if(eventoExisteRemover) {
              // remover o evento do calendário
              eventoExisteRemover.remove();
            }

            // Chamar a função para remover a mensagem após 3 segundos
            removerMsg();
            // Fechar a janela modal
            visualizarModal.hide();
          }
        }
      });
    }
  }
});