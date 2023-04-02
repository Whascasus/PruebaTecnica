<?php

/**
 * Prueba técnica desarrollada y maquetada por
 * Juan Camilo López Morales para 
 * Garantías Comunitarias Grupo S.A.
 */
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    require $_SERVER['DOCUMENT_ROOT'] . '/Controllers/ApiController.php';

    

$apiController = new ApiController();           