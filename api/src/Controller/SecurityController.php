<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

use App\Entity\User;
use App\Repository\UserRepository;


class SecurityController extends Controller {


   /**
    * @Route("/login", methods="POST", name="app_login")
    */
   public function login( AuthenticationUtils $authenticationUtils, UserRepository $userRepository ) {

      throw new \Exception("Authenticator missed ?!");
      $error = $authenticationUtils->getLastAuthenticationError();

      if( !empty($error) ) {
         return $this->json([
            'errcode' => 1,
            'message' => $error->getMessageKey(),
         ]);
      }
      else {
         /** @var User $user */
         $user = $this->getUser();
         return $this->json(
            [
               'errcode' => 0,
               'user'    => $user
            ],
            200, [],  [ 'groups' => ['main'] ]
         );
      }
   }


   /**
    * @Route("/logout", name="app_logout")
    */
   public function logout() {
      throw new \Exception("Authenticator missed ?!");
   }



   /**
    * @Route("/register", name="app_register")
    */
   public function register() {

   }

}
