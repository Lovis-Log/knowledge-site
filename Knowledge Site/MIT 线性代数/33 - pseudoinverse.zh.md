---
slug: "33-pseudoinverse"
title: "左逆、右逆与伪逆：按秩分类的四种「求逆」"
summary: "逆是否存在取决于 m、n、r 的关系：满秩方阵有双侧逆，满列秩有左逆，满行秩有右逆，一般情形只能用 SVD 构造伪逆，它在行空间与列空间之间是真正的逆。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "pseudoinverse"
  - "four-subspaces"
  - "least-squares"
sources:
  - kind: "video"
    title: "33. Left and Right Inverses; Pseudoinverse"
    url: "https://www.youtube.com/watch?v=Go2aLo7ZOlU"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## 用四个子空间给「求逆」分类

设 $A$ 是 $m\times n$ 矩阵，秩为 $r$。整个讨论围绕那张熟悉的图：

- 行空间 $\subseteq\mathbb R^n$，维数 $r$；
- 零空间 $\subseteq\mathbb R^n$，维数 $n-r$；
- 列空间 $\subseteq\mathbb R^m$，维数 $r$；
- 左零空间（$A^{\mathsf T}$ 的零空间）$\subseteq\mathbb R^m$，维数 $m-r$。

逆之所以有时不存在，是因为**零空间里的向量被 $A$ 送到零，没有任何映射能把它们「复活」**。所以能否求逆，取决于零空间有多大。

## 四种情形

| 情形 | 秩 | 零空间 | 解的情况 | 逆的类型 |
| --- | --- | --- | --- | --- |
| 满秩方阵 | $r=m=n$ | 双侧都只有零 | 唯一解 | 双侧逆 $A^{-1}$ |
| 满列秩 | $r=n\le m$ | $A$ 的零空间为零 | $0$ 或 $1$ 个解 | 左逆 |
| 满行秩 | $r=m\le n$ | $A^{\mathsf T}$ 的零空间为零 | 总有解，无穷多 | 右逆 |
| 一般情形 | $r<\min(m,n)$ | 两侧都有零空间 | —— | 伪逆 |

### 情形一：满秩方阵

$r=m=n$，$A$ 可逆，左右两侧都得到单位矩阵：

$$
A^{-1}A=AA^{-1}=I.
$$

### 情形二：满列秩，左逆

列线性无关，$r=n$，$A$ 的零空间只有零向量。此时 $A^{\mathsf T}A$ 是 $n\times n$ 对称矩阵，并且可逆。

定义

$$
A_{\text{left}}=(A^{\mathsf T}A)^{-1}A^{\mathsf T}.
$$

它是 $n\times m$ 矩阵，并且

$$
A_{\text{left}}A=(A^{\mathsf T}A)^{-1}A^{\mathsf T}A=I_n.
$$

这就是最小二乘里反复出现的组合。列无关时，正规方程的系数矩阵可逆，最小二乘有唯一解。

注意维度：$A_{\text{left}}A$ 是 $n\times n$ 单位阵；但反过来的 $AA_{\text{left}}$ 是 $m\times m$，不可能是单位阵（因为 $n<m$）。

### 情形三：满行秩，右逆

行线性无关，$r=m$，$A^{\mathsf T}$ 的零空间只有零向量。此时 $AA^{\mathsf T}$ 可逆。

定义

$$
A_{\text{right}}=A^{\mathsf T}(AA^{\mathsf T})^{-1}.
$$

它是 $n\times m$ 矩阵，并且

$$
AA_{\text{right}}=I_m.
$$

因为 $r=m<n$，零空间维数为 $n-m>0$，所以只要 $Ax=b$ 有解，就有无穷多个解。

## 另一侧的乘积是投影

左逆放在右边，得不到单位阵，但得到的是一个熟悉的矩阵：

$$
AA_{\text{left}}=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}=P_{\text{col}},
$$

这是**到列空间的投影矩阵**。它尽量充当单位阵：在列空间上等于恒等，在左零空间上等于零。

同理，

$$
A_{\text{right}}A=A^{\mathsf T}(AA^{\mathsf T})^{-1}A=P_{\text{row}},
$$

这是**到行空间的投影矩阵**。

这解释了一个常见疑问：为什么左逆只能「左乘」才得到单位阵？因为另一侧的空间维度不够，投影是能做到的最好结果。

## 一般情形：伪逆

当 $r<\min(m,n)$ 时，两侧都有零空间，真正的逆不存在。但 $A$ 在**行空间与列空间之间**是一个完美的双射。

### 为什么是双射

设 $x,y$ 都在行空间，且 $Ax=Ay$。则

$$
A(x-y)=0,
$$

