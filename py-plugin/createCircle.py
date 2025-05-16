from PIL import Image, ImageDraw

# 定义高分辨率图片的尺寸
high_res_width, high_res_height = 72 * 4, 72 * 4
# 定义目标图片的尺寸
target_width, target_height = 72, 72

# 创建一个高分辨率的透明背景图像
high_res_image = Image.new("RGBA", (high_res_width, high_res_height), (0, 0, 0, 0))

# 创建一个画笔
high_res_draw = ImageDraw.Draw(high_res_image)

# 定义圆形在高分辨率图像中的位置和大小
center_x, center_y = high_res_width // 2, high_res_height // 2
radius = min(center_x, center_y)

# 绘制白色圆形，开启抗锯齿
high_res_draw.ellipse(
    (center_x - radius, center_y - radius, center_x + radius, center_y + radius),
    fill=(255, 255, 255, 255),
    antialiased=True,
)

# 缩小图像到目标尺寸
final_image = high_res_image.resize((target_width, target_height), Image.ANTIALIAS)

# 保存图片
final_image.save("white_circle_high_res_antialiased.png")

# 显示图片（可选）
final_image.show()
