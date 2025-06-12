# 去除图片中的白色
import os
from PIL import Image

current_image = os.path.dirname(os.path.abspath(__file__)) + "\\" + "game_btikuang.png"


def modify_image(input_path, output_path):
    # 打开图像并转换为 RGBA 模式
    img = Image.open(input_path).convert("RGBA")
    # 获取图像的像素数据
    pixels = img.load()

    # 获取图像的宽度和高度
    width, height = img.size

    # 遍历图像的每个像素
    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            # 检查像素的 RGB 值是否为 (255, 255, 255)
            if r == 0 and g == 0 and b == 0 and a != 0:
                # 修改 RGB 值为 (254, 254, 254)，保留透明通道
                pixels[x, y] = (0, 0, 0, a * 2)

    # 保存修改后的图像
    img.save(output_path)


# 输入图像的路径
input_image_path = "E:\\work\\any\\查找图片中的颜色\\test.png"
# 输出图像的路径
output_image_path = "output.png"

modify_image(input_image_path, output_image_path)
