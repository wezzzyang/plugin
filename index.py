def is_goal(state):
    # 检查是否达到目标状态
    color_count = {}
    for pillar in state:
        for color, height in pillar:
            color_count[color] = color_count.get(color, 0) + height
    for color in color_count:
        if color_count[color] != sum(h for c, h in state if c == color):
            return False
    return True


def get_neighbors(state):
    # 生成所有可能的下一个状态
    neighbors = []
    for i in range(len(state)):
        for j in range(len(state)):
            if i != j:
                for k in range(len(state[i])):
                    color, height = state[i][k]
                    if any(c == color and h >= height for c, h in state[j]):
                        new_state = [list(pillar) for pillar in state]
                        new_state[j].append(new_state[i].pop(k))
                        neighbors.append(tuple(tuple(pillar) for pillar in new_state))
    return neighbors


def dfs(state, steps, visited):
    # 深度优先搜索
    if is_goal(state):
        return steps
    if state in visited:
        return float("inf")
    visited.add(state)
    min_steps = float("inf")
    for neighbor in get_neighbors(state):
        min_steps = min(min_steps, dfs(neighbor, steps + 1, visited))
    return min_steps


# 初始状态
initial_state = [
    [("purple", 3), ("green", 2), ("red", 1)],
    [("blue", 3), ("yellow", 2), ("black", 1)],
    [("blue", 0), ("pink", 0), ("white", 0)],
    [("blue", 0), ("pink", 0), ("white", 0)],
]

# 调用DFS求解
visited = set()
result = dfs(tuple(tuple(pillar) for pillar in initial_state), 0, visited)
print("最少步数:", result)


