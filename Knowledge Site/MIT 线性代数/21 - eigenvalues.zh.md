---
slug: "21-eigenvalues"
title: "特征值与特征向量：矩阵作用下方向不变的向量"
summary: "从投影、置换、旋转与三角矩阵四类例子出发，用 det(A−λI)=0 求特征值，并说明实特征值、复特征值与特征向量短缺三种可能。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "eigenvalues"
  - "eigenvectors"
  - "determinant"
sources:
  - kind: "video"
    title: "21. Eigenvalues and Eigenvectors"
    url: "https://www.youtube.com/watch?v=cdZnhQjJu4I"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## 特征向量在问什么

矩阵是作用在向量上的函数：输入 $x$，输出 $Ax$。大多数向量的方向会被改变。少数特殊向量的方向不变，只是长度被缩放——这些就是**特征向量**：

$$
Ax = \lambda x
$$

$\lambda$ 称为**特征值**。它可以是负数或零，甚至可以是复数；「方向不变」允许反向。

注意这个方程和 $Ax=b$ 完全不同：$\lambda$ 与 $x$ 都是未知量，而且乘在一起。消元法不能直接用，需要换一个思路。

### 零特征值的含义

若 $\lambda=0$，则 $Ax=0$。所以零特征值存在，等价于 $A$ 奇异，对应的特征向量就是零空间中的向量。这样一来，「行列式为零」与「有零特征值」是同一件事。

## 四个例子，先建立直觉

### 投影矩阵

设 $P$ 把向量投影到一个平面。

- 平面内的向量投影后不变：$Px=x$，所以 $\lambda=1$，整个平面都是特征向量。
- 垂直于平面的向量投影为零：$Px=0$，所以 $\lambda=0$，对应的特征向量是平面的法向量。

投影矩阵的特征值只有 $1$ 和 $0$，与「投影两次等于投影一次」完全吻合：$P^2=P$ 迫使 $\lambda^2=\lambda$。

### 置换矩阵

$$
A=\begin{bmatrix}0&1\\1&0\end{bmatrix}
$$

它交换两个分量。

- $x=(1,1)$：交换后不变，$\lambda=1$。
- $x=(-1,1)$：交换后变成 $(1,-1)=-x$，$\lambda=-1$。

两个特征向量垂直。这个矩阵是对称的，后面会看到这不是巧合。

### 旋转矩阵

逆时针旋转 $90^\circ$：

$$
Q=\begin{bmatrix}0&-1\\1&0\end{bmatrix}
$$

从几何上看，任何非零向量旋转 $90^\circ$ 后都不可能保持方向，所以应当「没有实特征向量」。代数上：

$$
\det(Q-\lambda I)
=
\begin{vmatrix}-\lambda&-1\\1&-\lambda\end{vmatrix}
=
\lambda^2+1
$$

解得 $\lambda=\pm i$。**实矩阵可以有复特征值**，而且成共轭对出现。$Q^T=-Q$，是反对称矩阵，这类矩阵的特征值纯虚。

### 三角矩阵

$$
A=\begin{bmatrix}3&1\\0&3\end{bmatrix}
$$

特征值可以直接从对角线读出：$\lambda_1=\lambda_2=3$。但求特征向量时：

$$
A-3I=\begin{bmatrix}0&1\\0&0\end{bmatrix}
$$

零空间只有一维，基是 $(1,0)$。**只有一个线性无关的特征向量**，无法张成整个平面。这是重复特征值带来的「特征向量短缺」。

## 求法：先求 λ，再求 x

### 关键变形

把 $Ax=\lambda x$ 移项：

$$
(A-\lambda I)x=0
$$

要存在非零的 $x$，矩阵 $A-\lambda I$ 必须奇异，于是

$$
\det(A-\lambda I)=0
$$

这称为**特征方程**。它是关于 $\lambda$ 的 $n$ 次多项式，有 $n$ 个根（计重数）。

### 二阶的便捷形式

对 $2\times2$ 矩阵，

$$
\det(A-\lambda I)=\lambda^2-(\operatorname{tr}A)\lambda+\det A
$$

其中迹是主对角线之和。因此：

$$
\lambda_1+\lambda_2=\operatorname{tr}A, \qquad \lambda_1\lambda_2=\det A
$$

这两个关系对任意 $n$ 也成立：所有特征值之和等于迹，之积等于行列式。

### 完整例子

$$
A=\begin{bmatrix}3&1\\1&3\end{bmatrix}
$$

先算特征多项式：

$$
\det(A-\lambda I)
=
\begin{vmatrix}3-\lambda&1\\1&3-\lambda\end{vmatrix}
=
(3-\lambda)^2-1
=
\lambda^2-6\lambda+8
$$

