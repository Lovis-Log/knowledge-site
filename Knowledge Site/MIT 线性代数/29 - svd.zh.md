---
slug: "29-svd"
title: "奇异值分解：给四个子空间同时选对基"
summary: "任意矩阵都能分解为 A = UΣVᵀ；右奇异向量来自 AᵀA，左奇异向量来自 AAᵀ，奇异值是特征值的平方根，本质是同时为正交的输入基与输出基。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "svd"
  - "matrix-factorization"
sources:
  - kind: "video"
    title: "29. Singular Value Decomposition"
    url: "https://www.youtube.com/watch?v=TX_vooSnhm8"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## SVD 想解决什么问题

特征分解 $A=S\Lambda S^{-1}$ 有两个限制：矩阵必须是方阵，而且要有足够多的特征向量。更麻烦的是，即使能对角化，$S$ 通常也不是正交矩阵，换基之后角度和长度都被扭曲。

SVD 放弃「同一个基进、同一个基出」的要求，允许输入和输出各用一组正交基：

$$
A=U\Sigma V^{\mathsf T}.
$$

- $U$ 是 $m\times m$ 正交矩阵，列是**左奇异向量**；
- $V$ 是 $n\times n$ 正交矩阵，列是**右奇异向量**；
- $\Sigma$ 是 $m\times n$ 对角矩阵，对角元 $\sigma_1\ge\sigma_2\ge\cdots\ge\sigma_r>0$。

对**任意** $m\times n$ 矩阵都成立，不管它是否方、是否对称、是否可对角化。

> **一句话总结：** SVD 找到一组正交输入基，使得 $A$ 把每个基向量送到一组正交输出基的方向上，只做拉伸，不做旋转耦合。

## 几何目标

把 $A$ 看成从 $\mathbb R^n$ 到 $\mathbb R^m$ 的线性变换。行空间是 $\mathbb R^n$ 中的 $r$ 维子空间，列空间是 $\mathbb R^m$ 中的 $r$ 维子空间。

我们希望找到：

- 行空间的一组标准正交基 $v_1,\dots,v_r$；
- 列空间的一组标准正交基 $u_1,\dots,u_r$；

使得

$$
Av_1=\sigma_1u_1,\quad
Av_2=\sigma_2u_2,\quad\dots,\quad
Av_r=\sigma_ru_r.
$$

$\sigma_i$ 是拉伸倍数。写成矩阵就是

$$
A\begin{bmatrix}v_1&\cdots&v_r\end{bmatrix}
=\begin{bmatrix}u_1&\cdots&u_r\end{bmatrix}
\begin{bmatrix}\sigma_1&&\\&\ddots&\\&&\sigma_r\end{bmatrix}.
$$

再把零空间与左零空间补齐，就得到完整的 $A=U\Sigma V^{\mathsf T}$。

### 为什么零空间不构成困难

行空间之外的 $n-r$ 维是零空间，$A$ 把它们映到零；列空间之外的 $m-r$ 维是左零空间（$A^{\mathsf T}$ 的零空间）。这两组基只需任意选取标准正交基，对应的奇异值就是 $0$。

所以真正的任务只有一个：**在行空间和列空间里找到彼此配对的、被 $A$ 拉伸的正交方向**。

## 如何计算：消去 U

从

$$
A=U\Sigma V^{\mathsf T}
$$

出发，右乘 $V$ 的转置不方便，因为 $U$ 和 $V$ 都不知。技巧是构造一个只含 $V$ 的方程：

$$
A^{\mathsf T}A
=(U\Sigma V^{\mathsf T})^{\mathsf T}(U\Sigma V^{\mathsf T})
=V\Sigma^{\mathsf T}U^{\mathsf T}U\Sigma V^{\mathsf T}.
$$

中间 $U^{\mathsf T}U=I$，于是

$$
A^{\mathsf T}A=V\Sigma^{\mathsf T}\Sigma V^{\mathsf T}
=V\begin{bmatrix}\sigma_1^2&&\\&\ddots&\\&&\sigma_n^2\end{bmatrix}V^{\mathsf T}.
$$

这正是 $A^{\mathsf T}A$ 的特征分解：

- $V$ 的列是 $A^{\mathsf T}A$ 的特征向量；
- $\sigma_i^2$ 是 $A^{\mathsf T}A$ 的特征值；
- $\sigma_i=\sqrt{\lambda_i}$ 取正平方根。

同理，从 $AA^{\mathsf T}$ 出发会消去 $V$：

$$
AA^{\mathsf T}=U\Sigma\Sigma^{\mathsf T}U^{\mathsf T},
$$

