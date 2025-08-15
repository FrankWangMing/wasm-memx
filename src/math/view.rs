use bevy_math::{Affine3A, Mat3A, Mat4, Quat, Vec2, Vec3, Vec4};
use wasm_bindgen::prelude::*;
#[wasm_bindgen]
pub fn look_at_matrix(
    eye_x: f32,
    eye_y: f32,
    eye_z: f32,
    center_x: f32,
    center_y: f32,
    center_z: f32,
    up_x: f32,
    up_y: f32,
    up_z: f32,
) -> Vec<f32> {
    let eye = Vec3::new(eye_x, eye_y, eye_z);
    let center = Vec3::new(center_x, center_y, center_z);
    let up = Vec3::new(up_x, up_y, up_z);
    let mat = Mat4::look_at_rh(eye, center, up);
    mat.to_cols_array().to_vec()
}
