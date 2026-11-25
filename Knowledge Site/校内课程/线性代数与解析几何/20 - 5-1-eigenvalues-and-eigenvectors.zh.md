---
slug: "5-1-eigenvalues-and-eigenvectors"
title: "5.1 矩阵特征值与特征向量"
summary: "矩阵特征值与特征向量的定义、性质与求法，并给出代数重数与几何重数的关系。"
updatedAt: "2026-11-25"
content_type: "reference"
group: "course"
displayNumber: "5.1"
tags:
  - "线性代数"
sources:
  - kind: article
    title: "5.1 矩阵特征值与特征向量 (1).pptx"
    url: "https://docs.google.com/presentation/d/14QoRBYXp65h8sJFeuykf8mKjBCbHXaHu/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true"
---

本章讨论方阵的特征值、特征向量，以及矩阵在相似意义下能否化为对角形。特征值与特征向量把矩阵、行列式、线性方程组联系起来：求特征值归结为解特征方程，求特征向量归结为解齐次线性方程组。

> **理解关键**：全章的对象都是**方阵**。$A\alpha=\lambda\alpha$ 中 $A$ 必须是 $n$ 阶方阵，$\alpha$ 是 $n$ 维列向量，否则两端尺寸不对。

## 特征值与特征向量的定义

**定义 1.1** 设 $A$ 为 $n$ 阶方阵，$\lambda$ 是一个数。若存在 $n$ 维**非零列向量** $\alpha$，使得

$$
A\alpha=\lambda\alpha,
$$

则称 $\lambda$ 是矩阵 $A$ 的一个**特征值**，$\alpha$ 是 $A$ 的属于特征值 $\lambda$ 的**特征向量**。

几点说明：

1. 特征向量必须是非零列向量。零向量对任何 $\lambda$ 都满足 $A\vec 0=\lambda\vec 0$，若允许零向量，任何数都成了特征值，特征值就失去意义。
2. 特征值是一个数，可以是实数，也可以是复数。实矩阵也可能有复特征值，例如旋转矩阵 $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ 的特征值为 $\pm\mathrm i$。
3. 方阵 $A$ 的特征值 $\lambda$ 对应的特征向量不唯一：若 $\alpha$ 是特征向量，则对任意非零常数 $k$，$k\alpha$ 仍是同一特征值的特征向量，因为
   $$
   A(k\alpha)=kA\alpha=k\lambda\alpha=\lambda(k\alpha).
   $$
   更进一步，属于同一特征值的特征向量的任意非零线性组合仍是特征向量（见下文特征子空间）。

## 特征值与特征向量的求法

$\lambda$ 是 $A$ 的特征值，等价于存在非零向量 $X$ 使

$$
AX=\lambda X
\iff (\lambda E-A)X=0.
$$

这是以 $\lambda E-A$ 为系数矩阵的齐次线性方程组。它有非零解，当且仅当系数矩阵的秩小于 $n$，即

$$
\operatorname{rank}(\lambda E-A)<n
\iff \det(\lambda E-A)=0.
$$

于是求特征值转化为解一个关于 $\lambda$ 的 $n$ 次方程。

**定义 1.2** 称

$$
f(\lambda)=\det(\lambda E-A)
=\begin{vmatrix}
\lambda-a_{11} & -a_{12} & \cdots & -a_{1n}\\
-a_{21} & \lambda-a_{22} & \cdots & -a_{2n}\\
\vdots & \vdots & & \vdots\\
-a_{n1} & -a_{n2} & \cdots & \lambda-a_{nn}
\end{vmatrix}
$$

为方阵 $A$ 的**特征多项式**，称 $\det(\lambda E-A)=0$ 为 $A$ 的**特征方程**，称 $\lambda E-A$ 为 $A$ 的**特征矩阵**。

展开后

$$
f(\lambda)=\lambda^n+b_{n-1}\lambda^{n-1}+\cdots+b_1\lambda+b_0,
$$

其中

$$
b_0=(-1)^n\det(A),\qquad b_{n-1}=-(a_{11}+a_{22}+\cdots+a_{nn})=-\operatorname{tr}(A).
$$

