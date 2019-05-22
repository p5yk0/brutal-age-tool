<?php

namespace App\Security;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
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
   private $logger;


   public function __construct( UserRepository $userRepository, RouterInterface $router, UserPasswordEncoderInterface $passwordEncoder, LoggerInterface $logger ) {
      $this->userRepository  = $userRepository;
      $this->router          = $router;
      $this->passwordEncoder = $passwordEncoder;
      $this->logger          = $logger;
   }

   protected function getLoginUrl() {
      return $this->router->generate('app_login');
   }

   public function supports( Request $request ) {
      return $request->attributes->get('_route') === 'app_login' && $request->isMethod('POST');
   }

   public function getCredentials( Request $request ) {
      $this->logger->debug('Credentials '.$request->getContent());
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


   public function start( Request $request, AuthenticationException $authException = null ) {

      return new JsonResponse([
         'errcode' => 99,
         'message' => "User needs to log in."
      ]);
   }

   public function onAuthenticationSuccess( Request $request, TokenInterface $token, $providerKey ) {
      return new JsonResponse([
         'errcode' => 0
      ]);
   }

   public function onAuthenticationFailure( Request $request, AuthenticationException $exception ) {

      return new JsonResponse([
         'errcode' => 1,
         'message' => $exception->getMessageKey()
      ]);
   }


}
