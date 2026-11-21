---
slug: "2-1-matrices-and-operations"
title: "2.1 矩阵与矩阵的运算"
summary: "矩阵的定义、线性运算、乘法与转置。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "2.1"
tags:
  - "线性代数"
sources:
  - kind: article
    title: "2.1 矩阵与矩阵的运算.pptx"
    url: "https://docs.google.com/presentation/d/1kVd7--VA6rsjy45wyX4nvOprdiLgfEL6/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true"
---

矩阵是把数按行、列排成的数表。它最早来自线性方程组系数所构成的方阵，由 19 世纪英国数学家凯莱（Cayley）提出，后来成为贯穿行列式、线性方程组、二次型、向量空间与线性变换的统一语言。本节把"数表"本身当作一个对象，规定它的相等、加法、数乘、乘法、转置等运算，并比较它与普通数的运算差别。

## 一、矩阵的定义

### 1. 两个引入例子

**例（发货数量表）** 某工厂生产四种货物，向三个客户发货的数量可用一个三行四列的数表表示：

$$
\begin{pmatrix}
a_{11} & a_{12} & a_{13} & a_{14}\\
a_{21} & a_{22} & a_{23} & a_{24}\\
a_{31} & a_{32} & a_{33} & a_{34}
\end{pmatrix}
$$

其中 $a_{ij}$ 表示工厂向第 $i$ 个客户发送第 $j$ 种货物的数量。行标 $i$ 对应客户，列标 $j$ 对应货物，一个数表就把"谁、要什么、多少"三件事同时装下了。

**例（线性方程组的消元）** 解方程组

$$
\begin{cases}
x_1+x_2+x_3=1,\\
x_2+x_3=2,\\
x_1+x_2+2x_3=1.
\end{cases}
$$

消元时只用到系数与常数项，未知量名可以暂时不看。把系数和常数项按行写下，第一次「第 1 行减第 2 行、第 3 行减第 1 行」，第二次「第 2 行减第 3 行」，过程写成数表的变换就是

$$
\begin{pmatrix}
1 & 1 & 1 & 1\\
0 & 1 & 1 & 2\\
1 & 1 & 2 & 1
\end{pmatrix}
\xrightarrow[r_3-r_1]{r_1-r_2}
\begin{pmatrix}
1 & 0 & 0 & -1\\
0 & 1 & 1 & 2\\
0 & 0 & 1 & 0
\end{pmatrix}
\xrightarrow{r_2-r_3}
\begin{pmatrix}
1 & 0 & 0 & -1\\
0 & 1 & 0 & 2\\
0 & 0 & 1 & 0
\end{pmatrix},
$$

读出 $x_1=-1,\ x_2=2,\ x_3=0$。引入矩阵记号后，消元过程不必反复抄写未知量，这也是后面第 4 章用矩阵解方程组的出发点。

> **易错点**：同一步中并列的多个行变换必须都按**变换前**的旧行计算。这里第 1 行要用旧的第 1 行减第 2 行，第 3 行也要用旧的第 1 行；若先把第 1 行改掉再拿它去改第 3 行，结果会不同。

### 2. 数域

**定义 1.1** 设 $F$ 是一个至少含有 $0,1$ 的复数集合的子集合。如果 $F$ 中任意两个数的和、差、积、商（除数不为 $0$）仍在 $F$ 中（对四则运算封闭），则称 $F$ 为一个数域。

- 有理数全体构成有理数域 $\mathbb{Q}$，实数全体构成实数域 $\mathbb{R}$，复数全体构成复数域 $\mathbb{C}$。
- 奇数全体不构成数域（两个奇数之和为偶数，已不在集合内），偶数全体也不构成数域（$2\div 4=\frac12$ 不在其中）。

### 3. 矩阵的定义

**定义 1.2** 由数域 $F$ 中的 $m\times n$ 个数排成的 $m$ 行 $n$ 列的数表

$$
\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & & \vdots\\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
$$

称为数域 $F$ 上的一个 $m\times n$ 矩阵。

说明：