$b_0$ 由令 $\lambda=0$ 得到；$b_{n-1}$ 由展开式中 $\lambda^{n-1}$ 的系数得到。

由代数基本定理，$n$ 次方程在复数范围内必有 $n$ 个根（$k$ 重根算 $k$ 个），因此存在 $\lambda_1,\lambda_2,\dots,\lambda_n$ 使

$$
\det(\lambda E-A)=(\lambda-\lambda_1)(\lambda-\lambda_2)\cdots(\lambda-\lambda_n).
$$

这 $n$ 个数就是 $A$ 的全部特征值（含重数）。实矩阵的特征多项式是实系数多项式，所以复特征值必成共轭对出现。

### 例：二阶矩阵

求

$$
A=\begin{pmatrix}3&1\\1&3\end{pmatrix}
$$

的特征值。

**解**

$$
\det(\lambda E-A)=
\begin{vmatrix}
\lambda-3 & -1\\
-1 & \lambda-3
\end{vmatrix}
=(\lambda-3)^2-1
=\lambda^2-6\lambda+8
=(\lambda-2)(\lambda-4).
$$

令 $\det(\lambda E-A)=0$，得

$$
\lambda_1=2,\qquad \lambda_2=4.
$$

检验：特征值之和 $2+4=6=\operatorname{tr}(A)$，特征值之积 $2\cdot4=8=\det(A)$，与性质 1.2 一致。

### 求特征值与特征向量的步骤

1. 计算特征多项式 $\det(\lambda E-A)$；
2. 解特征方程 $\det(\lambda E-A)=0$，求出全部特征值 $\lambda_i$；
3. 对每个特征值 $\lambda_i$，求齐次方程组 $(\lambda_i E-A)X=0$ 的基础解系。

若 $(\lambda_i E-A)X=0$ 的基础解系为 $X_{i1},\dots,X_{ir_i}$，则

$$
k_1X_{i1}+\cdots+k_{r_i}X_{ir_i}\qquad(k_1,\dots,k_{r_i}\ \text{不全为零})
$$

是 $A$ 的属于 $\lambda_i$ 的全部特征向量。第 3 步只取基础解系的非零线性组合，不能漏掉“不全为零”这一限制。

> **易错点**：$\det(\lambda E-A)$ 与 $\det(A-\lambda E)$ 差一个因子 $(-1)^n$，有相同的根。两个特征矩阵也只差整体负号，因此相应的齐次方程组有同一个解空间。

### 例：三阶矩阵

求

$$
A=\begin{pmatrix}
1&2&2\\
2&-2&-4\\
2&-4&-2
\end{pmatrix}
$$

的特征值和特征向量。

**解** 第一步，计算特征多项式：

$$
\begin{aligned}
\det(\lambda E-A)
&=\begin{vmatrix}
\lambda-1 & -2 & -2\\
-2 & \lambda+2 & 4\\
-2 & 4 & \lambda+2
\end{vmatrix}\\
&=(\lambda-1)\bigl[(\lambda+2)^2-16\bigr]
+2\bigl[-2(\lambda+2)+8\bigr]
-2\bigl[-8+2(\lambda+2)\bigr]\\
&=(\lambda-1)(\lambda+6)(\lambda-2)-8(\lambda-2)\\
&=(\lambda-2)\bigl[(\lambda-1)(\lambda+6)-8\bigr]\\
&=(\lambda-2)(\lambda^2+5\lambda-14)=(\lambda-2)^2(\lambda+7).
\end{aligned}
$$

其中第三行两括号都等于 $-2(2\lambda-4)=-4\lambda+8$，两项相加恰为 $-8(\lambda-2)$。

第二步，解特征方程：

$$
\lambda_1=\lambda_2=2,\qquad \lambda_3=-7.
$$

第三步，对每个特征值求特征向量。

当 $\lambda=2$ 时，解 $(2E-A)X=0$：

$$
\begin{pmatrix}
1&-2&-2\\
-2&4&4\\
-2&4&4
\end{pmatrix}
\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}
=\begin{pmatrix}0\\0\\0\end{pmatrix}.
$$

系数矩阵的第二、三行都是第一行的 $-2$ 倍，方程只有一个独立约束：

