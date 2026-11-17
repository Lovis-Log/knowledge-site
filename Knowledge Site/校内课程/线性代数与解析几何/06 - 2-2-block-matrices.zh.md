---
slug: "2-2-block-matrices"
title: "2.2 矩阵的分块"
summary: "分块矩阵的运算，以及 |AB|=|A||B| 的证明。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "2.2"
tags:
  - "线性代数"
---

行数、列数较大的矩阵，直接按元素做乘法既繁琐又看不清结构。分块法把大矩阵切成若干小块，把每个子块当成一个"元素"参与运算，形式上与普通矩阵运算完全一致。它不是新的运算，而是一种**组织计算的策略**：分块不改变结果，只改变计算的次序与规模。

## 一、什么是矩阵的分块法

**定义 2.1** 用一些水平线和竖直线把矩阵分成若干个小块，这种操作称为对矩阵进行**分块**；每一小块称为矩阵的**子块**；矩阵分块后，以子块为元素的形式上的矩阵称为**分块矩阵**。

例如把 $3\times 4$ 矩阵在第二列后、第二行下各切一刀：

$$
A=\begin{pmatrix}
a_{11} & a_{12} & a_{13} & a_{14}\\
a_{21} & a_{22} & a_{23} & a_{24}\\
a_{31} & a_{32} & a_{33} & a_{34}
\end{pmatrix}
=\begin{pmatrix}
A_{11} & A_{12}\\
A_{21} & A_{22}
\end{pmatrix},
$$

其中 $A_{11}$ 是左上角的 $2\times 2$ 块，$A_{12}$ 是右上角的 $2\times 2$ 块，$A_{21}$ 是左下角的 $1\times 2$ 块，$A_{22}$ 是右下角的 $1\times 2$ 块。

一般地，把 $m\times n$ 矩阵分成 $s$ 块行、$t$ 块列：

$$
A_{m\times n}=\begin{pmatrix}
A_{11} & A_{12} & \cdots & A_{1t}\\
A_{21} & A_{22} & \cdots & A_{2t}\\
\vdots & \vdots & & \vdots\\
A_{s1} & A_{s2} & \cdots & A_{st}
\end{pmatrix},
$$

则各块行的行数之和为 $m$，各块列的列数之和为 $n$：

$$
m=r_1+r_2+\cdots+r_s,\qquad n=c_1+c_2+\cdots+c_t.
$$

**分块的基本要求**：同一块行中的各子块行数必须相同，同一块列中的各子块列数必须相同。否则子块无法拼成整齐的矩形网格，分块矩阵就失去了"形式上仍是矩阵"的意义。

**例** 五阶矩阵按前三行、前四列切开：

$$
A_{5\times 5}=\begin{pmatrix}
1 & 0 & 0 & a_{14} & a_{15}\\
0 & 1 & 0 & a_{24} & a_{25}\\
0 & 0 & 1 & a_{34} & a_{35}\\
a_{41} & a_{42} & a_{43} & 1 & 0\\
a_{51} & a_{52} & a_{53} & 0 & 1
\end{pmatrix}
=\begin{pmatrix}
E_{3\times 3} & Y_{3\times 2}\\
M_{2\times 3} & E_{2\times 2}
\end{pmatrix}.
$$

左上、右下两块恰好都是单位矩阵，这种"分块对角占优"的结构在后面求逆、算行列式时非常有用。

### 两种常用的分块法

**按行分块**：把每一行作为一块，

$$
A=\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & & \vdots\\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
=\begin{pmatrix}
\alpha_1\\ \alpha_2\\ \vdots\\ \alpha_m
\end{pmatrix},
$$

其中 $\alpha_i=(a_{i1},a_{i2},\dots,a_{in})$ 是行向量。

**按列分块**：把每一列作为一块，

$$
A=(\beta_1,\ \beta_2,\ \cdots,\ \beta_n),
$$

其中 $\beta_j=(a_{1j},a_{2j},\dots,a_{mj})^{T}$ 是列向量。

按列分块在讨论线性方程组的解、向量组的线性组合时特别自然：$Ax=x_1\beta_1+x_2\beta_2+\cdots+x_n\beta_n$，即"矩阵乘向量"就是"列向量的线性组合"。

## 二、分块矩阵的运算

分块矩阵的运算规则与普通矩阵相同，前提是**分块方式要保证每一步运算有意义**。

### 1. 加法

设 $A,B$ 都是 $m\times n$ 矩阵，采用**相同的分块法**：

