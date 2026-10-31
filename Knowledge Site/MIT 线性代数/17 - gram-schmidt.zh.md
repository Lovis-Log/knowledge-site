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

1. 为什么正交单位向量一定线性无关？用点乘写出证明。
2. 矩形 $Q$ 满足 $Q^\top Q=I$，为什么 $QQ^\top$ 不是 $I$？它的秩是多少？
3. 用 Gram-Schmidt 处理 $\mathbf{a}=(1,0,0)$、$\mathbf{b}=(1,1,0)$，写出 $Q$ 与 $R$。
4. 为什么 $R$ 的左下角元素为零？这与 Gram-Schmidt 的构造有何关系？
5. 在正交基下，最小二乘解的第 $i$ 个分量为什么就是 $\mathbf{q}_i^\top\mathbf{b}$？

## 与前后课程的关系

这一讲结束了正交性章节：从向量正交、子空间正交，到正交基与正交矩阵。下一讲进入行列式，届时 $Q$ 的行列式、体积与正交变换的几何意义会再次出现。