$$
x_1-2x_2-2x_3=0
\implies x_1=2x_2+2x_3.
$$

取自由未知量 $(x_2,x_3)=(1,0)$ 与 $(0,1)$，得基础解系

$$
X_1=\begin{pmatrix}2\\1\\0\end{pmatrix},\qquad
X_2=\begin{pmatrix}2\\0\\1\end{pmatrix}.
$$

所以属于 $\lambda=2$ 的全部特征向量为

$$
k_1X_1+k_2X_2\qquad(k_1,k_2\ \text{不全为零}).
$$

当 $\lambda=-7$ 时，解 $(-7E-A)X=0$：

$$
\begin{pmatrix}
-8&-2&-2\\
-2&-5&4\\
-2&4&-5
\end{pmatrix}
\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}
=\begin{pmatrix}0\\0\\0\end{pmatrix}.
$$

由第一行得 $4x_1+x_2+x_3=0$；后两行相减得 $-9x_2+9x_3=0$，即 $x_2=x_3$。取 $x_2=x_3=2$，则 $x_1=-1$，得基础解系

$$
X_3=\begin{pmatrix}-1\\2\\2\end{pmatrix}.
$$

所以属于 $\lambda=-7$ 的全部特征向量为

$$
k_3X_3\qquad(k_3\ne0).
$$

**检验**：$AX_3=(7,-14,-14)^T=-7(-1,2,2)^T$，正确。特征值之和 $2+2-7=-3$ 等于迹 $1-2-2=-3$；特征值之积 $2\cdot2\cdot(-7)=-28$ 等于 $\det(A)=-28$。

## 特征子空间与两种重数

**定义** 设 $\lambda_0$ 是 $A$ 在数域 $\mathbb F$ 上的特征值，其中 $\mathbb F$ 取 $\mathbb R$ 或 $\mathbb C$。齐次方程组 $(\lambda_0E-A)X=0$ 的整个解空间

$$
V_{\lambda_0}=\{X\in\mathbb F^n\mid (\lambda_0E-A)X=0\}
$$

称为 $A$ 的属于 $\lambda_0$ 的**特征子空间**。它的维数（即基础解系所含向量个数）

$$
\dim V_{\lambda_0}=n-\operatorname{rank}(\lambda_0E-A)
$$

称为 $\lambda_0$ 的**几何重数**；而 $\lambda_0$ 在特征多项式中的重数称为它的**代数重数**。

> **理解关键**：几何重数是这个特征值能提供的线性无关特征向量的最大个数。前面的三阶例题中，$\lambda=2$ 是二重根，$2E-A$ 的秩为 $1$，所以恰有两个线性无关的特征向量。若 $2E-A$ 的秩为 $2$，这个二重根就只能提供一个。

**命题** 每个特征值的几何重数不小于 $1$，且不超过代数重数：

$$
1\le\dim V_{\lambda_0}\le m(\lambda_0).
$$

**证明** 几何重数 $\ge1$ 就是特征值的定义：$(\lambda_0E-A)X=0$ 有非零解。

设 $\dim V_{\lambda_0}=r$。若 $r=n$，则 $A=\lambda_0 E$，结论直接成立。若 $r<n$，将 $V_{\lambda_0}$ 的一组基 $\alpha_1,\dots,\alpha_r$ 扩充为 $\mathbb F^n$ 的基，令 $P=(\alpha_1,\dots,\alpha_n)$。对 $i\le r$，$A\alpha_i=\lambda_0\alpha_i$，所以在这组基下第 $i$ 列就是 $\lambda_0 e_i$，故

$$
AP=P\begin{pmatrix}\lambda_0E_r&C\\0&D\end{pmatrix},
$$

即 $P^{-1}AP$ 是分块上三角矩阵。分块上三角矩阵的特征多项式等于对角块特征多项式之积，于是

$$
\det(\lambda E-A)=\det\bigl(\lambda E-P^{-1}AP\bigr)
=(\lambda-\lambda_0)^r\det(\lambda E_{n-r}-D).
$$

右端至少含因子 $(\lambda-\lambda_0)^r$，故代数重数 $m(\lambda_0)\ge r$。