所以 $x-y$ 在零空间中。可是 $x-y$ 又是两个行空间向量的差，仍在行空间中。零空间与行空间正交，交集只有零向量，因此

$$
x-y=0.
$$

这就证明了：**行空间中的不同向量，被 $A$ 送到列空间中的不同向量**。

同时，行空间与列空间维数都是 $r$，所以这是一个可逆映射。它的逆就是**伪逆** $A^+$。

### 用 SVD 构造

设

$$
A=U\Sigma V^{\mathsf T}.
$$

$\Sigma$ 是 $m\times n$ 对角矩阵，前 $r$ 个对角元 $\sigma_1,\dots,\sigma_r>0$，其余为零。

把 $\Sigma$ 的每个非零对角元取倒数，并转置成 $n\times m$：

$$
\Sigma^+=\operatorname{diag}\left(\frac{1}{\sigma_1},\dots,\frac{1}{\sigma_r},0,\dots,0\right).
$$

则

$$
A^+=V\Sigma^+U^{\mathsf T}.
$$

### 两个乘积都是投影

$$
AA^+=U\Sigma\Sigma^+U^{\mathsf T}=P_{\text{col}},
$$

$$
A^+A=V\Sigma^+\Sigma V^{\mathsf T}=P_{\text{row}}.
$$

$\Sigma\Sigma^+$ 是 $m\times m$，前 $r$ 个对角元为 $1$，其余为 $0$；$\Sigma^+\Sigma$ 是 $n\times n$，结构相同。它们分别把向量投影到列空间与行空间。

### 为什么这是「最好的逆」

伪逆在**所有可能的选择中最小**：零空间方向上没有信息，任何取值都无法被检验，取零是最自然的。多填任何数都不会改变 $AA^+$ 与 $A^+A$ 的结果，只会让伪逆变大。

> 补充：伪逆满足四个 Penrose 条件：$AA^+A=A$、$A^+AA^+=A^+$、$(AA^+)^{\mathsf T}=AA^+$、$(A^+A)^{\mathsf T}=A^+A$。前两条说明它在可行范围内尽量充当逆，后两条说明两个乘积都是正交投影。

## 统计学为什么需要伪逆

最小二乘的核心是解正规方程

$$
A^{\mathsf T}A\hat x=A^{\mathsf T}b.
$$

只要 $A$ 满列秩，$A^{\mathsf T}A$ 可逆，一切顺利。但现实中经常出现**重复测量或线性相关的特征**，此时 $A^{\mathsf T}A$ 奇异，正规方程有无穷多解。

伪逆给出的

$$
\hat x=A^+b
$$

是其中范数最小的解。这正是统计软件在共线性情形下采用的默认处理方式。

## 常见误区

1. **以为长方矩阵也有双侧逆**。维度不匹配，$AA_{\text{left}}$ 是 $m\times m$，不可能等于 $I_n$。
2. **把左逆与右逆的公式记反**。左逆用 $A^{\mathsf T}A$，右逆用 $AA^{\mathsf T}$。
3. **以为伪逆等于「先转置再求逆」**。只有当 $A$ 的奇异值全为 $1$ 时才碰巧如此。
4. **忽略零空间自由度**。伪逆在零空间方向上不做任何「恢复」，这是信息论上无法做到的。

## 本讲结论

- 四种情形由 $m,n,r$ 的关系决定。
- 满列秩：左逆 $(A^{\mathsf T}A)^{-1}A^{\mathsf T}$，另一侧乘积是列空间投影。
- 满行秩：右逆 $A^{\mathsf T}(AA^{\mathsf T})^{-1}$，另一侧乘积是行空间投影。
- 一般情形：$A^+=V\Sigma^+U^{\mathsf T}$，在行空间与列空间之间是真正的逆。
- $AA^+$ 与 $A^+A$ 分别是到列空间、行空间的正交投影。
- 伪逆给出的最小二乘解是范数最小的解，适用于 $A^{\mathsf T}A$ 奇异的情形。

## 理解检验

1. 为什么长方矩阵不可能有双侧逆？
2. 左逆与右逆的公式中，为什么一个用 $A^{\mathsf T}A$，另一个用 $AA^{\mathsf T}$？
3. 证明 $A$ 在行空间上是单射，并指出证明中用到了哪两个子空间的性质。
4. 为什么 $AA^+$ 是投影而不是单位阵？它的零空间是什么？
5. 当 $A^{\mathsf T}A$ 奇异时，最小二乘为什么需要伪逆？伪逆选出的解有什么特殊性？

## 与前后课程的关系

前几讲分别处理了特征值、正定、相似与 SVD；这一讲把 SVD 用于非方阵求逆，把四个子空间、秩与最小二乘串成一个完整分类。下一讲是全课程总结，用旧考题回顾这些主线。
