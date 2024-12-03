(() => {
    const container = document.querySelector(".labirint");
    const context = container.getContext("2d");

    const textures = {
        ground: new Image(),
        wall: new Image(),
        cat: new Image(),
        fish: new Image(),
        devil: new Image(),
        star: new Image(),
        portal: new Image(),
    };

    textures.ground.src = "sprite/ground-texture.png";
    textures.wall.src = "sprite/wall-texture.png";
    textures.cat.src = "sprite/humain-sprite.png";
    textures.fish.src = "sprite/princess-sprite.png";
    textures.devil.src = "sprite/devil-sprite.png";
    textures.star.src = "sprite/star-sprite.png";
    textures.portal.src = "sprite/portal-sprite.png";

    let mapSize = 10;
    const pixel = 40;

    let map = [];
    let catX = 1, catY = 1;
    let fishX = 8, fishY = 8;
    let devilX = 4, devilY = 5;
    let starX = 2, starY = 2;
    let portal1 = { x: 3, y: 3 }, portal2 = { x: 6, y: 6 };
    let score = 0;
    let timeRemaining = 30;

    function generateMap(size) {
        const newMap = Array(size)
            .fill()
            .map(() => Array(size).fill(0));

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                newMap[y][x] = Math.random() > 0.75 ? 1 : 0; // 25% de murs
            }
        }

        newMap[catY][catX] = 0;
        newMap[fishY][fishX] = 0;

        return newMap;
    }

    map = generateMap(mapSize);

    function drawMap() {
        for (let y = 0; y < mapSize; y++) {
            for (let x = 0; x < mapSize; x++) {
                if (map[y][x] === 1) {
                    context.drawImage(textures.wall, x * pixel, y * pixel, pixel, pixel);
                } else {
                    context.drawImage(textures.ground, x * pixel, y * pixel, pixel, pixel);
                }
            }
        }
    }

    function drawObjects() {
        context.drawImage(textures.cat, catX * pixel, catY * pixel, pixel, pixel);
        context.drawImage(textures.fish, fishX * pixel, fishY * pixel, pixel, pixel);
        context.drawImage(textures.devil, devilX * pixel, devilY * pixel, pixel, pixel);
        context.drawImage(textures.star, starX * pixel, starY * pixel, pixel, pixel);
        context.drawImage(textures.portal, portal1.x * pixel, portal1.y * pixel, pixel, pixel);
        context.drawImage(textures.portal, portal2.x * pixel, portal2.y * pixel, pixel, pixel);
    }

    function checkWin() {
        if (catX === fishX && catY === fishY) {
            window.completeCaptcha();
        }
    }

    function checkLoose() {
        if (catX === devilX && catY === devilY) {
            alert("Vous avez perdu! Le diable vous a attrapé!");
            window.looseCaptcha();
        }
    }

    function checkStar() {
        if (catX === starX && catY === starY) {
            score += 10;
            starX = Math.floor(Math.random() * mapSize);
            starY = Math.floor(Math.random() * mapSize);
        }
    }

    function checkPortal() {
        if (catX === portal1.x && catY === portal1.y) {
            catX = portal2.x;
            catY = portal2.y;
        } else if (catX === portal2.x && catY === portal2.y) {
            catX = portal1.x;
            catY = portal1.y;
        }
    }

    function moveDevil() {
        const direction = Math.floor(Math.random() * 4);
        let newX = devilX;
        let newY = devilY;

        switch (direction) {
            case 0: newX = devilX - 1; break; // Gauche
            case 1: newY = devilY - 1; break; // Haut
            case 2: newX = devilX + 1; break; // Droite
            case 3: newY = devilY + 1; break; // Bas
        }

        if (map[newY] && map[newY][newX] === 0) {
            devilX = newX;
            devilY = newY;
        }
    }

    function moveCat(e) {
        let newX = catX;
        let newY = catY;

        switch (e.keyCode) {
            case 37: newX = catX - 1; break;
            case 38: newY = catY - 1; break;
            case 39: newX = catX + 1; break;
            case 40: newY = catY + 1; break;
        }

        if (map[newY] && map[newY][newX] === 0) {
            catX = newX;
            catY = newY;
        }

        drawGame();
        checkWin();
        checkLoose();
        checkStar();
        checkPortal();
    }

    function drawGame() {
        context.clearRect(0, 0, container.width, container.height);
        drawMap();
        drawObjects();
    }

    function resetGame() {
        catX = 1;
        catY = 1;
        devilX = 4;
        devilY = 5;
        fishX = 8;
        fishY = 8;
        timeRemaining = 30;
        score = 0;
        map = generateMap(mapSize);
        drawGame();
    }

    document.addEventListener("keydown", moveCat);

    container.width = mapSize * pixel;
    container.height = mapSize * pixel;
    textures.ground.onload = () => drawGame();
    drawGame();

    setInterval(moveDevil, 3000);
})();
