levels = list(range(20, -1, -1))  # 从20到0的列表 [20, 19, ..., 0]
or_conditions = " or ".join([f"level = {level}" for level in levels])
print(or_conditions)
