AFRAME.registerComponent('stair', {
					schema: {
						stairLength: {type: 'number', default: 4},
						stairBreath: {type: 'number', default: 1},
						stairHeight: {type: 'number', default: 3},
						stairQuantity: {type: 'number', default: 16},
						stairColor: {type: 'string', default: 'white'},
						stairPosition: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
						stairRotation: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
						stairTiles: {type: 'string', default: 'gray'}
					},
					init: function() {
						var s_len = this.data.stairLength;
						var s_bth = this.data.stairBreath;
						var s_hgt = this.data.stairHeight;
						var s_qnt = this.data.stairQuantity;
						var s_pst = this.data.stairPosition;
						var s_rot = this.data.stairRotation;
						var s_clr = this.data.stairColor;
						var s_tiles = this.data.stairTiles;
						
						s_len = s_len - 0.05;
						
						if(s_qnt % 2 === 1) {
							s_pst.y = s_pst.y + (s_hgt/s_qnt)/2;
							var center = document.createElement('a-plane');
							center.setAttribute('width', s_bth);
							center.setAttribute('height', (s_len/s_qnt) + 0.05);
							center.setAttribute('rotation', {x: -90, y: s_rot.y, z: s_rot.z});
							center.setAttribute('position', {x: s_pst.x, y: s_pst.y, z: s_pst.z});
							center.setAttribute('side', 'double');
							center.setAttribute('color', this.data.stairTiles);
						
							var c_box = document.createElement('a-box');
							c_box.setAttribute('width', s_bth);
							c_box.setAttribute('height', s_len/s_qnt + 0.05);
							c_box.setAttribute('depth', s_hgt/s_qnt);
							c_box.setAttribute('position', {x: 0, y: 0, z: -(s_hgt/s_qnt)/2 - 0.001});
							c_box.setAttribute('color', s_clr);

							center.appendChild(c_box);
						
							for(var i = 0; i < Math.floor(s_qnt / 2); i++) {
								s_pst.y = (i + 1)* (s_hgt/s_qnt);
								s_pst.z = (i + 1)* (s_len/s_qnt);
								addStair(s_pst);
							}
							for(var i = 0; i < Math.floor(s_qnt / 2); i++) {
								s_pst.y = -(i + 1)* (s_hgt/s_qnt);
								s_pst.z = -(i + 1)* (s_len/s_qnt);
								addStair(s_pst);
							}
							function addStair(s_pst) {
								var stair = document.createElement('a-plane');
								stair.setAttribute('width', s_bth);
								stair.setAttribute('height', s_len/s_qnt + 0.05);
								stair.setAttribute('rotation', {x: 0, y: 0, z: 0});
								stair.setAttribute('position', {x: 0, y: s_pst.z, z: s_pst.y});
								stair.setAttribute('side', 'double');
								stair.setAttribute('color', s_tiles);

								var stair_box = document.createElement('a-box');
								stair_box.setAttribute('width', s_bth);
								stair_box.setAttribute('height', s_len/s_qnt + 0.05);
								stair_box.setAttribute('depth', s_hgt/s_qnt);
								stair_box.setAttribute('position', {x: 0, y: 0, z: -(s_hgt/s_qnt)/2 - 0.001});
								stair_box.setAttribute('color', s_clr);

								stair.appendChild(stair_box);

								center.appendChild(stair);
							}

							this.el.appendChild(center);
						}
						
						// Even number of stairs
						else if(s_qnt % 2 === 0) {
							
							var center = document.createElement('a-plane');
							center.setAttribute('width', s_bth);
							center.setAttribute('height', 2*(s_hgt/s_qnt));
							center.setAttribute('rotation', {x: 0, y: s_rot.y + s_rot.z, z: 0});
							center.setAttribute('position', {x: s_pst.x, y: s_pst.y, z: s_pst.z});
							center.setAttribute('color', 'green');
							center.setAttribute('side', 'double');
							
							for(var i = 0; i < s_qnt/2; i++) {
								s_pst.y = (i+1)*(s_hgt/s_qnt);
								s_pst.z = -(i+1)*(s_len/s_qnt)+((s_len/s_qnt)/2);
								addStair(s_pst);
							}
							for(var i = 0; i < s_qnt/2; i++) {
								s_pst.y = -i*(s_hgt/s_qnt);
								s_pst.z = (i+1)*(s_len/s_qnt) - ((s_len/s_qnt)/2);
								addStair(s_pst);
							}
							
							function addStair(s_pst) {
								var stair = document.createElement('a-plane');
								stair.setAttribute('width', s_bth);
								stair.setAttribute('height', s_len/s_qnt + 0.05);
								stair.setAttribute('rotation', {x: -90, y: 0, z: 0});
								stair.setAttribute('position', {x: 0, y: s_pst.y, z: s_pst.z});
								stair.setAttribute('color', s_tiles);
								stair.setAttribute('side', 'double');
								
								var stair_box = document.createElement('a-box');
								stair_box.setAttribute('width', s_bth);
								stair_box.setAttribute('height', s_len/s_qnt + 0.05);
								stair_box.setAttribute('depth', s_hgt/s_qnt);
								stair_box.setAttribute('position', {x: 0, y: 0, z: -(s_hgt/s_qnt)/2 - 0.001});
								stair_box.setAttribute('color', s_clr);

								stair.appendChild(stair_box);
								
								center.appendChild(stair);
							}
							
							this.el.appendChild(center);
						}
						
					}
				});
				AFRAME.registerPrimitive('a-stair', {
					defaultComponents: {
						stair: {}
					},
					mappings: {
						stair_length: 'stair.stairLength',
						stair_breath: 'stair.stairBreath',
						stair_height: 'stair.stairHeight',
						stair_quantity: 'stair.stairQuantity',
						stair_color: 'stair.stairColor',
						stair_position: 'stair.stairPosition',
						stair_rotation: 'stair.stairRotation',
						stair_tiles: 'stair.stairTiles'
					}
				});