---
slug: "15-projections"
title: "投影到子空间"
summary: "投影的几何核心是误差向量垂直于目标子空间；沿这个条件推出 x̂ = (AᵀA)⁻¹Aᵀb 与投影矩阵 P = A(AᵀA)⁻¹Aᵀ，并用一条直线拟合收尾。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "projection"
  - "least-squares"
  - "normal-equations"
sources:
  - kind: "video"
    title: "15. Projections onto Subspaces"
    url: "https://www.youtube.com/watch?v=Y_Ac6KiQ1t0"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## 为什么需要投影

本章处理 $A\mathbf{x}=\mathbf{b}$ **无解**的情形。无解不等于没有办法：$\mathbf{b}$ 不在列空间里，但列空间里一定有一个离它最近的点。把 $\mathbf{b}$ 换成这个最近点，方程就有解了。

这就是投影。它在几何上是「垂足」，在代数上是「最小二乘」。

## 一维情形：投影到一条直线

设直线由向量 $\mathbf{a}$ 张成，要把 $\mathbf{b}$ 投影到这条线上。

投影点必须在直线上，所以形如 $\mathbf{p}=x\mathbf{a}$。关键条件是：**误差向量 $\mathbf{e}=\mathbf{b}-x\mathbf{a}$ 与直线垂直**，即

$$
\mathbf{a}^\top(\mathbf{b}-x\mathbf{a})=0.
$$

展开：

$$
\mathbf{a}^\top\mathbf{b}=x\,\mathbf{a}^\top\mathbf{a}
\quad\Longrightarrow\quad
x=\frac{\mathbf{a}^\top\mathbf{b}}{\mathbf{a}^\top\mathbf{a}}.
$$

于是

$$
\mathbf{p}=x\mathbf{a}=\frac{\mathbf{a}^\top\mathbf{b}}{\mathbf{a}^\top\mathbf{a}}\,\mathbf{a}.
$$

### 三个必须记住的公式

| 对象 | 公式 |
| --- | --- |
| 系数 | $x=\dfrac{\mathbf{a}^\top\mathbf{b}}{\mathbf{a}^\top\mathbf{a}}$ |
| 投影向量 | $\mathbf{p}=\mathbf{a}x$ |
| 投影矩阵 | $P=\dfrac{\mathbf{a}\mathbf{a}^\top}{\mathbf{a}^\top\mathbf{a}}$ |

注意 $P$ 是 $n\times n$ 矩阵：分子是列乘行（矩阵），分母是数。

### 两个检验

- 把 $\mathbf{b}$ 变成 $2\mathbf{b}$，投影也变成 $2\mathbf{p}$。
- 把 $\mathbf{a}$ 变成 $2\mathbf{a}$，投影不变——直线没变，分子与分母同时乘 4，抵消。

### 投影矩阵的两个性质

$$
P^\top=P,\qquad P^2=P.
$$

第一个来自 $(\mathbf{a}\mathbf{a}^\top)^\top=\mathbf{a}\mathbf{a}^\top$。第二个来自几何：投影两次与投影一次结果相同。代数验证：

$$
P^2=\frac{\mathbf{a}\mathbf{a}^\top\mathbf{a}\mathbf{a}^\top}{(\mathbf{a}^\top\mathbf{a})^2}
=\frac{\mathbf{a}(\mathbf{a}^\top\mathbf{a})\mathbf{a}^\top}{(\mathbf{a}^\top\mathbf{a})^2}
=\frac{\mathbf{a}\mathbf{a}^\top}{\mathbf{a}^\top\mathbf{a}}=P.
$$

这两个性质反过来也刻画了投影矩阵：对称且幂等。

## 推广到子空间

设子空间是矩阵 $A$ 的列空间，$A$ 的列是一组基（因此线性无关）。

投影点 $\mathbf{p}=A\hat{\mathbf{x}}$，其中 $\hat{\mathbf{x}}$ 是待求的系数。核心条件仍然是

$$
\mathbf{e}=\mathbf{b}-A\hat{\mathbf{x}}\perp C(A).
$$

「垂直于整个列空间」等价于「垂直于 $A$ 的每一列」：

$$
A^\top(\mathbf{b}-A\hat{\mathbf{x}})=\mathbf{0}.
$$

整理得**正规方程**：

$$
A^\top A\,\hat{\mathbf{x}}=A^\top\mathbf{b}.
$$

解的公式是

