import pandas as pd
import os


script_directory = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "result.csv",
)

df = pd.read_csv(script_directory, encoding="utf-8")

# 统计每个 (level, song_index, right_song) 组合的：
# 1. 总条目数（total_count）
# 2. is_right=1 的正确率（is_right_probability）
result = df[["create_time", "yid", "level", "song_index", "right_song", "is_right"]]


# 可选：保存到新的 CSV 文件（使用 utf-8-sig 编码，兼容 Excel）
result.to_csv("result2.csv", index=False, encoding="utf-8-sig")
