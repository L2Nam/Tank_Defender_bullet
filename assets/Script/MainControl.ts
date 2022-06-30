import TankControl from "./TankControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(TankControl)
    tank: TankControl = null;

    Smoke_speed = 5;
    @property(cc.Sprite)
    spSmoke: cc.Sprite[] = [null, null];

    Cloud_speed = 3;
    @property(cc.Sprite)
    spCloud: cc.Sprite[] = [null, null, null];

    Button_Right: cc.Button = null;
    Button_Left: cc.Button = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.Button_Right = this.node.getChildByName("Button_Right").getComponent(cc.Button);
        this.Button_Left = this.node.getChildByName("Button_Left").getComponent(cc.Button);
        this.Button_Right.node.on(cc.Node.EventType.TOUCH_START, this.touchStartBR, this);
        this.Button_Left.node.on(cc.Node.EventType.TOUCH_START, this.touchStartBL, this);

        this.Button_Right.node.on(cc.Node.EventType.TOUCH_END, this.touchEndBR, this);
        this.Button_Left.node.on(cc.Node.EventType.TOUCH_END, this.touchEndBL, this);
    }

    start() {
        for (let i = 0; i < this.spCloud.length; i++) {
            this.spCloud[i].node.x = 1500 + 1500 * i;
            var maxY_Cloud = 600
            var minY_Cloud = 400
            this.spCloud[i].node.y = 400 + Math.random() * (maxY_Cloud - minY_Cloud)
        }
    }

    update(dt) {
        for (let i = 0; i < this.spSmoke.length; i++) {
            this.spSmoke[i].node.x -= this.Smoke_speed;
            if (this.spSmoke[i].node.x <= -2000) {
                this.spSmoke[i].node.x = 2000;
            }
        }
        for (let i = 0; i < this.spCloud.length; i++) {
            this.spCloud[i].node.x -= this.Cloud_speed;
            if (this.spCloud[i].node.x <= -1000) {
                this.spCloud[i].node.x = 3500;
                var maxY_Cloud = 600
                var minY_Cloud = 400
                this.spCloud[i].node.y = 400 + Math.random() * (maxY_Cloud - minY_Cloud)
            }
        }
    }

    touchStartBR() {
        this.tank.setMOveLeft(false)
    }

    touchStartBL() {
        this.tank.setMOveLeft(true)
    }


    touchEndBR() {
        this.tank.setStopMove();
    }

    touchEndBL() {
        this.tank.setStopMove();
    }
}