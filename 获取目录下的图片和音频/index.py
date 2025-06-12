import os
import shutil
import json
from pathlib import Path


def organize_media_files(
    source_dir,
    img_output_dir="img",
    sound_output_dir="sound",
    json_output="media_files.json",
):
    """
    扫描源目录中的图片和音频文件，并将它们分类复制到img和sound文件夹

    参数:
        source_dir (str): 源目录路径
        img_output_dir (str): 图片输出目录（默认'img'）
        sound_output_dir (str): 音频输出目录（默认'sound'）
        json_output (str): JSON输出文件路径（默认'media_files.json'）
    """
    # 定义支持的图片和音频文件扩展名
    image_extensions = {
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".tiff",
        ".webp",
        ".svg",
    }
    audio_extensions = {
        ".mp3",
        ".wav",
        ".ogg",
        ".flac",
        ".aac",
        ".m4a",
        ".wma",
        ".amr",
        ".au",
    }

    # 确保源目录存在
    if not os.path.isdir(source_dir):
        print(f"错误: 源目录 '{source_dir}' 不存在")
        return None

    # 创建输出目录（如果不存在）
    os.makedirs(img_output_dir, exist_ok=True)
    os.makedirs(sound_output_dir, exist_ok=True)

    # 初始化结果字典
    media_files = {"images": [], "audio": []}

    # 遍历源目录
    for root, _, files in os.walk(source_dir):
        for file in files:
            file_path = Path(root) / file
            ext = file_path.suffix.lower()

            if ext in image_extensions:
                # 复制图片文件
                dest_path = Path(img_output_dir) / file
                # 如果目标文件已存在，添加数字后缀避免覆盖
                counter = 1
                while dest_path.exists():
                    name, ext = os.path.splitext(file)
                    dest_path = Path(img_output_dir) / f"{name}_{counter}{ext}"
                    counter += 1

                shutil.copy2(file_path, dest_path)
                media_files["images"].append(str(dest_path))

            elif ext in audio_extensions:
                # 复制音频文件
                dest_path = Path(sound_output_dir) / file
                # 如果目标文件已存在，添加数字后缀避免覆盖
                counter = 1
                while dest_path.exists():
                    name, ext = os.path.splitext(file)
                    dest_path = Path(sound_output_dir) / f"{name}_{counter}{ext}"
                    counter += 1

                shutil.copy2(file_path, dest_path)
                media_files["audio"].append(str(dest_path))

    # 输出结果
    print(f"\n处理完成！")
    print(f"源目录: '{source_dir}'")
    print(f"图片输出目录: '{img_output_dir}'")
    print(f"音频输出目录: '{sound_output_dir}'")
    print(f"\n找到的媒体文件:")
    print(f"图片文件数量: {len(media_files['images'])}")
    print(f"音频文件数量: {len(media_files['audio'])}\n")

    # 打印前5个文件示例
    print("图片文件示例:")
    for img in media_files["images"][:5]:
        print(f" - {img}")
    if len(media_files["images"]) > 5:
        print(f" ... (共 {len(media_files['images'])} 个)")

    print("\n音频文件示例:")
    for audio in media_files["audio"][:5]:
        print(f" - {audio}")
    if len(media_files["audio"]) > 5:
        print(f" ... (共 {len(media_files['audio'])} 个)")

    # 保存到JSON文件
    with open(json_output, "w", encoding="utf-8") as f:
        json.dump(media_files, f, ensure_ascii=False, indent=2)
    print(f"\n结果已保存到 '{json_output}'")

    return media_files


if __name__ == "__main__":
    import argparse

    # 设置命令行参数


    outputDir = os.path.dirname(os.path.abspath(__file__))

    # 执行文件组织
    organize_media_files(
        r"C:\Users\回旋工作者\Downloads\base(1)",
        img_output_dir=os.path.join(outputDir, "img"),
        sound_output_dir=os.path.join(outputDir, "sound"),
        json_output=os.path.join(outputDir, "json"),
    )
