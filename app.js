const createCurvedLines = (scene, groundWidth, groundHeight, points = 20) => {
    const vectors = randomPointsGenerator(points, groundWidth, groundHeight);
    const catmullRomSpline = BABYLON.Curve3.CreateCatmullRomSpline(vectors, points + 1, false);
    const curvedLine = BABYLON.Mesh.CreateLines('catmul', catmullRomSpline.getPoints(), scene);
    curvedLine.color = new BABYLON.Color3(1, 0, 1);
    return curvedLine;
}

const randomPointsGenerator = (points, groundWidth, groundHeight) => {
    const groundSectionSubdiv = groundHeight / points;
    let groundSectionBot = -1 * groundHeight / 2, groundSectionTop = groundSectionBot + groundSectionSubdiv;
    const vectors = [new BABYLON.Vector3(0, 0, groundSectionBot)];
    for (let i = 0; i < points; i++) {
        let x = getRandomPoint(-1 * groundWidth / 2, groundWidth / 2);
        let z = getRandomPoint(groundSectionBot, groundSectionTop);
        let newRandomVector = new BABYLON.Vector3(x, 0, z);
        vectors.push(newRandomVector);
        groundSectionBot += groundSectionSubdiv;
        groundSectionTop += groundSectionSubdiv;
    }

    return vectors;
}

const getRandomPoint = (min, max) => {
    return Math.random() * (max - min) + min;
}

const createGround = (width, height) => {
    const ground = new BABYLON.MeshBuilder.CreateGround('ground', {width: width, height: height});
    return ground;
}

const createScene = (engine, canvas) => {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, -500), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    const ground = createGround(50, 1000);
    const curvedLine = createCurvedLines(scene, 50, 1000, 30);

    return scene;
}

const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const scene = createScene(engine, canvas);

engine.runRenderLoop(() => {
    scene.render();
})