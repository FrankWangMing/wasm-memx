// math3d.ts
import * as wasm from "../../Cargo.toml";

export class Math3D {
  // -------- Vec3 --------
  static vec3Add(a: Float32Array, b: Float32Array): Float32Array {
    return wasm.vec3_add(a, b);
  }

  static vec3Sub(a: Float32Array, b: Float32Array): Float32Array {
    return wasm.vec3_sub(a, b);
  }

  static vec3Scale(a: Float32Array, scalar: number): Float32Array {
    return wasm.vec3_scale(a, scalar);
  }

  static vec3Normalize(a: Float32Array): Float32Array {
    return wasm.vec3_normalize(a);
  }

  static vec3Dot(a: Float32Array, b: Float32Array): number {
    return wasm.vec3_dot(a, b);
  }

  static vec3Cross(a: Float32Array, b: Float32Array): Float32Array {
    return wasm.vec3_cross(a, b);
  }

  // -------- Mat4 --------
  static mat4Identity(): Float32Array {
    return wasm.mat4_identity();
  }

  static mat4Multiply(a: Float32Array, b: Float32Array): Float32Array {
    return wasm.mat4_multiply(a, b);
  }

  static mat4Translation(v: Float32Array): Float32Array {
    return wasm.mat4_translation(v);
  }

  static mat4RotationX(angle: number): Float32Array {
    return wasm.mat4_rotation_x(angle);
  }

  static mat4RotationY(angle: number): Float32Array {
    return wasm.mat4_rotation_y(angle);
  }

  static mat4RotationZ(angle: number): Float32Array {
    return wasm.mat4_rotation_z(angle);
  }

  static mat4Scale(v: Float32Array): Float32Array {
    return wasm.mat4_scale(v);
  }

  static mat4Perspective(
    fov: number,
    aspect: number,
    near: number,
    far: number
  ): Float32Array {
    return wasm.mat4_perspective(fov, aspect, near, far);
  }

  static mat4LookAt(
    eye: Float32Array,
    target: Float32Array,
    up: Float32Array
  ): Float32Array {
    return wasm.mat4_look_at(eye, target, up);
  }

  // -------- Quat --------
  static quatFromAxisAngle(axis: Float32Array, angle: number): Float32Array {
    return wasm.quat_from_axis_angle(axis, angle);
  }

  static quatMultiply(a: Float32Array, b: Float32Array): Float32Array {
    return wasm.quat_multiply(a, b);
  }

  static quatRotateVec3(q: Float32Array, v: Float32Array): Float32Array {
    return wasm.quat_rotate_vec3(q, v);
  }
}
