<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    /**
     * @Route("/captcha", name="app_game")
     */
    public function index(): Response
    {
        return $this->render('game/index.html.twig', [
            'sessionId' => session_id(),
        ]);
    }
}