1. 这 $m\times n$ 个数叫做矩阵的元素，$a_{ij}$ 位于第 $i$ 行第 $j$ 列，称为矩阵的 $(i,j)$ 元素。
2. 矩阵常用大写黑体字母 $\boldsymbol{A},\boldsymbol{B},\boldsymbol{C},\dots$ 表示，$m\times n$ 矩阵简记为

$$
\boldsymbol{A}=\boldsymbol{A}_{m\times n}=(a_{ij})_{m\times n}.
$$

3. 元素全是实数的矩阵称为实矩阵；元素中含有复数的矩阵称为复矩阵。本章若无特别说明，都假定讨论的是复数域 $\mathbb{C}$ 上的矩阵。

### 4. 矩阵与行列式的区别

两者外观相似，本质不同，这是初学最容易混淆的地方：

| 比较项 | 行列式 | 矩阵 |
| --- | --- | --- |
| 本质 | 一个数（或式子） | 一张数表 |
| 行数与列数 | 必须相等 | 不一定相等 |
| 元素个数 | $n^2$ | $m\times n$ |
| 记号 | $\lvert a_{ij}\rvert$ 或 $\det(a_{ij})$ | $(a_{ij})_{m\times n}$ |

由此可知：行列式是对方阵的一种运算，只有方阵才能取行列式；而矩阵本身只是一个数组，行数列数可以任意。

### 5. 几个常用概念

1. **行矩阵（行向量）**：只有一行的矩阵 $A=(a_1,a_2,\dots,a_n)$。
2. **列矩阵（列向量）**：只有一列的矩阵

$$
B=\begin{pmatrix}b_1\\b_2\\\vdots\\b_n\end{pmatrix}.
$$

3. **零矩阵**：元素全为零的矩阵，仍记为 $0$；$m\times n$ 的零矩阵记作 $0_{m\times n}$。
4. **同型矩阵**：两个矩阵的行数相同、列数也相同。
5. **相等矩阵**：若 $A=(a_{ij})_{m\times n}$ 与 $B=(b_{ij})_{m\times n}$ 同型，且对应元素全相等，即 $a_{ij}=b_{ij}$（$i=1,\dots,m;\ j=1,\dots,n$），则称 $A$ 与 $B$ 相等，记作 $A=B$。

**例** 设

$$
\begin{pmatrix}3 & -1\\4 & 2\\-5 & 6\end{pmatrix}
=\begin{pmatrix}a & b\\c & d\\e & f\end{pmatrix},
$$

则 $a=3,\ b=-1,\ c=4,\ d=2,\ e=-5,\ f=6$。相等必须同型且逐个元素相同，两个不同型的矩阵谈不上相等。

6. **$n$ 阶方阵**：行数与列数都等于 $n$ 的矩阵，规定一阶方阵 $(a)=a$。

由方阵引出以下几类特殊矩阵。

**方阵的迹**：$n$ 阶方阵 $A=(a_{ij})$ 的主对角线元素之和称为 $A$ 的迹，记作

$$
\operatorname{tr}(A)=a_{11}+a_{22}+\cdots+a_{nn}=\sum_{i=1}^{n}a_{ii}.
$$

**对角矩阵**：主对角线之外的元素全为零的方阵，常记为

$$
A=\operatorname{diag}(a_{11},a_{22},\dots,a_{nn})
=\begin{pmatrix}
a_{11} & & & \\
& a_{22} & & \\
& & \ddots & \\
& & & a_{nn}
\end{pmatrix}.
$$

空白处均为 $0$。

**单位矩阵**：主对角线元素全为 $1$ 的对角矩阵，记作 $E_n$（或 $E$）：

$$
E_n=\begin{pmatrix}
1 & & & \\
& 1 & & \\
& & \ddots & \\
& & & 1
\end{pmatrix}_n.
$$

**数量矩阵**：主对角线元素全等于常数 $c$ 的对角矩阵，即 $cE$。

**三角形矩阵**：主对角线下方元素全为零的方阵称为上三角形矩阵，主对角线上方元素全为零的方阵称为下三角形矩阵：