> **易错点**：$r\le m$ 的反向不等式一般不成立。例如 $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 的特征值 $1$ 代数重数为 $2$，但 $\operatorname{rank}(E-A)=1$，几何重数只有 $1$。代数重数与几何重数是否处处相等，正是下一节判断能否对角化的关键。

## 特征值与特征向量的性质

### 性质 1.1：转置不改变特征值

$n$ 阶方阵 $A$ 与其转置 $A^T$ 有相同的特征值。

**证明** 因为

$$
(\lambda E-A)^T=\lambda E-A^T,
$$

而矩阵转置不改变行列式，所以

$$
\det(\lambda E-A)=\det\bigl((\lambda E-A)^T\bigr)=\det(\lambda E-A^T).
$$

两者特征多项式相同，特征值自然相同。注意特征向量一般不同：$A$ 与 $A^T$ 的特征值相同，但对应的特征向量通常不一样。

### 性质 1.2：特征值之和与积

若 $n$ 阶方阵 $A$ 的特征值为 $\lambda_1,\lambda_2,\dots,\lambda_n$，则

$$
\prod_{i=1}^n\lambda_i=\det(A),\qquad
\sum_{i=1}^n\lambda_i=\sum_{i=1}^n a_{ii}=\operatorname{tr}(A).
$$

**证明**

1. 由
   $$
   \det(\lambda E-A)=(\lambda-\lambda_1)(\lambda-\lambda_2)\cdots(\lambda-\lambda_n),
   $$
   令 $\lambda=0$，左边为 $\det(-A)=(-1)^n\det(A)$，右边为 $(-1)^n\lambda_1\lambda_2\cdots\lambda_n$，两边消去 $(-1)^n$ 即得 $\prod\lambda_i=\det(A)$。
2. 比较两边 $\lambda^{n-1}$ 的系数。右边展开时，$\lambda^{n-1}$ 项只能由每个括号取 $\lambda$、恰有一个括号取 $-\lambda_i$ 得到，系数为 $-(\lambda_1+\cdots+\lambda_n)$。左边 $\det(\lambda E-A)$ 的展开式中，$\lambda^{n-1}$ 项只来自对角线元素的乘积
   $$
   (\lambda-a_{11})(\lambda-a_{22})\cdots(\lambda-a_{nn}),
   $$
   其系数为 $-(a_{11}+a_{22}+\cdots+a_{nn})$。比较系数得 $\sum\lambda_i=\operatorname{tr}(A)$。

这两个性质常用来快速检验特征值算得对不对：先看和是否等于迹，再看积是否等于行列式。

> **易错点**：计算和与积时要按重数计入每个特征值。迹与行列式可用来排错，但三阶及以上仅凭这两项无法确定谱。例如 $1,6,6$ 与 $2,2,9$ 的和都是 $13$，积都是 $36$。

### 例：矩阵多项式与逆矩阵的特征值

设 $\lambda$ 是 $n$ 阶矩阵 $A$ 的一个特征值，$\alpha$ 是对应于 $\lambda$ 的特征向量，证明 $A^2\alpha=\lambda^2\alpha$。

**证明** 由 $A\alpha=\lambda\alpha$ 且 $\alpha\ne0$，

$$
A^2\alpha=A(A\alpha)=A(\lambda\alpha)=\lambda A\alpha=\lambda^2\alpha.
$$

一般地，对任意**正整数** $k$，

$$
A^k\alpha=\lambda^k\alpha,
$$

即对每个正整数 $k$，$\lambda^k$ 都是 $A^k$ 的特征值，$\alpha$ 仍是对应的特征向量。这里的 $A^k$ 由矩阵连乘定义。

更进一步，若

$$
f(x)=a_0+a_1x+\cdots+a_mx^m
$$

是多项式，则 $f(\lambda)$ 是方阵

$$
f(A)=a_0E+a_1A+\cdots+a_mA^m
$$

的特征值，$\alpha$ 仍是对应的特征向量。这是因为每一项 $A^k\alpha=\lambda^k\alpha$，而 $E\alpha=\alpha$，线性组合后即得

