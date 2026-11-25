---
slug: "1-5-cofactor-expansion-and-cramers-rule"
title: "1.5 行列式按一行展开及克拉默法则"
summary: "余子式、按一行（列）展开定理与克拉默法则。"
updatedAt: "2026-11-25"
content_type: "reference"
group: "course"
displayNumber: "1.5"
tags:
  - "线性代数"
sources:
  - kind: article
    title: "1.5 行列式按一行展开及克拉默法则.pptx"
    url: "https://docs.google.com/presentation/d/1fMm3k7X_JMFGn6CPMqypvSEESMOQXkew/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true"
---

低阶行列式比高阶行列式容易算，于是自然想用低阶行列式表示高阶行列式。本节先引入余子式和代数余子式，证明“按任意一行（列）展开”的定理，把 $n$ 阶降成 $n-1$ 阶；再用它建立克拉默法则，把“方程个数等于未知量个数、系数行列式非零”的线性方程组的解写成行列式之比。

## 一、余子式与代数余子式

以三阶行列式为例，按第一行展开：

$$
\begin{vmatrix}
a_{11} & a_{12} & a_{13}\\
a_{21} & a_{22} & a_{23}\\
a_{31} & a_{32} & a_{33}
\end{vmatrix}
=a_{11}a_{22}a_{33}+a_{12}a_{23}a_{31}+a_{13}a_{21}a_{32}
-a_{11}a_{23}a_{32}-a_{12}a_{21}a_{33}-a_{13}a_{22}a_{31}.
$$

把含 $a_{11},a_{12},a_{13}$ 的项分别合并：

$$
=a_{11}(a_{22}a_{33}-a_{23}a_{32})
+a_{12}(a_{23}a_{31}-a_{21}a_{33})
+a_{13}(a_{21}a_{32}-a_{22}a_{31}).
$$

每个括号都是一个二阶行列式：

$$
D=a_{11}\begin{vmatrix}a_{22}&a_{23}\\a_{32}&a_{33}\end{vmatrix}
-a_{12}\begin{vmatrix}a_{21}&a_{23}\\a_{31}&a_{33}\end{vmatrix}
+a_{13}\begin{vmatrix}a_{21}&a_{22}\\a_{31}&a_{32}\end{vmatrix}.
$$

这三个二阶行列式分别是划去 $a_{11},a_{12},a_{13}$ 所在的行和列后剩下的行列式。

**定义 5.1** 在 $n$ 阶行列式中，把元素 $a_{ij}$ 所在的第 $i$ 行和第 $j$ 列划去，剩下的 $n-1$ 阶行列式称为 $a_{ij}$ 的**余子式**，记作 $M_{ij}$；称

$$
A_{ij}=(-1)^{i+j}M_{ij}
$$

为 $a_{ij}$ 的**代数余子式**。

例如在四阶行列式

$$
D=\begin{vmatrix}
a_{11} & a_{12} & a_{13} & a_{14}\\
a_{21} & a_{22} & a_{23} & a_{24}\\
a_{31} & a_{32} & a_{33} & a_{34}\\
a_{41} & a_{42} & a_{43} & a_{44}
\end{vmatrix}
$$

中，划去第 2 行、第 3 列，得

$$
M_{23}=\begin{vmatrix}
a_{11} & a_{12} & a_{14}\\
a_{31} & a_{32} & a_{34}\\
a_{41} & a_{42} & a_{44}
\end{vmatrix},
\qquad
A_{23}=(-1)^{2+3}M_{23}=-M_{23}.
$$

又如

$$
M_{12}=\begin{vmatrix}
a_{21} & a_{23} & a_{24}\\
a_{31} & a_{33} & a_{34}\\
a_{41} & a_{43} & a_{44}
\end{vmatrix},
\qquad
A_{12}=(-1)^{1+2}M_{12}=-M_{12},
$$

$$
M_{44}=\begin{vmatrix}
a_{11} & a_{12} & a_{13}\\
a_{21} & a_{22} & a_{23}\\
a_{31} & a_{32} & a_{33}
\end{vmatrix},
\qquad
A_{44}=(-1)^{4+4}M_{44}=M_{44}.
$$

两点要注意：

1. 行列式的每个元素都对应一个余子式和一个代数余子式；
2. $M_{ij}$ 与 $A_{ij}$ 只由划去第 $i$ 行、第 $j$ 列后剩下的元素决定，与第 $i$ 行、第 $j$ 列的元素本身无关，特别与 $a_{ij}$ 的数值无关。

> **理解关键（指标与符号）**：$M_{ij}$ 的下标是"被划掉的行、被划掉的列"，不是余子式内部元素的位置；$M_{ij}$ 是 $n-1$ 阶行列式，本身可正可负。$A_{ij}$ 只在 $M_{ij}$ 前再乘一个符号 $(-1)^{i+j}$，所以先算 $M_{ij}$、再单独判符号，比一边展开一边判更稳。$i+j$ 的奇偶呈棋盘格：
>
> $$
> \begin{matrix}
> + & - & + & - & \cdots\\
> - & + & - & + & \cdots\\
> + & - & + & - & \cdots\\
> - & + & - & + & \cdots\\
> \vdots & & & & \ddots
> \end{matrix}
> $$
>
> 最常见的两处错误：求 $M_{13}$ 时把"划去第 3 列"误做成"划去第 2 列"；或者 $M_{13}$ 写对了，却把 $A_{13}$ 的符号写成负（$1+3=4$ 为偶，应取正）。
>
> 还要区分"代数余子式"与"伴随矩阵"：把 $A_{ij}$ 按转置位置排成 $(A_{ji})$，才是第二章要用的伴随矩阵 $A^*$；单个 $A_{ij}$ 只是一个数，不能对它谈转置。