$$
\hat{\mathbf{x}}=(A^\top A)^{-1}A^\top\mathbf{b},
$$

投影向量与投影矩阵是

$$
\mathbf{p}=A\hat{\mathbf{x}}=A(A^\top A)^{-1}A^\top\mathbf{b},
$$

$$
P=A(A^\top A)^{-1}A^\top.
$$

### 与一维公式的对应

一维时 $A$ 只有一列 $\mathbf{a}$，$(A^\top A)^{-1}$ 就是除以 $\mathbf{a}^\top\mathbf{a}$，公式退化为

$$
P=\frac{\mathbf{a}\mathbf{a}^\top}{\mathbf{a}^\top\mathbf{a}}.
$$

多维时不能「除」，只能求逆——这是矩阵与数的区别。

### 误差向量住在哪里

由 $A^\top\mathbf{e}=\mathbf{0}$ 可知

$$
\mathbf{e}\in N(A^\top)=C(A)^\perp.
$$

这正是上一讲的正交关系：误差向量落在左零空间里，与列空间垂直。几何与四个子空间在这里严丝合缝地接上。

## 一个不能做的事

有人会想把 $A(A^\top A)^{-1}A^\top$ 中的逆拆开：

$$
(A^\top A)^{-1}=A^{-1}(A^\top)^{-1}.
$$

这是错的，因为** $A$ 不是方阵，根本没有逆**。这正是本章的典型情形：$A$ 行多列少。只有当 $A$ 是方阵且可逆时才可以这样拆，而那时列空间是整个 $\mathbb{R}^n$，投影矩阵是单位矩阵 $I$。

## 最小二乘：用一条直线拟合三个点

给定三个点 $(1,1),(2,2),(3,2)$，要找一条直线

$$
b=C+Dt
$$

使总误差最小。

如果直线穿过三个点，就应满足

$$
\begin{aligned}
C+D&=1,\\
C+2D&=2,\\
C+3D&=2.
\end{aligned}
$$

写成矩阵形式：

$$
\underbrace{\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix}}_{A}
\underbrace{\begin{bmatrix}C\\D\end{bmatrix}}_{\mathbf{x}}
=
\underbrace{\begin{bmatrix}1\\2\\2\end{bmatrix}}_{\mathbf{b}}.
$$

三个方程、两个未知数，通常无解。我们不去解它，而是解正规方程：

$$
A^\top A\hat{\mathbf{x}}=A^\top\mathbf{b}.
$$

下一讲会把这个例子算完，得到 $C=2/3$、$D=1/2$，即最佳直线

$$
b=\frac{2}{3}+\frac{1}{2}t.
$$

### 为什么要用所有点

另一种做法是丢掉一个方程，解剩下的方阵系统。但这等于宣称「某些测量是完美的，另一些毫无价值」，没有依据。最小二乘让所有点都参与，按平方误差加权。

代价是它对**离群点**敏感：一个远离直线的点，平方后误差会被放大，可能把整条线拉偏。统计学里因此有稳健回归等替代方法。

## 本讲结论

- 投影的唯一几何条件是误差向量垂直于目标子空间。
- 一维：$x=\mathbf{a}^\top\mathbf{b}/\mathbf{a}^\top\mathbf{a}$，$P=\mathbf{a}\mathbf{a}^\top/\mathbf{a}^\top\mathbf{a}$。
- 多维：正规方程 $A^\top A\hat{\mathbf{x}}=A^\top\mathbf{b}$，$P=A(A^\top A)^{-1}A^\top$。
- 投影矩阵对称且幂等：$P^\top=P$，$P^2=P$。
- 误差向量属于左零空间，与列空间正交。
- 最小二乘就是用投影解一个无解的方程组。

## 理解检验

1. 为什么「误差垂直于直线」能唯一确定投影点？
2. 把 $\mathbf{a}$ 换成 $3\mathbf{a}$，投影矩阵会变吗？为什么？
3. 证明多维投影矩阵满足 $P^2=P$。
4. 为什么不能把 $(A^\top A)^{-1}$ 拆成 $A^{-1}(A^\top)^{-1}$？
5. 写出用直线 $b=C+Dt$ 拟合三个点时对应的 $A$、$\mathbf{x}$ 与 $\mathbf{b}$。

## 与前后课程的关系

上一讲证明了四个子空间的正交关系；这一讲用它构造投影。下一讲把投影矩阵算到底，给出最小二乘的数值例子，并证明 $A^\top A$ 在列无关时可逆。
