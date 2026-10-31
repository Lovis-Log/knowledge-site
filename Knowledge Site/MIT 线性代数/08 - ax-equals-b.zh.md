---
slug: "08-ax-equals-b"
title: "解 Ax = b：特解加零空间，以及秩决定一切"
summary: "先把增广矩阵消元，零行给出可解条件；再令自由变量为零求出一个特解，加上零空间的全部向量就是通解。秩 r 与 m、n 的关系决定了解的个数。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "solvability"
  - "particular-solution"
  - "rank"
sources:
  - kind: "video"
    title: "Lecture 8: Solving Ax = b: Row Reduced Form R"
    url: "https://www.youtube.com/watch?v=9Q1q7s1jTzU"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## 这一讲要彻底解决 $A\mathbf{x}=\mathbf{b}$

完整流程只有三步：

1. 用消元判断**是否有解**；
2. 若有解，求一个**特解**；
3. 加上**零空间**，得到全部解。

这套结构会贯穿整门课，因为所有线性方程的解集都是「一个特解 + 零空间」。

## 例子：沿用上一讲的矩阵

$$
A=
\begin{bmatrix}
1&2&2&2\\
2&4&6&8\\
3&6&8&10
\end{bmatrix},
\qquad
\mathbf{b}=\begin{bmatrix}b_1\\b_2\\b_3\end{bmatrix}.
$$

第三行是第一行与第二行之和。对左端做「第一行 + 第二行」得到第三行，所以对右端做同样的组合，必须得到 $0$：

$$
b_1+b_2-b_3=0.
$$

这就是可解条件。下面看消元如何自动发现它。

### 增广矩阵与消元

$$
\left[\begin{array}{cccc|c}
1&2&2&2&b_1\\
2&4&6&8&b_2\\
3&6&8&10&b_3
\end{array}\right].
$$

**第一步**：$R_2\leftarrow R_2-2R_1$，$R_3\leftarrow R_3-3R_1$：

$$
\left[\begin{array}{cccc|c}
1&2&2&2&b_1\\
0&0&2&4&b_2-2b_1\\
0&0&2&4&b_3-3b_1
\end{array}\right].
$$

**第二步**：$R_3\leftarrow R_3-R_2$：

$$
\left[\begin{array}{cccc|c}
1&2&2&2&b_1\\
0&0&2&4&b_2-2b_1\\
0&0&0&0&b_3-b_2-b_1
\end{array}\right].
$$

最后一行是

$$
0=b_3-b_2-b_1.
$$

这正是上面猜到的条件。

> **一句话总结：** 如果左端行的某个组合得到零行，右端同一组合就必须得到零，否则方程组无解。

### 取一个满足条件的 $\mathbf{b}$

取 $\mathbf{b}=(1,5,6)$，因为 $1+5=6$。消元后右端变成

$$
\Big(b_1,\ b_2-2b_1,\ b_3-b_2-b_1\Big)=(1,\ 3,\ 0).
$$

方程组化为

$$
\begin{aligned}
x_1+2x_2+2x_3+2x_4 &= 1,\\
2x_3+4x_4 &= 3.
\end{aligned}
$$

## 特解：自由变量全部取零

主元列是第 1、3 列，自由变量是 $x_2,x_4$。令

$$
x_2=0,\qquad x_4=0.
$$

剩下的方程是

$$
\begin{aligned}
x_1+2x_3 &= 1,\\
2x_3 &= 3.
\end{aligned}
$$

回代：

$$
x_3=\frac{3}{2},\qquad
x_1=1-2\cdot\frac{3}{2}=-2.
$$

所以一个特解是

$$
\mathbf{x}_p=
\begin{bmatrix}
-2\\
0\\
3/2\\
0
\end{bmatrix}.
$$

代回原方程可验证 $A\mathbf{x}_p=\mathbf{b}$。「自由变量取零」只是为了方便；任何满足方程的解都可以当特解。

## 通解：特解 + 零空间

上一讲求出零空间的两个特殊解：

$$
\mathbf{s}_1=\begin{bmatrix}-2\\1\\0\\0\end{bmatrix},
\qquad
\mathbf{s}_2=\begin{bmatrix}2\\0\\-2\\1\end{bmatrix}.
$$

于是全部解是

$$
\mathbf{x}=
\mathbf{x}_p+c_1\mathbf{s}_1+c_2\mathbf{s}_2
=
\begin{bmatrix}-2\\0\\3/2\\0\end{bmatrix}
+c_1\begin{bmatrix}-2\\1\\0\\0\end{bmatrix}
+c_2\begin{bmatrix}2\\0\\-2\\1\end{bmatrix}.
$$

### 为什么可以这样加

$$
A(\mathbf{x}_p+\mathbf{x}_n)=A\mathbf{x}_p+A\mathbf{x}_n=\mathbf{b}+\mathbf{0}=\mathbf{b}.
$$

所以零空间里的任何向量加到特解上，仍然是解。反过来，若 $\mathbf{x}$ 与 $\mathbf{x}_p$ 都是解，则

