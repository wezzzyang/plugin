import math
import random
import string
import pandas as pd
import os
import json

base_path = os.path.dirname(os.path.abspath(__file__))

restore_path = os.path.join(base_path, "result.json")

xlsl_path = os.path.join(base_path, "1_100.XLSX")

df = pd.read_excel(xlsl_path, header=None)


"""注释测试"""
df = df.to_numpy()


def generate_random_string(length: int) -> str:
    """生成数字和字母构成的随机字符串"""
    characters = string.ascii_letters + string.digits  # 包含大小写字母和数字
    random_string = "".join(random.choices(characters, k=length))
    return random_string


def getScrewNum(data: list[str]):
    return data[3]


def getScrewHeight(data: list[str]):
    return data[5]


def getLevelId(data: list[str]):
    return data[1]


def getDetailData(data: list[str]):
    return {
        "screwNum": getScrewNum(data),
        "screwHeight": getScrewHeight(data),
        "levelId": getLevelId(data),
    }


def getNutType(data: str):
    data = f"{data}"
    arr = data.split(",")
    return {
        "id": generate_random_string(7),
        "nutType": int(arr[0]),
        "nutObstacleType": int(data.split(",")[1] if len(arr) > 1 else 0),
    }


def getNutScrewType(result: dict[str, str]):
    return {
        "id": generate_random_string(7),
        "nutScrewType": 0,
        "nutScrewObstacleType": 0,
        "nutScrewHeight": result["screwHeight"],
        "nuts": [],
    }


def analyzeData(data: list[list[str]], result: dict[str, str], startIndex: int):
    screwHeight = result["screwHeight"]
    screwNum = result["screwNum"]

    resultData = []

    for n in range(screwNum):
        nutScrew = getNutScrewType(result)
        resultData.append(nutScrew)
        for h in range(screwHeight):
            nutIndex = data[startIndex + 2 + h][n + 1]
            if nutIndex == 0:
                continue
            if nutIndex == -1:
                nutScrew["nutScrewType"] = 1
                continue
            nutScrew["nuts"].append(getNutType(nutIndex))

    return resultData


baseResult = {}


def splitArr(arr):
    result = []
    length = len(arr)
    if length <= 4:
        result.append(arr)
        return result
    if length > 4 & length <= 10:
        l = math.ceil(length / 2)
        result.append(arr[:l])
        result.append(arr[l:])
        return result
    if length > 4 & length > 10:
        l = math.ceil(length / 3)
        result.append(arr[:l])
        result.append(arr[l : 2 * l])
        result.append(arr[2 * l :])
        return result


for index, arrX in enumerate(df):
    if arrX[0] == "关卡ID":
        result = getDetailData(arrX)
        baseResult[result["levelId"]] = splitArr(analyzeData(df, result, index))
        continue

print(baseResult)

with open(restore_path, "w", encoding="utf-8") as f:
    f.write(
        json.dumps(baseResult, ensure_ascii=False, indent=None, separators=(",", ":"))
    )