$$
\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
& a_{22} & \cdots & a_{2n}\\
& & \ddots & \vdots\\
& & & a_{nn}
\end{pmatrix},
\qquad
\begin{pmatrix}
a_{11} & & & \\
a_{21} & a_{22} & & \\
\vdots & \vdots & \ddots & \\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{pmatrix}.
$$

## 二、矩阵的运算

### 1. 负矩阵

**定义 1.3** 设 $A=(a_{ij})_{m\times n}$，称 $-A=(-a_{ij})_{m\times n}$ 为 $A$ 的负矩阵。

### 2. 矩阵的加法

**定义 1.4** 设 $A=(a_{ij})$、$B=(b_{ij})$ 都是 $m\times n$ 矩阵，规定

$$
A+B=(a_{ij}+b_{ij})_{m\times n},
$$

即对应位置元素相加。

**注意**：只有同型矩阵才能相加，行数或列数不同时加法没有定义。

加法满足（设 $A,B,C,0$ 都是 $m\times n$ 矩阵）：

1. $A+B=B+A$（交换律）；
2. $(A+B)+C=A+(B+C)$（结合律）；
3. $A+0=A$；
4. $A+(-A)=0$。

并规定减法 $A-B=A+(-B)$。

### 3. 矩阵的数乘

**定义 1.5** 以数 $k$ 乘矩阵 $A=(a_{ij})$ 的每一个元素，记作 $kA$：

$$
kA=(ka_{ij})_{m\times n}
=\begin{pmatrix}
ka_{11} & ka_{12} & \cdots & ka_{1n}\\
ka_{21} & ka_{22} & \cdots & ka_{2n}\\
\vdots & \vdots & & \vdots\\
ka_{m1} & ka_{m2} & \cdots & ka_{mn}
\end{pmatrix},
$$

称为 $A$ 与 $k$ 的数量乘积，简称数乘。显然 $cE$ 就是主对角线全为 $c$ 的数量矩阵。

**数乘与行列式提公因子的区别**：对 $n$ 阶方阵 $A$，数乘 $k$ 要乘到每一个元素上，因此

$$
\lvert kA\rvert=k^{n}\lvert A\rvert,
$$

而 $\lvert A\rvert$ 的某一行提公因子 $k$ 时只提出一个 $k$。这是"矩阵运算"与"行列式运算"最典型的差异之一。

数乘满足（设 $A,B$ 为 $m\times n$ 矩阵，$k,l$ 为数）：

1. $k(A+B)=kA+kB$；
2. $(k+l)A=kA+lA$；
3. $k(lA)=(kl)A$；
4. $1A=A$；
5. $kA=0\iff k=0$ 或 $A=0$。

矩阵的加法与数乘统称为矩阵的**线性运算**。

### 4. 矩阵的乘法

**定义 1.6** 设 $A=(a_{ij})_{m\times s}$，$B=(b_{ij})_{s\times n}$，规定 $A$ 与 $B$ 的乘积是一个 $m\times n$ 矩阵 $C=(c_{ij})_{m\times n}$，其中

$$
c_{ij}=a_{i1}b_{1j}+a_{i2}b_{2j}+\cdots+a_{is}b_{sj}=\sum_{k=1}^{s}a_{ik}b_{kj},
$$

记作 $C=AB$。即 $c_{ij}$ 是 $A$ 的第 $i$ 行与 $B$ 的第 $j$ 列对应元素乘积之和。

**可乘条件**：前一个矩阵的列数等于后一个矩阵的行数。满足时

$$
A_{m\times s}B_{s\times n}=C_{m\times n},
$$

外侧的两个阶数决定乘积的行数与列数，内侧的 $s$ 被"消掉"。

**例** 设

$$
A=\begin{pmatrix}
1 & 0 & -1 & 2\\
-1 & 1 & 3 & 0\\
0 & 5 & -1 & 4
\end{pmatrix}_{3\times 4},
\qquad
B=\begin{pmatrix}
0 & 3 & 4\\
1 & 2 & 1\\
3 & 1 & -1\\
-1 & 2 & 1
\end{pmatrix}_{4\times 3},
$$