$$
f(A)\alpha=f(\lambda)\alpha.
$$

特别地，当 $A$ 可逆时，$\lambda$ 是 $A$ 的特征值，则 $\dfrac1\lambda$ 是 $A^{-1}$ 的特征值。推导如下：

$$
A\alpha=\lambda\alpha
\implies A^{-1}A\alpha=A^{-1}\lambda\alpha
\implies \alpha=\lambda A^{-1}\alpha
\implies A^{-1}\alpha=\frac1\lambda\alpha.
$$

这里用到 $A$ 可逆，从而 $\det(A)\ne0$，所有特征值都不为零（否则 $\det(A)=\prod\lambda_i=0$，与可逆矛盾）。

若 $\lambda\ne0$，也能求出伴随矩阵在同一方向上的特征值。由 $A^*A=|A|E$，两边右乘 $\alpha$ 得

$$
A^*A\alpha=|A|\alpha
\implies \lambda A^*\alpha=|A|\alpha
\implies A^*\alpha=\frac{|A|}{\lambda}\alpha,
$$

即 $\dfrac{|A|}{\lambda}$ 是 $A^*$ 的特征值，特征向量仍可取 $\alpha$。第 8 次作业第 3 题正是这一结论。

### 例：用特征值求行列式

设 $A$ 为 $3$ 阶方阵，有三个特征值 $\lambda_1=0$，$\lambda_2=4$，$\lambda_3=3$。设

$$
B=A^2-4A+8E,
$$

求 $\det(B)$。

**分析** $B$ 的元素未知，直接按行列式定义计算不可行。但 $B$ 是 $A$ 的多项式，$B$ 的特征值可由 $A$ 的特征值算出来，而 $\det(B)$ 等于 $B$ 的全部特征值之积。

**解** 设 $f(x)=x^2-4x+8$，则 $B=f(A)$。于是 $B$ 的三个特征值为

$$
f(\lambda_1)=8,\qquad f(\lambda_2)=4^2-4\cdot4+8=8,\qquad f(\lambda_3)=3^2-4\cdot3+8=5.
$$

由性质 1.2，

$$
\det(B)=8\cdot8\cdot5=320.
$$

**思路**：题目没有给出矩阵元素，却要求行列式，说明必须走“特征值—行列式”的通道。关键是把 $B$ 识别为 $A$ 的多项式，再用 $f(A)\alpha=f(\lambda)\alpha$。

### 性质 1.3：不同特征值的特征向量线性无关

**性质 1.3** 不同特征值所对应的特征向量线性无关。

**证明** 设 $\lambda_1,\dots,\lambda_m$ 是 $A$ 的 $m$ 个互不相等的特征值，对应的特征向量为 $\alpha_1,\dots,\alpha_m$。对 $m$ 作数学归纳法。

当 $m=1$ 时，$\alpha_1\ne0$，单个非零向量线性无关，结论成立。

假设 $m=k$ 时结论成立，即 $\alpha_1,\dots,\alpha_k$ 线性无关。考察 $m=k+1$ 的情形。反设 $\alpha_1,\dots,\alpha_k,\alpha_{k+1}$ 线性相关。由于 $\alpha_1,\dots,\alpha_k$ 线性无关，$\alpha_{k+1}$ 可由它们线性表示：

$$
\alpha_{k+1}=c_1\alpha_1+\cdots+c_k\alpha_k. \tag{*}
$$

因 $\alpha_{k+1}\ne0$，$c_1,\dots,c_k$ 不全为零。

对 $(*)$ 两边左乘 $A$，利用 $A\alpha_i=\lambda_i\alpha_i$：

$$
\lambda_{k+1}\alpha_{k+1}=c_1\lambda_1\alpha_1+\cdots+c_k\lambda_k\alpha_k. \tag{1}
$$

另一方面，用 $\lambda_{k+1}$ 乘 $(*)$ 两边：

$$
\lambda_{k+1}\alpha_{k+1}=c_1\lambda_{k+1}\alpha_1+\cdots+c_k\lambda_{k+1}\alpha_k. \tag{2}
$$

(1) 减 (2) 得