### 按任意一行（列）展开

三阶行列式不仅可以按第一行展开，也可以按第二行、第三行或任意一列展开。

按第二行：

$$
\begin{vmatrix}
a_{11} & a_{12} & a_{13}\\
a_{21} & a_{22} & a_{23}\\
a_{31} & a_{32} & a_{33}
\end{vmatrix}
=a_{21}A_{21}+a_{22}A_{22}+a_{23}A_{23}.
$$

按第三行：

$$
\begin{vmatrix}
a_{11} & a_{12} & a_{13}\\
a_{21} & a_{22} & a_{23}\\
a_{31} & a_{32} & a_{33}
\end{vmatrix}
=a_{31}A_{31}+a_{32}A_{32}+a_{33}A_{33}.
$$

按第一列：

$$
\begin{vmatrix}
a_{11} & a_{12} & a_{13}\\
a_{21} & a_{22} & a_{23}\\
a_{31} & a_{32} & a_{33}
\end{vmatrix}
=a_{11}A_{11}+a_{21}A_{21}+a_{31}A_{31}.
$$

一般地，三阶行列式等于某一行（列）的所有元素分别乘上它们对应的代数余子式再求和：

$$
D=\sum_{j=1}^{3}a_{ij}A_{ij}\quad(i=1,2,3),
\qquad
D=\sum_{i=1}^{3}a_{ij}A_{ij}\quad(j=1,2,3).
$$

**定理 5.1（展开定理）** $n$ 阶行列式 $D$ 等于它的任意一行（列）的各元素与其对应代数余子式的乘积之和，即

$$
D=a_{i1}A_{i1}+a_{i2}A_{i2}+\cdots+a_{in}A_{in}
=\sum_{k=1}^{n}a_{ik}A_{ik}\quad(i=1,2,\dots,n),
$$

或

$$
D=a_{1j}A_{1j}+a_{2j}A_{2j}+\cdots+a_{nj}A_{nj}
=\sum_{k=1}^{n}a_{kj}A_{kj}\quad(j=1,2,\dots,n).
$$

这就是“按第 $i$ 行展开”和“按第 $j$ 列展开”。

> **补充证明**：先看一个特殊情形——若第 $i$ 行只有一个元素为 $1$、其余为 $0$，即该行为 $e_j^{T}$，则每一项要非零必须取到这个 $1$；把第 $i$ 行移到第一行、第 $j$ 列移到第一列，共 $i+j-2$ 次交换，符号为 $(-1)^{i+j-2}=(-1)^{i+j}$，剩下的正是余子式 $M_{ij}$，故行列式等于 $(-1)^{i+j}M_{ij}=A_{ij}$。
>
> 一般情形下，第 $i$ 行可写成 $a_{i1}e_1^{T}+\cdots+a_{in}e_n^{T}$，由行列式对单独一行的线性性（性质 4.4）逐项展开，得
>
> $$
> D=\sum_{j=1}^{n}a_{ij}(-1)^{i+j}M_{ij}=\sum_{j=1}^{n}a_{ij}A_{ij}.
> $$
>
> 按列展开的证明完全对称，只需把“行”换成“列”，并利用行列式转置不变（性质 4.1）。

**降阶法**：先利用行列式的性质（特别是倍加变换）把某一行（列）化成只含一个非零元素，再按该行（列）展开。每展开一次，阶数降低一阶。对阶数不高的数字行列式很有效。选取时要尽量挑含 $0$ 较多、或数字较好处理的行（列）。

### 三阶行列式的三种展开

**例** 计算

$$
D=\begin{vmatrix}
1 & -4 & 2\\
3 & 0 & -3\\
-2 & 4 & 5
\end{vmatrix}.
$$

按第一行展开：

$$
D=1\cdot\begin{vmatrix}0&-3\\4&5\end{vmatrix}
-(-4)\begin{vmatrix}3&-3\\-2&5\end{vmatrix}
+2\begin{vmatrix}3&0\\-2&4\end{vmatrix}
=12+36+24=72.
$$

按第二行展开：

$$
D=-3\begin{vmatrix}-4&2\\4&5\end{vmatrix}
+0\cdot\begin{vmatrix}1&2\\-2&5\end{vmatrix}
-(-3)\begin{vmatrix}1&-4\\-2&4\end{vmatrix}
=84+0-12=72.
$$

按第三行展开：

$$
D=-2\begin{vmatrix}-4&2\\0&-3\end{vmatrix}
-4\begin{vmatrix}1&2\\3&-3\end{vmatrix}
+5\begin{vmatrix}1&-4\\3&0\end{vmatrix}
=-24+36+60=72.
$$

按第一列展开：

$$
D=1\cdot\begin{vmatrix}0&-3\\4&5\end{vmatrix}
-3\begin{vmatrix}-4&2\\4&5\end{vmatrix}
-2\begin{vmatrix}-4&2\\0&-3\end{vmatrix}
=12+84-24=72.
$$

四种展开结果相同。计算时选哪一行（列）都可以，但选含 $0$ 多的行（列）可以少算几个二阶行列式。

**例** 计算

$$
D=\begin{vmatrix}
-3 & -5 & 3\\
0 & -1 & 0\\
7 & 7 & 2
\end{vmatrix}.
$$

第二行只有一个非零元素 $-1$，按第二行展开：

