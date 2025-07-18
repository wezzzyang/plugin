from pydub import AudioSegment
import os

# 设置输入输出路径
input_folder = "audios"
output_folder = "uniform_audios"

# 创建输出目录
os.makedirs(output_folder, exist_ok=True)

# 支持的音频格式
SUPPORTED_FORMATS = (".mp3", ".wav")

# 1. 加载所有音频并计算平均音量
audio_files = []
loudness_values = []

for filename in os.listdir(input_folder):
    if filename.lower().endswith(SUPPORTED_FORMATS):
        file_path = os.path.join(input_folder, filename)
        audio = AudioSegment.from_file(file_path)

        # 获取当前音频的平均响度（dBFS）
        current_loudness = audio.dBFS
        loudness_values.append(current_loudness)
        audio_files.append((filename, audio))

# 检查是否有音频文件
if not loudness_values:
    raise FileNotFoundError("没有找到任何支持的音频文件（.mp3 或 .wav）")

# 2. 计算平均响度
average_loudness = sum(loudness_values) / len(loudness_values)
print(f"\n📊 所有音频的平均响度为: {average_loudness:.2f} dBFS\n")

# 3. 对每个音频进行音量统一处理
for filename, audio in audio_files:
    gain_needed = average_loudness - audio.dBFS
    adjusted_audio = audio.apply_gain(gain_needed)

    output_path = os.path.join(output_folder, filename)
    adjusted_audio.export(output_path, format="mp3")  # 可改为 wav

    print(f"✅ 已统一音量: {filename} → 增益 {gain_needed:+.2f} dB → {output_path}")
