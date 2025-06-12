import pandas as pd
import os
from typing import Dict, List
import pandas as pd


script_directory = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "新增用户.csv",
)

df = pd.read_csv(script_directory, encoding="utf-8")


df = df.drop_duplicates(subset=["yid"], keep="first")


df = df.sort_values(by="create_time", ascending=False)

arr: Dict[str, List[int]] = {}
for index, i in enumerate(df["create_time"]):
    key = df["create_time"][index].split(" ")[0]
    if bool(arr.get(key)) == False:
        arr[key] = []
    arr[key].append(df["yid"][index])


j = 0
for i in arr:
    print(i, len(arr[i]))
    j += len(arr[i])

print("总数量：", j)