因式分解：

$$
(\lambda-4)(\lambda-2)=0
$$

所以 $\lambda_1=4$，$\lambda_2=2$。验证：和 $4+2=6$ 等于迹，积 $8$ 等于行列式。

再求特征向量。

$\lambda=4$：

$$
A-4I=\begin{bmatrix}-1&1\\1&-1\end{bmatrix}
$$

零空间由 $(1,1)$ 张成。

$\lambda=2$：

$$
A-2I=\begin{bmatrix}1&1\\1&1\end{bmatrix}
$$

零空间由 $(-1,1)$ 张成（也可取 $(1,-1)$）。

两个特征向量垂直。矩阵是对称的，特征值都是实数。

## 三个结构性事实

### 加 $cI$ 只平移特征值

若 $Ax=\lambda x$，则

$$
(A+cI)x=Ax+cx=(\lambda+c)x
$$

所以特征向量完全不变，特征值整体加 $c$。课堂上正是这样从置换矩阵 $\begin{bmatrix}0&1\\1&0\end{bmatrix}$ 得到 $\begin{bmatrix}3&1\\1&3\end{bmatrix}$：特征值从 $1,-1$ 变成 $4,2$，特征向量仍是 $(1,1)$ 与 $(-1,1)$。

### 但 $A+B$ 没有这种性质

一个常见错误是：若 $Ax=\lambda x$、$By=\alpha y$，就断言 $A+B$ 的特征值是 $\lambda+\alpha$。这**不成立**，因为 $x$ 一般不是 $B$ 的特征向量。$-x$ 只有在 $B$ 是 $I$ 的倍数时才碰巧成立。

同理，$AB$ 的特征值一般也不是特征值的乘积。

### 迹与行列式总是对的

无论矩阵是否对称、是否重复，下面的恒等式都成立：

$$
\sum_i \lambda_i = \operatorname{tr}A, \qquad \prod_i \lambda_i = \det A
$$

这也是判断计算是否出错的第一道检查。

## 三种「坏情况」

| 情况 | 例子 | 后果 |
| --- | --- | --- |
| 复特征值 | 旋转 $90^\circ$ | 没有实特征方向；特征值成共轭对 |
| 重复特征值 | $\begin{bmatrix}3&1\\0&3\end{bmatrix}$ | 可能只有一维特征空间 |
| 特征向量不足 | 同上 | 无法对角化，下一讲处理 |

对称矩阵是「好情况」的代表：特征值全为实，特征向量两两正交。反对称矩阵是另一个极端：特征值纯虚。一般矩阵介于两者之间。

## 核心回顾

- $Ax=\lambda x$：矩阵作用后方向不变的向量。
- 零特征值 $\iff$ 矩阵奇异。
- 求法：解 $\det(A-\lambda I)=0$ 得 $\lambda$，再解 $(A-\lambda I)x=0$ 得 $x$。
- 二阶：$\lambda^2-\operatorname{tr}(A)\lambda+\det A=0$。
- 特征值之和等于迹，之积等于行列式。
- 加 $cI$ 平移特征值、保持特征向量；$A+B$ 一般没有这种关系。
- 实矩阵可能有复特征值；重复特征值可能导致特征向量不足。

## 常见误区

1. **把 $Ax=\lambda x$ 当成普通方程组用消元解**。两个未知量相乘，必须先消去 $x$。
2. **认为特征向量唯一**。特征向量张成一个空间，任何非零倍数都有效。
3. **忘记零特征值的几何含义**。它就是零空间。
4. **对 $A+B$ 直接相加特征值**。只有 $B=cI$ 时才成立。
5. **以为实矩阵的特征值一定是实数**。旋转矩阵给出反例。

## 理解检验

1. 投影矩阵的特征值为什么只能是 0 和 1？
2. 用迹与行列式验证 $\begin{bmatrix}3&1\\1&3\end{bmatrix}$ 的特征值。
3. 旋转 $90^\circ$ 的矩阵为什么没有实特征向量？
4. 一个 $3\times3$ 矩阵有特征值 $2,2,5$，它的迹与行列式各是多少？
5. 为什么 $\begin{bmatrix}3&1\\0&3\end{bmatrix}$ 只有一维特征空间？

## 与前后课程的关系

这一讲定义特征值与特征向量，并给出求法。下一讲讨论对角化：当矩阵有足够多的线性无关特征向量时，可以写成 $A=S\Lambda S^{-1}$，从而快速计算幂与理解长期行为。重复特征值导致的短缺，将由 Jordan 形式处理。
