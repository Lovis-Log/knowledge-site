---
slug: "2-4-inverse-of-a-matrix"
title: "2.4 矩阵的逆"
summary: "逆矩阵的概念、可逆条件、求法与分块求逆。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "2.4"
tags:
  - "线性代数"
sources:
  - kind: article
    title: "2.4 矩阵的逆 (1).pptx"
    url: "https://docs.google.com/presentation/d/1Hre4HlmcgchVQJwmNsbv9TadOYLD6I-Y/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true"
---

数和矩阵的一个根本差别是：非零数总有倒数，方阵却未必可逆。本节回答三个问题：逆矩阵是什么、方阵在什么条件下可逆、可逆时怎样求出来。核心结论是 $n$ 阶方阵 $A$ 可逆当且仅当 $\lvert A\rvert\neq 0$，且此时

$$
A^{-1}=\frac{1}{\lvert A\rvert}A^{*}.
$$

## 一、逆矩阵的概念

在实数中，当 $a\neq 0$ 时有 $a^{-1}a=aa^{-1}=1$，其中 $a^{-1}=1/a$ 称为 $a$ 的倒数；方程 $ax=b$ 的解唯一，为 $x=a^{-1}b$。

对矩阵提出同样的问题：是否存在矩阵 $A^{-1}$，使

$$
A^{-1}A=AA^{-1}=E,
$$

从而矩阵方程 $AX=b$ 的解可写成 $X=A^{-1}b$？答案取决于 $A$ 是否可逆，且并非所有方阵都有逆。

**定义 4.1** 对于 $n$ 阶方阵 $A$，如果存在矩阵 $B$，使得

$$
AB=BA=E,
$$

则称 $A$ 是**可逆**的，否则称 $A$ 不可逆；$B$ 称为 $A$ 的**逆矩阵**，记作 $A^{-1}$，此时 $A,B$ 互称逆矩阵。

说明：

1. 逆矩阵只对方阵而言，且互逆的两个矩阵必同阶。非方阵谈不上"左右乘都得单位矩阵"。
2. 若 $A=(a)$ 是一阶方阵且 $a\neq 0$，则 $A^{-1}=(1/a)$。
3. 若 $A$ 可逆、$B$ 是它的逆，则 $B$ 也可逆且 $B^{-1}=A$（互逆是相互的）。
4. **逆矩阵唯一**。证明：设 $B,C$ 都是 $A$ 的逆，则

$$
B=EB=(CA)B=C(AB)=CE=C.
$$

这里两次用到单位矩阵 $E$ 与结合律，关键是 $AB=BA=E$ 两端都能"夹"进去。

**例** 设

$$
A=\begin{pmatrix}1 & -1\\1 & 1\end{pmatrix},
\qquad
B=\begin{pmatrix}\frac12 & \frac12\\-\frac12 & \frac12\end{pmatrix},
$$

则

$$
AB=\begin{pmatrix}1 & -1\\1 & 1\end{pmatrix}
\begin{pmatrix}\frac12 & \frac12\\-\frac12 & \frac12\end{pmatrix}
=\begin{pmatrix}1 & 0\\0 & 1\end{pmatrix},
$$

$$
BA=\begin{pmatrix}1 & 0\\0 & 1\end{pmatrix},
$$

故 $B=A^{-1}$。

**例（对角矩阵的逆）** 若

$$
A=\operatorname{diag}(a_1,a_2,\dots,a_n),\qquad a_i\neq 0\ (i=1,\dots,n),
$$

则

$$
A^{-1}=\operatorname{diag}\left(\frac{1}{a_1},\frac{1}{a_2},\dots,\frac{1}{a_n}\right).
$$

验证只需把两个对角矩阵相乘：对角元相乘为 $1$，非对角元全为 $0$，两个方向都得 $E$。这也说明对角矩阵可逆当且仅当每个对角元都不为零。

**例（不可逆的矩阵）** 设

$$
A=\begin{pmatrix}0 & 3\\0 & 4\end{pmatrix},
$$

若它有逆 $B=\begin{pmatrix}b_1 & b_2\\b_3 & b_4\end{pmatrix}$，则

$$
AB=\begin{pmatrix}0 & 3\\0 & 4\end{pmatrix}\begin{pmatrix}b_1 & b_2\\b_3 & b_4\end{pmatrix}
=\begin{pmatrix}3b_3 & 3b_4\\4b_3 & 4b_4\end{pmatrix},
$$

