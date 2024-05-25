AFRAME.registerComponent("room", {
				schema: {
					// 'Room'
					roomColor:      {type: 'string', default: 'white'},
					roomPosition: 	{type: 'vec3', default: {x: 0, y: 0, z: 0}},
					roomRotation: 	{type: 'vec3', default: {x: 0, y: 0, z: 0}},
					roomLength:     {type: 'number', default: 20},
					roomBreath:     {type: 'number', default: 15},
					roomHeight:     {type: 'number', default: 10},
					roomThickness:  {type: 'number', default: 0.3},
					ceilColor:  		{type: 'string', default: 'blue'},
					// South wall 'Door'
					southDoor: 			{type: 'boolean', default: false},
					doorPosition:   {type: 'number', default: 0},
					doorWidth:      {type: 'number', default: 8},
					doorHeight:     {type: 'number', default: 5},
					doorColor:      {type: 'string', default: 'purple'},
					// East wall 'window'
					e_wall_wd:  				{type: 'boolean', default: false},
					e_wall_wd_quantity: {type: 'number', default: 1},
					e_wall_wd_width: 		{type: 'number', default: 10},
					e_wall_wd_height: 	{type: 'number', default: 5},
					e_wall_wd_position: {type: 'vec2', default: {x: 0, y: 0}},
					e_wall_wd_color: 		{type: 'string', default: 'green'},
					// West wall 'window'
					w_wall_wd:  				{type: 'boolean', default: false},
					w_wall_wd_quantity: {type: 'number', default: 1},
					w_wall_wd_width: 		{type: 'number', default: 10},
					w_wall_wd_height: 	{type: 'number', default: 5},
					w_wall_wd_position: {type: 'vec2', default: {x: 0, y: 0}},
					w_wall_wd_color: 		{type: 'string', default: 'green'},
					// North wall 'window'
					n_wall_wd:  				{type: 'boolean', default: false},
					n_wall_wd_quantity: {type: 'number', default: 1},
					n_wall_wd_width: 		{type: 'number', default: 10},
					n_wall_wd_height: 	{type: 'number', default: 5},
					n_wall_wd_position: {type: 'vec2', default: {x: 0, y: 0}},
					n_wall_wd_color: 		{type: 'string', default: 'green'}
				},
				init: function () {
					// Room attributes/primitives
					var r_pst = this.data.roomPosition;
					var r_rot = this.data.roomRotation;
					var r_len = this.data.roomLength;
					var r_bth = this.data.roomBreath;
					var r_hgt = this.data.roomHeight;
					var r_tkns = this.data.roomThickness;
					
					/************************************************************************************/
					// This is the BASE/PLANE where you can put your room
					var base = document.createElement('a-plane');
					base.setAttribute('position', {x: r_pst.x, y: r_pst.y, z: r_pst.z});
					base.setAttribute('rotation', {x: -90, y: r_rot.y, z: r_rot.z});
					base.setAttribute('width', r_len);
					base.setAttribute('height', r_bth);
					base.setAttribute('color', 'gray');
					base.setAttribute('side', 'double');
					
					/************************************************************************************/
					// East wall with window
					if(this.data.e_wall_wd !== false) {
						var wd_qnt = this.data.e_wall_wd_quantity;
						var wd_wth = this.data.e_wall_wd_width;
						var wd_hgt = this.data.e_wall_wd_height;
						var wd_pst = this.data.e_wall_wd_position;
						// make only ONE window at any position of the wall
						if(wd_qnt < 2) {
							if(wd_wth > r_bth - (2 * r_tkns)) {
								wd_wth = (r_bth - (2 * r_tkns)) / 2;
							}
							if(wd_hgt > r_hgt) {
								wd_hgt = r_hgt / 2;
							}
							if(wd_pst.x > 1 || wd_pst.x < -1) {
								wd_pst.x = 0;
							}
							if(wd_pst.y > 1 || wd_pst.y < -1) {
								wd_pst.y = r_hgt/2;
							}
							else {
								wd_pst.y = (r_hgt/2) + (wd_pst.y * (r_hgt - wd_hgt)/2);
							}
							// east side wall WINDOW
							var e_wall_wnd = document.createElement('a-box');
							e_wall_wnd.setAttribute('position', {x: (r_len - r_tkns)/2, y: -wd_pst.x * ((r_bth/2)-r_tkns-(wd_wth/2)), z: wd_pst.y});
							e_wall_wnd.setAttribute('rotation', {x: 180, y: -90, z: -90});
							e_wall_wnd.setAttribute('width', wd_wth);
							e_wall_wnd.setAttribute('height', wd_hgt);
							e_wall_wnd.setAttribute('depth', r_tkns/2);
							e_wall_wnd.setAttribute('color', this.data.e_wall_wd_color);
							e_wall_wnd.setAttribute('opacity', 0.4);
							
							// east side window's left side wall
							var point_x = -((wd_pst.x * ((r_bth/2)-r_tkns-(wd_wth/2))) + (wd_wth/2));
							var point_y = -(r_bth/2);
							var e_wnd_left_wall = document.createElement('a-box');
							e_wnd_left_wall.setAttribute('position', {x: -((point_x - point_y)/2)-(wd_wth/2), y: 0, z: 0});
							e_wnd_left_wall.setAttribute('width', point_x - point_y);
							e_wnd_left_wall.setAttribute('height', wd_hgt);
							e_wnd_left_wall.setAttribute('depth', r_tkns);
							e_wnd_left_wall.setAttribute('color', this.data.roomColor);
							e_wall_wnd.appendChild(e_wnd_left_wall);
							
							// east side window's right side wall
							var point_xx = -(wd_pst.x * ((r_bth/2)-r_tkns-(wd_wth/2))) + (wd_wth/2);
							var point_yy = r_bth/2;
							var e_wnd_right_wall = document.createElement('a-box');
							e_wnd_right_wall.setAttribute('position', {x: -((point_xx - point_yy)/2)+(wd_wth/2), y: 0, z: 0});
							e_wnd_right_wall.setAttribute('width', point_yy - point_xx);
							e_wnd_right_wall.setAttribute('height', wd_hgt);
							e_wnd_right_wall.setAttribute('depth', r_tkns);
							e_wnd_right_wall.setAttribute('color', this.data.roomColor);
							e_wall_wnd.appendChild(e_wnd_right_wall);
							
							// east side window's UPPER side wall
							if(wd_pst.y + (wd_hgt/2) !== r_hgt) {
								var e_wnd_up_wall_hgt = r_hgt-(wd_pst.y + (wd_hgt/2));
								var e_wnd_up_wall = document.createElement('a-box');
								e_wnd_up_wall.setAttribute('position', {x: wd_pst.x * ((r_bth/2)-r_tkns-(wd_wth/2)), y: (wd_hgt + e_wnd_up_wall_hgt)/2, z: 0});
								e_wnd_up_wall.setAttribute('width', r_bth);
								e_wnd_up_wall.setAttribute('height', e_wnd_up_wall_hgt);
								e_wnd_up_wall.setAttribute('depth', r_tkns);
								e_wnd_up_wall.setAttribute('color', this.data.roomColor);
								e_wall_wnd.appendChild(e_wnd_up_wall);
							}
							
							// east side window's DOWN side wall
							if(wd_pst.y - (wd_hgt/2) !== 0) {
								var e_wnd_low_wall_hgt = (wd_pst.y - (wd_hgt/2));
								var e_wnd_low_wall = document.createElement('a-box');
								e_wnd_low_wall.setAttribute('position', {x: wd_pst.x * ((r_bth/2)-r_tkns-(wd_wth/2)), y: -(wd_hgt + e_wnd_low_wall_hgt)/2, z: 0});
								e_wnd_low_wall.setAttribute('width', r_bth);
								e_wnd_low_wall.setAttribute('height', e_wnd_low_wall_hgt);
								e_wnd_low_wall.setAttribute('depth', r_tkns);
								e_wnd_low_wall.setAttribute('color', this.data.roomColor);
								e_wall_wnd.appendChild(e_wnd_low_wall);
							}
							
							base.appendChild(e_wall_wnd); /*east wall with window append with the base*/
						}
						///////////////%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
						// Multiple window in EAST wall
						else if(wd_qnt > 1) {
							if(wd_hgt > r_hgt) {
								wd_hgt = r_hgt / 2;
							}
							if(wd_qnt * wd_wth > r_bth - (2*r_tkns)) {
								wd_wth = (r_bth - (2*r_tkns)) / (2*wd_qnt);
								console.log('window width is minimize');
							}
							
							/////////*******************************************************************
							// set position
							// Means where you want to be put your windows based on height[y-axis]
							// Here we use "wnd_pst.y" for height, remember that "wnd_pst": type is 'vec2'
							// you can also create different attributes
							var y_pst;
							if(wd_pst.y > 1 || wd_pst.y < -1) {
								y_pst = r_hgt / 2;
							}
							else {
								y_pst = (r_hgt/2) + ( wd_pst.y * (r_hgt - wd_hgt)/2 );
							}
							/////////*******************************************************************
							
							var wall_len = r_bth - (2 * r_tkns);
							var free_space_wall_len = wall_len - (wd_qnt * wd_wth);
							var free_space_each_wall_width = free_space_wall_len / (wd_qnt + 1);
							// if even no of window
							if(wd_qnt % 2 === 0) {
								// EAST Window CENTER free space wall
								var center_wall = document.createElement('a-box');
								center_wall.setAttribute('position', {x: (r_len - r_tkns)/2, y: 0, z: y_pst});
								center_wall.setAttribute('rotation', {x: 180, y: -90, z: -90});
								center_wall.setAttribute('width', free_space_each_wall_width);
								center_wall.setAttribute('height', wd_hgt);
								center_wall.setAttribute('depth', r_tkns);
								center_wall.setAttribute('color', this.data.roomColor);
								
								// distance between center of both window and free_space_wall
								var len = (wd_wth + free_space_each_wall_width)/2;
								for(var i = 0; i < wd_qnt / 2; i++) {
									// right window [means: x+ axis]
									multi_window( ((2*i) + 1) * len, 0, 0, this.data.w_wall_wd_color);
									// left window [means: x- axis]
									multi_window(- ((2*i) + 1) * len, 0, 0, this.data.w_wall_wd_color);
									if(i == wd_qnt/2 - 1) {
										// right side wall after window
										free_space_box(((2*(i+1)) * len ) + (r_tkns/2) , 0, 0, this.data.roomColor, i);
										// left side wall after window
										free_space_box(-(((2*(i+1)) * len) + (r_tkns/2)), 0, 0, this.data.roomColor, i);
									}
									else {
										// right side wall after window
										free_space_box( (2*(i+1)) * len, 0, 0, this.data.roomColor);
										// left side wall after window
										free_space_box(-(2*(i+1)) * len, 0, 0, this.data.roomColor);
									}
								}
								// EAST side MULTI Window upper wall
								var up_wall_hgt = r_hgt - (y_pst + (wd_hgt/2));
								var y_post = (wd_hgt + up_wall_hgt)/2;
								if(y_pst + (wd_hgt/2) != r_hgt) {
									var e_up_wall = document.createElement('a-box');
									e_up_wall.setAttribute('position', {x: 0, y: y_post, z: 0});
									e_up_wall.setAttribute('width', r_bth);
									e_up_wall.setAttribute('height', up_wall_hgt);
									e_up_wall.setAttribute('depth', r_tkns);
									e_up_wall.setAttribute('color', this.data.roomColor);
									center_wall.appendChild(e_up_wall);
								}
								// EAST side MULTI Window lower wall
								var low_wall_hgt = y_pst - (wd_hgt/2);
								var Y_post = -((wd_hgt + low_wall_hgt)/2);
								if(y_pst - (wd_hgt/2) !== 0) {
									var e_low_wall = document.createElement('a-box');
									e_low_wall.setAttribute('position', {x: 0, y: Y_post, z: 0});
									e_low_wall.setAttribute('width', r_bth);
									e_low_wall.setAttribute('height', low_wall_hgt);
									e_low_wall.setAttribute('depth', r_tkns);
									e_low_wall.setAttribute('color', this.data.roomColor);
									center_wall.appendChild(e_low_wall);
								}
									
								base.appendChild(center_wall);
								
								// MULTI WINDOW function
								function multi_window(x1,y1,z1, window_color) {
									var window = document.createElement('a-box');
									window.setAttribute('position', {x: x1, y: y1, z: z1});
									window.setAttribute('width', wd_wth);
									window.setAttribute('height', wd_hgt);
									window.setAttribute('depth', r_tkns/2);
									window.setAttribute('color', window_color);
									window.setAttribute('opacity', 0.4);
									
									center_wall.appendChild(window);
								}
								// MULTI WINDOW free space wall function
								function free_space_box(x2,y2,z2, room_color, i) {
									var extra = 0;
									if(i === wd_qnt / 2 - 1) {
										extra = extra + r_tkns;
									}
									var free_space_wall = document.createElement('a-box');
									free_space_wall.setAttribute('position', {x: x2, y: y2, z: z2});
									free_space_wall.setAttribute('width', free_space_each_wall_width + extra);
									free_space_wall.setAttribute('height', wd_hgt);
									free_space_wall.setAttribute('depth', r_tkns);
									free_space_wall.setAttribute('color', room_color);
									
									center_wall.appendChild(free_space_wall);
								}
							}
							// if ODD number of windows in EAST wall
							else {
								var center_window = document.createElement('a-box');
								center_window.setAttribute('position', {x: (r_len-r_tkns)/2, y: 0, z: y_pst});
								center_window.setAttribute('rotation', {x: 0, y: -90, z: -90});
								center_window.setAttribute('width', wd_wth);
								center_window.setAttribute('height', wd_hgt);
								center_window.setAttribute('depth', r_tkns/2);
								center_window.setAttribute('color', this.data.w_wall_wd_color);
								center_window.setAttribute('opacity', 0.4);
								
								// distance between center of both window and free_space_wall
								var len = (wd_wth + free_space_each_wall_width)/2;
								for(var i = 0; i < wd_qnt; i++) {
									if(i % 2 === 0) {
										if(i === wd_qnt - 1) {
											// Right side
											free_space_wall( ((i+1)*len)+(r_tkns/2), 0, 0, this.data.roomColor, i);
											// Left side
											free_space_wall( -(((i+1)*len) + (r_tkns/2)), 0, 0, this.data.roomColor, i);
										}
										else {
											// Right side
											free_space_wall( (i+1)*len, 0, 0, this.data.roomColor, i);
											// Left side
											free_space_wall( -(i+1)*len, 0, 0, this.data.roomColor, i);
										}
									}
									else {
										// Right side
										multi_window( (i+1)*len, 0, 0, this.data.w_wall_wd_color);
										// Left side
										multi_window( -(i+1)*len, 0, 0, this.data.w_wall_wd_color);
									}
								}
								
								// EAST side MULTI Window upper wall
								var up_wall_hgt = r_hgt - (y_pst + (wd_hgt/2));
								var y_post = (wd_hgt + up_wall_hgt)/2;
								if(y_pst + (wd_hgt/2) != r_hgt) {
									var e_up_wall = document.createElement('a-box');
									e_up_wall.setAttribute('position', {x: 0, y: y_post, z: 0});
									e_up_wall.setAttribute('width', r_bth);
									e_up_wall.setAttribute('height', up_wall_hgt);
									e_up_wall.setAttribute('depth', r_tkns);
									e_up_wall.setAttribute('color', this.data.roomColor);
									center_window.appendChild(e_up_wall);
								}
								// WEST side MULTI Window lower wall
								var low_wall_hgt = y_pst - (wd_hgt/2);
								var Y_post = -((wd_hgt + low_wall_hgt)/2);
								if(y_pst - (wd_hgt/2) !== 0) {
									var e_low_wall = document.createElement('a-box');
									e_low_wall.setAttribute('position', {x: 0, y: Y_post, z: 0});
									e_low_wall.setAttribute('width', r_bth);
									e_low_wall.setAttribute('height', low_wall_hgt);
									e_low_wall.setAttribute('depth', r_tkns);
									e_low_wall.setAttribute('color', this.data.roomColor);
									center_window.appendChild(e_low_wall);
								}
								
								base.appendChild(center_window);
								
								// MULTI WINDOW function
								function multi_window(x1,y1,z1, window_color) {
									var window = document.createElement('a-box');
									window.setAttribute('position', {x: x1, y: y1, z: z1});
									window.setAttribute('width', wd_wth);
									window.setAttribute('height', wd_hgt);
									window.setAttribute('depth', r_tkns/2);
									window.setAttribute('color', window_color);
									window.setAttribute('opacity', 0.4);
									
									center_window.appendChild(window);
								}
								// MULTI WINDOW free space wall function
								function free_space_wall(x2,y2,z2, room_color, i) {
									var extra = 0;
									if(i === wd_qnt - 1) {
										extra = extra + r_tkns;
									}
									var free_space_wall = document.createElement('a-box');
									free_space_wall.setAttribute('position', {x: x2, y: y2, z: z2});
									free_space_wall.setAttribute('width', free_space_each_wall_width + extra);
									free_space_wall.setAttribute('height', wd_hgt);
									free_space_wall.setAttribute('depth', r_tkns);
									free_space_wall.setAttribute('color', room_color);
									
									center_window.appendChild(free_space_wall);
								}
							}
						}
						///////////////%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
					}
					// EAST side wall without WINDOW
					else {
						var east_side_wall = document.createElement('a-box');
						east_side_wall.setAttribute('position', {x: (r_len - r_tkns) / 2, y: 0, z: r_hgt / 2});
						east_side_wall.setAttribute('rotation', {x: 0, y: 90, z: 90});
						east_side_wall.setAttribute('width', r_bth);
						east_side_wall.setAttribute('height', r_hgt);
						east_side_wall.setAttribute('depth', r_tkns);
						east_side_wall.setAttribute('color', this.data.roomColor);
						base.appendChild(east_side_wall);
					}
					/************************************************************************************/
					/************************************************************************************/
					// WEST side wall with window
					if(this.data.w_wall_wd !== false) {
						var wd_qnt = this.data.w_wall_wd_quantity;
						var wd_wth = this.data.w_wall_wd_width;
						var wd_hgt = this.data.w_wall_wd_height;
						var wd_pst = this.data.w_wall_wd_position;
						// make only ONE window at any position of the wall
						if(wd_qnt < 2) {
							if(wd_wth > r_bth - (2 * r_tkns)) {
								wd_wth = (r_bth - (2 * r_tkns)) / 2;
							}
							if(wd_hgt > r_hgt) {
								wd_hgt = r_hgt / 2;
							}
							if(wd_pst.x > 1 || wd_pst.x < -1) {
								wd_pst.x = 0;
							}
							if(wd_pst.y > 1 || wd_pst.y < -1) {
								wd_pst.y = r_hgt/2;
							}
							else {
								wd_pst.y = (r_hgt/2) + (wd_pst.y * (r_hgt - wd_hgt)/2);
							}
							// WEST side wall window
							var w_wall_wnd = document.createElement('a-box');
							w_wall_wnd.setAttribute('position', {x: -(r_len - r_tkns)/2, y: wd_pst.x * ((r_bth/2)-r_tkns-(wd_wth/2)), z: wd_pst.y});
							w_wall_wnd.setAttribute('rotation', {x: 0, y: -90, z: -90});
							w_wall_wnd.setAttribute('width', wd_wth);
							w_wall_wnd.setAttribute('height', wd_hgt);
							w_wall_wnd.setAttribute('depth', r_tkns/2);
							w_wall_wnd.setAttribute('color', this.data.w_wall_wd_color);
							w_wall_wnd.setAttribute('opacity', 0.4);
							
							// west side window's left side wall
							var point_x = -((wd_pst.x * ((r_bth/2)-r_tkns-(wd_wth/2))) + (wd_wth/2));
							var point_y = -(r_bth/2);
							var w_wnd_left_wall = document.createElement('a-box');
							w_wnd_left_wall.setAttribute('position', {x: -((point_x - point_y)/2)-(wd_wth/2), y: 0, z: 0});
							w_wnd_left_wall.setAttribute('width', point_x - point_y);
							w_wnd_left_wall.setAttribute('height', wd_hgt);
							w_wnd_left_wall.setAttribute('depth', r_tkns);
							w_wnd_left_wall.setAttribute('color', this.data.roomColor);
							w_wall_wnd.appendChild(w_wnd_left_wall);
							
							// west side window's right side wall
							var point_xx = -(wd_pst.x * ((r_bth/2)-r_tkns-(wd_wth/2))) + (wd_wth/2);
							var point_yy = r_bth/2;
							var w_wnd_right_wall = document.createElement('a-box');
							w_wnd_right_wall.setAttribute('position', {x: -((point_xx - point_yy)/2)+(wd_wth/2), y: 0, z: 0});
							w_wnd_right_wall.setAttribute('width', point_yy - point_xx);
							w_wnd_right_wall.setAttribute('height', wd_hgt);
							w_wnd_right_wall.setAttribute('depth', r_tkns);
							w_wnd_right_wall.setAttribute('color', this.data.roomColor);
							w_wall_wnd.appendChild(w_wnd_right_wall);
							
							// west side window's UPPER side wall
							if(wd_pst.y + (wd_hgt/2) !== r_hgt) {
								var w_wnd_up_wall_hgt = r_hgt-(wd_pst.y + (wd_hgt/2));
								var w_wnd_up_wall = document.createElement('a-box');
								w_wnd_up_wall.setAttribute('position', {x: wd_pst.x * ((r_bth/2)-r_tkns-(wd_wth/2)), y: (wd_hgt + w_wnd_up_wall_hgt)/2, z: 0});
								w_wnd_up_wall.setAttribute('width', r_bth);
								w_wnd_up_wall.setAttribute('height', w_wnd_up_wall_hgt);
								w_wnd_up_wall.setAttribute('depth', r_tkns);
								w_wnd_up_wall.setAttribute('color', this.data.roomColor);
								w_wall_wnd.appendChild(w_wnd_up_wall);
							}
							
							// west side window's DOWN side wall
							if(wd_pst.y - (wd_hgt/2) !== 0) {
								var w_wnd_low_wall_hgt = (wd_pst.y - (wd_hgt/2));
								var w_wnd_low_wall = document.createElement('a-box');
								w_wnd_low_wall.setAttribute('position', {x: wd_pst.x * ((r_bth/2)-r_tkns-(wd_wth/2)), y: -(wd_hgt + w_wnd_low_wall_hgt)/2, z: 0});
								w_wnd_low_wall.setAttribute('width', r_bth);
								w_wnd_low_wall.setAttribute('height', w_wnd_low_wall_hgt);
								w_wnd_low_wall.setAttribute('depth', r_tkns);
								w_wnd_low_wall.setAttribute('color', this.data.roomColor);
								w_wall_wnd.appendChild(w_wnd_low_wall);
							}
							
							base.appendChild(w_wall_wnd); /*west wall with window append with the base*/
						}
						//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
						// Multiple window in WEST wall
						else if(wd_qnt > 1) {
							if(wd_hgt > r_hgt) {
								wd_hgt = r_hgt / 2;
							}
							if(wd_qnt * wd_wth > r_bth - (2*r_tkns)) {
								wd_wth = (r_bth - (2*r_tkns)) / (2*wd_qnt);
								console.log('window width is minimize');
							}
							
							/////////*******************************************************************
							// set position
							// Means where you want to be put your windows based on height[y-axis]
							// Here we use "wnd_pst.y" for height, remember that "wnd_pst": type is 'vec2'
							// you can also create different attributes
							var y_pst;
							if(wd_pst.y > 1 || wd_pst.y < -1) {
								y_pst = r_hgt / 2;
							}
							else {
								y_pst = (r_hgt/2) + ( wd_pst.y * (r_hgt - wd_hgt)/2 );
							}
							/////////*******************************************************************
							
							var wall_len = r_bth - (2 * r_tkns);
							var free_space_wall_len = wall_len - (wd_qnt * wd_wth);
							var free_space_each_wall_width = free_space_wall_len / (wd_qnt + 1);
							// if even no of window
							if(wd_qnt % 2 === 0) {
								// WEST Window CENTER free space wall
								var center_wall = document.createElement('a-box');
								center_wall.setAttribute('position', {x: -(r_len - r_tkns)/2, y: 0, z: y_pst});
								center_wall.setAttribute('rotation', {x: 0, y: -90, z: -90});
								center_wall.setAttribute('width', free_space_each_wall_width);
								center_wall.setAttribute('height', wd_hgt);
								center_wall.setAttribute('depth', r_tkns);
								center_wall.setAttribute('color', this.data.roomColor);
								
								// distance between center of both window and free_space_wall
								var len = (wd_wth + free_space_each_wall_width)/2;
								for(var i = 0; i < wd_qnt / 2; i++) {
									// right window [means: x+ axis]
									multi_window( ((2*i) + 1) * len, 0, 0, this.data.w_wall_wd_color);
									// left window [means: x- axis]
									multi_window(- ((2*i) + 1) * len, 0, 0, this.data.w_wall_wd_color);
									if(i == wd_qnt/2 - 1) {
										// right side wall after window
										free_space_box(((2*(i+1)) * len ) + (r_tkns/2) , 0, 0, this.data.roomColor, i);
										// left side wall after window
										free_space_box(-(((2*(i+1)) * len) + (r_tkns/2)), 0, 0, this.data.roomColor, i);
									}
									else {
										// right side wall after window
										free_space_box( (2*(i+1)) * len, 0, 0, this.data.roomColor);
										// left side wall after window
										free_space_box(-(2*(i+1)) * len, 0, 0, this.data.roomColor);
									}
								}
								// WEST side MULTI Window upper wall
								var up_wall_hgt = r_hgt - (y_pst + (wd_hgt/2));
								var y_post = (wd_hgt + up_wall_hgt)/2;
								if(y_pst + (wd_hgt/2) != r_hgt) {
									var w_up_wall = document.createElement('a-box');
									w_up_wall.setAttribute('position', {x: 0, y: y_post, z: 0});
									w_up_wall.setAttribute('width', r_bth);
									w_up_wall.setAttribute('height', up_wall_hgt);
									w_up_wall.setAttribute('depth', r_tkns);
									w_up_wall.setAttribute('color', this.data.roomColor);
									center_wall.appendChild(w_up_wall);
								}
								// WEST side MULTI Window lower wall
								var low_wall_hgt = y_pst - (wd_hgt/2);
								var Y_post = -((wd_hgt + low_wall_hgt)/2);
								if(y_pst - (wd_hgt/2) !== 0) {
									var w_low_wall = document.createElement('a-box');
									w_low_wall.setAttribute('position', {x: 0, y: Y_post, z: 0});
									w_low_wall.setAttribute('width', r_bth);
									w_low_wall.setAttribute('height', low_wall_hgt);
									w_low_wall.setAttribute('depth', r_tkns);
									w_low_wall.setAttribute('color', this.data.roomColor);
									center_wall.appendChild(w_low_wall);
								}
									
								base.appendChild(center_wall);
								
								// MULTI WINDOW function
								function multi_window(x1,y1,z1, window_color) {
									var window = document.createElement('a-box');
									window.setAttribute('position', {x: x1, y: y1, z: z1});
									window.setAttribute('width', wd_wth);
									window.setAttribute('height', wd_hgt);
									window.setAttribute('depth', r_tkns/2);
									window.setAttribute('color', window_color);
									window.setAttribute('opacity', 0.4);
									
									center_wall.appendChild(window);
								}
								// MULTI WINDOW free space wall function
								function free_space_box(x2,y2,z2, room_color, i) {
									var extra = 0;
									if(i === wd_qnt / 2 - 1) {
										extra = extra + r_tkns;
									}
									var free_space_wall = document.createElement('a-box');
									free_space_wall.setAttribute('position', {x: x2, y: y2, z: z2});
									free_space_wall.setAttribute('width', free_space_each_wall_width + extra);
									free_space_wall.setAttribute('height', wd_hgt);
									free_space_wall.setAttribute('depth', r_tkns);
									free_space_wall.setAttribute('color', room_color);
									
									center_wall.appendChild(free_space_wall);
								}
							}
							// if ODD number of windows in WEST wall
							else {
								var center_window = document.createElement('a-box');
								center_window.setAttribute('position', {x: -(r_len-r_tkns)/2, y: 0, z: y_pst});
								center_window.setAttribute('rotation', {x: 0, y: -90, z: -90});
								center_window.setAttribute('width', wd_wth);
								center_window.setAttribute('height', wd_hgt);
								center_window.setAttribute('depth', r_tkns/2);
								center_window.setAttribute('color', this.data.w_wall_wd_color);
								center_window.setAttribute('opacity', 0.4);
								
								// distance between center of both window and free_space_wall
								var len = (wd_wth + free_space_each_wall_width)/2;
								for(var i = 0; i < wd_qnt; i++) {
									if(i % 2 === 0) {
										if(i === wd_qnt - 1) {
											// Right side
											free_space_wall( ((i+1)*len)+(r_tkns/2), 0, 0, this.data.roomColor, i);
											// Left side
											free_space_wall( -(((i+1)*len) + (r_tkns/2)), 0, 0, this.data.roomColor, i);
										}
										else {
											// Right side
											free_space_wall( (i+1)*len, 0, 0, this.data.roomColor, i);
											// Left side
											free_space_wall( -(i+1)*len, 0, 0, this.data.roomColor, i);
										}
									}
									else {
										// Right side
										multi_window( (i+1)*len, 0, 0, this.data.w_wall_wd_color);
										// Left side
										multi_window( -(i+1)*len, 0, 0, this.data.w_wall_wd_color);
									}
								}
								
								// WEST side MULTI Window upper wall
								var up_wall_hgt = r_hgt - (y_pst + (wd_hgt/2));
								var y_post = (wd_hgt + up_wall_hgt)/2;
								if(y_pst + (wd_hgt/2) != r_hgt) {
									var w_up_wall = document.createElement('a-box');
									w_up_wall.setAttribute('position', {x: 0, y: y_post, z: 0});
									w_up_wall.setAttribute('width', r_bth);
									w_up_wall.setAttribute('height', up_wall_hgt);
									w_up_wall.setAttribute('depth', r_tkns);
									w_up_wall.setAttribute('color', this.data.roomColor);
									center_window.appendChild(w_up_wall);
								}
								// WEST side MULTI Window lower wall
								var low_wall_hgt = y_pst - (wd_hgt/2);
								var Y_post = -((wd_hgt + low_wall_hgt)/2);
								if(y_pst - (wd_hgt/2) !== 0) {
									var w_low_wall = document.createElement('a-box');
									w_low_wall.setAttribute('position', {x: 0, y: Y_post, z: 0});
									w_low_wall.setAttribute('width', r_bth);
									w_low_wall.setAttribute('height', low_wall_hgt);
									w_low_wall.setAttribute('depth', r_tkns);
									w_low_wall.setAttribute('color', this.data.roomColor);
									center_window.appendChild(w_low_wall);
								}
								
								base.appendChild(center_window);
								
								// MULTI WINDOW function
								function multi_window(x1,y1,z1, window_color) {
									var window = document.createElement('a-box');
									window.setAttribute('position', {x: x1, y: y1, z: z1});
									window.setAttribute('width', wd_wth);
									window.setAttribute('height', wd_hgt);
									window.setAttribute('depth', r_tkns/2);
									window.setAttribute('color', window_color);
									window.setAttribute('opacity', 0.4);
									
									center_window.appendChild(window);
								}
								// MULTI WINDOW free space wall function
								function free_space_wall(x2,y2,z2, room_color, i) {
									var extra = 0;
									if(i === wd_qnt - 1) {
										extra = extra + r_tkns;
									}
									var free_space_wall = document.createElement('a-box');
									free_space_wall.setAttribute('position', {x: x2, y: y2, z: z2});
									free_space_wall.setAttribute('width', free_space_each_wall_width + extra);
									free_space_wall.setAttribute('height', wd_hgt);
									free_space_wall.setAttribute('depth', r_tkns);
									free_space_wall.setAttribute('color', room_color);
									
									center_window.appendChild(free_space_wall);
								}
							}
						}
						//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					}
					
					// WEST side wall without WINDOW
					else {
						var west_side_wall = document.createElement('a-box');
						west_side_wall.setAttribute('position', {x: -(r_len - r_tkns) / 2, y: 0, z: r_hgt / 2});
						west_side_wall.setAttribute('rotation', {x: 0, y: -90, z: -90});
						west_side_wall.setAttribute('width', r_bth);
						west_side_wall.setAttribute('height',r_hgt);
						west_side_wall.setAttribute('depth', r_tkns);
						west_side_wall.setAttribute('color', this.data.roomColor);
						
						base.appendChild(west_side_wall);
					}
					/************************************************************************************/
					/************************************************************************************/
					// NORTH side wall with window
					if(this.data.n_wall_wd !== false) {
						var wnd_qnt = this.data.n_wall_wd_quantity;
						var wnd_width = this.data.n_wall_wd_width;
						var wnd_height = this.data.n_wall_wd_height;
						var wnd_pst = this.data.n_wall_wd_position;
						// make only ONE window at any position of the wall
						if(wnd_qnt < 2) {
							if(wnd_width > r_len - (2 * r_tkns)) {
								wnd_width = (r_len - (2 * r_tkns)) / 2;
							}
							if(wnd_height > r_hgt) {
								wnd_height = r_hgt / 2;
							}
							if(wnd_pst.x > 1 || wnd_pst.x < -1) {
								wnd_pst.x = 0;
							}
							if(wnd_pst.y > 1 || wnd_pst.y < -1) {
								wnd_pst.y = r_hgt/2;
							}
							else {
								wnd_pst.y = (r_hgt/2) + (wnd_pst.y * (r_hgt - wnd_height)/2);
							}
							// North side wall window
							var n_wall_wnd = document.createElement('a-box');
							n_wall_wnd.setAttribute('position', {x: wnd_pst.x * ((r_len/2)-r_tkns-(wnd_width/2)), y: (r_bth - r_tkns)/2, z: wnd_pst.y});
							n_wall_wnd.setAttribute('rotation', {x: 90, y: 0, z: 0});
							n_wall_wnd.setAttribute('width', wnd_width);
							n_wall_wnd.setAttribute('height', wnd_height);
							n_wall_wnd.setAttribute('depth', r_tkns/2);
							n_wall_wnd.setAttribute('color', this.data.n_wall_wd_color);
							n_wall_wnd.setAttribute('opacity', 0.4);
							
							// North window right side wall
							var pointY = -((r_len/2) - r_tkns);
							var pointX = (wnd_pst.x * ((r_len/2)-r_tkns-(wnd_width/2))) - (wnd_width/2);
							if(pointX !== pointY) {
								var n_wnd_right_wall = document.createElement('a-box');
								n_wnd_right_wall.setAttribute('position', {x: -(((pointX - pointY)/2)+(wnd_width/2)), y: 0, z: 0});
								n_wnd_right_wall.setAttribute('width', pointX - pointY);
								n_wnd_right_wall.setAttribute('height', wnd_height);
								n_wnd_right_wall.setAttribute('depth', r_tkns);
								n_wnd_right_wall.setAttribute('color', this.data.roomColor);
								n_wall_wnd.appendChild(n_wnd_right_wall);
							}
							// North window left side wall
							var point_Y = (r_len/2) - r_tkns;
							var point_X = (wnd_pst.x * ((r_len/2)-r_tkns-(wnd_width/2))) + (wnd_width/2);
							if(point_X !== point_Y) {
								var n_wnd_left_wall = document.createElement('a-box');
								n_wnd_left_wall.setAttribute('position', {x: ((point_Y - point_X)/2)+(wnd_width/2), y: 0, z: 0});
								n_wnd_left_wall.setAttribute('width', point_Y - point_X);
								n_wnd_left_wall.setAttribute('height', wnd_height);
								n_wnd_left_wall.setAttribute('depth', r_tkns);
								n_wnd_left_wall.setAttribute('color', this.data.roomColor);
								n_wall_wnd.appendChild(n_wnd_left_wall);
							}
							// North window upper wall
							var n_wnd_up_wall_hgt = r_hgt - (wnd_pst.y + (wnd_height/2));
							var y_position = (wnd_height + n_wnd_up_wall_hgt)/2;
							if(wnd_pst.y + (wnd_height/2) !== r_hgt) {
								var n_wnd_up_wall = document.createElement('a-box');
								n_wnd_up_wall.setAttribute('position', {x: -(wnd_pst.x * ((r_len/2)-r_tkns-(wnd_width/2))), y: y_position, z: 0});
								n_wnd_up_wall.setAttribute('width', r_len - (2 * r_tkns));
								n_wnd_up_wall.setAttribute('height', n_wnd_up_wall_hgt);
								n_wnd_up_wall.setAttribute('depth', r_tkns);
								n_wnd_up_wall.setAttribute('color', this.data.roomColor);
								n_wall_wnd.appendChild(n_wnd_up_wall);
							}
							// North window lower wall
							var n_wnd_low_wall_hgt = wnd_pst.y - (wnd_height/2);
							var Y_position = -((wnd_height + n_wnd_low_wall_hgt)/2);
							if(wnd_pst.y - (wnd_height/2) !== 0) {
								var n_wnd_low_wall = document.createElement('a-box');
								n_wnd_low_wall.setAttribute('position', {x: -(wnd_pst.x * ((r_len/2)-r_tkns-(wnd_width/2))), y: Y_position, z: 0});
								n_wnd_low_wall.setAttribute('width', r_len - (2 * r_tkns));
								n_wnd_low_wall.setAttribute('height', n_wnd_low_wall_hgt);
								n_wnd_low_wall.setAttribute('depth', r_tkns);
								n_wnd_low_wall.setAttribute('color', this.data.roomColor);
								n_wall_wnd.appendChild(n_wnd_low_wall);
							}
							
							base.appendChild(n_wall_wnd);
						}
						/*#############################################*/
						// NORT side wall with MULTIPLE Window
						else if(wnd_qnt > 1) {
							if(wnd_height > r_hgt) {
								wnd_height = r_hgt / 2;
							}
							if(wnd_qnt * wnd_width > r_len - (2*r_tkns)) {
								wnd_width = (r_len - (2*r_tkns)) / (2*wnd_qnt);
								console.log('window width is minimize');
							}
							
							/////////*******************************************************************
							// set position
							// Means where you want to be put your windows based on height[y-axis]
							// Here we use "wnd_pst.y" for height, remember that "wnd_pst": type is 'vec2'
							// you can also take different attributes
							var Y_pst;
							if(wnd_pst.y > 1 || wnd_pst.y < -1) {
								Y_pst = r_hgt / 2;
							}
							else {
								Y_pst = (r_hgt/2) + ( wnd_pst.y * (r_hgt - wnd_height)/2 );
							}
							/////////*******************************************************************
							
							var wall_len = r_len - (2 * r_tkns);
							var free_space_wall_len = wall_len - (wnd_qnt * wnd_width);
							var free_space_each_wall_width = free_space_wall_len / (wnd_qnt + 1);
							// if even no of window
							if(wnd_qnt % 2 === 0) {
								// North Window CENTER free space wall
								var center_wall = document.createElement('a-box');
								center_wall.setAttribute('position', {x: 0, y: (r_bth-r_tkns)/2, z: Y_pst});
								center_wall.setAttribute('rotation', {x: 90, y: 0, z: 0});
								center_wall.setAttribute('width', free_space_each_wall_width);
								center_wall.setAttribute('height', wnd_height);
								center_wall.setAttribute('depth', r_tkns);
								center_wall.setAttribute('color', this.data.roomColor);
								
								// distance between center of both window and free_space_wall
								var len = (wnd_width + free_space_each_wall_width)/2;
								for(var i = 0; i < wnd_qnt/2; i++) {
									// left window [means: x+ axis]
									multi_window( ((2*i) + 1) * len, 0, 0, this.data.n_wall_wd_color);
									// right window [means: x- axis]
									multi_window(- ((2*i) + 1) * len, 0, 0, this.data.n_wall_wd_color);
									// left side wall after window
									free_space_box((2*(i+1)) * len, 0, 0, this.data.roomColor);
									// right side wall after window
									free_space_box(-(2*(i+1)) * len, 0, 0, this.data.roomColor);
								}
								// north side MULTI Window upper wall
								var up_wall_hgt = r_hgt - (Y_pst + (wnd_height/2));
								var y_post = (wnd_height + up_wall_hgt)/2;
								if(Y_pst + (wnd_height/2) != r_hgt) {
									var n_up_wall = document.createElement('a-box');
									n_up_wall.setAttribute('position', {x: 0, y: y_post, z: 0});
									n_up_wall.setAttribute('width', r_len - (2 * r_tkns));
									n_up_wall.setAttribute('height', up_wall_hgt);
									n_up_wall.setAttribute('depth', r_tkns);
									n_up_wall.setAttribute('color', this.data.roomColor);
									center_wall.appendChild(n_up_wall);
								}
								
								// north side MULTI Window lower wall
								var low_wall_hgt = Y_pst - (wnd_height/2);
								var Y_post = -((wnd_height + low_wall_hgt)/2);
								if(Y_pst - (wnd_height/2) !== 0) {
									var n_low_wall = document.createElement('a-box');
									n_low_wall.setAttribute('position', {x: 0, y: Y_post, z: 0});
									n_low_wall.setAttribute('width', r_len - (2 * r_tkns));
									n_low_wall.setAttribute('height', low_wall_hgt);
									n_low_wall.setAttribute('depth', r_tkns);
									n_low_wall.setAttribute('color', this.data.roomColor);
									center_wall.appendChild(n_low_wall);
								}
								
								base.appendChild(center_wall);
								
								// MULTI WINDOW function
								function multi_window(x1,y1,z1, window_color) {
									var window = document.createElement('a-box');
									window.setAttribute('position', {x: x1, y: y1, z: z1});
									window.setAttribute('width', wnd_width);
									window.setAttribute('height', wnd_height);
									window.setAttribute('depth', r_tkns/2);
									window.setAttribute('color', window_color);
									window.setAttribute('opacity', 0.4);
									
									center_wall.appendChild(window);
								}
								// MULTI WINDOW free space wall function
								function free_space_box(x2,y2,z2, room_color) {
									var free_space_wall = document.createElement('a-box');
									free_space_wall.setAttribute('position', {x: x2, y: y2, z: z2});
									free_space_wall.setAttribute('width', free_space_each_wall_width);
									free_space_wall.setAttribute('height', wnd_height);
									free_space_wall.setAttribute('depth', r_tkns);
									free_space_wall.setAttribute('color', room_color);
									
									center_wall.appendChild(free_space_wall);
								}
							}
							// if ODD number of window in the north wall
							else {
								var center_window = document.createElement('a-box');
								center_window.setAttribute('position', {x: 0, y: (r_bth-r_tkns)/2, z: Y_pst});
								center_window.setAttribute('rotation', {x: 90, y: 0, z: 0});
								center_window.setAttribute('width', wnd_width);
								center_window.setAttribute('height', wnd_height);
								center_window.setAttribute('depth', r_tkns/2);
								center_window.setAttribute('color', this.data.n_wall_wd_color);
								center_window.setAttribute('opacity', 0.4);
								
								// distance between center of both window and free_space_wall
								var len = (wnd_width + free_space_each_wall_width)/2;
								for(var i = 0; i < wnd_qnt; i++) {
									if(i % 2 === 0) {
										// Right side
										free_space_wall( (i+1)*len, 0, 0, this.data.roomColor);
										// Left side
										free_space_wall( -(i+1)*len, 0, 0, this.data.roomColor);
									}
									else {
										// Right side
										multi_window( (i+1)*len, 0, 0, this.data.n_wall_wd_color);
										// Left side
										multi_window( -(i+1)*len, 0, 0, this.data.n_wall_wd_color);
									}
								}
								// north side MULTI Window upper wall
								var up_wall_hgt = r_hgt - (Y_pst + (wnd_height/2));
								var y_post = (wnd_height + up_wall_hgt)/2;
								if(Y_pst + (wnd_height/2) != r_hgt) {
									var n_up_wall = document.createElement('a-box');
									n_up_wall.setAttribute('position', {x: 0, y: y_post, z: 0});
									n_up_wall.setAttribute('width', r_len - (2 * r_tkns));
									n_up_wall.setAttribute('height', up_wall_hgt);
									n_up_wall.setAttribute('depth', r_tkns);
									n_up_wall.setAttribute('color', this.data.roomColor);
									center_window.appendChild(n_up_wall);
								}
								
								// north side MULTI Window lower wall
								var low_wall_hgt = Y_pst - (wnd_height/2);
								var Y_post = -((wnd_height + low_wall_hgt)/2);
								if(Y_pst - (wnd_height/2) !== 0) {
									var n_low_wall = document.createElement('a-box');
									n_low_wall.setAttribute('position', {x: 0, y: Y_post, z: 0});
									n_low_wall.setAttribute('width', r_len - (2 * r_tkns));
									n_low_wall.setAttribute('height', low_wall_hgt);
									n_low_wall.setAttribute('depth', r_tkns);
									n_low_wall.setAttribute('color', this.data.roomColor);
									center_window.appendChild(n_low_wall);
								}
								
								base.appendChild(center_window);
								
								// MULTI WINDOW function
								function multi_window(x1,y1,z1, window_color) {
									var window = document.createElement('a-box');
									window.setAttribute('position', {x: x1, y: y1, z: z1});
									window.setAttribute('width', wnd_width);
									window.setAttribute('height', wnd_height);
									window.setAttribute('depth', r_tkns/2);
									window.setAttribute('color', window_color);
									window.setAttribute('opacity', 0.4);
									
									center_window.appendChild(window);
								}
								// MULTI WINDOW free space wall function
								function free_space_wall(x2,y2,z2, room_color) {
									var free_space_wall = document.createElement('a-box');
									free_space_wall.setAttribute('position', {x: x2, y: y2, z: z2});
									free_space_wall.setAttribute('width', free_space_each_wall_width);
									free_space_wall.setAttribute('height', wnd_height);
									free_space_wall.setAttribute('depth', r_tkns);
									free_space_wall.setAttribute('color', room_color);
									
									center_window.appendChild(free_space_wall);
								}
							}
						}
						/*#############################################*/
					}
					// NORTH side wall without WINDOW
					else {
						var north_side_wall = document.createElement('a-box');
						north_side_wall.setAttribute('position', {x: 0, y: (r_bth - r_tkns) / 2, z: r_hgt / 2});
						north_side_wall.setAttribute('rotation', {x: 90, y: 0, z: 0});
						north_side_wall.setAttribute('width', r_len - (2 * r_tkns));
						north_side_wall.setAttribute('height', r_hgt);
						north_side_wall.setAttribute('depth', r_tkns);
						north_side_wall.setAttribute('color', this.data.roomColor);
						base.appendChild(north_side_wall);
					}
					/************************************************************************************/
					
					// Room ceiling
					var room_ceiling = document.createElement('a-box');
					room_ceiling.setAttribute('position', {x: 0, y: 0, z: r_hgt + r_tkns / 2});
					room_ceiling.setAttribute('width', r_len);
					room_ceiling.setAttribute('height', r_bth);
					room_ceiling.setAttribute('depth', r_tkns);
					room_ceiling.setAttribute('color', this.data.ceilColor);
					base.appendChild(room_ceiling);
					/************************************************************************************/
					
					// SOUTH side wall with DOOR
					// It is more flexible, because you can put the door in the wall in any place
					// Remember: door always touch the floor
					if(this.data.southDoor === true){
						// door primitives
						var d_pst = this.data.doorPosition;
						var d_width = this.data.doorWidth;
						var d_height = this.data.doorHeight;
						if(d_pst > 1 || d_pst < -1) {
							d_pst = 0;
						}
						if(d_width > r_len - (2 * r_tkns)) {
							d_width = (r_len - (2 * r_tkns))/2;
						}
						if(d_height > r_hgt) {
							d_height = r_hgt/2;
						}
						// south side wall door
						var south_Wall_door = document.createElement('a-box');
						south_Wall_door.setAttribute('position', {x: d_pst * ((r_len/2)-r_tkns-(d_width/2)), y: -(r_bth - r_tkns) / 2, z: d_height/2});
						south_Wall_door.setAttribute('rotation', {x: 90, y: 0, z: 0});
						south_Wall_door.setAttribute('width', d_width);
						south_Wall_door.setAttribute('height', d_height);
						south_Wall_door.setAttribute('depth', r_tkns/2);
						south_Wall_door.setAttribute('color', this.data.doorColor);
						south_Wall_door.setAttribute('opacity', 0.7);
						
						if(r_hgt !== d_height) {
							// door UPPER wall
							var door_upper_wall = document.createElement('a-box');
							door_upper_wall.setAttribute('position', {x: -(d_pst * ((r_len/2)-r_tkns-(d_width/2))), y: r_hgt/2, z: 0});
							door_upper_wall.setAttribute('width', r_len - (2* r_tkns));
							door_upper_wall.setAttribute('height', r_hgt - d_height);
							door_upper_wall.setAttribute('depth', r_tkns);
							door_upper_wall.setAttribute('color', this.data.roomColor);
							south_Wall_door.appendChild(door_upper_wall);
						}
						
						//door left_side wall [your right]
						var point_Y = (r_len/2) - r_tkns;
						var point_X = d_pst * ((r_len/2)-r_tkns-(d_width/2)) + d_width/2;
						if(point_X !== point_Y) {
							var door_left_wall = document.createElement('a-box');
							door_left_wall.setAttribute('position', {x: (d_width/2) + ((point_Y - point_X)/2), y: 0, z: 0});
							door_left_wall.setAttribute('width', (r_len/2-r_tkns)-(d_pst * ((r_len/2)-r_tkns-(d_width/2)))-(d_width/2));
							door_left_wall.setAttribute('height', d_height);
							door_left_wall.setAttribute('depth', r_tkns);
							door_left_wall.setAttribute('color', this.data.roomColor);
							south_Wall_door.appendChild(door_left_wall);
						}
						
						// door right side wall [your left]
						var point_y = -((r_len/2) - r_tkns);
						var point_x = (d_pst * ((r_len/2)-r_tkns-(d_width/2))) - (d_width/2);
						if(point_x !== point_y) {
							var door_right_wall = document.createElement('a-box');
							door_right_wall.setAttribute('position', {x: (-(d_width/2) - ((point_x - point_y)/2)), y: 0, z: 0});
							door_right_wall.setAttribute('width', point_x-point_y);
							door_right_wall.setAttribute('height', d_height);
							door_right_wall.setAttribute('depth', r_tkns);
							door_right_wall.setAttribute('color', this.data.roomColor);
							south_Wall_door.appendChild(door_right_wall);
						}
						
						base.appendChild(south_Wall_door); /*append south wall with door with the base*/
					}
					
					this.el.appendChild(base); /*append base with the page*/
				}
			});
			
			AFRAME.registerPrimitive('a-room', {
				defaultComponents: {
					room: {}
				},
				mappings: {
					// Room's primitives
					r_color: 		'room.roomColor',
					r_position: 'room.roomPosition',
					r_rotation: 'room.roomRotation',
					r_length: 'room.roomLength',
					r_breath: 'room.roomBreath',
					r_height: 'room.roomHeight',
					r_thickness: 'room.roomThickness',
					r_ceilling_color: 'room.ceilColor',
					// South DOOR's primitives
					south_door: 'room.southDoor',
					door_position: 'room.doorPosition',
					door_width: 'room.doorWidth',
					door_height: 'room.doorHeight',
					door_color: 'room.doorColor',
					// East wall window's primitives
					e_wall_window: 'room.e_wall_wd',
					e_wall_window_quantity: 'room.e_wall_wd_quantity',
					e_wall_window_width: 'room.e_wall_wd_width',
					e_wall_window_height: 'room.e_wall_wd_height',
					e_wall_window_position: 'room.e_wall_wd_position',
					e_wall_window_color: 'room.e_wall_wd_color',
					// West wall window's primitives
					w_wall_window: 'room.w_wall_wd',
					w_wall_window_quantity: 'room.w_wall_wd_quantity',
					w_wall_window_width: 'room.w_wall_wd_width',
					w_wall_window_height: 'room.w_wall_wd_height',
					w_wall_window_position: 'room.w_wall_wd_position',
					w_wall_window_color: 'room.w_wall_wd_color',
					// North wall window's primitives
					n_wall_window: 'room.n_wall_wd',
					n_wall_window_quantity: 'room.n_wall_wd_quantity',
					n_wall_window_width: 'room.n_wall_wd_width',
					n_wall_window_height: 'room.n_wall_wd_height',
					n_wall_window_position: 'room.n_wall_wd_position',
					n_wall_window_color: 'room.n_wall_wd_color'
				}
			});