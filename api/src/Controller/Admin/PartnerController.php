<?php

namespace App\Controller\Admin;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;



class PartnerController extends Controller {

   /**
     * @Route("/admin/partner", name="admin_partner")
     */
   public function getPartner() {
      return new \Symfony\Component\HttpFoundation\Response('<html><head></head><body>partner</body></html>');
   }

}