第一行与第二行成比例，永远不可能是单位矩阵，故 $A$ 不可逆。直观上，$A$ 的两行线性相关，把二维平面压成一条直线，这种"降维"的变换无法还原。

## 二、可逆矩阵的运算规律

设涉及的矩阵都可逆，则

1. $(A^{-1})^{-1}=A$；
2. 若数 $\lambda\neq 0$，则 $(\lambda A)^{-1}=\lambda^{-1}A^{-1}$；
3. 若 $A,B$ 同阶且都可逆，则 $AB$ 可逆，且

$$
(AB)^{-1}=B^{-1}A^{-1},
$$

推广得

$$
(A_1A_2\cdots A_m)^{-1}=A_m^{-1}\cdots A_2^{-1}A_1^{-1};
$$

4. 若 $A$ 可逆，则 $A^{T}$ 也可逆，且

$$
(A^{T})^{-1}=(A^{-1})^{T}.
$$

第 3 条的顺序必须反过来，与转置的 $(AB)^{T}=B^{T}A^{T}$ 同理。验证：$(AB)(B^{-1}A^{-1})=A(BB^{-1})A^{-1}=AA^{-1}=E$。

**可逆带来的"消去"**：若 $A$ 可逆且 $AB=AC$，则左乘 $A^{-1}$ 得 $B=C$；若 $AB=0$，则左乘 $A^{-1}$ 得 $B=0$。这说明**可逆矩阵可以消去**，而 2.1 中不可逆的矩阵不能消去——消去律失效的根源正是乘数不可逆。

## 三、矩阵可逆的条件

要判断可逆并求出逆矩阵，需要借助伴随矩阵。

**定义 4.2** 设 $A=(a_{ij})$ 为 $n$ 阶方阵，$A_{ij}$ 是元素 $a_{ij}$ 的代数余子式，称方阵

$$
A^{*}=\begin{pmatrix}
A_{11} & A_{21} & \cdots & A_{n1}\\
A_{12} & A_{22} & \cdots & A_{n2}\\
\vdots & \vdots & & \vdots\\
A_{1n} & A_{2n} & \cdots & A_{nn}
\end{pmatrix}
$$

为 $A$ 的**伴随矩阵**。

注意 $A^{*}$ 的第 $i$ 行第 $j$ 列元素是 $A_{ji}$（代数余子式要**转置摆放**），这是伴随矩阵最容易写错的地方。

**例（练习）** 设

$$
A=\begin{pmatrix}1 & 0 & 1\\2 & 1 & 0\\-3 & 2 & -5\end{pmatrix},
$$

求 $A^{*}$。

解：逐个计算代数余子式：

$$
A_{11}=\begin{vmatrix}1 & 0\\2 & -5\end{vmatrix}=-5,\quad
A_{12}=-\begin{vmatrix}2 & 0\\-3 & -5\end{vmatrix}=10,\quad
A_{13}=\begin{vmatrix}2 & 1\\-3 & 2\end{vmatrix}=7,
$$

$$
A_{21}=-\begin{vmatrix}0 & 1\\2 & -5\end{vmatrix}=2,\quad
A_{22}=\begin{vmatrix}1 & 1\\-3 & -5\end{vmatrix}=-2,\quad
A_{23}=-\begin{vmatrix}1 & 0\\-3 & 2\end{vmatrix}=-2,
$$

$$
A_{31}=\begin{vmatrix}0 & 1\\1 & 0\end{vmatrix}=-1,\quad
A_{32}=-\begin{vmatrix}1 & 1\\2 & 0\end{vmatrix}=2,\quad
A_{33}=\begin{vmatrix}1 & 0\\2 & 1\end{vmatrix}=1.
$$

按"转置摆放"组成

$$
A^{*}=\begin{pmatrix}
A_{11} & A_{21} & A_{31}\\
A_{12} & A_{22} & A_{32}\\
A_{13} & A_{23} & A_{33}
\end{pmatrix}
=\begin{pmatrix}
-5 & 2 & -1\\
10 & -2 & 2\\
7 & -2 & 1
\end{pmatrix}.
$$

**引理 4.1** 设 $A$ 为 $n$ 阶方阵，$A^{*}$ 为其伴随矩阵，则

