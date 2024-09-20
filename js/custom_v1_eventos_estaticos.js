// Executar quando o documento HTML for completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Receber o seletor 'calendar' do atributo id
    var calendarEl = document.getElementById('calendar');

    // Instanciar FullCalendar.Calendar e atribuir a variável calendar
    var calendar = new FullCalendar.Calendar(calendarEl, {
        // Cria o cabeçalho do calendário
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },

      // Traduz para o português
      locale: 'pt-br',
      // Define a data inicial
      initialDate: '2024-07-11',
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
      
      events: [
        {
          title: 'All Day Event',
          start: '2023-01-01'
        },
        {
          title: 'Long Event',
          start: '2023-01-07',
          end: '2023-01-10'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2023-01-09T16:00:00'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2023-01-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2023-01-11',
          end: '2023-01-13'
        },
        {
          title: 'Meeting',
          start: '2023-01-12T10:30:00',
          end: '2023-01-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2023-01-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2023-01-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2023-01-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2023-01-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2023-01-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2023-01-28'
        }
      ]
    });

    calendar.render();
  });