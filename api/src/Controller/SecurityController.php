<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

use App\Entity\User;
use App\Repository\UserRepository;


class SecurityController extends Controller {

   /**
    * @Route("/login_test", methods="GET", name="app_login_test")
    */
   public function test() {
      return $this->redirectToRoute('app_login', [ 'email' => 'pierrick@lespinas.se' ]);
   }


   /**
    * @Route("/login", name="app_login")
    */
   public function login( AuthenticationUtils $authenticationUtils, UserRepository $userRepository ) {

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
    * @Route("/sign_in", name="app_sign_in")
    */
   public function register() {

   }

}
