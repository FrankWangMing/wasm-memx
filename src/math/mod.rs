pub mod projection;
pub mod view;

use bevy_math::{Mat4, Quat, Vec3};
pub use projection::perspective_matrix;
use std::convert::TryInto;
pub use view::look_at_matrix;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn vec3_add(a: &[f32], b: &[f32]) -> Vec<f32> {
    let a: [f32; 3] = a.try_into().unwrap();
    let b: [f32; 3] = b.try_into().unwrap();
    let res = Vec3::from(a) + Vec3::from(b);
    res.to_array().to_vec()
}

#[wasm_bindgen]
pub fn vec3_sub(a: &[f32], b: &[f32]) -> Vec<f32> {
    let a: [f32; 3] = a.try_into().unwrap();
    let b: [f32; 3] = b.try_into().unwrap();
    let res = Vec3::from(a) - Vec3::from(b);
    res.to_array().to_vec()
}

#[wasm_bindgen]
pub fn vec3_cross(a: &[f32], b: &[f32]) -> Vec<f32> {
    let a: [f32; 3] = a.try_into().unwrap();
    let b: [f32; 3] = b.try_into().unwrap();
    let res = Vec3::from(a).cross(Vec3::from(b));
    res.to_array().to_vec()
}

#[wasm_bindgen]
pub fn vec3_dot(a: &[f32], b: &[f32]) -> f32 {
    let a: [f32; 3] = a.try_into().unwrap();
    let b: [f32; 3] = b.try_into().unwrap();
    Vec3::from(a).dot(Vec3::from(b))
}

#[wasm_bindgen]
pub fn vec3_normalize(a: &[f32]) -> Vec<f32> {
    let a: [f32; 3] = a.try_into().unwrap();
    Vec3::from(a).normalize().to_array().to_vec()
}

#[wasm_bindgen]
pub fn quat_from_axis_angle(axis: &[f32], angle: f32) -> Vec<f32> {
    let axis: [f32; 3] = axis.try_into().unwrap();
    Quat::from_axis_angle(Vec3::from(axis), angle)
        .to_array()
        .to_vec()
}

#[wasm_bindgen]
pub fn quat_mul(a: &[f32], b: &[f32]) -> Vec<f32> {
    let a: [f32; 4] = a.try_into().unwrap();
    let b: [f32; 4] = b.try_into().unwrap();
    (Quat::from_array(a) * Quat::from_array(b))
        .to_array()
        .to_vec()
}

#[wasm_bindgen]
pub fn mat4_mul(a: &[f32], b: &[f32]) -> Vec<f32> {
    let a: [f32; 16] = a.try_into().unwrap();
    let b: [f32; 16] = b.try_into().unwrap();
    (Mat4::from_cols_array(&a) * Mat4::from_cols_array(&b))
        .to_cols_array()
        .to_vec()
}

#[wasm_bindgen]
pub fn mat4_inverse(a: &[f32]) -> Vec<f32> {
    let a: [f32; 16] = a.try_into().unwrap();
    Mat4::from_cols_array(&a).inverse().to_cols_array().to_vec()
}

#[wasm_bindgen]
pub fn look_at_rh(eye: &[f32], target: &[f32], up: &[f32]) -> Vec<f32> {
    let eye: [f32; 3] = eye.try_into().unwrap();
    let target: [f32; 3] = target.try_into().unwrap();
    let up: [f32; 3] = up.try_into().unwrap();
    Mat4::look_at_rh(Vec3::from(eye), Vec3::from(target), Vec3::from(up))
        .to_cols_array()
        .to_vec()
}

#[wasm_bindgen]
pub fn perspective_rh(fov_y: f32, aspect: f32, near: f32, far: f32) -> Vec<f32> {
    Mat4::perspective_rh(fov_y, aspect, near, far)
        .to_cols_array()
        .to_vec()
}

#[wasm_bindgen]
pub fn orthographic_rh(
    left: f32,
    right: f32,
    bottom: f32,
    top: f32,
    near: f32,
    far: f32,
) -> Vec<f32> {
    Mat4::orthographic_rh(left, right, bottom, top, near, far)
        .to_cols_array()
        .to_vec()
}
