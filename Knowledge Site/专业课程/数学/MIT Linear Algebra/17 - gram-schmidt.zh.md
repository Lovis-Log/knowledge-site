---
slug: "17-gram-schmidt"
title: "正交矩阵与 Gram-Schmidt"
summary: "正交单位列让 QᵀQ=I，投影与最小二乘随之退化为点积；Gram-Schmidt 把任意无关列变成正交单位列，并给出 A=QR 分解。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "orthonormal"
  - "gram-schmidt"
  - "qr-decomposition"
sources:
  - kind: "video"
    title: "17. Orthogonal Matrices and Gram-Schmidt"
    url: "https://www.youtube.com/watch?v=0MtwqhIwdrI"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## 正交单位向量

一组向量 $\mathbf{q}_1,\dots,\mathbf{q}_n$ 称为**正交单位**（orthonormal），如果

$$
\mathbf{q}_i^\top\mathbf{q}_j=
\begin{cases}
1,&i=j,\\
0,&i\neq j.
\end{cases}
$$

用 Kronecker 记号写作 $\mathbf{q}_i^\top\mathbf{q}_j=\delta_{ij}$。

把它们作为列放进矩阵 $Q$，上述条件等价于

$$
Q^\top Q=I.
$$

这是整章最简洁的一条公式。

### 一个重要的推论

正交单位向量**自动线性无关**。若 $\sum c_i\mathbf{q}_i=\mathbf{0}$，两边点乘 $\mathbf{q}_j$：

$$
c_j=0.
$$

所有系数为零，故无关。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:07 | 正交单位向量 |
| 3:17 | $Q^{T}Q=I$ |
| 4:37 | 对角线为 1，其余为 0 |
| 6:36 | 正交矩阵必须是方阵 |
| 13:42 | 置换矩阵也是正交矩阵 |
| 15:11 | 非方阵但列正交的情形 |
| 17:38 | 正交列的好处 |
| 19:31 | $QQ^{T}$ 的投影意义 |
| 23:42 | 非方阵只有左逆 |
| 25:27 | Gram-Schmidt 开始 |
| 26:54 | 从 $a_1,a_2$ 构造 $q_1,q_2$ |
| 29:48 | 减去投影得到垂直分量 |
| 31:04 | 误差向量就是垂直方向 |
| 38:35 | 两个向量的数值例子 |
| 41:29 | 单位化得到 $q_1,q_2$ |
| 45:04 | $A$ 与 $Q$ 张成同一个列空间 |
| 46:28 | $A=QR$ 中的 $R$ |

## 正交矩阵

当 $Q$ 是**方阵**时，$Q^\top Q=I$ 意味着

$$
Q^\top=Q^{-1}.
$$

这样的方阵称为**正交矩阵**。注意术语：矩形情形只说「列正交单位」，只有方阵才叫正交矩阵。

### 例子

1. **置换矩阵**：

$$
Q=\begin{bmatrix}0&0&1\\1&0&0\\0&1&0\end{bmatrix}.
$$

每列都是单位坐标向量，彼此正交。

2. **旋转矩阵**：

