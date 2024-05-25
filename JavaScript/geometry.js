AFRAME.registerComponent('travel', {

    init: function () {

        let hypertravel = () => {
            let going = this.el.getAttribute('dest');
            window.top.location.replace(going);
        }

        this.el.addEventListener('click', hypertravel);
        
    }});
    
AFRAME.registerComponent('genable', {

    init: function () {

        let turnable = () => {

            var currotate = document.getElementById('rotatable');
            var ncl = this.el.getAttribute('color');
            this.el.setAttribute('id', 'rotatable');
            currotate.setAttribute('id', 'anything');

        }

        this.el.addEventListener('click', turnable);
        
    }});
    
AFRAME.registerComponent('blocking', {
    schema: {
        blkMinLimit:       {type: 'vec3', default: {x:-20, y:-20, z:-20}},
        blkMaxLimit:       {type: 'vec3', default: {x:20, y:20, z:20}}
    },
    init: function () {
        var minlts = this.data.blkMinLimit;
        var maxlts = this.data.blkMaxLimit;
        
        var blk_elem = document.createElement('a-plane');
        blk_elem.setAttribute('id', 'blocker');
        blk_elem.setAttribute('position', {x: minlts.x,
                                           y: minlts.y,
                                           z: minlts.z});
        blk_elem.setAttribute('rotation', {x: maxlts.x,
                                           y: maxlts.y,
                                           z: maxlts.z});
        blk_elem.style.visibility = "hidden";
        this.el.appendChild(blk_elem);
    }
});

AFRAME.registerPrimitive('a-block', {
    defaultComponents: {
        blocking: {}
    },
    mappings: {
        maxlimit: 'blocking.blkMaxLimit',
        minlimit: 'blocking.blkMinLimit'
    }
});

function climb(h) {
    cam = document.getElementById('cam');
    cam_pos = cam.getAttribute('position');

    if (h === '6') {
        cam.setAttribute('position', {x:cam_pos.x,
                                      y:cam_pos.y + 0.2,
                                      z:cam_pos.z});
    }
    if (h === '9') {
        cam.setAttribute('position', {x:cam_pos.x,
                                      y:cam_pos.y - 0.2,
                                      z:cam_pos.z});
    }
    if (h === 'f') {
        cam.setAttribute('position', {x:cam_pos.x,
                                      y:cam_pos.y,
                                      z:cam_pos.z - 0.2});
    }
    if (h === 'v') {
        cam.setAttribute('position', {x:cam_pos.x,
                                      y:cam_pos.y,
                                      z:cam_pos.z + 0.2});
    }
}

function itemrotate(h) {
    let rot_elem = document.getElementById('rotatable');
    let init_ang = rot_elem.getAttribute('rotation');    /* Initial Angles */
    
    /* Check which key is pressed and do proper rotation */
    /* We rotate by 5 degrees each time a key is pressed */
    if (h === 'l')
        rot_elem.setAttribute('rotation',
                           {x: init_ang.x,
                            y:init_ang.y+5,
                            z: init_ang.z});
    if (h === 'u')
        rot_elem.setAttribute('rotation',
                           {x: init_ang.x+5,
                            y:init_ang.y,
                            z: init_ang.z});
    if (h === 'r')
        rot_elem.setAttribute('rotation',
                           {x: init_ang.x,
                            y:init_ang.y-5,
                            z: init_ang.z});
    if (h === 'b')
        rot_elem.setAttribute('rotation',
                           {x: init_ang.x-5,
                            y:init_ang.y,
                             z: init_ang.z});
}

/*
function update_avatar() {
    alert('Entered Avatar');
    var me = document.getElementById('avatar');
    var camer = document.getElementById('cam');
    var me_pos = me.getAttribute('position');
    var camer_pos = cam.getAttribute('position');
    alert('Camera Position ' + camer_pos.x + ' ' + camer_pos.y + ' ' + camer_pos.z);
    alert('Avatar Position ' + me_pos.x + ' ' + me_pos.y + ' ' + me_pos.z);
    me.setAttribute('position', {x: camer_pos.x,
                                 y: camer_pos.y - 0.15,
                                 z: camer_pos.z - 0.5});
}
*/

function blockmove(h) {
    var cam_elem = document.getElementById("cam");
    var cam_loc = cam_elem.getAttribute('position');
    var cam_blk = document.getElementById('blocker');
    var cam_blk_x_min = cam_blk.getAttribute('position').x;
    var cam_blk_x_max = cam_blk.getAttribute('rotation').x;
    
    if ((h === 'l') || (h === 'r') ||
        (h === 'u') || (h === 'b'))
        itemrotate(h);
    else if ((h === '9') || (h === '6'))
        climb(h);
    if ((h === 'a') || (h === 'ArrowLeft')) {
        if ((cam_loc.x - 1) <= cam_blk_x_min) {
            cam_elem.setAttribute('position', {x: cam_blk_x_min+1, y:cam_loc.y,
                                               z: cam_loc.z});
        } else {
            cam_elem.setAttribute('position', {x: cam_loc.x - 0.1,
                                               y: cam_loc.y,
                                               z: cam_loc.z});
        }
    }
    if ((h === 'd') || (h === 'ArrowRight')) {
        if ((cam_loc.x + 1) >= cam_blk_x_max) {
            cam_elem.setAttribute('position', {x: cam_blk_x_max-1, y:cam_loc.y,
                                               z: cam_loc.z});
        } else {
            cam_elem.setAttribute('position', {x: cam_loc.x + 0.1,
                                               y: cam_loc.y,
                                               z: cam_loc.z});
        }
    }
}

function keyp(e) {
    blockmove(e.key);
}

document.addEventListener('keydown', keyp); /* Action for key press */
