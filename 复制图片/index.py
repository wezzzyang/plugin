import os
import shutil
import argparse
script_directory = os.path.dirname(os.path.abspath(__file__))

def copy_and_increment(
    source_file, destination_folder=None, count=1, start=1, digits=1
):
    """
    复制文件并按数字规律递增命名。

    :param source_file: 源文件路径
    :param destination_folder: 目标文件夹路径（可选）
    :param count: 复制的数量（可选）
    :param start: 起始编号（可选）
    :param digits: 数字位数（可选）
    """
    # 检查源文件是否存在
    if not os.path.isfile(source_file):
        print(f"源文件不存在: {source_file}")
        return

    # 设置目标文件夹
    if destination_folder is None:
        destination_folder = os.path.dirname(source_file)
    else:
        # 如果目标文件夹不存在，则创建
        if not os.path.exists(destination_folder):
            os.makedirs(destination_folder)

    # 获取源文件名和扩展名
    base, ext = os.path.splitext(os.path.basename(source_file))

    # 确保digits至少为1
    digits = max(1, digits)

    for i in range(start, start + count):
        # 格式化编号，例如 _01, _02, ..., _10
        num_str = f"{i:0{digits}d}"
        new_filename = f"{num_str}{ext}"
        destination_path = os.path.join(destination_folder, new_filename)

        # 复制文件
        shutil.copy2(source_file, destination_path)
        print(f"已复制: {source_file} -> {destination_path}")


def main():
    # parser = argparse.ArgumentParser(description="复制文件并按数字规律递增命名。")
    # parser.add_argument("source", help="源文件路径")
    # parser.add_argument(
    #     "-d", "--destination", help="目标文件夹路径（可选）", default=None
    # )
    # parser.add_argument(
    #     "-c", "--count", type=int, help="复制的数量（默认为1）", default=1
    # )
    # parser.add_argument(
    #     "-s", "--start", type=int, help="起始编号（默认为1）", default=1
    # )
    # parser.add_argument(
    #     "-n", "--digits", type=int, help="数字位数（默认为1）", default=1
    # )

    # args = parser.parse_args()

    url = os.path.join(script_directory, "4.mp4")

    copy_and_increment(
        source_file=url,
        destination_folder=os.path.join(script_directory, "out"),
        count=18,
        start=5,
    )


if __name__ == "__main__":
    main()
