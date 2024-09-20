<?php 

include_once './conexao.php';

// receber o id enviados pelo JavaScript
$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

$query_edit_event = "UPDATE events SET title=:title, color=:color, start=:start, end=:end WHERE id=:id";

if(!empty($id)) {
    $query_apagar_event = "DELETE FROM events WHERE id=:id";
    $apagar_event = $conn->prepare($query_apagar_event);
    $apagar_event->bindParam(':id', $id);

    if($apagar_event->execute()) {
        $retorna = [
            'status' => true, 
            'msg' => 'Evento apagado com sucesso!', 
        ];
    } else {
        $retorna = [
            'status' => false, 
            'msg' => 'Erro: Evento não apagado!'
        ]; 
    }
} else {
    $retorna = [
        'status' => false, 
        'msg' => 'Erro: Evento não apagado!'
    ];  
}

// Converter o array em objeto e retornar para o Javascript
echo json_encode($retorna);