求 $AB$。

解：$A$ 的列数 $4$ 等于 $B$ 的行数 $4$，乘积为 $3\times 3$ 矩阵。按"行乘列"逐个算出

$$
C=AB=\begin{pmatrix}
-5 & 6 & 7\\
10 & 2 & -6\\
-2 & 17 & 10
\end{pmatrix}_{3\times 3}.
$$

例如 $c_{11}=1\cdot 0+0\cdot 1+(-1)\cdot 3+2\cdot(-1)=-5$，$c_{23}=(-1)\cdot 4+1\cdot 1+3\cdot(-1)+0\cdot 1=-6$，可见每个元素都要把四个乘积相加，漏项是最常见的计算错误。

#### 矩阵乘法与数乘的不同

**（1）不满足交换律。** 取

$$
A=(1,0,4),\qquad B=\begin{pmatrix}1\\1\\0\end{pmatrix},
$$

则

$$
AB=(1,0,4)\begin{pmatrix}1\\1\\0\end{pmatrix}=1\times1+0\times1+4\times0=1,
$$

而

$$
BA=\begin{pmatrix}1\\1\\0\end{pmatrix}(1,0,4)
=\begin{pmatrix}1 & 0 & 4\\1 & 0 & 4\\0 & 0 & 0\end{pmatrix}.
$$

$AB$ 是 $1\times 1$ 矩阵，$BA$ 是 $3\times 3$ 矩阵，两者连型都不同，当然谈不上相等。

即使同型也未必相等：取

$$
A=\begin{pmatrix}0 & 1\\1 & 0\end{pmatrix},
\qquad
B=\begin{pmatrix}1 & 1\\0 & 1\end{pmatrix},
$$

则

$$
AB=\begin{pmatrix}0 & 1\\1 & 1\end{pmatrix},
\qquad
BA=\begin{pmatrix}1 & 1\\1 & 0\end{pmatrix},
$$

同型但 $AB\neq BA$。

**（2）$AB$ 有意义时 $BA$ 不一定有意义。** 取

$$
A=\begin{pmatrix}1 & 2 & 3\\3 & 0 & 1\end{pmatrix}_{2\times 3},
\qquad
B=\begin{pmatrix}4 & 0 & 1\\2 & 1 & 1\\-1 & 2 & 2\end{pmatrix}_{3\times 3},
$$

则

$$
AB=\begin{pmatrix}5 & 8 & 9\\11 & 2 & 5\end{pmatrix},
$$

但 $BA$ 是 $3\times 3$ 乘 $2\times 3$，内阶 $3\neq 2$，无意义。

**（3）并非所有矩阵乘法都不可交换。** 取

$$
A=\begin{pmatrix}1 & 1\\0 & 1\end{pmatrix},
\qquad
B=\begin{pmatrix}1 & 2\\0 & 1\end{pmatrix},
$$

则

$$
AB=\begin{pmatrix}1 & 3\\0 & 1\end{pmatrix}=BA.
$$

一般地，若 $AB=BA$，称 $A$ 与 $B$ **可交换**。

两个矩阵可交换的必要条件：设 $A$ 为 $m\times n$，要使 $AB$ 与 $BA$ 都有意义，$B$ 必须是 $n\times m$；此时 $AB$ 是 $m$ 阶方阵，$BA$ 是 $n$ 阶方阵。两者相等必须先同型，故 $m=n$。即

> 若 $A$ 与 $B$ 可交换，则 $A,B$ 必为同阶方阵。

**（4）两个非零矩阵的乘积可能是零矩阵。** 取

$$
A=\begin{pmatrix}2 & 4\\1 & 2\end{pmatrix},
\qquad
B=\begin{pmatrix}2 & -2\\-1 & 1\end{pmatrix},
$$

则

$$
AB=\begin{pmatrix}2\cdot2+4\cdot(-1) & 2\cdot(-2)+4\cdot1\\1\cdot2+2\cdot(-1) & 1\cdot(-2)+2\cdot1\end{pmatrix}
=\begin{pmatrix}0 & 0\\0 & 0\end{pmatrix}.
$$

