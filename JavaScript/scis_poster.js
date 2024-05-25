AFRAME.registerComponent('standee', {
    schema: {
        standColor:         {type: 'string', default: "maroon"},
        standPosition:      {type: 'vec3', default: {x:0, y:0, z:0}},
        standRotation:      {type: 'vec3', default: {x:0, y:0, z:0}},
        standSize:          {type: 'vec3', default: {x:1.2, y:1.33, z:0.25}},
        standThickness:     {type: 'number', default: 0.02},
        standAspectRatio:   {type: 'number', default: 1.333},
        standSource:        {type: 'string', default: ""},
        standBackSource:    {type: 'string', default: ""},
        standBackAspRatio:  {type: 'number', default: 1.333}
    },
    init: function () {
        var st_pos = this.data.standPosition;
        var st_rot = this.data.standRotation;
        var st_size = this.data.standSize;
        var st_len = st_size.x;
        var st_hgt = st_size.y;
        var st_wid = st_size.z;
        var st_thk = this.data.standThickness;
        var st_clr = this.data.standColor;
        var st_src = this.data.standSource;
        var st_aspratio = this.data.standAspectRatio;
        var st_bksrc = this.data.standBackSource;
        var st_bkaspect = this.data.standBackAspRatio;

        /***************************************************
             A poster standee consists of
             1) Base
             2) Left and Right Supports
             3) A horizontal tray that acts also as a support
             4) A board for pinning the posters (both front and back)
        ***************************************************/
        var base = document.createElement('a-box');
        var leftleg = document.createElement('a-cylinder');
        var rightleg = document.createElement('a-cylinder');
        var supp = document.createElement('a-box');
        var poster = document.createElement('a-box');
        var rht = Math.max(st_hgt, 3.30);

        /*** Make the base, legs and the tray area ***/
        make_box(base, st_len, st_wid, st_thk, "#c0c0c0", "", "top");
        make_legs(leftleg, st_thk, rht/2 + 2.0 * st_thk,
                  -st_len / 2.0 + 2.0 * st_thk, 0, -rht / 4,
                  "#c0c0c0");
        leftleg.setAttribute('rotation', {x:90, y:0, z:0});
        make_legs(rightleg, st_thk, rht/2 + 2.0 * st_thk,
                  st_len / 2.0 - 2.0 * st_thk, 0, -rht / 4.0,
                  "#c0c0c0");
        rightleg.setAttribute('rotation', {x:90, y:0, z:0});

        make_box(supp, st_len, st_wid/2.25, st_thk, "#c0c0c0", "", "top");
        supp.setAttribute('position', {x:0, y:st_wid/3-2*st_thk, z:-rht/6});
        supp.setAttribute('rotation', {x:-3, y:0, z:0});
        
        /*** Make the poster area ***/
        make_box(poster, st_len - 4.0 * st_thk, st_hgt, st_thk,
                 st_clr, "top");
        poster.setAttribute('rotation', {x: -90+st_rot.x, y:0, z:0});
        poster.setAttribute('position', {x:0, y:0, z:-rht/2});
        
        /*** Put posters on front and back, if specified ***/
        if (st_src !== "") {
            var matter = document.createElement('a-video');
            put_info(matter, st_src, st_thk, st_len, st_aspratio, "front");
            poster.appendChild(matter);
        }
        if (st_bksrc != "") {
            var bm = document.createElement('a-video');
            put_info(bm, st_bksrc, st_thk, st_len, st_bkaspect, "back");
            poster.appendChild(bm);
        }

        /*** Attach the legs and the horizontal tray to the base ***/
        base.appendChild(leftleg);
        base.appendChild(rightleg);
        base.appendChild(supp);

        /*** Attach the base and the poster board area ***
         *** to create the standee                     ***/
        dummy = document.createElement('a-entity');
        dummy.setAttribute('position', {x:st_pos.x,
                                        y:-st_pos.y+st_thk,
                                        z:st_pos.z});
        dummy.setAttribute('rotation', {x: 90,
                                        y: st_rot.y,
                                        z: 0});
        dummy.appendChild(base);
        dummy.appendChild(poster);

        /*** Place the newly created standee as specified ***/
        this.el.appendChild(dummy);
    }

});