$$
AA^{*}=A^{*}A=\lvert A\rvert E.
$$

**证明**：$AA^{*}$ 的 $(i,j)$ 元素是 $A$ 的第 $i$ 行与 $A^{*}$ 的第 $j$ 列对应乘积之和，而 $A^{*}$ 的第 $j$ 列恰是 $A_{j1},A_{j2},\dots,A_{jn}$，所以

$$
(AA^{*})_{ij}=\sum_{k=1}^{n}a_{ik}A_{jk}
=\begin{cases}\lvert A\rvert, & i=j,\\ 0, & i\neq j,\end{cases}
$$

这正是一行元素与另一行代数余子式的"异乘"性质（同行为 $\lvert A\rvert$，异行为 $0$）。故 $AA^{*}=\lvert A\rvert E$；同理按列展开得 $A^{*}A=\lvert A\rvert E$。

**定理 4.1** $n$ 阶矩阵 $A$ 可逆的充要条件是 $\lvert A\rvert\neq 0$；当 $A$ 可逆时，

$$
A^{-1}=\frac{1}{\lvert A\rvert}A^{*}.
$$

**证明**：

必要性。若 $A$ 可逆，则 $AA^{-1}=E$，两边取行列式得 $\lvert A\rvert\,\lvert A^{-1}\rvert=1$，故 $\lvert A\rvert\neq 0$。

充分性。若 $\lvert A\rvert\neq 0$，由引理 $AA^{*}=A^{*}A=\lvert A\rvert E$，两边除以 $\lvert A\rvert$：

$$
A\left(\frac{1}{\lvert A\rvert}A^{*}\right)
=\left(\frac{1}{\lvert A\rvert}A^{*}\right)A=E,
$$

按定义 $A$ 可逆，且 $A^{-1}=\dfrac{1}{\lvert A\rvert}A^{*}$。

定理把"可逆"这个抽象条件翻译成"行列式非零"这个可计算的条件，同时给出第一种求逆方法——**伴随矩阵法**。由于 $n$ 阶矩阵要算 $n^2$ 个代数余子式，此法只适合阶数很低的情形。

**例（二阶公式）** 设

$$
A=\begin{pmatrix}a & b\\c & d\end{pmatrix},\qquad ad-bc\neq 0,
$$

求 $A^{-1}$。

解：$\lvert A\rvert=ad-bc\neq 0$，故 $A$ 可逆。四个代数余子式为

$$
A_{11}=d,\quad A_{12}=-c,\quad A_{21}=-b,\quad A_{22}=a,
$$

于是

$$
A^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d & -b\\-c & a\end{pmatrix}.
$$

二阶求逆的口诀是"主对角互换、副对角变号、除以行列式"，应当记住。

**例** 求

$$
A=\begin{pmatrix}1 & 1 & -1\\1 & 2 & -3\\0 & 1 & 1\end{pmatrix}
$$

的逆矩阵。

解：先算行列式判断可逆性：

$$
\lvert A\rvert=\begin{vmatrix}1 & 1 & -1\\1 & 2 & -3\\0 & 1 & 1\end{vmatrix}=3\neq 0,
$$

故 $A$ 可逆。计算九个代数余子式：

$$
A_{11}=\begin{vmatrix}2 & -3\\1 & 1\end{vmatrix}=5,\quad
A_{12}=-\begin{vmatrix}1 & -3\\0 & 1\end{vmatrix}=-1,\quad
A_{13}=\begin{vmatrix}1 & 2\\0 & 1\end{vmatrix}=1,
$$

$$
A_{21}=-\begin{vmatrix}1 & -1\\1 & 1\end{vmatrix}=-2,\quad
A_{22}=\begin{vmatrix}1 & -1\\0 & 1\end{vmatrix}=1,\quad
A_{23}=-\begin{vmatrix}1 & 1\\0 & 1\end{vmatrix}=-1,
$$

$$
A_{31}=\begin{vmatrix}1 & -1\\2 & -3\end{vmatrix}=-1,\quad
A_{32}=-\begin{vmatrix}1 & -1\\1 & -3\end{vmatrix}=2,\quad
A_{33}=\begin{vmatrix}1 & 1\\1 & 2\end{vmatrix}=1.
$$

故

