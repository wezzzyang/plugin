import cv2
import os
import re


def images_to_video(image_folder, video_name, duration=93, frame_size=None):
    """
    将一系列图片转换为视频，并设置视频的播放时长。

    :param image_folder: 存放图片的文件夹路径
    :param video_name: 输出视频文件的名称（包括扩展名，如 'output.mp4'）
    :param duration: 视频的播放时长（秒）
    :param frame_size: 视频的帧大小（宽度, 高度）。如果为 None，则从图片中获取
    """
    # 获取所有PNG图片文件
    image_files = [f for f in os.listdir(image_folder) if f.lower().endswith(".png")]

    # 使用正则表达式提取帧编号，并过滤掉不符合格式的文件
    def extract_frame_number(filename):
        match = re.search(r"frame_(\d+)\.png$", filename)
        if match:
            return int(match.group(1))
        else:
            return None

    # 过滤并排序有效的帧文件
    valid_image_files = []
    for f in image_files:
        frame_num = extract_frame_number(f)
        if frame_num is not None:
            valid_image_files.append((frame_num, f))

    # 按帧编号排序
    valid_image_files.sort(key=lambda x: x[0])
    valid_image_files = [f[1] for f in valid_image_files]

    if not valid_image_files:
        print("图片文件夹中没有找到符合 'frame_XXXX.png' 格式的有效图片。")
        return

    # 如果未指定帧大小，则从第一张图片获取
    if frame_size is None:
        first_image_path = os.path.join(image_folder, valid_image_files[0])
        first_image = cv2.imread(first_image_path)
        if first_image is None:
            print(f"无法读取图片: {first_image_path}")
            return
        frame_size = (first_image.shape[1], first_image.shape[0])  # 宽度, 高度

    # 计算需要的帧率
    total_frames = len(valid_image_files)
    fps = total_frames / duration
    print(
        f"总帧数: {total_frames}, 目标时长: {duration}秒, 计算得到的帧率: {fps:.2f} FPS"
    )

    # 定义视频编码器和输出视频路径
    fourcc = cv2.VideoWriter_fourcc(
        *"mp4v"
    )  # 可以根据需要选择其他编码器，如 'XVID' 生成 .avi 文件
    out = cv2.VideoWriter(video_name, fourcc, fps, frame_size)

    for image_file in valid_image_files:
        image_path = os.path.join(image_folder, image_file)
        try:
            # 读取图片
            frame = cv2.imread(image_path)
            if frame is None:
                print(f"无法读取图片: {image_path}")
                continue

            # 调整图片大小以匹配帧大小（如果需要）
            frame = cv2.resize(frame, frame_size)

            # 写入视频
            out.write(frame)
            print(f"已写入帧: {image_file}")
        except Exception as e:
            print(f"处理图片 {image_path} 时出错: {e}")

    # 释放 VideoWriter 对象
    out.release()
    print(f"视频已成功保存为 {video_name}")


if __name__ == "__main__":
    # 设置图片文件夹路径和输出视频名称
    image_directory = "E:/work/any/output_frames"  # 替换为你的图片所在文件夹路径
    output_video = "output_video.mp4"  # 输出视频文件的名称

    # 设置目标播放时长（秒）
    target_duration = 93  # 1分33秒 = 93秒

    # 如果需要指定视频分辨率，可以取消下面的注释并设置相应的宽度和高度
    # video_resolution = (1920, 1080)  # 例如 1920x1080
    # frame_size = video_resolution

    # 如果希望视频大小与图片一致，则将 frame_size 设为 None
    frame_size = None

    images_to_video(
        image_directory, output_video, duration=target_duration, frame_size=frame_size
    )