$$
D=0\cdot(-1)^{2+1}\begin{vmatrix}-5&3\\7&2\end{vmatrix}
+(-1)(-1)^{2+2}\begin{vmatrix}-3&3\\7&2\end{vmatrix}
+0\cdot(-1)^{2+3}\begin{vmatrix}-3&-5\\7&7\end{vmatrix}.
$$

所以

$$
D=(-1)\begin{vmatrix}-3&3\\7&2\end{vmatrix}
=-(-6-21)=27.
$$

**结论**：若某行（列）只有一个非零元素，行列式就等于“该元素 × 它的代数余子式”，不必把其余零项写出来。零元素较多的行（列）应优先选。

### 先化出零再展开

**例** 计算

$$
D=\begin{vmatrix}
3 & 1 & -1 & 2\\
-5 & 1 & 3 & -4\\
2 & 0 & 1 & -1\\
1 & -5 & 3 & -3
\end{vmatrix}.
$$

第三行已有一个 $0$，先用列变换把第三行化成只含一个非零元素。令

$$
c_1-2c_3,\qquad c_4+c_3,
$$

即第一列减去第三列的 $2$ 倍，第四列加上第三列：

$$
D=\begin{vmatrix}
5 & 1 & -1 & 1\\
-11 & 1 & 3 & -1\\
0 & 0 & 1 & 0\\
-5 & -5 & 3 & 0
\end{vmatrix}.
$$

按第三行展开，只剩一个非零元素 $1$：

$$
D=1\cdot(-1)^{3+3}
\begin{vmatrix}
5 & 1 & 1\\
-11 & 1 & -1\\
-5 & -5 & 0
\end{vmatrix}
=\begin{vmatrix}
5 & 1 & 1\\
-11 & 1 & -1\\
-5 & -5 & 0
\end{vmatrix}.
$$

再令 $c_1-c_2$，把第三行化成 $(0,-5,0)$：

$$
D=\begin{vmatrix}
4 & 1 & 1\\
-12 & 1 & -1\\
0 & -5 & 0
\end{vmatrix}.
$$

按第三行展开：

$$
D=(-5)(-1)^{3+2}\begin{vmatrix}4&1\\-12&-1\end{vmatrix}
=5\cdot(-4+12)=40.
$$

**为什么这样处理**：直接按第一行展开要算四个三阶行列式；先把某一行化成“只有一个非零元”，就只需算一个低一阶行列式。选第三行是因为它本来就有 $0$，再用列变换把另外两个元素消掉，代价最小。

### 副对角线型 $n$ 阶行列式

**例** 计算 $n$ 阶行列式

$$
D=\begin{vmatrix}
a_{11} & 0 & \cdots & 0 & 0 & a_{1n}\\
0 & 0 & \cdots & 0 & a_{2,n-1} & a_{2n}\\
0 & 0 & \cdots & a_{3,n-2} & a_{3,n-1} & 0\\
\vdots & \vdots & & \vdots & \vdots & \vdots\\
0 & a_{n-1,2} & \cdots & 0 & 0 & 0\\
a_{n1} & a_{n2} & \cdots & 0 & 0 & 0
\end{vmatrix}.
$$

按第一行展开，只有 $a_{11}$ 与 $a_{1n}$ 两项。第一项对应列排列 $(1,n,n-1,\dots,2)$，逆序数为 $\frac{(n-1)(n-2)}{2}$；第二项对应列排列 $(n,n-1,\dots,1)$，逆序数为 $\frac{n(n-1)}{2}$。于是

$$
D=(-1)^{\frac{(n-1)(n-2)}{2}}a_{11}a_{2n}a_{3,n-1}\cdots a_{n,2}
+(-1)^{\frac{n(n-1)}{2}}a_{1n}a_{2,n-1}a_{3,n-2}\cdots a_{n1}.
$$

例如 $n=3$ 时，

$$
D=\begin{vmatrix}
a_{11}&0&a_{13}\\
0&a_{22}&a_{23}\\
a_{31}&a_{32}&0
\end{vmatrix}
=-a_{11}a_{23}a_{32}-a_{13}a_{22}a_{31},
$$

与直接展开一致。

### 范德蒙德行列式

**例（课本例题 5.2）** 证明 $n\ (n\ge 2)$ 阶范德蒙德（Vandermonde）行列式

$$
V_n=\begin{vmatrix}
1 & 1 & 1 & \cdots & 1 & 1\\
a_1 & a_2 & a_3 & \cdots & a_{n-1} & a_n\\
a_1^2 & a_2^2 & a_3^2 & \cdots & a_{n-1}^2 & a_n^2\\
\vdots & \vdots & \vdots & & \vdots & \vdots\\
a_1^{n-2} & a_2^{n-2} & a_3^{n-2} & \cdots & a_{n-1}^{n-2} & a_n^{n-2}\\
a_1^{n-1} & a_2^{n-1} & a_3^{n-1} & \cdots & a_{n-1}^{n-1} & a_n^{n-1}
\end{vmatrix}
=\prod_{1\le j<i\le n}(a_i-a_j).
$$

证明对阶数 $n$ 作数学归纳法。

$n=2$ 时，

$$
V_2=\begin{vmatrix}1&1\\a_1&a_2\end{vmatrix}=a_2-a_1,
$$

结论成立。假设 $n-1$ 阶结论成立，即

$$
V_{n-1}=\prod_{1\le j<i\le n-1}(a_i-a_j).
$$

对 $V_n$ 从最后一行开始，依次作

