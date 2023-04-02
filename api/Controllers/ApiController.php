<?php

header('Access-Control-Allow-Origin: *');

require $_SERVER['DOCUMENT_ROOT'] . '/Controllers/CommentsController.php';

class ApiController
{
  private CommentsController $commentsController;

  public function __construct()
  {
    $this->commentsController = new CommentsController();
    $this->initAPI();
  }
  /**
   * Inicializa la API.
   * 
   * Lógica encargada de recibir todas las peticiones que envian desde la API.
   */
  private function initAPI()
  {
    
    // Obtendremos todas las solicitudes de GET.
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
      echo $this->commentsController->getAll();
      return;
    }

    // Obtendremos todas las solicitudes de POST.
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      echo $this->commentsController->create();
      return;
    }

    // Obtendremos todas las solicitudes de PATCH.
    if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
      $req = explode('/', $_SERVER['REQUEST_URI']);
      
      if (('/' . $req[1]) === '/comments') {
        echo $this->commentsController->update($req[2]); // => Envía el id del registro a actualizar
        return;
      }
    }

    // Obtendremos todas las solicitudes de DELETE.
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
      echo $this->commentsController->delete();
      return;
    }

    return $this->methodNotFound();
  }

  /**
   * Lógica encargada de envíar una respuesta de Endpoint no encontrado.
   */
  private function methodNotFound()
  {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found.']);
  }
}
