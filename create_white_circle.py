import numpy as np
from PIL import Image, ImageDraw

# 创建一个72×72的透明背景图像
image = Image.new('RGBA', (72, 72), (0, 0, 0, 0))

# 创建绘图对象
draw = ImageDraw.Draw(image)

# 在图像中心绘制白色圆形
radius = 36  # 圆形半径
center = (36, 36)  # 图像中心点
draw.ellipse((center[0]-radius, center[1]-radius, 
              center[0]+radius, center[1]+radius), 
             fill=(255, 255, 255, 255))  # 白色不透明

# 保存图像
image.save('white_circle.png')

print('已生成白色圆形图片: white_circle.png') 
