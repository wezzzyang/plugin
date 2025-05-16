from cairosvg import svg2png

# 定义 SVG 内容
svg_content = """<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72">
    <!-- 绘制圆形 -->
    <circle cx="36" cy="36" r="36" fill="white" />
</svg>
"""

# 将 SVG 字符串转换为 PNG 并保存到文件
png_data = svg2png(bytestring=svg_content)
with open("output.png", "wb") as image_file:
    image_file.write(png_data)
