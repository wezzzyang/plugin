import os


def remove_leading_zeros(filename):
    """去除文件名前导的 '0'，但保留扩展名前的数字"""
    name, ext = os.path.splitext(filename)  # 分离文件名和扩展名
    # 去除前导 '0'，但如果整个名字都是 '0'，则保留一个 '0'
    new_name = name.lstrip("0") or "0"
    return f"{new_name}{ext}"


def batch_rename_files(folder_path):
    """批量重命名文件夹内的文件"""
    for filename in os.listdir(folder_path):
        old_path = os.path.join(folder_path, filename)
        if os.path.isfile(old_path):  # 确保是文件，而不是文件夹
            new_filename = remove_leading_zeros(filename)
            new_path = os.path.join(folder_path, new_filename)

            if new_filename != filename:  # 只有当文件名变化时才重命名
                try:
                    os.rename(old_path, new_path)
                    print(f"Renamed: {filename} -> {new_filename}")
                except Exception as e:
                    print(f"Error renaming {filename}: {e}")


if __name__ == "__main__":
    folder_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dir")

    if os.path.isdir(folder_path):
        batch_rename_files(folder_path)
    else:
        print("错误：指定的路径不是一个有效的文件夹！")
