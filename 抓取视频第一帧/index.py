# -*- coding: utf-8 -*-

import os
from PIL import Image
import cv2

# 获取脚本所在的目录
script_directory = os.path.dirname(os.path.abspath(__file__))
# -*- coding: utf-8 -*-
print(f"脚本所在文件夹: {script_directory}")

# 构建视频文件夹和图片文件夹的路径
video_folder = os.path.join(script_directory, "video")
image_folder = os.path.join(script_directory, "image")

# 创建图片文件夹，如果它不存在
if not os.path.exists(image_folder):
    os.makedirs(image_folder)

# 定义视频文件的扩展名
video_extensions = ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv']

# 遍历视频文件夹中的所有文件
for filename in os.listdir(video_folder):
    # 检查文件是否为视频文件
    if any(filename.lower().endswith(ext) for ext in video_extensions):
        video_path = os.path.join(video_folder, filename)
        # 构建对应的图片文件路径
        image_path = os.path.join(image_folder, os.path.splitext(filename)[0] + '.jpg')

        # 打开视频文件
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            print(f"无法打开视频: {filename}")
            continue

        # 读取视频的第一帧
        ret, frame = cap.read()
        cap.release()

        if ret:
            # 将 OpenCV 的 BGR 格式转换为 RGB 格式
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            # 使用 Pillow 打开图片
            pil_image = Image.fromarray(frame)
            # 保存图片，使用无损压缩参数
            pil_image.save(image_path, 'JPEG', quality=90, optimize=True)
            print(f"已保存视频 {filename} 的第一帧为 {os.path.basename(image_path)}")
        else:
            print(f"无法读取视频 {filename} 的第一帧")
