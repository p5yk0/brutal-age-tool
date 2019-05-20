<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DefaultController extends AbstractController {


   /**
     * @Route("/")
     */
   public function index() {
      return new \Symfony\Component\HttpFoundation\Response(':)');
   }

}