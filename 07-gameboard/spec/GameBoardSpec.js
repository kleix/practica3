describe("Clase GameBoardSpec", function(){
    // Se deber� mostrar una pantalla de inicio o title screen que muestre
    // el nombre del juego e indicaciones para como comenzar a jugar

    // Estando en la pantalla de inicio, cuando se pulse la tecla
    // espacio comenzara el juego. No comenzara si la tecla espacio
    // estaba pulsada. En ese caso, hay que soltarla y pulsar de
    // nuevo.


    var canvas, ctx;

    beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();

    });


/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

	it("add",function(){
		var objetoprueba = new GameBoard();
		var object = "prueba";

		objetoprueba.add(object);
		expect(objetoprueba.objects[0]).toEqual("prueba");

	});

	
	it("remove",function(){
		var objetoprueba = new GameBoard();
		var object = "prueba";
		
		objetoprueba.resetRemoved();
		objetoprueba.remove(object);
		objetoprueba.finalizeRemoved();
	
		expect(objetoprueba.object).toEqual(undefined);
	});


	it("iterate",function(){
		var objetoprueba = new GameBoard();
		spyOn(objetoprueba, "iterate");
		
		objetoprueba.iterate("prueba",ctx);

		expect(objetoprueba.iterate).toHaveBeenCalled();
	});

	
	it("detect",function(){
		var objetoprueba = new GameBoard();

		var prdetect = function(){
			return true;
		}

		expect(objetoprueba.detect).toBeTruthy();
	});


	it("step",function(){
		var objetoprueba = new GameBoard();
		var dt = 0.04;
		spyOn(objetoprueba, "iterate");
		spyOn(objetoprueba, "resetRemoved");
		spyOn(objetoprueba, "finalizeRemoved");

		objetoprueba.step(dt);

		expect(objetoprueba.resetRemoved).toHaveBeenCalled();
		expect(objetoprueba.finalizeRemoved).toHaveBeenCalled();
		expect(objetoprueba.iterate).toHaveBeenCalledWith('step',dt);		
	});


	it("draw",function(){
		var objetoprueba = new GameBoard();

		spyOn(objetoprueba, "iterate");

		objetoprueba.draw(ctx);
	
		expect(objetoprueba.iterate).toHaveBeenCalledWith('draw',ctx);
	});


	it("overlap",function(){
		var objetoprueba = new GameBoard();
		var recprueba = new PlayerShip();
		var a = {x:6,y:6,w:0,h:0}
		var b = {x:4,y:4,w:2,h:2}

		
		var proverlap = function(a,b){
			return !((a.y+o1.h-1<b.y) || (a.y>b.y+b.h-1) ||
		 (a.x+a.w-1<b.x) || (a.x>b.x+b.w-1));
   		 };
			

		expect(objetoprueba.overlap).toBeTruthy();

	});



	it("collide",function(){
		var objetoprueba = new GameBoard();
		var recprueba = new PlayerShip();
		var a = {x:6,y:6,w:0,h:0}
		var b = {x:4,y:4,w:2,h:2}

		
		var proverlap = function(a,b){
			return !((a.y+o1.h-1<b.y) || (a.y>b.y+b.h-1) ||
		 (a.x+a.w-1<b.x) || (a.x>b.x+b.w-1));
   		 };
			

		expect(objetoprueba.collide).toBeTruthy();

	});
	

	
	
		
});



		




















