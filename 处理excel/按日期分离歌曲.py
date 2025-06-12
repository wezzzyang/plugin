import pandas as pd
import os
from typing import Dict, List
import pandas as pd


result: Dict[str, list[List[any]]] = {}

script_directory2 = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "result2.csv",
)

song = pd.read_csv(script_directory2, encoding="utf-8")


script_directory = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "新增用户.csv",
)

df = pd.read_csv(script_directory, encoding="utf-8")

print(df["create_time"][0].split(" ")[0])

arr: Dict[str, List[int]] = {}
for index, i in enumerate(df["create_time"]):
    key = df["create_time"][index].split(" ")[0]
    if bool(arr.get(key)) == False:
        arr[key] = []
    arr[key].append(df["yid"][index])


for i in arr:
    arr[i] = set(arr[i])


for index, i in enumerate(song["create_time"]):
    key = song["create_time"][index].split(" ")[0]

    for j in arr:
        if song["yid"][index] in arr[j]:
            if bool(result.get(j)) == False:
                result[j] = []
            result[j].append([song["right_song"][index], song["is_right"][index]])


for data in result:
    filename = data + "日新用户得正确率数据.csv"
    df = pd.DataFrame(result.get(data), columns=["right_song", "is_right"])
    df = df[~df["right_song"].str.contains("\n", na=False)]
    df = (
        df.groupby(["right_song"])
        .agg(
            total_count=("is_right", "count"),  # 总条目数
            is_right_probability=("is_right", lambda x: (x == 1).mean()),  # 正确率
        )
        .reset_index()
    )
    df = df.sort_values(by="total_count", ascending=False)
    df.to_csv(filename, index=False, encoding="utf-8-sig")