$$
r_k-a_nr_{k-1}\qquad(k=n,n-1,\dots,2),
$$

把最后一列除第一个元素外全化为 $0$：

$$
V_n=\begin{vmatrix}
1 & 1 & \cdots & 1 & 1\\
a_1-a_n & a_2-a_n & \cdots & a_{n-1}-a_n & 0\\
a_1(a_1-a_n) & a_2(a_2-a_n) & \cdots & a_{n-1}(a_{n-1}-a_n) & 0\\
\vdots & \vdots & & \vdots & \vdots\\
a_1^{n-2}(a_1-a_n) & a_2^{n-2}(a_2-a_n) & \cdots & a_{n-1}^{n-2}(a_{n-1}-a_n) & 0
\end{vmatrix}.
$$

按第 $n$ 列展开，得 $(-1)^{1+n}$ 乘一个 $n-1$ 阶行列式。这个行列式的第 $j$ 列（$j=1,\dots,n-1$）含有公因子 $a_j-a_n$，逐列提出：

$$
V_n=(-1)^{1+n}\prod_{j=1}^{n-1}(a_j-a_n)\,V_{n-1}.
$$

而

$$
\prod_{j=1}^{n-1}(a_j-a_n)=(-1)^{n-1}\prod_{j=1}^{n-1}(a_n-a_j),
$$

故

$$
(-1)^{1+n}\prod_{j=1}^{n-1}(a_j-a_n)=(-1)^{1+n}(-1)^{n-1}=(-1)^{2n}=1.
$$

所以

$$
V_n=\prod_{j=1}^{n-1}(a_n-a_j)\,V_{n-1}
=\prod_{1\le j<i\le n}(a_i-a_j).
$$

公式要熟记。四阶的情形：

$$
\begin{vmatrix}
1&1&1&1\\
a&b&c&d\\
a^2&b^2&c^2&d^2\\
a^3&b^3&c^3&d^3
\end{vmatrix}
=(b-a)(c-a)(c-b)(d-a)(d-b)(d-c).
$$

注意乘积的顺序：按“后面的 $a_i$ 减前面的 $a_j$”写，即 $i>j$ 时用 $a_i-a_j$。若把顺序写反，会多出符号。

### 异乘代数余子式之和为零

**定理 5.2** 行列式任一行（列）的元素与另一行（列）对应元素的代数余子式乘积之和等于零，即

$$
a_{i1}A_{j1}+a_{i2}A_{j2}+\cdots+a_{in}A_{jn}=0,\qquad i\ne j.
$$

证明：把 $D=|a_{ij}|$ 按第 $j$ 行展开，有

$$
D=a_{j1}A_{j1}+a_{j2}A_{j2}+\cdots+a_{jn}A_{jn}.
$$

把第 $j$ 行的元素 $a_{jk}$ 全部换成第 $i$ 行的 $a_{ik}$，得到的新行列式第 $i$ 行与第 $j$ 行相同，故其值为 $0$。另一方面，按第 $j$ 行展开这个新行列式，代数余子式 $A_{jk}$ 只与划去第 $j$ 行后剩下的元素有关，换掉第 $j$ 行并不改变它们，所以展开式正好是

$$
a_{i1}A_{j1}+a_{i2}A_{j2}+\cdots+a_{in}A_{jn}=0.
$$

对列同理：

$$
a_{1i}A_{1j}+a_{2i}A_{2j}+\cdots+a_{ni}A_{nj}=0,\qquad i\ne j.
$$

把展开定理和定理 5.2 合起来，就是代数余子式最重要的性质：

$$
\sum_{k=1}^{n}a_{ik}A_{jk}=
\begin{cases}
D,&i=j,\\
0,&i\ne j;
\end{cases}
\qquad
\sum_{k=1}^{n}a_{ki}A_{kj}=
\begin{cases}
D,&i=j,\\
0,&i\ne j.
\end{cases}
$$

前者按行展开，后者按列展开。可以概括为“本行乘本行余子式得 $D$，本行乘异行余子式得 $0$”。

### 思考题：第一行代数余子式之和

**例** 设

$$
D_n=\begin{vmatrix}
1 & 2 & 3 & \cdots & n\\
1 & 2 & 0 & \cdots & 0\\
1 & 0 & 3 & \cdots & 0\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
1 & 0 & 0 & \cdots & n
\end{vmatrix},
$$

求第一行各元素的代数余子式之和 $A_{11}+A_{12}+\cdots+A_{1n}$。

按第一行展开，

$$
D_n=1\cdot A_{11}+2\cdot A_{12}+\cdots+n\cdot A_{1n}.
$$

要求的是系数全为 $1$ 的和，而不是 $D_n$ 本身。把第一行换成全 $1$，其余行不变，所得行列式按第一行展开正好是

$$
A_{11}+A_{12}+\cdots+A_{1n}
=\begin{vmatrix}
1 & 1 & 1 & \cdots & 1\\
1 & 2 & 0 & \cdots & 0\\
1 & 0 & 3 & \cdots & 0\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
1 & 0 & 0 & \cdots & n
\end{vmatrix}.
$$

把第 1 行分别从第 $2,3,\dots,n$ 行中减去，第一列除第一个元素外全为 $0$，再按第一列展开，剩下一个 $(n-1)$ 阶行列式。它可以写成 $\operatorname{diag}(2,3,\dots,n)-J$，其中 $J$ 为全 $1$ 矩阵；也就是说，它的对角元为 $1,2,\dots,n-1$，非对角元全为 $-1$。于是

