import pandas as pd
import os


script_directory = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "../新增用户.csv",
)

df = pd.read_csv(script_directory, encoding="utf-8")


total_count = len(df)
print(f"总行数: {total_count}")
arr = ["OPPO", "Xiaomi", "Redmi", "vivo"]

for i in arr:
    # 1. 筛选 OPPO 和 vivo 的数据
    oppo_vivo_mask = df["phone_brand"].isin([i])
    oppo_vivo_df = df[oppo_vivo_mask]

    # 2. 计算 OPPO 和 vivo 的总行数
    oppo_vivo_count = len(oppo_vivo_df)

    # 4. 计算占比率（百分比）
    oppo_vivo_ratio = (oppo_vivo_count / total_count) * 100

    print(f"{i} 的总行数: {oppo_vivo_count}")
    print(f"{i} 的占比率: {oppo_vivo_ratio:.2f}%")
