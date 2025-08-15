declare module "*.toml" {
  const value: {
    [key: string]: any;
  };
  export default value;
  export const vec3_add: any;
  export const vec3_sub: any;
  export const vec3_mul: any;
  export const vec3_div: any;
  export const mat4_identity: any;
  export const mat4_multiply: any;
  export const mat4_translation: any;
  export const mat4_rotation_x: any;
  export const mat4_rotation_y: any;
  export const mat4_rotation_z: any;
  export const mat4_scale: any;
  export const mat4_perspective: any;
  export const mat4_look_at: any;
  export const quat_from_axis_angle: any;
  export const quat_multiply: any;
  export const quat_rotate_vec3: any;
  export const vec3_dot: any;
  export const vec3_cross: any;
  export const vec3_length: any;
  export const vec3_scale: any;
  export const vec3_normalize: any;
  export const create_shared_memory: (
    pageSize: number,
    pages: number
  ) => WebAssembly.Memory;
}
