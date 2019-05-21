<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;



class Partner extends AbstractController {

   /**
     * @Route("/partner")
     */
   public function getPartner() {
      return new \Symfony\Component\HttpFoundation\Response('<html><head></head><body>partner</body></html>');
   }

}