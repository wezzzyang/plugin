# -*- coding: utf-8 -*-

import os
from PIL import Image
import cv2

# 获取脚本所在的目录
script_directory = os.path.dirname(os.path.abspath(__file__))
# -*- coding: utf-8 -*-
print(f"脚本所在文件夹: {script_directory}")

# 构建视频文件夹和图片文件夹的路径
png_folder = os.path.join(script_directory, "png")
jpg_folder = os.path.join(script_directory, "jpg")

# 创建图片文件夹，如果它不存在
if not os.path.exists(jpg_folder):
    os.makedirs(jpg_folder)

# 定义视频文件的扩展名
video_extensions = [".png", ".jpeg"]

# 遍历视频文件夹中的所有文件
for filename in os.listdir(png_folder):
    # 检查文件是否为视频文件
    if any(filename.lower().endswith(ext) for ext in video_extensions):
        video_path = os.path.join(png_folder, filename)
        # 构建对应的图片文件路径
        image_path = os.path.join(jpg_folder, os.path.splitext(filename)[0] + ".jpg")

        # 打开视频文件
        pngImg = Image.open(video_path)

        # 保存图片，使用无损压缩参数
        pngImg.save(image_path, "JPEG", quality=95, optimize=True)
        print(f"已保存视频 {filename} 的第一帧为 {os.path.basename(image_path)}")
