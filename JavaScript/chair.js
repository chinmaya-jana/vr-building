AFRAME.registerComponent("chair", {
    schema: {
        color:      		{type: 'string' ,default: 'red'},
        chairPosition: 	{type: 'vec3', default: {x: 0, y: 0, z: 0}},
        chairRotation: 	{type: 'vec3', default: {x: 0, y: 0, z: 0}}
    },
    init: function () {
        var pst = this.data.chairPosition;
        var rot = this.data.chairRotation;
        
        var base = document.createElement('a-box');
        var back = document.createElement('a-box');
        
        base.setAttribute('position', pst);
        base.setAttribute('scale',"0.4 0.4 0.02");
        base.setAttribute('rotation', {x: rot.x-90, y: rot.y, z: rot.z});
        base.setAttribute('color','brown');
        
        back.setAttribute('position',{x: 0, y: 0.525, z: 9.5});
        back.setAttribute('rotation',{x: 0, y: 90, z: 0});
        back.setAttribute('scale', "20 0.05 1");
        back.setAttribute('color',this.data.color);
        
        var leg1 = document.createElement('a-cylinder');
        leg1.setAttribute('position', {x: 0.4, y: 0.4, z: -8});
        leg1.setAttribute('radius', "0.05");
        leg1.setAttribute('height', "15");
        leg1.setAttribute('color', "green");
        leg1.setAttribute('rotation', {x: 90, y: 0, z: 0});
        base.appendChild(leg1);
        
        var leg2 = document.createElement('a-cylinder');
        leg2.setAttribute('position', {x: -0.4, y: 0.4, z: -8});
        leg2.setAttribute('radius', "0.05");
        leg2.setAttribute('height', "15");
        leg2.setAttribute('color', "white");
        leg2.setAttribute('rotation', {x: 90, y: 0, z: 0});
        base.appendChild(leg2);
        
        var leg3 = document.createElement('a-cylinder');
        leg3.setAttribute('position', {x: 0.4, y: -0.4, z: -8});
        leg3.setAttribute('radius', "0.05");
        leg3.setAttribute('height', "15");
        leg3.setAttribute('color', "red");
        leg3.setAttribute('rotation', {x: 90, y: 0, z: 0});
        base.appendChild(leg3);
        
        var leg4 = document.createElement('a-cylinder');
        leg4.setAttribute('position', {x: -0.4, y: -0.4, z: -8});
        leg4.setAttribute('radius', "0.05");
        leg4.setAttribute('height', "15");
        leg4.setAttribute('color', "orange");
        leg4.setAttribute('rotation', {x: 90, y: 0, z: 0});
        base.appendChild(leg4);
        
        var up_leftstand = document.createElement('a-cylinder');
        up_leftstand.setAttribute('position', {x: 0.4, y: -0.4, z: 4.5});
        up_leftstand.setAttribute('rotation', {x: 90, y: 0, z: 0});
        up_leftstand.setAttribute('radius', "0.05");
        up_leftstand.setAttribute('height', "8");
        up_leftstand.setAttribute('color', "white");
        base.appendChild(up_leftstand);
        
        var up_rightstand = document.createElement('a-cylinder');
        up_rightstand.setAttribute('position', {x: -0.4, y: -0.4, z: 4.5});
        up_rightstand.setAttribute('rotation', {x: 90, y: 0, z: 0});
        up_rightstand.setAttribute('radius', "0.05");
        up_rightstand.setAttribute('height', "8");
        up_rightstand.setAttribute('color', "green");
        base.appendChild(up_rightstand);
        
        var up_lefthandle = document.createElement('a-box');
        up_lefthandle.setAttribute('position', {x: 0.4, y: 0, z: 9});
        up_lefthandle.setAttribute('rotation', {x: 0, y: 0, z: 0});
        up_lefthandle.setAttribute('scale', {x: 0.1, y: 1, z: 1});
        up_lefthandle.setAttribute('color', "brown");
        base.appendChild(up_lefthandle);
        
        var up_righthandle = document.createElement('a-box');
        up_righthandle.setAttribute('position', {x: -0.4, y: 0, z: 9});
        up_righthandle.setAttribute('rotation', {x: 0, y: 0, z: 0});
        up_righthandle.setAttribute('scale', {x: 0.1, y: 1, z: 1});
        up_righthandle.setAttribute('color', "brown");
        base.appendChild(up_righthandle);
        
        base.appendChild(back);
        this.el.appendChild(base);
    }
});
AFRAME.registerPrimitive('a-chair', {
    defaultComponents: {
        chair: {}
    },
    mappings: {
        color: 		'chair.color',
        ch_position: 'chair.chairPosition',
        ch_rotation: 'chair.chairRotation'
    }
});