$$
A^{*}=\begin{pmatrix}5 & -2 & -1\\-1 & 1 & 2\\1 & -1 & 1\end{pmatrix},
\qquad
A^{-1}=\frac{1}{3}\begin{pmatrix}5 & -2 & -1\\-1 & 1 & 2\\1 & -1 & 1\end{pmatrix}.
$$

验算：$AA^{-1}$ 的第一个对角元为 $(5-1-1)/3=1$，第一个非对角元为 $(-2+1+1)/3=0$，其余同理，结果确为单位矩阵。

**推论** 若 $n$ 阶矩阵 $A,B$ 满足 $AB=E$（或 $BA=E$），则 $A$ 可逆且 $A^{-1}=B$。

**证明**：由 $AB=E$ 得 $\lvert A\rvert\,\lvert B\rvert=1$，故 $\lvert A\rvert\neq 0$，$A^{-1}$ 存在。于是

$$
B=EB=(A^{-1}A)B=A^{-1}(AB)=A^{-1}E=A^{-1}.
$$

若已知的是 $BA=E$，把 $A,B$ 的角色互换，同理得 $B$ 可逆且 $B^{-1}=A$，于是 $A^{-1}=B$。

这个推论把"验证逆矩阵"的工作量减半：只需验证一个方向的乘积为单位矩阵。注意它只对**同阶方阵**成立。

**例** 设 $A,B$ 为 $n$ 阶方阵，满足 $A+B=AB$，证明 $A-E$ 可逆，并求 $(A-E)^{-1}$。

解：要证 $A-E$ 可逆，目标是凑出 $(A-E)(\text{某矩阵})=E$。由 $A+B=AB$ 移项并配方：

$$
AB-A-B+E=E,
$$

左边恰可分解为

$$
(A-E)(B-E)=AB-A-B+E=E.
$$

由推论，$A-E$ 可逆，且

$$
(A-E)^{-1}=B-E.
$$

**理解关键：为什么想到这样配**：条件 $AB=A+B$ 中 $A,B$ 以乘积与和的形式同时出现，而 $(A-E)(B-E)$ 展开正好产生 $AB-A-B+E$，多出的 $E$ 可以用"两边加 $E$"补上。凡是形如 $AB=A+B$、$AB=A-B$ 的条件，都优先尝试把 $A-E$、$B-E$ 或 $A+E$ 作为整体因式分解。

## 四、逆矩阵的应用：解线性方程组

设 $n$ 个未知量、$n$ 个方程的线性方程组

$$
\begin{cases}
a_{11}x_1+a_{12}x_2+\cdots+a_{1n}x_n=b_1,\\
a_{21}x_1+a_{22}x_2+\cdots+a_{2n}x_n=b_2,\\
\qquad\cdots\\
a_{n1}x_1+a_{n2}x_2+\cdots+a_{nn}x_n=b_n,
\end{cases}
$$

系数矩阵 $A=(a_{ij})_n$。若 $A$ 可逆，则方程组有唯一解

$$
X=A^{-1}b,
$$

其中 $X=(x_1,\dots,x_n)^{T}$，$b=(b_1,\dots,b_n)^{T}$。

**证明**：

存在性。把方程组写成 $AX=b$，两边左乘 $A^{-1}$：

$$
X=A^{-1}b.
$$

唯一性。若 $X_0$ 也是解，则 $AX_0=b$，两边左乘 $A^{-1}$ 得 $X_0=A^{-1}b=X$。

进一步，把 $A^{-1}=\dfrac{A^{*}}{\lvert A\rvert}$ 代入：

$$
X=\frac{1}{\lvert A\rvert}A^{*}b
=\frac{1}{\lvert A\rvert}
\begin{pmatrix}
A_{11} & A_{21} & \cdots & A_{n1}\\
A_{12} & A_{22} & \cdots & A_{n2}\\
\vdots & \vdots & & \vdots\\
A_{1n} & A_{2n} & \cdots & A_{nn}
\end{pmatrix}
\begin{pmatrix}b_1\\b_2\\\vdots\\b_n\end{pmatrix}
=\frac{1}{\lvert A\rvert}
\begin{pmatrix}D_1\\D_2\\\vdots\\D_n\end{pmatrix},
$$

其中 $D_j=\sum_{k=1}^{n}A_{kj}b_k$ 正是把 $A$ 的第 $j$ 列换成 $b$ 后所得行列式。于是

$$
x_j=\frac{D_j}{\lvert A\rvert},
$$