所以 $U$ 的列是 $AA^{\mathsf T}$ 的特征向量。

$A^{\mathsf T}A$ 与 $AA^{\mathsf T}$ 都是对称半正定矩阵，特征值非负，因此平方根有意义。两者非零特征值相同（这是 $AB$ 与 $BA$ 特征值相同这一事实的特例）。

## 例一：可逆的 $2\times2$ 矩阵

取

$$
A=\begin{bmatrix}4&4\\-3&3\end{bmatrix}.
$$

### 第一步：算 $A^{\mathsf T}A$

$$
A^{\mathsf T}A=
\begin{bmatrix}4&-3\\4&3\end{bmatrix}
\begin{bmatrix}4&4\\-3&3\end{bmatrix}
=\begin{bmatrix}25&7\\7&25\end{bmatrix}.
$$

### 第二步：求特征值与特征向量

对 $\begin{bmatrix}25&7\\7&25\end{bmatrix}$，两个特征向量是 $\begin{bmatrix}1\\1\end{bmatrix}$ 与 $\begin{bmatrix}1\\-1\end{bmatrix}$：

$$
A^{\mathsf T}A\begin{bmatrix}1\\1\end{bmatrix}
=\begin{bmatrix}32\\32\end{bmatrix}=32\begin{bmatrix}1\\1\end{bmatrix},
$$

$$
A^{\mathsf T}A\begin{bmatrix}1\\-1\end{bmatrix}
=\begin{bmatrix}18\\-18\end{bmatrix}=18\begin{bmatrix}1\\-1\end{bmatrix}.
$$

归一化后

$$
v_1=\frac{1}{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix},\qquad
v_2=\frac{1}{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix}.
$$

### 第三步：奇异值

$$
\sigma_1=\sqrt{32}=4\sqrt2,\qquad
\sigma_2=\sqrt{18}=3\sqrt2.
$$

### 第四步：求 $U$

$$
AA^{\mathsf T}=
\begin{bmatrix}4&4\\-3&3\end{bmatrix}
\begin{bmatrix}4&-3\\4&3\end{bmatrix}
=\begin{bmatrix}32&0\\0&18\end{bmatrix}.
$$

它已经是对角矩阵，特征向量就是标准基，所以

$$
u_1=\begin{bmatrix}1\\0\end{bmatrix},\qquad
u_2=\begin{bmatrix}0\\1\end{bmatrix}.
$$

### 第五步：检查符号

$$
Av_1=\frac{1}{\sqrt2}\begin{bmatrix}4&4\\-3&3\end{bmatrix}
\begin{bmatrix}1\\1\end{bmatrix}
=\frac{1}{\sqrt2}\begin{bmatrix}8\\0\end{bmatrix}
=\begin{bmatrix}4\sqrt2\\0\end{bmatrix}
=4\sqrt2\begin{bmatrix}1\\0\end{bmatrix},
$$

与 $\sigma_1u_1$ 一致。

但

$$
Av_2=\frac{1}{\sqrt2}\begin{bmatrix}4&4\\-3&3\end{bmatrix}
\begin{bmatrix}1\\-1\end{bmatrix}
=\frac{1}{\sqrt2}\begin{bmatrix}0\\-6\end{bmatrix}
=\begin{bmatrix}0\\-3\sqrt2\end{bmatrix}
=-3\sqrt2\begin{bmatrix}0\\1\end{bmatrix}.
$$

出现了负号。正确的取法是 $u_2=\begin{bmatrix}0\\-1\end{bmatrix}$，此时 $Av_2=3\sqrt2\,u_2$。

> 补充：特征向量乘以 $-1$ 仍然是特征向量，所以 $V$ 的列有符号自由度。$U$ 必须与 $V$ 的符号选择配套，否则 $U\Sigma V^{\mathsf T}$ 会差一个符号。课堂在这里留下的「正弦符号」疑问，答案就是 $u_2$ 应取 $\begin{bmatrix}0\\-1\end{bmatrix}$。

最终

$$
A=
\begin{bmatrix}1&0\\0&-1\end{bmatrix}
\begin{bmatrix}4\sqrt2&0\\0&3\sqrt2\end{bmatrix}
\frac{1}{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix}.
$$

## 例二：秩为 $1$ 的矩阵

取

$$
A=\begin{bmatrix}4&3\\8&6\end{bmatrix}.
$$

两行成比例，秩为 $1$。

### 行空间与零空间

行向量都是 $\begin{bmatrix}4\\3\end{bmatrix}$ 的倍数，所以行空间是一维的：

$$
v_1=\frac{1}{5}\begin{bmatrix}4\\3\end{bmatrix}
=\begin{bmatrix}0.8\\0.6\end{bmatrix}.
$$