原因在于 $B$ 的两列都是 $(2,-1)^{T}$ 的倍数，而 $A$ 的两行都与 $(2,-1)$ 正交，乘积自然全为零。所以由 $AB=0$ 不能推出 $A=0$ 或 $B=0$。

**（5）一般不满足消去律。** 即由 $AC=BC$（$C\neq 0$）不能推出 $A=B$。取

$$
A=\begin{pmatrix}1 & 2\\0 & 3\end{pmatrix},
\quad
B=\begin{pmatrix}1 & 0\\0 & 4\end{pmatrix},
\quad
C=\begin{pmatrix}1 & 1\\0 & 0\end{pmatrix},
$$

则

$$
AC=\begin{pmatrix}1 & 1\\0 & 0\end{pmatrix}=BC,
$$

但 $A\neq B$。根源仍是 $C$ 的两列线性相关（第二列是零列），左乘 $C$ 把 $A,B$ 的差别"抹掉"了。

#### 乘法的运算规律

设运算都有意义，则

1. $(AB)C=A(BC)$（结合律）；
2. $k(AB)=(kA)B=A(kB)$；
3. $A(B+C)=AB+AC$，$(B+C)A=BA+CA$（分配律）；
4. $0A=0$，$A0=0$；
5. $E_mA_{m\times n}=A_{m\times n}$，$A_{m\times n}E_n=A_{m\times n}$。

> **补充证明（结合律）**：设 $A=(a_{ij})_{m\times s}$，$B=(b_{jk})_{s\times t}$，$C=(c_{kl})_{t\times n}$。逐元素计算：
>
> $$
> ((AB)C)_{il}=\sum_{k=1}^{t}\Bigl(\sum_{j=1}^{s}a_{ij}b_{jk}\Bigr)c_{kl}
> =\sum_{j=1}^{s}\sum_{k=1}^{t}a_{ij}b_{jk}c_{kl},
> $$
>
> $$
> (A(BC))_{il}=\sum_{j=1}^{s}a_{ij}\Bigl(\sum_{k=1}^{t}b_{jk}c_{kl}\Bigr)
> =\sum_{j=1}^{s}\sum_{k=1}^{t}a_{ij}b_{jk}c_{kl}.
> $$
>
> 两式只是求和次序不同，结果相同，故 $(AB)C=A(BC)$。分配律同样逐元素展开即可。

**总结**：矩阵乘法与数的乘法**相同**之处是结合律、分配律、与数的结合律；**不同**之处是不满足交换律，且 $AB=0$ 推不出 $A=0$ 或 $B=0$（进而不满足消去律）。

### 5. 方阵的幂与方阵多项式

**定义 1.7** 设 $A$ 是 $n$ 阶方阵，规定

$$
A^1=A,\quad A^2=AA,\quad \dots,\quad A^{k+1}=A^kA,
$$

其中 $k$ 为正整数，并规定 $A^0=E$。只有方阵的幂才有意义。幂满足

$$
A^kA^l=A^{k+l},\qquad (A^k)^l=A^{kl}.
$$

注意一般地 $(AB)^k\ne A^kB^k$，因为 $A,B$ 不可交换。

**例** 设

$$
A=\begin{pmatrix}
1 & 1 & 1 & 1\\
1 & 1 & -1 & -1\\
1 & -1 & 1 & -1\\
1 & -1 & -1 & 1
\end{pmatrix},
$$

求 $A^4$。

解：直接算 $A^4$ 要做三次 $4$ 阶乘法，先算 $A^2$ 看结构。逐行乘逐列，

$$
A^2=\begin{pmatrix}
4 & 0 & 0 & 0\\
0 & 4 & 0 & 0\\
0 & 0 & 4 & 0\\
0 & 0 & 0 & 4
\end{pmatrix}=4E.
$$

于是

$$
A^4=A^2A^2=(4E)(4E)=16E.
$$

