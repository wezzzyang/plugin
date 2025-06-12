from PIL import Image
import numpy as np
from collections import Counter


def get_image_colors(image_path, limit=None):
    """
    提取图片中的所有颜色（包括RGBA）

    参数:
        image_path (str): 图片文件路径
        limit (int): 限制返回的颜色数量（None表示返回所有颜色）

    返回:
        list: 包含颜色及其出现次数的列表，按出现次数降序排列
    """
    # 打开图片并转换为RGBA模式
    img = Image.open(image_path).convert("RGBA")

    # 将图片数据转换为numpy数组
    img_data = np.array(img)

    # 获取所有像素的RGBA值
    pixels = img_data.reshape(-1, 4)
    print(pixels)

    # 将每个像素转换为元组并计数
    color_counter = Counter(tuple(pixel) for pixel in pixels)

    # 按出现次数排序
    sorted_colors = sorted(color_counter.items(), key=lambda x: x[1], reverse=True)

    return sorted_colors


def print_colors(colors):
    """打印颜色信息"""
    print(f"{'颜色':<20} {'出现次数':<10}")
    print("-" * 30)
    for color, count in colors:
        r, g, b, a = color
        # 将RGBA值转换为十六进制和十进制表示
        hex_color = "#{:02x}{:02x}{:02x}".format(r, g, b)
        print(f"{hex_color} (R:{r}, G:{g}, B:{b}, A:{a}) : {count}")


if __name__ == "__main__":
    try:
        colors = get_image_colors("E:\\work\\any\\查找图片中的颜色\\test.png", 1)
        print_colors(colors)
    except Exception as e:
        print(f"处理图片时出错: {e}")