$$
A(\mathbf{x}-\mathbf{x}_p)=\mathbf{b}-\mathbf{b}=\mathbf{0},
$$

所以 $\mathbf{x}-\mathbf{x}_p$ 在零空间里。**通解就是特解加上零空间，没有别的。**

### 几何图像

- 零空间是 $R^4$ 中一个过原点的二维子空间；
- 解集是把这个平面平移到经过 $\mathbf{x}_p$。

所以解集是一个**不过原点的平面**，不是子空间。这也解释了为什么 $A\mathbf{x}=\mathbf{b}$（$\mathbf{b}\neq\mathbf{0}$）的解集不能是向量空间：它不含零向量。

## 秩决定解的个数

设 $A$ 是 $m\times n$，秩为 $r$。永远有

$$
r\le m,\qquad r\le n.
$$

秩等于主元个数，也等于主元列数。自由变量个数是 $n-r$。

### 情况一：满列秩 $r=n$

每一列都有主元，没有自由变量：

$$
N(A)=\{\mathbf{0}\}.
$$

所以若 $A\mathbf{x}=\mathbf{b}$ 有解，解唯一；否则无解。**解的个数是 0 或 1。**

例子（高瘦矩阵）：

$$
A=
\begin{bmatrix}
1&3\\
2&1\\
6&1\\
5&1
\end{bmatrix},
\qquad r=2=n.
$$

两列独立，最简行阶梯形是

$$
R=
\begin{bmatrix}
1&0\\
0&1\\
0&0\\
0&0
\end{bmatrix}
=\begin{bmatrix}I\\0\end{bmatrix}.
$$

四个方程、两个未知数，所以并不是每个 $\mathbf{b}$ 都有解。取 $\mathbf{b}=[4,3,7,6]^T$（两列之和），唯一解是 $(1,1)$。

### 情况二：满行秩 $r=m$

每一行都有主元，消元不会产生零行，因此**对任意 $\mathbf{b}$ 都有解**。

自由变量有 $n-r=n-m$ 个，所以：

- 若 $n>m$，解有无穷多个；
- 若 $n=m$，退化为情况三。

例子：把上面的矩阵转置，

$$
A^T=
\begin{bmatrix}
1&2&6&5\\
3&1&1&1
\end{bmatrix},
\qquad r=2=m<n=4.
$$

最简行阶梯形是 $\begin{bmatrix}I&F\end{bmatrix}$，有两个自由变量，解总是无穷多。

### 情况三：满秩方阵 $r=m=n$

此时 $R=I$，矩阵可逆：

- 零空间只有零向量；
- 对每个 $\mathbf{b}$ 都有唯一解。

例子：

$$
A=\begin{bmatrix}1&2\\3&1\end{bmatrix},
\qquad
\det A=1-6=-5\neq 0.
$$

对任意 $\mathbf{b}$，解唯一。

### 情况四：一般情形 $r<m$ 且 $r<n$

既可能有零行（限制 $\mathbf{b}$），又有自由变量（解不唯一）。因此解的个数是**0 或无穷多**，绝不会恰好一个。

## 汇总表

| 秩的条件 | 最简行阶梯形 | 解的个数 |
| --- | --- | --- |
| $r=m=n$ | $I$ | 恰好 1 个 |
| $r=n<m$ | $\begin{bmatrix}I\\0\end{bmatrix}$ | 0 或 1 个 |
| $r=m<n$ | $\begin{bmatrix}I&F\end{bmatrix}$ | 无穷多个 |
| $r<m,\ r<n$ | $\begin{bmatrix}I&F\\0&0\end{bmatrix}$ | 0 或无穷多个 |

一句总结：**秩告诉你解的结构，矩阵的具体元素只告诉你解的具体数值。**

## 本讲结论

- 可解条件：消元后的零行对应的右端也必须为零；等价地，$\mathbf{b}\in C(A)$。
- 特解：令所有自由变量为 $0$，回代求主元变量。
- 通解：$\mathbf{x}=\mathbf{x}_p+\mathbf{x}_n$，其中 $\mathbf{x}_n$ 取遍零空间。
- 解集是零空间的一次平移，不过原点，因此不是子空间。
- 满列秩：0 或 1 个解；满行秩：总是无穷多解；满秩方阵：恰好 1 个解；一般情形：0 或无穷多。

## 理解检验

1. 对 $\mathbf{b}=(1,5,6)$，验证消元后的右端是 $(1,3,0)$，并求特解。
2. 为什么「特解 + 零空间」覆盖了全部解？给出两个方向的论证。
3. 一个 $4\times2$ 矩阵可能有几个解？取决于什么？
4. 一个 $2\times4$ 矩阵可能无解吗？为什么？
5. 用秩的条件解释：为什么可逆方阵对每个 $\mathbf{b}$ 都有唯一解？

## 与前后课的关系

这一讲完成了线性方程组的完整理论。下一讲转向线性无关、基与维数，把「秩」「自由变量」「零空间维数」这些计数问题统一起来。