$$
0=c_1(\lambda_{k+1}-\lambda_1)\alpha_1+\cdots+c_k(\lambda_{k+1}-\lambda_k)\alpha_k.
$$

因为 $\lambda_{k+1}\ne\lambda_i$（$i=1,\dots,k$），且 $c_1,\dots,c_k$ 不全为零，所以系数

$$
c_1(\lambda_{k+1}-\lambda_1),\ \dots,\ c_k(\lambda_{k+1}-\lambda_k)
$$

不全为零。这与 $\alpha_1,\dots,\alpha_k$ 线性无关矛盾。故 $\alpha_1,\dots,\alpha_k,\alpha_{k+1}$ 线性无关。

由归纳法，命题对任意正整数 $m$ 成立。

**证明的关键**：把“线性相关”化归为“其中一个向量可由其余表示”，然后分别用 $A$ 作用与数乘 $\lambda_{k+1}$，两式相减，利用特征值互不相同使系数非零，从而与低阶的线性无关性矛盾。

### 性质 1.4：性质 1.3 的推广

**性质 1.4** 设 $\lambda_1,\dots,\lambda_m$ 是 $n$ 阶矩阵 $A$ 的 $m$ 个互异特征值，对应于 $\lambda_j$ 的线性无关特征向量为

$$
\alpha_{j1},\alpha_{j2},\dots,\alpha_{jr_j}\qquad(j=1,2,\dots,m),
$$

则这 $r_1+r_2+\cdots+r_m$ 个特征向量构成的向量组

$$
\{\alpha_{jk}\mid 1\le j\le m,\ 1\le k\le r_j\}
$$

线性无关。

也就是说，不仅不同特征值各取一个特征向量时线性无关，而且把每个特征值对应的极大线性无关特征向量组合并起来，整体仍线性无关。这条性质是下一节判断矩阵能否对角化的基础。

> **补充证明**：设
>
> $$
> \sum_{j=1}^{m}\sum_{k=1}^{r_j}c_{jk}\alpha_{jk}=0.
> $$
>
> 令 $\beta_j=\sum_{k=1}^{r_j}c_{jk}\alpha_{jk}$，则 $\sum_{j=1}^{m}\beta_j=0$。若某个 $\beta_j\ne0$，它是属于 $\lambda_j$ 的特征向量（同一特征值的特征向量的非零线性组合仍是特征向量）；若 $\beta_j=0$，把它从和式中删去。
>
> 于是得到若干个属于互异特征值的非零特征向量，其和为零。由性质 1.3，这些非零特征向量线性无关，故每个 $\beta_j=0$。再由 $\alpha_{j1},\dots,\alpha_{jr_j}$ 线性无关，得所有 $c_{jk}=0$。所以这 $r_1+\cdots+r_m$ 个特征向量线性无关。

## 课堂小结

特征值与特征向量由 $A\alpha=\lambda\alpha$（$\alpha\ne0$，$\alpha$ 为列向量）定义。求法固定为三步：算特征多项式 $\det(\lambda E-A)$，解特征方程得全部特征值，再对每个特征值解 $(\lambda E-A)X=0$ 求基础解系，特征向量取基础解系的非零线性组合。检验时利用两条性质：特征值之和等于迹，之积等于行列式。转置不改变特征值；$A^k$、多项式 $f(A)$、可逆矩阵 $A^{-1}$、伴随矩阵 $A^*$ 的特征值分别是 $\lambda^k$、$f(\lambda)$、$\dfrac1\lambda$、$\dfrac{|A|}{\lambda}$，且特征向量不变。不同特征值的特征向量线性无关，且各特征值对应的线性无关特征向量组合并后仍线性无关。代数重数是特征方程中的重数，几何重数是特征子空间 $V_\lambda=\ker(\lambda E-A)$ 的维数 $n-\operatorname{rank}(\lambda E-A)$，恒有 $1\le$ 几何重数 $\le$ 代数重数。

易错点：特征向量不能取零向量；求特征向量时不要漏掉“系数不全为零”；$A^k$ 的 $k$ 是正整数而非实数；迹与行列式只是检验特征值的必要条件，两条都要用；几何重数小于代数重数时，矩阵必然不能对角化。
