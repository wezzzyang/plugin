import cv2
import numpy as np
import os

# 获取当前工作目录
current_directory = os.getcwd() + "\\" + "py-plugin" + "\\" + "output.png"
print("当前工作目录:", current_directory)

# 安装OpenCV库：pip install opencv-python
# 1. 加载图像并转换为支持Alpha通道的格式
# OpenCV默认不支持Alpha通道的操作，需要手动添加
img = cv2.imread(current_directory, cv2.IMREAD_UNCHANGED)
if img.shape[2] == 4:
    b, g, r, a = cv2.split(img)
    # 2. 调整Alpha通道
    # 创建一个新的全白（完全不透明）alpha层
    new_alpha = np.ones(a.shape, dtype=a.dtype) * 255
    # 合并新的alpha层到原图其他颜色通道上
    result = cv2.merge((b, g, r, new_alpha))
    # 3. 保存图像
    cv2.imwrite("output_image.png", result)
else:
    print("The loaded image does not have an alpha channel.")
