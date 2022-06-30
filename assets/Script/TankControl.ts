const { ccclass, property } = cc._decorator;

@ccclass
export default class TankControl extends cc.Component {

    // speed of tank
    SPEED_DEFAULT = 8

    @property(cc.Sprite)
    tank: cc.Sprite = null;

    speed = 0;
    is_move_left = true;

    life = 3;

    // LIFE-CYCLE CALLBACKS:

    // onLoad() {}

    start() {

    }

    setDie() {
        this.life--
        if (this.life <= 0) {
            //do some thing
        }
    }

    update(dt) {
        if (this.node.x <= -900)
            this.node.x = -900;
        if (this.node.x >= 900)
            this.node.x = 900

        if (this.is_move_left) {
            this.node.x -= this.speed;
        }
        else {
            this.node.x += this.speed;
        }
    }

    setMOveLeft(isLeft) {
        this.tank.node.scaleX = isLeft ? -1 : 1;
        this.is_move_left = isLeft;
        this.speed = this.SPEED_DEFAULT;
    }

    setStopMove() {
        this.speed = 0;
    }
}