$$
A_{11}+A_{12}+\cdots+A_{1n}
=2\cdot3\cdots n\left(1-\sum_{j=2}^{n}\frac1j\right)
=n!\left(1-\sum_{j=2}^{n}\frac1j\right).
$$

这里用到 $\det(\operatorname{diag}(d_1,\dots,d_m)-J)=\prod d_i\left(1-\sum 1/d_i\right)$。例如 $n=3$ 时和为 $1$，$n=4$ 时为 $-2$，与直接计算一致。

### 回顾：一个 $n$ 阶行列式

**例** 计算

$$
D=\begin{vmatrix}
1&1&1&\cdots&1\\
2&2&0&\cdots&0\\
4&0&3&\cdots&0\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
2^{n-1}&0&0&\cdots&n
\end{vmatrix}.
$$

用第 $i$ 行（$i=2,\dots,n$）消去第一行第 $i$ 列的元素：作 $r_1-\frac1i r_i$，得

$$
D=\begin{vmatrix}
1-\displaystyle\sum_{i=2}^{n}\frac{2^{i-1}}{i} & 0 & 0 & \cdots & 0\\
2&2&0&\cdots&0\\
4&0&3&\cdots&0\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
2^{n-1}&0&0&\cdots&n
\end{vmatrix}.
$$

这是下三角形行列式，故

$$
D=\left(1-\sum_{i=2}^{n}\frac{2^{i-1}}{i}\right)n!
=-\sum_{i=3}^{n}\frac{2^{i-1}}{i}\,n!.
$$

## 二、克拉默法则

### 从二、三阶方程组看规律

二元线性方程组

$$
\begin{cases}
a_{11}x_1+a_{12}x_2=b_1,\\
a_{21}x_1+a_{22}x_2=b_2.
\end{cases}
$$

若系数行列式