这里的关键是：$A$ 的任意两行（列）要么相同、要么正交，使 $A^2$ 立刻变成数量矩阵；一旦成为数量矩阵，再乘方只需对对角元作幂。

一般地，若 $A=\operatorname{diag}(\lambda_1,\lambda_2,\dots,\lambda_n)$ 为对角矩阵，则

$$
A^k=\operatorname{diag}(\lambda_1^k,\lambda_2^k,\dots,\lambda_n^k).
$$

**方阵多项式**：设 $\varphi(x)=a_0+a_1x+\cdots+a_mx^m$ 为 $x$ 的 $m$ 次多项式，$A$ 为 $n$ 阶方阵，记

$$
\varphi(A)=a_0E+a_1A+\cdots+a_mA^m,
$$

称为矩阵 $A$ 的 $m$ 次多项式，其值仍是 $n$ 阶方阵。这里常数项必须写成 $a_0E$，不能写成数 $a_0$，否则无法与矩阵相加。

对多项式 $f(x),g(x)$，有

$$
f(A)g(A)=g(A)f(A),
$$

即同一方阵的两个多项式乘积可以交换。原因是 $f(A)$ 与 $g(A)$ 都是 $A$ 的幂的线性组合，而 $A$ 的幂彼此可交换。

### 6. 矩阵的转置

**定义 1.8** 把矩阵 $A$ 的行与列互换得到的矩阵称为 $A$ 的转置矩阵，记作 $A^{T}$（或 $A'$）。若 $A=(a_{ij})_{m\times n}$，则

$$
A^{T}=(a_{ji})_{n\times m}
=\begin{pmatrix}
a_{11} & a_{21} & \cdots & a_{m1}\\
a_{12} & a_{22} & \cdots & a_{m2}\\
\vdots & \vdots & & \vdots\\
a_{1n} & a_{2n} & \cdots & a_{mn}
\end{pmatrix}_{n\times m}.
$$

转置的运算规律：

1. $(A^{T})^{T}=A$；
2. $(B+C)^{T}=B^{T}+C^{T}$；
3. $(kA)^{T}=kA^{T}$；
4. $(AB)^{T}=B^{T}A^{T}$。

由 (4) 得推论

$$
(A_1A_2\cdots A_k)^{T}=A_k^{T}\cdots A_2^{T}A_1^{T},
$$

特别地，对 $n$ 阶方阵 $A$，$(A^m)^{T}=(A^{T})^m$。

**证明 (4)**：设 $A=(a_{ij})_{s\times n}$，$B=(b_{jk})_{n\times m}$，则 $(AB)^{T}$ 与 $B^{T}A^{T}$ 都是 $m\times s$ 矩阵，只需比较 $(i,j)$ 元素。

$(AB)^{T}$ 的 $(i,j)$ 元素就是 $AB$ 的 $(j,i)$ 元素，等于

$$
a_{j1}b_{1i}+a_{j2}b_{2i}+\cdots+a_{jn}b_{ni}.
$$

而 $B^{T}A^{T}$ 的 $(i,j)$ 元素等于 $B^{T}$ 第 $i$ 行与 $A^{T}$ 第 $j$ 列对应乘积之和，也就是 $B$ 的第 $i$ 列与 $A$ 的第 $j$ 行对应乘积之和：

$$
b_{1i}a_{j1}+b_{2i}a_{j2}+\cdots+b_{ni}a_{jn}.
$$

两式只是相加次序不同，故相等。注意转置后乘积的次序必须反过来，这一点与"穿脱衣服"顺序相反的道理一致。

**例** 已知

$$
A=\begin{pmatrix}2 & 0 & -1\\1 & 3 & 2\end{pmatrix},
\qquad
B=\begin{pmatrix}1 & 7 & -1\\4 & 2 & 3\\2 & 0 & 1\end{pmatrix},
$$

求 $(AB)^{T}$ 与 $B^{T}A^{T}$。

解：

$$
AB=\begin{pmatrix}0 & 14 & -3\\17 & 13 & 10\end{pmatrix},
\qquad
(AB)^{T}=\begin{pmatrix}0 & 17\\14 & 13\\-3 & 10\end{pmatrix}.
$$

