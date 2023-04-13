import { Scene } from "babylonjs";
import * as BABYLON from 'babylonjs'
import "@babylonjs/loaders/glTF"
import Controller from "../scripts/controllable";

interface ExternalMesh {
    name:string;
    DirectoryName:string;
    assetName:string;
    scene:Scene
}

//An interactable/controllable objected used for players and moving objects into the world
class Actor {
    readonly scene:Scene;
    readonly defaultModel:boolean;
    readonly name:string;
    

    cordinates:Array<number> = [0, 1, 0]
    ExternalMesh?:ExternalMesh;

    private mesh:BABYLON.Mesh;
    private InputManager:Controller;

    constructor(scene:Scene, defaultModel:boolean, name:string, externalMesh?:ExternalMesh) {
        this.scene = scene;
        this.defaultModel = defaultModel;
        this.name = name;

        this.ExternalMesh = externalMesh;
        //keyboard input handler
        this.InputManager = new Controller(scene);

        this.InputLoopLogin();

        const mesh = this.intialize();
        this.mesh = mesh;
        
    }

    //This functions is responsible of executing all the functions needed to show this actor
    private intialize():BABYLON.Mesh {
        const mesh = this.createMesh();
        return mesh
    }



    private createMesh():BABYLON.Mesh {
        var mesh = BABYLON.MeshBuilder.CreateSphere(this.name, {diameter: 2}, this.scene);
        mesh.position._x = this.cordinates[0];
        mesh.position.y = this.cordinates[1];
        mesh.position.z = this.cordinates[2]
        return mesh;
    }


    public setPosition(cords:Array<number>) {
        this.cordinates = cords;
        this.UpdatePositionOfMesh();
    }

    public setX(Xvalue:number) {
        this.cordinates = [Xvalue, this.cordinates[1], this.cordinates[2]]
        this.UpdatePositionOfMesh();
        
    }

    public setY(Yvalue:number) {
        this.cordinates = [this.cordinates[0], Yvalue, this.cordinates[2]]
        this.UpdatePositionOfMesh();
    }

    public setZ(Yvalue:number) {
        this.cordinates = [this.cordinates[0], this.cordinates[1], Yvalue]
        this.UpdatePositionOfMesh();
    }

    


    //private utility function
    private UpdatePositionOfMesh() {
        this.mesh.setPositionWithLocalVector(new BABYLON.Vector3(this.cordinates[0], this.cordinates[1], this.cordinates[2]));
    }

   private InputLoopLogin(){
    this.InputManager.addKeyEvent(BABYLON.KeyboardEventTypes.KEYDOWN, () => this.setY(this.cordinates[1] + 1))
   }
}

export default Actor;