$$
D=\begin{vmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{vmatrix}\ne 0,
$$

则它的解为

$$
x_1=\frac{D_1}{D}
=\frac{\begin{vmatrix}b_1&a_{12}\\b_2&a_{22}\end{vmatrix}}{D},
\qquad
x_2=\frac{D_2}{D}
=\frac{\begin{vmatrix}a_{11}&b_1\\a_{21}&b_2\end{vmatrix}}{D}.
$$

分母都是原方程组的系数行列式；$D_1$ 是把 $D$ 的第 1 列换成常数项列，$D_2$ 是把第 2 列换成常数项列。

三元线性方程组

$$
\begin{cases}
a_{11}x_1+a_{12}x_2+a_{13}x_3=b_1,\\
a_{21}x_1+a_{22}x_2+a_{23}x_3=b_2,\\
a_{31}x_1+a_{32}x_2+a_{33}x_3=b_3
\end{cases}
$$

在系数行列式

$$
D=\begin{vmatrix}
a_{11}&a_{12}&a_{13}\\
a_{21}&a_{22}&a_{23}\\
a_{31}&a_{32}&a_{33}
\end{vmatrix}\ne 0
$$

时，解为

$$
x_1=\frac{D_1}{D},\qquad x_2=\frac{D_2}{D},\qquad x_3=\frac{D_3}{D},
$$

其中

$$
D_1=\begin{vmatrix}b_1&a_{12}&a_{13}\\b_2&a_{22}&a_{23}\\b_3&a_{32}&a_{33}\end{vmatrix},
\quad
D_2=\begin{vmatrix}a_{11}&b_1&a_{13}\\a_{21}&b_2&a_{23}\\a_{31}&b_3&a_{33}\end{vmatrix},
\quad
D_3=\begin{vmatrix}a_{11}&a_{12}&b_1\\a_{21}&a_{22}&b_2\\a_{31}&a_{32}&b_3\end{vmatrix}.
$$

### 一般形式

设含有 $n$ 个未知量、$n$ 个方程的线性方程组为

$$
\begin{cases}
a_{11}x_1+a_{12}x_2+\cdots+a_{1n}x_n=b_1,\\
a_{21}x_1+a_{22}x_2+\cdots+a_{2n}x_n=b_2,\\
\qquad\cdots\\
a_{n1}x_1+a_{n2}x_2+\cdots+a_{nn}x_n=b_n.
\end{cases}\tag{I}
$$

其中 $a_{ij}$ 称为方程组的**系数**，$b_j$ 称为**常数项**。当所有 $b_j=0$ 时，称为 $n$ 元**齐次线性方程组**。

由系数构成的行列式

$$
D=\begin{vmatrix}
a_{11}&a_{12}&\cdots&a_{1n}\\
a_{21}&a_{22}&\cdots&a_{2n}\\
\vdots&\vdots&&\vdots\\
a_{n1}&a_{n2}&\cdots&a_{nn}
\end{vmatrix}
$$

称为**系数行列式**。把 $D$ 的第 $j$ 列换成常数项列，其余列不变，得到的行列式记作

$$
D_j=\begin{vmatrix}
a_{11}&\cdots&a_{1,j-1}&b_1&a_{1,j+1}&\cdots&a_{1n}\\
a_{21}&\cdots&a_{2,j-1}&b_2&a_{2,j+1}&\cdots&a_{2n}\\
\vdots&&\vdots&\vdots&\vdots&&\vdots\\
a_{n1}&\cdots&a_{n,j-1}&b_n&a_{n,j+1}&\cdots&a_{nn}
\end{vmatrix},
\qquad j=1,2,\dots,n.
$$

**定理 5.3（克拉默法则）** 如果线性方程组 (I) 的系数行列式 $D\ne 0$，那么它有唯一解

$$
x_1=\frac{D_1}{D},\quad x_2=\frac{D_2}{D},\quad\dots,\quad x_n=\frac{D_n}{D}.
$$

> **补充证明**：先证存在性。把 $D_j$ 按第 $j$ 列展开，得 $D_j=\sum_{k=1}^{n}b_kA_{kj}$。把 $x_j=D_j/D$ 代入第 $i$ 个方程的左端：
>
> $$
> \begin{aligned}
> \sum_{j=1}^{n}a_{ij}\frac{D_j}{D}
> &=\frac{1}{D}\sum_{j=1}^{n}\sum_{k=1}^{n}a_{ij}b_kA_{kj}\\
> &=\frac{1}{D}\sum_{k=1}^{n}b_k\sum_{j=1}^{n}a_{ij}A_{kj}.
> \end{aligned}
> $$
>
> 由展开定理与异乘为零（定理 5.1、5.2），内层和当 $k=i$ 时为 $D$，当 $k\ne i$ 时为 $0$，故左端等于 $b_i$。这说明 $x_j=D_j/D$ 确实是解。
>
> 再证唯一性。若 $y$ 是任一解，令 $z=x-y$，则 $Az=0$。用 $A_{ik}$ 乘第 $i$ 个方程并求和：
>
> $$
> \begin{aligned}
> 0&=\sum_{i=1}^{n}A_{ik}\sum_{j=1}^{n}a_{ij}z_j\\
> &=\sum_{j=1}^{n}z_j\sum_{i=1}^{n}a_{ij}A_{ik}=Dz_k,
> \end{aligned}
> $$
>
> 故每个 $z_k=0$，即 $y=x$。存在性与唯一性合起来，定理得证。

> **理解关键**：设系数矩阵的列为 $c_1,\dots,c_n$。方程 $Ax=b$ 等价于 $b=x_1c_1+\cdots+x_nc_n$。把 $b$ 放到第 $j$ 列并按该列的线性性拆开：
>
> $$
> D_j=\sum_{k=1}^n x_k\det(c_1,\dots,c_{j-1},c_k,c_{j+1},\dots,c_n).
> $$
>
> 当 $k\ne j$ 时，$c_k$ 在原来位置和第 $j$ 列各出现一次，该项为零。只有 $k=j$ 时恢复原行列式 $D$，所以 $D_j=x_jD$。这就解释了为什么替换第 $j$ 列会读出 $x_j$。

> **理解关键（可逆条件）**：对 $n$ 个方程、$n$ 个未知量的线性方程组，"有唯一解"与"$D\ne0$"等价。$D\ne0$ 时，对任意右端项 $b$ 都有唯一解 $x_j=D_j/D$；$D=0$ 时克拉默法则失效，方程组不可能有唯一解，只能是无解或无穷多解（齐次情形则是有非零解）。第二章会把这套条件翻译成"系数矩阵 $A$ 可逆"：$D=\det A$，$D\ne0$ 就是 $A$ 可逆。使用克拉默法则前先算 $D$，不是形式上的步骤，而是在检验这个前提。

**定理 5.4** 若齐次线性方程组的系数行列式 $D\ne 0$，则它只有零解。等价地说，若齐次线性方程组有非零解（从而有无穷多解），则它的系数行列式 $D=0$。

使用克拉默法则前必须先判断 $D\ne 0$。$D=0$ 时不能用它下结论；此时方程组可能无解，也可能有无穷多解。

### 用克拉默法则解四元方程组

**例** 解方程组

$$
\begin{cases}
2x_1+x_2-5x_3+x_4=8,\\
x_1-3x_2-6x_4=9,\\
2x_2-x_3+2x_4=-5,\\
x_1+4x_2-7x_3+6x_4=0.
\end{cases}
$$

系数行列式

$$
D=\begin{vmatrix}
2&1&-5&1\\
1&-3&0&-6\\
0&2&-1&2\\
1&4&-7&6
\end{vmatrix}.
$$

作 $r_1-2r_2$、$r_4-r_2$，把第一列化成 $(0,1,0,0)^T$：

$$
D=\begin{vmatrix}
0&7&-5&13\\
1&-3&0&-6\\
0&2&-1&2\\
0&7&-7&12
\end{vmatrix}.
$$

按第一列展开，再对三阶行列式作 $c_1+2c_2$、$c_3+2c_2$：

$$
D=-\begin{vmatrix}
7&-5&13\\
2&-1&2\\
7&-7&12
\end{vmatrix}
=-\begin{vmatrix}
-3&-5&3\\
0&-1&0\\
-7&-7&-2
\end{vmatrix}.
$$

按第二行展开：

$$
D=-\left[(-1)(-1)^{2+2}\begin{vmatrix}-3&3\\-7&-2\end{vmatrix}\right]
=-\left[-(6+21)\right]=27.
$$

因为 $D=27\ne 0$，方程组有唯一解。再计算

$$
D_1=\begin{vmatrix}
8&1&-5&1\\
9&-3&0&-6\\
-5&2&-1&2\\
0&4&-7&6
\end{vmatrix}=81,
\qquad
D_2=\begin{vmatrix}
2&8&-5&1\\
1&9&0&-6\\
0&-5&-1&2\\
1&0&-7&6
\end{vmatrix}=-108,
$$

$$
D_3=\begin{vmatrix}
2&1&8&1\\
1&-3&9&-6\\
0&2&-5&2\\
1&4&0&6
\end{vmatrix}=-27,
\qquad
D_4=\begin{vmatrix}
2&1&-5&8\\
1&-3&0&9\\
0&2&-1&-5\\
1&4&-7&0
\end{vmatrix}=27.
$$

所以

$$
x_1=\frac{81}{27}=3,\quad
x_2=\frac{-108}{27}=-4,\quad
x_3=\frac{-27}{27}=-1,\quad
x_4=\frac{27}{27}=1.
$$

即解为 $(3,-4,-1,1)$。代回原方程组可逐式验算，四个方程均成立。

**为什么用克拉默法则**：方程个数与未知量个数相等，且系数行列式非零，满足使用条件；把解直接写成行列式之比，结构清楚。实际计算量主要在四个四阶行列式，适合用行列式的性质降阶。

### 齐次方程组有非零解的参数条件

**例** 如果齐次线性方程组

$$
\begin{cases}
kx_1+x_4=0,\\
x_1+2x_2-x_4=0,\\
(k+2)x_1-x_2+4x_4=0,\\
2x_1+x_2+3x_3+kx_4=0
\end{cases}
$$

有非零解，$k$ 应取何值？

齐次方程组有非零解，则系数行列式 $D=0$。系数行列式为

$$
D=\begin{vmatrix}
k&0&0&1\\
1&2&0&-1\\
k+2&-1&0&4\\
2&1&3&k
\end{vmatrix}.
$$

第三列只有第 4 行元素为 $3$，按第三列展开：

$$
D=3(-1)^{4+3}\begin{vmatrix}
k&0&1\\
1&2&-1\\
k+2&-1&4
\end{vmatrix}
=-3\begin{vmatrix}
k&0&1\\
1&2&-1\\
k+2&-1&4
\end{vmatrix}.
$$

作 $r_3-r_1$：

$$
D=-3\begin{vmatrix}
k&0&1\\
1&2&-1\\
2&-1&3
\end{vmatrix}.
$$

再作 $r_2+2r_3$，把第二行化成 $(5,0,5)$：

$$
D=-3\begin{vmatrix}
k&0&1\\
5&0&5\\
2&-1&3
\end{vmatrix}.
$$

按第二列展开：

$$
D=-3\cdot(-1)\cdot(-1)^{3+2}\begin{vmatrix}k&1\\5&5\end{vmatrix}
=-3\cdot 5(k-1)=-15(k-1).
$$

令 $D=0$，得 $k=1$。所以当 $k=1$ 时齐次方程组有非零解。

**临界值检查**：$k=1$ 时 $D=0$，只能说明有非零解，不能说明解唯一；本题只问“有非零解”的参数值，因此 $k=1$ 即为所求。

**例** 问 $\lambda$ 取何值时，齐次方程组

$$
\begin{cases}
(1-\lambda)x_1-2x_2+4x_3=0,\\
2x_1+(3-\lambda)x_2+x_3=0,\\
x_1+x_2+(1-\lambda)x_3=0
\end{cases}
$$

有非零解？

系数行列式

$$
D=\begin{vmatrix}
1-\lambda&-2&4\\
2&3-\lambda&1\\
1&1&1-\lambda
\end{vmatrix}.
$$

作 $c_2-c_1$、$c_3-(1-\lambda)c_1$：

$$
D=\begin{vmatrix}
1-\lambda&-3+\lambda&4-(1-\lambda)^2\\
2&1-\lambda&2\lambda-1\\
1&0&0
\end{vmatrix}.
$$

按第三行展开：

$$
D=1\cdot(-1)^{3+1}
\begin{vmatrix}
-3+\lambda&4-(1-\lambda)^2\\
1-\lambda&2\lambda-1
\end{vmatrix}.
$$

计算二阶行列式：

$$
D=(-3+\lambda)(2\lambda-1)-(1-\lambda)\left[4-(1-\lambda)^2\right].
$$

化简得

$$
D=-\lambda^3+5\lambda^2-6\lambda=-\lambda(\lambda-2)(\lambda-3).
$$

齐次方程组有非零解，则 $D=0$，所以

$$
\lambda=0,\quad \lambda=2,\quad \lambda=3.
$$

**例** 问 $\lambda,\mu$ 取何值时，齐次方程组

$$
\begin{cases}
\lambda x_1+x_2+x_3=0,\\
x_1+\mu x_2+x_3=0,\\
x_1+2\mu x_2+x_3=0
\end{cases}
$$

有非零解？

系数行列式

$$
D=\begin{vmatrix}
\lambda&1&1\\
1&\mu&1\\
1&2\mu&1
\end{vmatrix}.
$$

作 $r_3-r_2$：

$$
D=\begin{vmatrix}
\lambda&1&1\\
1&\mu&1\\
0&\mu&0
\end{vmatrix}.
$$

按第三行展开：

$$
D=\mu\cdot(-1)^{3+2}\begin{vmatrix}\lambda&1\\1&1\end{vmatrix}
=-\mu(\lambda-1).
$$

要有非零解，必须 $D=0$，即

$$
\mu=0\quad\text{或}\quad \lambda=1.
$$

注意这里有两个参数，$D=0$ 给出两条“临界线”；不能只写其中一个。

### 含参数行列式的非零条件

**例** 讨论当 $k$ 为何值时

$$
D=\begin{vmatrix}
1&1&0&0\\
1&k&1&0\\
0&0&k&2\\
0&0&2&k
\end{vmatrix}\ne 0.
$$

第一列含零最多，先作 $r_2-r_1$，把第一列化成 $(1,0,0,0)^T$：

$$
D=\begin{vmatrix}
1&1&0&0\\
0&k-1&1&0\\
0&0&k&2\\
0&0&2&k
\end{vmatrix}.
$$

按第一列展开：

$$
D=1\cdot\begin{vmatrix}
k-1&1&0\\
0&k&2\\
0&2&k
\end{vmatrix}
=(k-1)(k^2-4)=(k-1)(k-2)(k+2).
$$

所以当

$$
k\ne 1,\qquad k\ne 2,\qquad k\ne -2
$$

时，$D\ne 0$。三个临界值一个来自左上角的 $k-1$，两个来自右下角的二阶块 $k^2-4$；讨论参数时要把所有因子都解出来。

### 思考题：$D=0$ 时能否用克拉默法则

**问**：当线性方程组的系数行列式为零时，能否用克拉默法则解方程组？为什么？此时方程组无解吗？

**答**：不能。克拉默法则的前提是 $D\ne 0$；$D=0$ 时公式中的分母为零，法则失效。此时方程组不一定无解，可能无解，也可能有无穷多解。例如

$$
\begin{cases}
x_1+x_2=1,\\
2x_1+2x_2=3
\end{cases}
$$

的系数行列式 $D=0$，两方程矛盾，无解；而

$$
\begin{cases}
x_1+x_2=1,\\
2x_1+2x_2=2
\end{cases}
$$

的 $D=0$，但两方程同解，有无穷多解。要判断属于哪一种，需要进一步比较系数与常数项（后续用矩阵的秩讨论）。

### 附：拉普拉斯展开定理

**定义** 设 $k$ 是小于 $n$ 的正整数。在 $n$ 阶行列式 $D$ 中取定 $k$ 行 $k$ 列，位于这 $k$ 行 $k$ 列交点处的 $k^2$ 个元素按原来次序组成的 $k$ 阶行列式 $M$，称为 $D$ 的**$k$ 阶子式**。

**定理 5.5（拉普拉斯展开定理）** 设 $k$ 是小于 $n$ 的正整数，在 $n$ 阶行列式 $D$ 中取定 $k$ 行（或 $k$ 列）。元素来自这 $k$ 行（$k$ 列）的所有 $k$ 阶子式与它们各自的代数余子式乘积之和等于 $D$。

元素来自取定的 $k$ 行的 $k$ 阶子式共有 $t=\mathrm{C}_n^k$ 个，记作 $M_i\ (i=1,\dots,t)$，$M_i$ 的代数余子式记作 $A_i$，则

$$
D=M_1A_1+M_2A_2+\cdots+M_tA_t.
$$

这个定理不要求掌握，但它在“分块三角”行列式中很好用。

**例** 证明 $n+k$ 阶行列式

$$
D=\begin{vmatrix}
a_{11}&\cdots&a_{1k}&0&\cdots&0\\
\vdots&&\vdots&\vdots&&\vdots\\
a_{k1}&\cdots&a_{kk}&0&\cdots&0\\
b_{11}&\cdots&b_{1k}&c_{11}&\cdots&c_{1n}\\
\vdots&&\vdots&\vdots&&\vdots\\
b_{n1}&\cdots&b_{nk}&c_{n1}&\cdots&c_{nn}
\end{vmatrix}
=D_1D_2,
$$

其中

$$
D_1=\begin{vmatrix}
a_{11}&\cdots&a_{1k}\\
\vdots&&\vdots\\
a_{k1}&\cdots&a_{kk}
\end{vmatrix},
\qquad
D_2=\begin{vmatrix}
c_{11}&\cdots&c_{1n}\\
\vdots&&\vdots\\
c_{n1}&\cdots&c_{nn}
\end{vmatrix}.
$$

取定前 $k$ 行。这 $k$ 行中，只有取前 $k$ 列得到的 $k$ 阶子式 $D_1$ 非零；它的代数余子式正好是右下角的 $D_2$（符号为 $(-1)^{(1+\cdots+k)+(1+\cdots+k)}=1$）。其余子式都含零列，等于 $0$。由拉普拉斯展开定理，$D=D_1D_2$。这就是分块上三角行列式的乘法性质。

## 课堂小结

- **余子式与代数余子式**：划去 $a_{ij}$ 所在行、列得 $M_{ij}$；$A_{ij}=(-1)^{i+j}M_{ij}$。它们与 $a_{ij}$ 本身无关。
- **展开定理**：$D=\sum_k a_{ik}A_{ik}=\sum_k a_{kj}A_{kj}$，可按任意一行或一列展开。
- **降阶法**：先用倍加变换把某行（列）化成只有一个非零元，再展开；优先选零多的行（列）。
- **异乘为零**：本行元素乘本行代数余子式得 $D$，乘异行代数余子式得 $0$；列同理。
- **范德蒙德行列式**：$V_n=\prod_{1\le j<i\le n}(a_i-a_j)$，结果要记住，注意差的顺序。
- **克拉默法则**：只适用于“方程个数等于未知量个数且 $D\ne 0$”的方程组，解为 $x_j=D_j/D$。
- **齐次方程组**：$D\ne 0$ 只有零解；有非零解的必要条件是 $D=0$（也是 $n$ 个方程 $n$ 个未知量时的充分条件）。
- **$D=0$ 时**：克拉默法则失效，方程组可能无解，也可能有无穷多解，必须另行判断。
- **易错点**：代数余子式的符号 $(-1)^{i+j}$ 漏写；按行展开却乘了异行余子式；把“有非零解”误写成“只有非零解”；参数题只解出一个临界值。