AFRAME.registerPrimitive('a-standee', {
    defaultComponents: {
        standee: {}
    },
    mappings: {
        position:  'standee.standPosition',
        rotate:    'standee.standRotation',
        size:      'standee.standSize',
        color:     'standee.standColor',
        thickness: 'standee.standThickness',
        poster:    'standee.standSource',
        aspect:    'standee.standAspectRatio',
        backposter:'standee.standBackSource',
        backaspect:'standee.standBackAspRatio'
    }
});

AFRAME.registerComponent('desk', {
    schema: {
        deskColor:          {type: 'string', default: "#efdfc0"},
        deskMetalColor:     {type: 'string', default: "maroon"},
        deskPosition:       {type: 'vec3', default: {x:0, y:0, z:0}},
        deskRotation:       {type: 'vec3', default: {x:0, y:0, z:0}},
        deskSize:           {type: 'vec3', default: {x:2.3, y:1.07, z:0.8}},
        deskThickness:      {type: 'number', default: 0.03},
        deskTwoBox:         {type: 'boolean', default: "false"}
    },
    init: function () {
        var dk_pos = this.data.deskPosition;
        var dk_rot = this.data.deskRotation;
        var dk_size = this.data.deskSize;
        var dk_len = dk_size.x;
        var dk_wid = dk_size.y;
        var dk_hgt = dk_size.z;
        var dk_thk = this.data.deskThickness;
        var dk_clr = this.data.deskColor;
        var dk_mclr = this.data.deskMetalColor;
        var bx_len = dk_len * 0.25;
        var bx_wid = dk_wid * 0.90;
        var bx_hgt = dk_hgt * 0.67;
        var bx_two = this.data.deskTwoBox;
        var dktop = document.createElement('a-box');
        var rgtbox = document.createElement('a-box');
        var bkplane = document.createElement('a-plane');

        /*** Make the desktop and the file cabinet/drawer on the right ***/
        make_box(dktop, dk_len, dk_wid, dk_thk, dk_clr,
                 "/javacode/wood_texture.jpg", "top");
        make_box(rgtbox, 0.25 * dk_len, 0.67 * dk_wid, 0.67 * dk_hgt,
                 dk_mclr, "/javacode/boxes_detail.jpg", "front");
        rgtbox.setAttribute('position', {x:0.375 * dk_len - 2.5 * dk_thk,
                                         y:-0.165 * dk_wid + dk_thk * 2.0,
                                         z:-0.33 * dk_hgt - dk_thk / 2.0});
        dktop.appendChild(rgtbox);
        /*** Make a file cabinet/drawer on the left side if specified ***/
        if (bx_two === true) {
            var lftbox = document.createElement('a-box');

            make_box(lftbox, 0.25 * dk_len, 0.67 * dk_wid, 0.67 * dk_hgt,
                     dk_mclr, "/javacode/boxes_left.jpg", "front");
            lftbox.setAttribute('position', {x:-0.375 * dk_len + 2.5 * dk_thk,
                                             y:-0.165 * dk_wid + dk_thk * 2.0,
                                             z:-0.33 * dk_hgt - dk_thk / 2.0});
            dktop.appendChild(lftbox);
        }

        /*** Make a back-plane for additional support to the desktop ***/
        bkplane.setAttribute('width', dk_len - 3 * dk_thk);
        bkplane.setAttribute('height', dk_hgt * 0.67);
        bkplane.setAttribute('position', {x:0, y:dk_wid / 3.0 - 3.0 * dk_thk,
                                          z:-0.33 * dk_hgt});
        bkplane.setAttribute('rotation', {x:-90, y:0, z:0});
        bkplane.setAttribute('color', dk_mclr);
        bkplane.setAttribute('side', 'double');
        dktop.appendChild(bkplane);

        /*** Make the four legs ***/
        var leg1 = document.createElement('a-cylinder');
        var leg2 = document.createElement('a-cylinder');
        var leg3 = document.createElement('a-cylinder');
        var leg4 = document.createElement('a-cylinder');
        make_legs(leg1, dk_thk / 2.0, dk_hgt - dk_thk,
                  -dk_len/2 + dk_thk * 2.0, -dk_wid / 2.0 + dk_thk * 2.0,
                  -dk_hgt / 2.0, "#c0c0c0");
        leg1.setAttribute('rotation', {x:90, y:0, z:0});
        dktop.appendChild(leg1);

        make_legs(leg2, dk_thk / 2.0, dk_hgt - dk_thk,
                  dk_len/2 - dk_thk * 2.0, -dk_wid / 2.0 + dk_thk * 2.0,
                  -dk_hgt / 2.0, "#c0c0c0");
        leg2.setAttribute('rotation', {x:90, y:0, z:0});
        dktop.appendChild(leg2);
        make_legs(leg3, dk_thk / 2.0, dk_hgt - dk_thk,
                  -dk_len/2 + dk_thk * 2.0, dk_wid / 2.0 - dk_thk * 2.0,
                  -dk_hgt / 2.0, "#c0c0c0");
        leg3.setAttribute('rotation', {x:90, y:0, z:0});
        dktop.appendChild(leg3);
        make_legs(leg4, dk_thk / 2.0, dk_hgt - dk_thk,
                  dk_len/2 - dk_thk * 2.0, dk_wid / 2.0 - dk_thk * 2.0,
                  -dk_hgt / 2.0, "#c0c0c0");
        leg4.setAttribute('rotation', {x:90, y:0, z:0});
        dktop.appendChild(leg4);
       
        /*** Create a new entity for the desk, position and orient
             it correctly. Attach it to the document to complete
             the process                                           ***/
        var desk_entity = document.createElement('a-entity');
        desk_entity.setAttribute('position',
                                 {x: dk_pos.x,
                                  y: dk_pos.y + (dk_hgt + dk_thk)/2 + dk_wid/2,
                                  z: dk_pos.z});
        desk_entity.setAttribute('rotation', {x:dk_rot.x - 90,
                                              y:dk_rot.y,
                                              z:dk_rot.z});
        desk_entity.appendChild(dktop);
        
        this.el.appendChild(desk_entity);
    }

});

