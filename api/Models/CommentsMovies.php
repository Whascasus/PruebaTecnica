<?php

class CommentsMovies
{
  public $id;
  public string $comment;
  public int $idMovie;

  public function __construct(?int $id, string $comment, int $idMovie)
  {
    $this->id = $id;
    $this->comment = $comment;
    $this->idMovie = $idMovie;
    
  }
}