这就是第 1 章的**克莱姆法则**。可见克莱姆法则不过是"逆矩阵公式"的分量写法。

## 五、分块矩阵求逆

分块求逆把高阶求逆化为若干低阶求逆，是实际计算中最常用的手段。

**例** 设 $n$ 阶方阵

$$
A=\begin{pmatrix}A_{11} & A_{12}\\ O & A_{22}\end{pmatrix},
$$

其中 $A_{ii}$ 是 $n_i$ 阶可逆方阵，$n=n_1+n_2$。证明 $A$ 可逆并求 $A^{-1}$。

解：设

$$
X=\begin{pmatrix}X_{11} & X_{12}\\ X_{21} & X_{22}\end{pmatrix}
$$

为同型分块矩阵，要求 $AX=E$。由分块乘法，

$$
AX=\begin{pmatrix}
A_{11}X_{11}+A_{12}X_{21} & A_{11}X_{12}+A_{12}X_{22}\\
A_{22}X_{21} & A_{22}X_{22}
\end{pmatrix}
=\begin{pmatrix}E_{n_1} & O\\ O & E_{n_2}\end{pmatrix}.
$$

比较各块：

- 左下：$A_{22}X_{21}=O$，$A_{22}$ 可逆，故 $X_{21}=O$；
- 右下：$A_{22}X_{22}=E_{n_2}$，故 $X_{22}=A_{22}^{-1}$；
- 左上：$A_{11}X_{11}+A_{12}X_{21}=E_{n_1}$，代入 $X_{21}=O$ 得 $X_{11}=A_{11}^{-1}$；
- 右上：$A_{11}X_{12}+A_{12}X_{22}=O$，即 $A_{11}X_{12}=-A_{12}A_{22}^{-1}$，故 $X_{12}=-A_{11}^{-1}A_{12}A_{22}^{-1}$。

所以

$$
A^{-1}=\begin{pmatrix}
A_{11}^{-1} & -A_{11}^{-1}A_{12}A_{22}^{-1}\\
O & A_{22}^{-1}
\end{pmatrix}.
$$

由于右上块的解只用到 $A_{11},A_{22}$ 可逆，求出的 $X$ 满足 $AX=E$，由推论即知 $A$ 可逆且 $A^{-1}=X$。

**结论**：分块上三角矩阵

$$
A=\begin{pmatrix}A_{11} & A_{12}\\ O & A_{22}\end{pmatrix}
$$

可逆的充要条件是 $A_{11},A_{22}$ 都是可逆方阵，且逆矩阵如上。特别地，分块对角矩阵

$$
B=\begin{pmatrix}A_{11} & O\\ O & A_{22}\end{pmatrix}
$$

可逆的充要条件同样是两块都可逆，且

$$
B^{-1}=\begin{pmatrix}A_{11}^{-1} & O\\ O & A_{22}^{-1}\end{pmatrix}.
$$

> **补充证明**（必要性）：上面的构造只证明了“两块可逆 $\Rightarrow A$ 可逆”。反过来，若 $A$ 可逆，由拉普拉斯展开（1.5 节）沿前 $n_1$ 行展开，得 $|A|=|A_{11}||A_{22}|$；于是 $|A_{11}||A_{22}|=|A|\ne0$，故 $|A_{11}|\ne0$、$|A_{22}|\ne0$，两块都可逆。分块对角情形同理。

**副对角分块**：设 $A_{12}$ 为 $n_1$ 阶、$A_{21}$ 为 $n_2$ 阶可逆方阵，则类似可证

$$
\begin{pmatrix}O & A_{12}\\ A_{21} & O\end{pmatrix}
\begin{pmatrix}O & A_{21}^{-1}\\ A_{12}^{-1} & O\end{pmatrix}
=\begin{pmatrix}E_{n_1} & O\\ O & E_{n_2}\end{pmatrix},
$$

故

$$
\begin{pmatrix}O & A_{12}\\ A_{21} & O\end{pmatrix}^{-1}
=\begin{pmatrix}O & A_{21}^{-1}\\ A_{12}^{-1} & O\end{pmatrix}.
$$

这里求逆后两块的位置也发生了交换，与"副对角"结构相对应。

> **条件**：副对角分块求逆要求两个非对角块都是方阵且可逆；若块不是方阵，$A_{12}^{-1}$ 无从谈起，不能套用这个公式。

