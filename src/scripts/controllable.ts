import { Scene } from "babylonjs";
import *  as  Babylon from 'babylonjs'


interface dynamicInputKeyController {
    KeyType:Babylon.KeyboardEventTypes;
    action:any;
}

class Controller {
    scene:Scene;
    KeyInputController:Array<dynamicInputKeyController> = [];


    constructor(scene:Scene) {
        this.scene = scene;
        this.listenForInput();
    }

    private listenForInput() {
        this.scene.onKeyboardObservable.add((pointerInfo) => {
            for(var i = 0; i < this.KeyInputController.length; i++)
            {
                if(this.KeyInputController[i].KeyType === pointerInfo.type)
                {
                    this.KeyInputController[i].action();
                }
            }
        })
    }


    addKeyEvent(KeyInput:Babylon.KeyboardEventTypes, action:any){
        this.KeyInputController.push({KeyType : KeyInput, action : action})
    }
}

export default Controller