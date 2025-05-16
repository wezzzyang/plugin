import cv2
import os


def video_to_frames(video_path, output_folder, frame_rate=1):
    """
    将视频转换为帧图像。

    :param video_path: 视频文件的路径
    :param output_folder: 保存帧图像的文件夹路径
    :param frame_rate: 每秒提取的帧数（默认每秒1帧）
    """
    # 打开视频文件
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print(f"无法打开视频文件: {video_path}")
        return

    # 获取视频的帧率
    video_fps = cap.get(cv2.CAP_PROP_FPS)
    print(f"视频帧率: {video_fps} FPS")

    # 计算帧间隔
    frame_interval = int(video_fps / frame_rate) if frame_rate < video_fps else 1

    # 创建输出文件夹
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    frame_count = 0
    saved_frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 按照设定的帧率保存帧
        if frame_count % frame_interval == 0:
            frame_filename = os.path.join(
                output_folder, f"frame_{saved_frame_count:04d}.png"
            )
            cv2.imwrite(frame_filename, frame)
            print(f"保存帧: {frame_filename}")
            saved_frame_count += 1

        frame_count += 1

    cap.release()
    print(f"总共提取了 {saved_frame_count} 帧。")


if __name__ == "__main__":
    # 设置视频文件路径和输出文件夹
    video_file = "E:/work/any/py-plugin/skdr_yf_20250414.mp4"  # 替换为你的视频文件路径
    output_directory = "output_frames"  # 输出帧图像的文件夹

    # 设置每秒提取的帧数（例如，每秒1帧）
    frames_per_second = 1

    video_to_frames(video_file, output_directory, frames_per_second)
