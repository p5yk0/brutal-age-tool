<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

use App\Repository\UserRepository;



class SecurityController extends Controller
{
    /**
     * @Route("/login", name="app_login ")
     */
    public function login(AuthenticationUtils $authenticationUtils, UserRepository $userRepository)
    {
        $error = $authenticationUtils->getLastAuthenticationError();

        if( !empty($error) ) {
            return $this->json([
                'errcode' => 1,
                'message' => $error->getMessage()
            ]);
        }
        else {
            return $this->json([
                'errcode' => 0,
                'user'    => 'todo'
            ]);
        }
    }
}
