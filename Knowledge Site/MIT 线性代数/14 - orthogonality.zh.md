---
slug: "14-orthogonality"
title: "正交向量与正交子空间"
summary: "点积为零是正交的判据；行空间与零空间、列空间与左零空间分别互相垂直，并互为正交补；这直接引出最小二乘方程 AᵀA x̂ = Aᵀb。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "orthogonality"
  - "orthogonal-complement"
  - "least-squares"
sources:
  - kind: "video"
    title: "14. Orthogonal Vectors and Subspaces"
    url: "https://www.youtube.com/watch?v=YzZUIYRCE38"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## 从向量正交到子空间正交

正交就是垂直。$\mathbb{R}^n$ 中两个向量 $\mathbf{x},\mathbf{y}$ 正交，当且仅当

$$
\mathbf{x}^\top\mathbf{y}=x_1y_1+x_2y_2+\cdots+x_ny_n=0.
$$

这是整章唯一需要记的判据。零向量与任何向量都正交，因为点积恒为 0。

### 为什么点积为零等价于垂直

设直角三角形两条直角边为 $\mathbf{x}$ 与 $\mathbf{y}$，斜边为 $\mathbf{x}+\mathbf{y}$。勾股定理说

$$
\|\mathbf{x}\|^2+\|\mathbf{y}\|^2=\|\mathbf{x}+\mathbf{y}\|^2.
$$

把右边展开：

$$
\|\mathbf{x}+\mathbf{y}\|^2
=(\mathbf{x}+\mathbf{y})^\top(\mathbf{x}+\mathbf{y})
=\mathbf{x}^\top\mathbf{x}+\mathbf{x}^\top\mathbf{y}+\mathbf{y}^\top\mathbf{x}+\mathbf{y}^\top\mathbf{y}.
$$

对实向量，$\mathbf{x}^\top\mathbf{y}=\mathbf{y}^\top\mathbf{x}$，所以

$$
\|\mathbf{x}+\mathbf{y}\|^2=\|\mathbf{x}\|^2+2\mathbf{x}^\top\mathbf{y}+\|\mathbf{y}\|^2.
$$

勾股等式成立，当且仅当

$$
2\mathbf{x}^\top\mathbf{y}=0.
$$

**勾股定理与点积判据是同一件事的两种写法。**

### 一个数值例子

取 $\mathbf{x}=(1,2,3)^\top$。先试 $\mathbf{y}=(1,2,-1)^\top$：

$$
\mathbf{x}^\top\mathbf{y}=1+4-3=2\neq0,
$$

并不正交。换成 $\mathbf{y}=(2,-1,0)^\top$：

$$
\mathbf{x}^\top\mathbf{y}=2-2+0=0,
$$

两向量正交。此时

$$
\|\mathbf{x}\|^2=14,\qquad \|\mathbf{y}\|^2=5,\qquad \|\mathbf{x}+\mathbf{y}\|^2=\|(3,1,3)\|^2=9+1+9=19,
$$

而 $14+5=19$，勾股定理成立。

## 子空间正交

两个子空间 $S$ 与 $T$ 正交，意思是：

> $S$ 中的**每一个**向量都与 $T$ 中的**每一个**向量正交。

这个定义比「交集为零」更强。三维空间中的两块平面（例如黑板与地面）都经过原点，交集是一条直线，因此不正交——交线上的向量不可能与自身正交。

在平面 $\mathbb{R}^2$ 中，可能的情形只有：零空间、过原点的直线、整个平面。两条过原点的直线正交，当且仅当它们成 90°；一条直线与零空间永远正交；一条直线与整个平面永远不正交。

## 四个基本子空间的正交关系

### 行空间与零空间

设 $\mathbf{x}\in N(A)$，则 $A\mathbf{x}=\mathbf{0}$。把 $A$ 按行写出：

$$
A\mathbf{x}=
\begin{bmatrix}
\text{row}_1\\
\vdots\\
\text{row}_m
\end{bmatrix}\mathbf{x}
=
\begin{bmatrix}
\text{row}_1\cdot\mathbf{x}\\
\vdots\\
\text{row}_m\cdot\mathbf{x}
\end{bmatrix}
=
\begin{bmatrix}0\\\vdots\\0\end{bmatrix}.
$$

所以 $\mathbf{x}$ 与 $A$ 的每一行都正交。

行空间中的任意向量是这些行的组合 $\sum c_i\,\text{row}_i$，于是

$$
\left(\sum_i c_i\,\text{row}_i\right)\cdot\mathbf{x}
=\sum_i c_i(\text{row}_i\cdot\mathbf{x})=0.
$$

因此 $N(A)$ 中的每个向量都与行空间中的每个向量正交：

$$
C(A^\top)\perp N(A).
$$

### 列空间与左零空间

把同样的论证用在 $A^\top$ 上：

$$
C(A)\perp N(A^\top).
$$

### 维数互补

上一讲已知

$$
\dim C(A^\top)+\dim N(A)=r+(n-r)=n,
$$