$$
A=\begin{pmatrix}
A_{11} & \cdots & A_{1t}\\
\vdots & & \vdots\\
A_{s1} & \cdots & A_{st}
\end{pmatrix},
\qquad
B=\begin{pmatrix}
B_{11} & \cdots & B_{1t}\\
\vdots & & \vdots\\
B_{s1} & \cdots & B_{st}
\end{pmatrix},
$$

且对应位置子块同型，则

$$
A+B=\begin{pmatrix}
A_{11}+B_{11} & \cdots & A_{1t}+B_{1t}\\
\vdots & & \vdots\\
A_{s1}+B_{s1} & \cdots & A_{st}+B_{st}
\end{pmatrix}.
$$

"分块方案必须相同"是指切线的位置一致，否则对应位置子块不同型，无法相加。

### 2. 数乘

对任意常数 $\lambda$，

$$
\lambda A=\begin{pmatrix}
\lambda A_{11} & \cdots & \lambda A_{1t}\\
\vdots & & \vdots\\
\lambda A_{s1} & \cdots & \lambda A_{st}
\end{pmatrix},
$$

即常数要乘到每一个子块上，与"数乘作用于每个元素"一致。

### 3. 乘法（重点）

设 $A$ 为 $m\times n$、$B$ 为 $n\times p$，分别分块为

$$
A=\begin{pmatrix}
A_{11} & \cdots & A_{1t}\\
\vdots & & \vdots\\
A_{s1} & \cdots & A_{st}
\end{pmatrix},
\qquad
B=\begin{pmatrix}
B_{11} & \cdots & B_{1l}\\
\vdots & & \vdots\\
B_{t1} & \cdots & B_{tl}
\end{pmatrix}.
$$

**关键条件**：$A$ 的列的分法与 $B$ 的行的分法相同，即 $A_{i1},A_{i2},\dots,A_{it}$ 的列数分别等于 $B_{1j},B_{2j},\dots,B_{tj}$ 的行数（这样每个 $A_{ik}B_{kj}$ 才有意义）。此时

$$
AB=\begin{pmatrix}
C_{11} & \cdots & C_{1l}\\
\vdots & & \vdots\\
C_{s1} & \cdots & C_{sl}
\end{pmatrix},
\qquad
C_{ij}=\sum_{k=1}^{t}A_{ik}B_{kj}.
$$

若 $A_{ik}$ 是 $m_i\times p_k$ 矩阵、$B_{kj}$ 是 $p_k\times n_j$ 矩阵，则

$$
m_1+\cdots+m_s=m,\quad p_1+\cdots+p_t=p,\quad n_1+\cdots+n_l=n.
$$

形式上就是把子块当元素做"行乘列"，只是元素的乘法是矩阵乘法、加法是矩阵加法，因此**子块的次序不能交换**。

**例** 设

$$
A=\begin{pmatrix}
1 & 0 & 1 & 3\\
0 & 1 & 2 & 4\\
0 & 0 & -1 & 0\\
0 & 0 & 0 & -1
\end{pmatrix},
\qquad
B=\begin{pmatrix}
1 & 2 & 0 & 0\\
2 & 0 & 0 & 0\\
6 & 3 & 1 & 0\\
0 & -2 & 0 & 1
\end{pmatrix},
$$

用分块矩阵计算 $kA$ 与 $A+B$。

解：两个矩阵都在第 2 行下、第 2 列后切开：

$$
A=\begin{pmatrix}E & C\\ O & -E\end{pmatrix},
\qquad
B=\begin{pmatrix}D & O\\ F & E\end{pmatrix},
$$

其中

$$
E=\begin{pmatrix}1 & 0\\0 & 1\end{pmatrix},\quad
C=\begin{pmatrix}1 & 3\\2 & 4\end{pmatrix},\quad
D=\begin{pmatrix}1 & 2\\2 & 0\end{pmatrix},\quad
F=\begin{pmatrix}6 & 3\\0 & -2\end{pmatrix}.
$$

于是

$$
kA=\begin{pmatrix}kE & kC\\ O & -kE\end{pmatrix}
=\begin{pmatrix}
k & 0 & k & 3k\\
0 & k & 2k & 4k\\
0 & 0 & -k & 0\\
0 & 0 & 0 & -k
\end{pmatrix},
$$

$$
A+B=\begin{pmatrix}E+D & C\\ F & O\end{pmatrix}
=\begin{pmatrix}
2 & 2 & 1 & 3\\
2 & 1 & 2 & 4\\
6 & 3 & 0 & 0\\
0 & -2 & 0 & 0
\end{pmatrix}.
$$

分块后只需算 $2\times 2$ 的小块，且 $O$、$\pm E$ 这些块直接照抄，比逐元素运算省很多。

**例** 设