$$
Q=\begin{bmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{bmatrix}.
$$

两列都是单位向量，点积 $-\cos\theta\sin\theta+\sin\theta\cos\theta=0$。

3. **Hadamard 矩阵**：

$$
Q=\frac{1}{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix}.
$$

四阶版本是

$$
Q=\frac12\begin{bmatrix}
1&1&1&1\\
1&-1&1&-1\\
1&1&-1&-1\\
1&-1&-1&1
\end{bmatrix}.
$$

这类「只含 $\pm1$」的正交矩阵只存在于某些阶数，哪些阶数可行至今没有完全解决。

### 矩形情形

$Q$ 不必是方阵。例如

$$
Q=\frac13\begin{bmatrix}1&-2\\2&-1\\2&2\end{bmatrix}
$$

两列都是单位向量且正交，但 $Q$ 是 $3\times2$。此时

$$
Q^\top Q=I_2,
\qquad
QQ^\top\neq I_3.
$$

$QQ^\top$ 是一个秩为 2 的投影矩阵。

## 为什么正交单位列好用

### 投影矩阵不用求逆

一般公式是

$$
P=A(A^\top A)^{-1}A^\top.
$$

当 $A=Q$ 时，$Q^\top Q=I$，逆消失：

$$
P=QQ^\top.
$$

若 $Q$ 还是方阵，则 $QQ^\top=I$，投影到整个空间，$P=I$。

验证两个性质：

$$
(QQ^\top)^\top=QQ^\top,
$$

$$
(QQ^\top)^2=Q(Q^\top Q)Q^\top=QQ^\top.
$$

### 最小二乘退化为点积

正规方程 $Q^\top Q\hat{\mathbf{x}}=Q^\top\mathbf{b}$ 变成

$$
\hat{\mathbf{x}}=Q^\top\mathbf{b}.
$$

逐分量写：

$$
\hat{x}_i=\mathbf{q}_i^\top\mathbf{b}.
$$

也就是说，**每个系数就是 $\mathbf{b}$ 在第 $i$ 个基向量上的投影长度**。不需要解方程组，不需要求逆。

这是傅里叶级数、球谐展开等大量数学的共同结构：在正交基下，系数由内积直接给出。

## Gram-Schmidt：把无关向量变成正交单位向量

给定线性无关的 $\mathbf{a},\mathbf{b},\mathbf{c}$，要构造正交单位向量。

### 两个向量的情形

第一步：保留第一个方向。

$$
\mathbf{A}=\mathbf{a}.
$$

第二步：从 $\mathbf{b}$ 中减去它在 $\mathbf{A}$ 方向上的投影。

$$
\mathbf{B}=\mathbf{b}-\frac{\mathbf{A}^\top\mathbf{b}}{\mathbf{A}^\top\mathbf{A}}\,\mathbf{A}.
$$

剩下的部分就是误差向量，垂直于 $\mathbf{A}$。验证：

$$
\mathbf{A}^\top\mathbf{B}
=\mathbf{A}^\top\mathbf{b}
-\frac{\mathbf{A}^\top\mathbf{b}}{\mathbf{A}^\top\mathbf{A}}\,\mathbf{A}^\top\mathbf{A}
=0.
$$

最后归一化：

$$
\mathbf{q}_1=\frac{\mathbf{A}}{\|\mathbf{A}\|},
\qquad
\mathbf{q}_2=\frac{\mathbf{B}}{\|\mathbf{B}\|}.
$$

### 三个向量的情形

第三个向量要同时减去它在已经构造出的两个方向上的投影：

$$
\mathbf{C}=\mathbf{c}
-\frac{\mathbf{A}^\top\mathbf{c}}{\mathbf{A}^\top\mathbf{A}}\,\mathbf{A}
-\frac{\mathbf{B}^\top\mathbf{c}}{\mathbf{B}^\top\mathbf{B}}\,\mathbf{B}.
$$

再归一化得到 $\mathbf{q}_3$。

一般地，第 $k$ 步减去它在前面所有方向上的投影：

$$
\mathbf{v}_k=\mathbf{a}_k-\sum_{i=1}^{k-1}\frac{\mathbf{q}_i^\top\mathbf{a}_k}{\mathbf{q}_i^\top\mathbf{q}_i}\,\mathbf{q}_i.
$$

（若前面已归一化，分母为 1。）

### 数值例子

取

$$
\mathbf{a}=\begin{bmatrix}1\\1\\1\end{bmatrix},
\qquad
\mathbf{b}=\begin{bmatrix}1\\0\\2\end{bmatrix}.
$$

第一步：

$$
\mathbf{A}=\begin{bmatrix}1\\1\\1\end{bmatrix},
\qquad
\mathbf{A}^\top\mathbf{A}=3,
\qquad
\mathbf{A}^\top\mathbf{b}=1+0+2=3.
$$

第二步：

$$
\mathbf{B}=\mathbf{b}-\frac{3}{3}\mathbf{A}
=\begin{bmatrix}1\\0\\2\end{bmatrix}-\begin{bmatrix}1\\1\\1\end{bmatrix}
=\begin{bmatrix}0\\-1\\1\end{bmatrix}.
$$

验证 $\mathbf{A}^\top\mathbf{B}=0-1+1=0$。

第三步归一化：

$$
\mathbf{q}_1=\frac{1}{\sqrt3}\begin{bmatrix}1\\1\\1\end{bmatrix},
\qquad
\mathbf{q}_2=\frac{1}{\sqrt2}\begin{bmatrix}0\\-1\\1\end{bmatrix}.
$$

### 列空间不变

Gram-Schmidt 只做「减去已有方向的投影」与「缩放」，得到的 $Q$ 与原矩阵 $A$ 有**相同的列空间**。它只是把同一空间换成了更好的基：从无关但不正交，变成正交单位。

## A=QR 分解

如果 $A$ 的列是 $\mathbf{a}_1,\dots,\mathbf{a}_n$，Gram-Schmidt 给出的 $Q$ 满足

$$
A=QR,
$$

其中 $R$ 是**上三角矩阵**。

以两列为例：

$$
\begin{bmatrix}\mathbf{a}_1&\mathbf{a}_2\end{bmatrix}
=
\begin{bmatrix}\mathbf{q}_1&\mathbf{q}_2\end{bmatrix}
\begin{bmatrix}
\mathbf{q}_1^\top\mathbf{a}_1 & \mathbf{q}_1^\top\mathbf{a}_2\\
0 & \mathbf{q}_2^\top\mathbf{a}_2
\end{bmatrix}.
$$

为什么左下角是零？因为 $\mathbf{q}_2$ 的构造保证了它与 $\mathbf{a}_1$ 正交：

$$
\mathbf{q}_2^\top\mathbf{a}_1=0.
$$

更一般地，第 $j$ 列只用到 $\mathbf{q}_1,\dots,\mathbf{q}_j$，所以 $R$ 的第 $j$ 列在 $j$ 行以下全为零——这正是上三角。

### 与 LU 的类比

| 分解 | 目的 | 结果结构 |
| --- | --- | --- |
| $A=LU$ | 消元 | 下三角 × 上三角 |
| $A=QR$ | 正交化 | 正交单位列 × 上三角 |

两者都是把矩阵拆成「结构更好的因子」。QR 在数值计算中尤其重要：解最小二乘时用 QR 比直接求 $A^\top A$ 的逆更稳定。

## 本讲结论

- 正交单位列满足 $Q^\top Q=I$；方阵时 $Q^\top=Q^{-1}$，称为正交矩阵。
- 正交单位向量自动线性无关。
- 投影矩阵简化为 $QQ^\top$，最小二乘系数简化为 $\hat{x}_i=\mathbf{q}_i^\top\mathbf{b}$。
- Gram-Schmidt 通过逐步减去投影构造正交方向，再归一化。
- $A=QR$，$R$ 上三角；Gram-Schmidt 不改变列空间。

## 理解检验

**1. 为什么正交单位向量一定线性无关？用点乘写出证明。**

参考答案：设
$$
c_1\mathbf{q}_1+c_2\mathbf{q}_2+\cdots+c_n\mathbf{q}_n=\mathbf{0}.
$$
两边点乘 $\mathbf{q}_j$，利用 $\mathbf{q}_i^\top\mathbf{q}_j=\delta_{ij}$：
$$
c_1(\mathbf{q}_1^\top\mathbf{q}_j)+\cdots+c_n(\mathbf{q}_n^\top\mathbf{q}_j)
=c_j\cdot1=c_j .
$$
左边等于 $\mathbf{0}^\top\mathbf{q}_j=0$，所以 $c_j=0$。由于 $j$ 任意，全部系数为零，故线性无关。

关键点是正交性把「解一个方程组」变成了「分别点乘」：每个系数被单独分离出来。

**2. 矩形 $Q$ 满足 $Q^\top Q=I$，为什么 $QQ^\top$ 不是 $I$？它的秩是多少？**

参考答案：设 $Q$ 是 $m\times n$ 且 $n<m$，例如本讲的 $3\times2$ 例子。$Q^\top Q=I_n$ 只说明 $n$ 个列向量正交单位；而 $QQ^\top$ 是 $m\times m$ 矩阵。

由秩的性质
$$
\operatorname{rank}(QQ^\top)\le \operatorname{rank}(Q)=n<m,
$$
所以 $QQ^\top$ 的秩至多为 $n$，不可能是满秩的 $I_m$。几何上 $QQ^\top$ 是把 $\mathbb{R}^m$ 投影到 $Q$ 的列空间（一个 $n$ 维子空间）的投影矩阵，它把与该子空间正交的方向全部压成零；而 $I_m$ 保留所有方向。只有在 $Q$ 是方阵时 $QQ^\top=I$ 才成立。

**3. 用 Gram-Schmidt 处理 $\mathbf{a}=(1,0,0)$、$\mathbf{b}=(1,1,0)$，写出 $Q$ 与 $R$。**

参考答案：第一步，$\mathbf{A}=\mathbf{a}=(1,0,0)$，$\mathbf{A}^\top\mathbf{A}=1$，$\mathbf{A}^\top\mathbf{b}=1$。

第二步，减去投影：
$$
\mathbf{B}=\mathbf{b}-\frac{\mathbf{A}^\top\mathbf{b}}{\mathbf{A}^\top\mathbf{A}}\mathbf{A}
=(1,1,0)-1\cdot(1,0,0)=(0,1,0).
$$
两者已是单位向量，归一化不改变它们：
$$
\mathbf{q}_1=(1,0,0)^\top,\qquad \mathbf{q}_2=(0,1,0)^\top,
$$
$$
Q=\begin{bmatrix}1&0\\0&1\\0&0\end{bmatrix}.
$$
$R$ 的元素是 $r_{ij}=\mathbf{q}_i^\top\mathbf{a}_j$（$i\le j$），其余为零：
$$
R=\begin{bmatrix}
\mathbf{q}_1^\top\mathbf{a}&\mathbf{q}_1^\top\mathbf{b}\\
0&\mathbf{q}_2^\top\mathbf{b}
\end{bmatrix}
=\begin{bmatrix}1&1\\0&1\end{bmatrix}.
$$
验证
$$
QR=\begin{bmatrix}1&0\\0&1\\0&0\end{bmatrix}\begin{bmatrix}1&1\\0&1\end{bmatrix}
=\begin{bmatrix}1&1\\0&1\\0&0\end{bmatrix},
$$
其两列正是 $\mathbf{a}$ 与 $\mathbf{b}$（作为 $3\times2$ 矩阵的列）。

**4. 为什么 $R$ 的左下角元素为零？这与 Gram-Schmidt 的构造有何关系？**

参考答案：$R$ 的元素是 $r_{ij}=\mathbf{q}_i^\top\mathbf{a}_j$。对 $i>j$，需要说明 $\mathbf{q}_i\perp\mathbf{a}_j$。

Gram-Schmidt 在构造 $\mathbf{q}_i$ 时，从 $\mathbf{a}_i$ 出发减去了它在 $\mathbf{q}_1,\dots,\mathbf{q}_{i-1}$ 上的全部投影，所以 $\mathbf{q}_i$ 与前面所有 $\mathbf{q}_1,\dots,\mathbf{q}_{i-1}$ 正交。另一方面，$\mathbf{a}_j$（$j<i$）属于 $\operatorname{span}\{\mathbf{q}_1,\dots,\mathbf{q}_j\}\subseteq\operatorname{span}\{\mathbf{q}_1,\dots,\mathbf{q}_{i-1}\}$，因此 $\mathbf{q}_i\perp\mathbf{a}_j$，即 $r_{ij}=0$。

所以 $R$ 在主对角线以下全为零——上三角结构正是「第 $j$ 列只用到前 $j$ 个正交方向」的直接结果。

**5. 在正交基下，最小二乘解的第 $i$ 个分量为什么就是 $\mathbf{q}_i^\top\mathbf{b}$？**

参考答案：当矩阵的列是正交单位向量时，$A=Q$ 且 $Q^\top Q=I$。正规方程
$$
Q^\top Q\hat{\mathbf{x}}=Q^\top\mathbf{b}
$$
左边的 $Q^\top Q$ 就是单位矩阵，于是直接得到
$$
\hat{\mathbf{x}}=Q^\top\mathbf{b}.
$$
逐分量写，第 $i$ 个分量是
$$
\hat{x}_i=\mathbf{q}_i^\top\mathbf{b},
$$
即 $\mathbf{b}$ 与第 $i$ 个基向量的内积。

原因在于正交基消除了「交叉项」：一般情形下第 $i$ 个方程含有与其他系数耦合的项，需要联立求解；正交单位时，$\mathbf{q}_i^\top\mathbf{q}_j=0$（$i\ne j$），每个方程只剩一个未知量，系数被独立地投影出来。这正是傅里叶系数、球谐展开中「系数＝内积」的统一来源。

## 与前后课程的关系

这一讲结束了正交性章节：从向量正交、子空间正交，到正交基与正交矩阵。下一讲进入行列式，届时 $Q$ 的行列式、体积与正交变换的几何意义会再次出现。
