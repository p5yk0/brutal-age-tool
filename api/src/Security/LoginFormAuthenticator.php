<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\Authenticator\AbstractFormLoginAuthenticator;
use Symfony\Component\Security\Http\Util\TargetPathTrait;

use App\Repository\UserRepository;



class LoginFormAuthenticator extends AbstractFormLoginAuthenticator {

   use TargetPathTrait;

   private $userRepository;
   private $router;
   private $passwordEncoder;


   public function __construct( UserRepository $userRepository, RouterInterface $router, UserPasswordEncoderInterface $passwordEncoder ) {
      $this->userRepository  = $userRepository;
      $this->router          = $router;
      $this->passwordEncoder = $passwordEncoder;
   }

   protected function getLoginUrl() {
      return $this->router->generate('app_login');
   }

   public function supports( Request $request ) {
      return $request->attributes->get('_route') === 'app_login' && ($request->isMethod('POST') || $request->query->has('email'));
   }

   public function getCredentials( Request $request ) {
      return [
         'email'    => $request->request->get('email', $request->query->get('email')),
         'password' => $request->request->get('password'),
      ];
   }

   public function getUser( $credentials, UserProviderInterface $userProvider ) {
      return $this->userRepository->findOneBy([ 'email' => $credentials['email'] ]);
   }

   public function checkCredentials( $credentials, UserInterface $user ) {
      return $this->passwordEncoder->isPasswordValid($user, $credentials['password']);
   }


   public function onAuthenticationSuccess( Request $request, TokenInterface $token, $providerKey ) {
      if( $targetPath = $this->getTargetPath($request->getSession(), $providerKey) ) {
         return new RedirectResponse($targetPath);
      }
   }


}