零空间与行空间正交，取

$$
v_2=\begin{bmatrix}0.6\\-0.8\end{bmatrix}.
$$

### 列空间与左零空间

列向量都是 $\begin{bmatrix}4\\8\end{bmatrix}$ 的倍数，方向为 $\begin{bmatrix}1\\2\end{bmatrix}$，归一化得

$$
u_1=\frac{1}{\sqrt5}\begin{bmatrix}1\\2\end{bmatrix}.
$$

左零空间与列空间正交，取

$$
u_2=\frac{1}{\sqrt5}\begin{bmatrix}2\\-1\end{bmatrix}.
$$

### 奇异值

$$
A^{\mathsf T}A=
\begin{bmatrix}4&8\\3&6\end{bmatrix}
\begin{bmatrix}4&3\\8&6\end{bmatrix}
=\begin{bmatrix}80&60\\60&45\end{bmatrix}.
$$

秩为 $1$，所以一个特征值为 $0$，另一个由迹得到：

$$
125+0=125.
$$

因此

$$
\sigma_1=\sqrt{125}=5\sqrt5,\qquad \sigma_2=0.
$$

检查：

$$
Av_1=\begin{bmatrix}4&3\\8&6\end{bmatrix}
\begin{bmatrix}0.8\\0.6\end{bmatrix}
=\begin{bmatrix}5\\10\end{bmatrix}
=5\sqrt5\cdot\frac{1}{\sqrt5}\begin{bmatrix}1\\2\end{bmatrix}
=\sigma_1u_1.
$$

## 四个子空间的完整图景

SVD 同时给出了四个基本子空间的标准正交基：

| 子空间 | 所在空间 | 维数 | 基 |
| --- | --- | --- | --- |
| 行空间 | $\mathbb R^n$ | $r$ | $v_1,\dots,v_r$ |
| 零空间 | $\mathbb R^n$ | $n-r$ | $v_{r+1},\dots,v_n$ |
| 列空间 | $\mathbb R^m$ | $r$ | $u_1,\dots,u_r$ |
| 左零空间 | $\mathbb R^m$ | $m-r$ | $u_{r+1},\dots,u_m$ |

与 Gram-Schmidt 的区别在于：Gram-Schmidt 可以从任意基造出一组正交基，但它不会让 $A$ 在这组基下变成对角。SVD 额外要求 $A$ 把每个 $v_i$ 送到 $u_i$ 的方向上，正是这个要求让它必须借助特征值。

## 常见误区

1. **以为 $U$ 和 $V$ 可以独立选取**。两者必须配对；$v_i$ 的符号改变时，$u_i$ 也要相应改变。
2. **把奇异值当成特征值**。对非对称矩阵，两者一般不同；奇异值永远非负。
3. **以为 $A^{\mathsf T}A$ 总是正定**。秩亏时它有零特征值，只是半正定。
4. **忘记排序**。标准形式要求 $\sigma_1\ge\sigma_2\ge\cdots$，$U$ 与 $V$ 的列要同步重排。

## 本讲结论

- 任意矩阵都有 SVD：$A=U\Sigma V^{\mathsf T}$。
- $V$ 的列是 $A^{\mathsf T}A$ 的特征向量，$U$ 的列是 $AA^{\mathsf T}$ 的特征向量，$\sigma_i$ 是特征值的正平方根。
- 当 $A$ 对称正定时，$U=V=Q$，SVD 退化为 $A=Q\Lambda Q^{\mathsf T}$。
- SVD 的本质是同时为正输入基与输出基，使 $A$ 只沿各方向拉伸。
- 它一次性给出四个基本子空间的标准正交基。

## 理解检验

1. 为什么 $A^{\mathsf T}A$ 的特征值一定是非负的？
2. 在例一中，为什么 $u_2$ 必须取 $\begin{bmatrix}0\\-1\end{bmatrix}$ 而不是 $\begin{bmatrix}0\\1\end{bmatrix}$？
3. 秩为 $1$ 的矩阵，SVD 里有几个非零奇异值？为什么？
4. 对称正定矩阵的 SVD 与特征分解有什么关系？
5. 如果改变 $v_1$ 的符号，$U$、$\Sigma$、$V$ 分别要怎么调整才能保持等式成立？

## 与前后课程的关系

上一讲用相似与 Jordan 形刻画了「同一变换换基」。这一讲进一步允许输入、输出使用不同的正交基，得到对所有矩阵都成立的分解。下一讲回到更基础的视角：线性变换本身是什么，矩阵如何由基的选择构造出来。
