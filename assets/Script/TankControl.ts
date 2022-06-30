const { ccclass, property } = cc._decorator;

@ccclass
export default class TankControl extends cc.Component {

    SPEED_DEFAULT = 8
    TIME_FIRE_MAX = 0.5

    @property(cc.Sprite)
    tank: cc.Sprite = null;
    @property(cc.Node)
    tank_muzzle: cc.Node = null;

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null
    @property(cc.Node)
    parentBullet: cc.Node = null
    @property(cc.Node)
    posBullet: cc.Node = null

    speed = 0;
    time_run_fire = 0;
    is_fire = false
    is_move_left = true;

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

        if (this.is_fire) {
            this.time_run_fire += dt;
            if (this.time_run_fire >= this.TIME_FIRE_MAX) {
                this.time_run_fire = 0;
                // tao ra dan
                let bullet = cc.instantiate(this.bulletPrefab)
                bullet.parent = this.parentBullet;
                bullet.angle = this.tank_muzzle.angle;

                let posW = this.parentBullet.convertToNodeSpaceAR(this.tank_muzzle.convertToWorldSpaceAR(this.posBullet.position))
                bullet.position = posW;
                const radians = (bullet.angle + 90) * Math.PI / 180;
                const ball_speed = 1000// GameConst.ins().ball_speed + 100 * GameModel.ins().ball_fire_speed;
                bullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(Math.sin(radians) * ball_speed, Math.abs(Math.cos(radians) * ball_speed));

                // let posTo = cc.v3(cc.winSize.width / 2, cc.winSize.height / 2)
                // let disX = cc.winSize.width - posW.x;
                // let disY = Math.tan(bullet.angle) * disX + posW.y;
                // cc.tween(bullet).to(2, { position: posTo }).removeSelf().start()
            }
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

    setFire(angel) {
        this.tank_muzzle.angle = angel;
        if (!this.is_fire) {
            this.time_run_fire = this.TIME_FIRE_MAX;
        }
        this.is_fire = true
    }

    setStopFire() {
        this.is_fire = false
        this.time_run_fire = 0;
    }
}