$$
A=\begin{pmatrix}
1 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
-1 & 2 & 1 & 0\\
1 & 1 & 0 & 1
\end{pmatrix},
\qquad
B=\begin{pmatrix}
1 & 0 & 1 & 0\\
-1 & 2 & 0 & 1\\
1 & 0 & 4 & 1\\
-1 & -1 & 2 & 0
\end{pmatrix},
$$

用分块矩阵计算 $AB$。

解：按图示把 $A$ 在第 2 行下、第 2 列后切开，$B$ 同样切开，得

$$
A=\begin{pmatrix}E & O\\ A_1 & E\end{pmatrix},
\qquad
B=\begin{pmatrix}B_{11} & E\\ B_{21} & B_{22}\end{pmatrix},
$$

其中

$$
A_1=\begin{pmatrix}-1 & 2\\1 & 1\end{pmatrix},\quad
B_{11}=\begin{pmatrix}1 & 0\\-1 & 2\end{pmatrix},\quad
B_{21}=\begin{pmatrix}1 & 0\\-1 & -1\end{pmatrix},\quad
B_{22}=\begin{pmatrix}4 & 1\\2 & 0\end{pmatrix}.
$$

**为什么这样分块**：$A$ 的左上块是单位矩阵、左下块是任意块、右下块是单位矩阵，这种"单位块 + 单侧块"的结构在乘法中会把结果化简成 $B$ 的若干块直接搬运，只需算两个 $2\times 2$ 的块乘积。按分块乘法，

$$
AB=\begin{pmatrix}E & O\\ A_1 & E\end{pmatrix}
\begin{pmatrix}B_{11} & E\\ B_{21} & B_{22}\end{pmatrix}
=\begin{pmatrix}
B_{11} & E\\
A_1B_{11}+B_{21} & A_1+B_{22}
\end{pmatrix}.
$$

分别计算：

$$
A_1B_{11}+B_{21}
=\begin{pmatrix}-1 & 2\\1 & 1\end{pmatrix}\begin{pmatrix}1 & 0\\-1 & 2\end{pmatrix}
+\begin{pmatrix}1 & 0\\-1 & -1\end{pmatrix}
=\begin{pmatrix}-3 & 4\\0 & 2\end{pmatrix}
+\begin{pmatrix}1 & 0\\-1 & -1\end{pmatrix}
=\begin{pmatrix}-2 & 4\\-1 & 1\end{pmatrix},
$$

$$
A_1+B_{22}
=\begin{pmatrix}-1 & 2\\1 & 1\end{pmatrix}+\begin{pmatrix}4 & 1\\2 & 0\end{pmatrix}
=\begin{pmatrix}3 & 3\\3 & 1\end{pmatrix}.
$$

所以

$$
AB=\begin{pmatrix}
1 & 0 & 1 & 0\\
-1 & 2 & 0 & 1\\
-2 & 4 & 3 & 3\\
-1 & 1 & 3 & 1
\end{pmatrix}.
$$

### 4. 转置

设

$$
A=\begin{pmatrix}
A_{11} & \cdots & A_{1r}\\
\vdots & & \vdots\\
A_{s1} & \cdots & A_{sr}
\end{pmatrix},
$$

则

$$
A^{T}=\begin{pmatrix}
A_{11}^{T} & \cdots & A_{s1}^{T}\\
\vdots & & \vdots\\
A_{1r}^{T} & \cdots & A_{sr}^{T}
\end{pmatrix}.
$$

即**先把分块矩阵转置（块的位置行列互换），再把每个子块转置**。两件事都要做，只做一件是常见错误。

### 5. 准对角矩阵

设 $A$ 为 $n$ 阶方阵，若它的分块矩阵只在主对角线上有非零子块，其余子块都是零矩阵，且非零子块都是方阵：

$$
A=\begin{pmatrix}
A_1 & & & \\
& A_2 & & \\
& & \ddots & \\
& & & A_s
\end{pmatrix},
$$

则称 $A$ 为**准对角矩阵**（分块对角矩阵）。

由拉普拉斯展开定理的特殊情形，准对角矩阵的行列式等于各对角块行列式之积：

$$
\lvert A\rvert=\lvert A_1\rvert\,\lvert A_2\rvert\cdots\lvert A_s\rvert.
$$

原因是按前 $n_1$ 行展开后，非零项只能取自第一个对角块，归纳即得。类似地，准对角矩阵的乘法、求逆都可以逐块进行（求逆要求每块可逆）。

## 三、应用：证明 $\lvert AB\rvert=\lvert A\rvert\lvert B\rvert$

**定理 2.1** 若 $A,B$ 是同阶方阵，则

$$
\lvert AB\rvert=\lvert A\rvert\,\lvert B\rvert.
$$