**例（循环移位矩阵）** 设 $a_1a_2\cdots a_n\neq 0$，

$$
A=\begin{pmatrix}
0 & a_1 & 0 & \cdots & 0\\
0 & 0 & a_2 & \cdots & 0\\
\vdots & \vdots & & \ddots & \vdots\\
0 & 0 & 0 & \cdots & a_{n-1}\\
a_n & 0 & 0 & \cdots & 0
\end{pmatrix},
$$

求 $A^{-1}$。

解：记 $D=\operatorname{diag}(a_1,a_2,\dots,a_n)$，取循环置换矩阵 $P$，满足 $Pe_{i+1}=e_i$（$1\le i<n$）且 $Pe_1=e_n$，这里 $e_i$ 是标准基向量。于是 $P$ 的 $1$ 位于 $(i,i+1)$ 和 $(n,1)$。在 $DP$ 中，第 $i$ 行恰好乘上 $a_i$，所以 $A=DP$。由 $P^{-1}=P^T$ 得

$$
A^{-1}=P^{-1}D^{-1}=P^{T}D^{-1}.
$$

$P^{T}$ 在 $(i+1,i)\ (i=1,\dots,n-1)$ 与 $(1,n)$ 处为 $1$；右乘 $D^{-1}$ 等于把第 $j$ 列整体除以 $a_j$。于是

$$
A^{-1}=\begin{pmatrix}
0 & 0 & \cdots & 0 & \dfrac{1}{a_n}\\
\dfrac{1}{a_1} & 0 & \cdots & 0 & 0\\
0 & \dfrac{1}{a_2} & \cdots & 0 & 0\\
\vdots & \vdots & \ddots & \vdots & \vdots\\
0 & 0 & \cdots & \dfrac{1}{a_{n-1}} & 0
\end{pmatrix}.
$$

即 $A^{-1}$ 把 $A$ 中位于上副对角线的 $a_1,\dots,a_{n-1}$ 搬到下副对角线并取倒数，把左下角的 $a_n$ 搬到右上角取倒数。以 $n=3$ 检验：

$$
\begin{pmatrix}0 & a_1 & 0\\0 & 0 & a_2\\a_3 & 0 & 0\end{pmatrix}
\begin{pmatrix}0 & 0 & \frac{1}{a_3}\\\frac{1}{a_1} & 0 & 0\\0 & \frac{1}{a_2} & 0\end{pmatrix}
=\begin{pmatrix}1 & 0 & 0\\0 & 1 & 0\\0 & 0 & 1\end{pmatrix}.
$$

## 课堂小结

- **定义**：$AB=BA=E$ 时 $B=A^{-1}$；逆矩阵唯一，只对方阵而言。
- **运算规律**：$(A^{-1})^{-1}=A$，$(\lambda A)^{-1}=\lambda^{-1}A^{-1}$，$(AB)^{-1}=B^{-1}A^{-1}$（反序），$(A^{T})^{-1}=(A^{-1})^{T}$；可逆矩阵可以消去。
- **判别与求法**：$A$ 可逆 $\iff\lvert A\rvert\neq 0\iff r(A)=n$；此时 $A^{-1}=\dfrac{1}{\lvert A\rvert}A^{*}$。二阶矩阵用"主对换、副变号、除行列式"最快。
- **伴随矩阵**：定义时代数余子式要转置摆放；引理 $AA^{*}=A^{*}A=\lvert A\rvert E$ 是全部推导的支点。
- **推论**：同阶方阵只需验证 $AB=E$ 或 $BA=E$ 之一。遇到 $A+B=AB$ 一类条件，先因式分解成 $(A-E)(B-E)=E$。
- **应用**：$AX=b$ 在 $A$ 可逆时解唯一，$X=A^{-1}b$，分量形式即克莱姆法则。
- **分块求逆**：上三角块公式 $(A_{11}^{-1},\ -A_{11}^{-1}A_{12}A_{22}^{-1};\ O,\ A_{22}^{-1})$，副对角块求逆后位置互换。
- **易错点**：$A^{*}$ 元素位置写反；$(AB)^{-1}$ 忘记反序；未确认同阶方阵就只凭 $AB=E$ 下结论；把 $\lvert A\rvert\neq 0$ 误记为 $\lvert A\rvert=1$。