AFRAME.registerPrimitive('a-desk', {
    defaultComponents: {
        desk: {}
    },
    mappings: {
        position:  'desk.deskPosition',
        rotate:    'desk.deskRotation',
        size:      'desk.deskSize',
        color:     'desk.deskColor',
        thickness: 'desk.deskThickness',
        metalcolor:'desk.deskMetalColor',
        twodrawers:'desk.deskTwoBox'
    }

});
/************************************************************************/

function put_info(matter, matl, thick, leng, aratio, where) {
    var zpos = thick / 2.0 + 0.015;
    var yrot = 0;
    
    if (where === "back") {
        zpos = -zpos;
        yrot = yrot + 180;
    }
        
    matter.setAttribute('position', {x:0, y:0,
                                       z:zpos});
    matter.setAttribute('rotation', {x:0, y:yrot, z:0});
    matter.setAttribute('width', leng - 8.0 * thick);
    matter.setAttribute('height', leng / aratio);
    matter.setAttribute('src', matl);
}

function make_legs(leg, rad, ht, xpos, ypos, zpos, clr) {
    leg.setAttribute('position', {x:xpos, y:ypos, z:zpos});
//    leg.setAttribute('rotation', {x:0, y:0, z:-90});
    leg.setAttribute('height', ht);
    leg.setAttribute('radius', rad);
    leg.setAttribute('color', clr);
}

function make_box(rbox, len, wid, hgt, clr, img, where) {
    var front = document.createElement('a-plane');

    rbox.setAttribute('width', len);
    rbox.setAttribute('height', wid);
    rbox.setAttribute('depth', hgt);
    rbox.setAttribute('color', clr);

    front.setAttribute('width', rbox.getAttribute('width'));
    front.setAttribute('color', clr);
    front.setAttribute('side', 'double');
    if (where === "top") {
        front.setAttribute('height', rbox.getAttribute('height'));
        front.setAttribute('position', {x:0, y:0, z:hgt/2.0 + 0.003});
    } else {
        front.setAttribute('height', rbox.getAttribute('depth'));
        front.setAttribute('position', {x:0, y:-wid/2.0-0.001, z:0});
        front.setAttribute('rotation', {x:-90, y:0, z:0});
    }               

    if (clr !== "")
        front.setAttribute('src', img);
    
    rbox.appendChild(front);
}
