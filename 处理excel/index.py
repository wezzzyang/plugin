import pandas as pd
import os


script_directory = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "result2.csv",
)

df = pd.read_csv(script_directory, encoding="utf-8")
# 删除 right_song 包含换行符 \n 的字符串
df = df[~df["right_song"].str.contains("\n", na=False)]

result = (
    df.groupby(["right_song"])
    .agg(
        total_count=("is_right", "count"),  # 总条目数
        is_right_probability=("is_right", lambda x: (x == 1).mean()),  # 正确率
    )
    .reset_index()
)

result = result.sort_values(by="total_count", ascending=False)

# 可选：保存到新的 CSV 文件（使用 utf-8-sig 编码，兼容 Excel）
result.to_csv("result.csv", index=False, encoding="utf-8-sig")