这个结论要记住并会用。证明本身是**构造性证明**，思路是"把 $AB$ 藏进一个容易算行列式的分块矩阵里"，了解即可。

**证明** 设 $A=(a_{ij})_n$，$B=(b_{ij})_n$，$C=AB=(c_{ij})_n$，其中

$$
c_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}.
$$

构造 $2n$ 阶分块矩阵

$$
D=\begin{pmatrix}A & O\\ -E & B\end{pmatrix}.
$$

$D$ 是分块下三角矩阵，由拉普拉斯展开定理（沿前 $n$ 行展开，非零子式只能取 $A$ 与 $B$ 两块），

$$
\lvert D\rvert=\lvert A\rvert\,\lvert B\rvert.
$$

另一方面，对 $D$ 作**初等列变换**：把第 1 列的 $b_{11}$ 倍、第 2 列的 $b_{21}$ 倍、……、第 $n$ 列的 $b_{n1}$ 倍加到第 $n+1$ 列；再把第 1 列的 $b_{12}$ 倍、……、第 $n$ 列的 $b_{n2}$ 倍加到第 $n+2$ 列；依此类推，直到把第 1 列的 $b_{1n}$ 倍、……、第 $n$ 列的 $b_{nn}$ 倍加到第 $2n$ 列。

这类"把一列的倍数加到另一列"的变换不改变行列式。变换后右上块 $O$ 恰好变成 $AB=C$（第 $n+j$ 列新增的部分正是 $\sum_k a_{ik}b_{kj}=c_{ij}$），而右下块 $B$ 被消成 $O$：

$$
D\ \longrightarrow\ D_1=\begin{pmatrix}A & C\\ -E & O\end{pmatrix},
\qquad
\lvert D\rvert=\lvert D_1\rvert.
$$

再对 $D_1$ 用拉普拉斯展开：把后 $n$ 行整体移到前 $n$ 行之前，需要交换 $n$ 次相邻块行，符号为 $(-1)^{n}$（严格说是 $(-1)^{n^2}=(-1)^n$），得到分块上三角行列式

$$
\lvert D_1\rvert=(-1)^{n}
\begin{vmatrix}-E & O\\ A & C\end{vmatrix}
=(-1)^{n}\lvert -E\rvert\,\lvert C\rvert
=(-1)^{n}(-1)^{n}\lvert C\rvert
=\lvert C\rvert.
$$

于是

$$
\lvert AB\rvert=\lvert C\rvert=\lvert D_1\rvert=\lvert D\rvert=\lvert A\rvert\lvert B\rvert.
$$

定理得证。

### 方阵行列式性质总结

1. $\lvert A^{T}\rvert=\lvert A\rvert$；
2. $\lvert kA\rvert=k^{n}\lvert A\rvert$；
3. $\lvert A+B\rvert=\lvert A\rvert+\lvert B\rvert$ **一般不成立**；
4. $\lvert AB\rvert=\lvert A\rvert\lvert B\rvert$，从而

$$
\lvert AB\rvert=\lvert A\rvert\lvert B\rvert=\lvert B\rvert\lvert A\rvert=\lvert BA\rvert.
$$

注意：$AB=BA$ 一般不成立，但 $\lvert AB\rvert=\lvert BA\rvert$ **总是**成立。这说明"行列式相等"比"矩阵相等"弱得多，不能由 $\lvert AB\rvert=\lvert BA\rvert$ 反推 $AB=BA$。

## 课堂小结

- **分块的定义与要求**：横竖切线把矩阵切成子块；同行子块等行数、同列子块等列数。
- **三种基本运算**：加法与数乘要求两块分法一致、对应子块同型；乘法的关键是 $A$ 的列分法与 $B$ 的行分法兼容，保证 $A_{ik}B_{kj}$ 有意义，子块次序不可交换。
- **转置**：先转块的位置，再转每个子块。
- **准对角矩阵**：行列式逐块相乘；乘法、求逆可逐块处理，是大矩阵计算"降维"的主要手段。
- **定理 2.1**：$\lvert AB\rvert=\lvert A\rvert\lvert B\rvert$，证明靠构造 $\begin{pmatrix}A&O\\-E&B\end{pmatrix}$ 并用不改变行列式的列变换把 $O$ 变成 $AB$。
- **易错点**：$\lvert A+B\rvert\neq\lvert A\rvert+\lvert B\rvert$；分块乘法中子块顺序不能交换；转置时漏掉子块本身的转置。

## 资料

- 课件原件：[2.2 矩阵的分块.pptx](<https://docs.google.com/presentation/d/1u-M6VIv-SJJKUNmqMTJ21tfvg7GIVZ8H/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true>)