$$
\dim C(A)+\dim N(A^\top)=r+(m-r)=m.
$$

两个正交子空间的维数相加恰好等于整个空间的维数，这样的关系称为**正交补**：

$$
N(A)=C(A^\top)^\perp,\qquad N(A^\top)=C(A)^\perp.
$$

「补」的含义不只是「包含一些正交向量」，而是**包含全部**：零空间恰好由所有与行空间正交的向量组成，一个不多，一个不少。

这就是线性代数基本定理的第二部分：第一部分是维数，第二部分是正交性，第三部分（下一讲）是正交基。

### 例子：秩为 1 的矩阵

取一行矩阵

$$
A=\begin{bmatrix}1&2&5\end{bmatrix}.
$$

- 行空间是 $(1,2,5)$ 张成的直线；
- 零空间是方程 $x_1+2x_2+5x_3=0$ 的解，即一个平面，恰好垂直于该直线；
- 维数 $1+2=3$。

在 $\mathbb{R}^3$ 中，一条直线与一个平面可以互相垂直且维数相加为 3；但两条直线即使垂直，维数也只加到 2，不能成为正交补。

## 最小二乘：本章的主问题

当 $A\mathbf{x}=\mathbf{b}$ 无解时，仍然要给出「最好的近似解」。

典型场景：$m>n$，方程数多于未知数，且 $\mathbf{b}$ 含有测量噪声。例如用上千次卫星观测估计六个参数，或多次测量同一个人的脉搏。丢弃方程不可取——每个测量都含有信息。

正确做法是把两边左乘 $A^\top$：

$$
A^\top A\,\hat{\mathbf{x}}=A^\top\mathbf{b}.
$$

这个方程称为**正规方程**，$\hat{\mathbf{x}}$ 是最小二乘解。它总有解；当 $A$ 的列线性无关时，解唯一。

### $A^\top A$ 的性质

| 性质 | 理由 |
| --- | --- |
| 方阵 | $A$ 是 $m\times n$，$A^\top A$ 是 $n\times n$ |
| 对称 | $(A^\top A)^\top=A^\top A$ |
| 秩等于 $\operatorname{rank}(A)$ | 见下 |
| 零空间等于 $N(A)$ | 见下 |
| 可逆 $\iff A$ 的列无关 | 由前两条推出 |

关键在于：若 $A^\top A\mathbf{x}=\mathbf{0}$，左乘 $\mathbf{x}^\top$：

$$
\mathbf{x}^\top A^\top A\mathbf{x}
=(A\mathbf{x})^\top(A\mathbf{x})
=\|A\mathbf{x}\|^2=0.
$$

范数为零意味着 $A\mathbf{x}=\mathbf{0}$。所以

$$
N(A^\top A)=N(A),
$$

秩也相同。于是 $A^\top A$ 可逆当且仅当 $N(A)=\{\mathbf{0}\}$，即 $A$ 的列线性无关。

### 数值例子

$$
A=\begin{bmatrix}1&1\\1&2\\1&5\end{bmatrix}.
$$

则

$$
A^\top A=
\begin{bmatrix}
1&1&1\\
1&2&5
\end{bmatrix}
\begin{bmatrix}1&1\\1&2\\1&5\end{bmatrix}
=
\begin{bmatrix}3&8\\8&30\end{bmatrix}.
$$

行列式 $3\cdot30-8\cdot8=90-64=26\neq0$，可逆。两列独立，符合预期。

若把第二列改成第一列的倍数，例如

$$
A=\begin{bmatrix}1&1\\2&2\\3&3\end{bmatrix},
\qquad
A^\top A=
\begin{bmatrix}14&14\\14&14\end{bmatrix},
$$

秩为 1，不可逆。列相关，正规方程有无穷多解。

## 本讲结论

- 向量正交 $\iff$ 点积为零；勾股定理与点积判据等价。
- 子空间正交要求「每一对向量」都正交，比交集为零更强。
- 行空间 $\perp$ 零空间，列空间 $\perp$ 左零空间，且分别互为正交补。
- 无解时求解 $A^\top A\hat{\mathbf{x}}=A^\top\mathbf{b}$。
- $A^\top A$ 对称，零空间与秩都与 $A$ 相同，列无关时可逆。

## 理解检验

1. 为什么零向量与所有向量都正交？这与「子空间必须含零」有什么关系？
2. 两块过原点的平面如果有非零交线，为什么一定不正交？
3. 用 $A\mathbf{x}=\mathbf{0}$ 证明零空间与行空间正交，并说明为什么「行的组合」也正交。
4. $A^\top A$ 与 $A$ 的零空间为什么相同？写出关键的那一步。
5. 一个 $5\times2$ 矩阵的列相关，$A^\top A$ 的秩是多少？正规方程有多少解？

## 与前后课程的关系

上一讲只说明行空间与零空间交集为零；这一讲证明它们互相垂直、互为正交补。下一讲在此基础上构造正交基（Gram-Schmidt），并给出最小二乘的完整几何解释。
