use wasm_bindgen::prelude::*;
use bevy_math::{
    Vec2, Vec3, Vec4, Mat3A, Mat4, Quat, Affine3A,
};

#[wasm_bindgen]
pub fn perspective_matrix(fov_y_radians: f32, aspect: f32, near: f32, far: f32) -> Vec<f32> {
    let mat = Mat4::perspective_rh_gl(fov_y_radians, aspect, near, far);
    mat.to_cols_array().to_vec()
}