又

$$
B^{T}=\begin{pmatrix}1 & 4 & 2\\7 & 2 & 0\\-1 & 3 & 1\end{pmatrix},
\quad
A^{T}=\begin{pmatrix}2 & 1\\0 & 3\\-1 & 2\end{pmatrix},
$$

$$
B^{T}A^{T}=\begin{pmatrix}0 & 17\\14 & 13\\-3 & 10\end{pmatrix}=(AB)^{T},
$$

两种算法结果一致，可用作验算。

### 7. 对称矩阵与反对称矩阵

设 $A=(a_{ij})_n$ 为 $n$ 阶方阵：

- 若 $a_{ij}=a_{ji}$（$i,j=1,\dots,n$），称 $A$ 为**对称矩阵**；
- 若 $a_{ij}=-a_{ji}$（$i,j=1,\dots,n$），称 $A$ 为**反对称矩阵**。

显然

$$
A\ \text{对称}\iff A^{T}=A,
\qquad
A\ \text{反对称}\iff A^{T}=-A.
$$

单位矩阵、对角矩阵都是对称矩阵。反对称矩阵的主对角线元素必为 $0$（由 $a_{ii}=-a_{ii}$ 得 $2a_{ii}=0$）。

### 8. 方阵的行列式

**定义 1.9** 由 $n$ 阶方阵 $A$ 的元素按原位置构成的行列式，称为方阵 $A$ 的行列式，记作 $\lvert A\rvert$ 或 $\det A$。

设 $A,B$ 为 $n$ 阶方阵，$k$ 为数，则

1. $\lvert A^{T}\rvert=\lvert A\rvert$；
2. $\lvert kA\rvert=k^{n}\lvert A\rvert$。

要区分两个概念：$n$ 阶方阵是 $n^2$ 个数排成的一张数表，而方阵的行列式是这个数表按一定法则算出的**一个数**。由于行列式必须行数等于列数，非方阵不能取行列式。

### 9. 矩阵的共轭

**定义 1.10** 设 $A=(a_{ij})_{m\times n}$，称 $\overline{A}=(\overline{a_{ij}})_{m\times n}$ 为 $A$ 的共轭矩阵，其中 $\overline{a_{ij}}$ 是 $a_{ij}$ 的共轭复数（逐元素取共轭）。

共轭矩阵的性质：

1. $(\overline{A})^{T}=\overline{A^{T}}$（转置与共轭可交换）；
2. $\overline{A+B}=\overline{A}+\overline{B}$；
3. $\overline{kA}=\overline{k}\,\overline{A}$；
4. $\overline{AB}=\overline{A}\,\overline{B}$。

第 4 条说明共轭与乘法可以换序，这与转置必须反序不同，做题时不要混用。

## 课堂小结

本节的主线是"矩阵是一张数表，不是一个数"，所有运算规则都要回到元素层面检验。

- **定义与分类**：矩阵、同型、相等、方阵；对角、单位、数量、三角矩阵；迹。
- **线性运算**：加法要求同型，数乘作用于每个元素，二者合称线性运算。
- **乘法**：核心是"前列 $=$ 后行"，$c_{ij}$ 为 $A$ 第 $i$ 行乘 $B$ 第 $j$ 列。由此产生三个"不一样"：不交换、不消去、$AB=0$ 推不出 $A=0$ 或 $B=0$；可交换的必要条件是同阶方阵。
- **幂与多项式**：只对方阵定义；对角矩阵的幂只需对对角元取幂；$A^2$ 常能揭示结构，是求高次幂的首选突破口。
- **转置**：$(AB)^{T}=B^{T}A^{T}$ 要反序；对称、反对称用 $A^{T}=\pm A$ 刻画。
- **易错点**：$\lvert kA\rvert=k^{n}\lvert A\rvert$ 而非 $k\lvert A\rvert$；常数项在矩阵多项式里写成 $a_0E$；$AB$ 与 $BA$ 可能不同型。
