---
slug: "4-1-elimination-method"
title: "4.1 消元法"
summary: "用消元法把线性方程组化为阶梯形并求解。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "4.1"
tags:
  - "线性代数"
---

第 1 章的克莱姆法则要求方程个数等于未知量个数、且系数行列式非零，遇到方程个数不等或行列式为零就失效。消元法（高斯消元法）没有这些限制：它只做"交换方程、乘非零数、把一方程的倍数加到另一方程"三类同解变形，把方程组化成阶梯形，再由秩判断解的存在性与个数。由于方程组的全部信息都在增广矩阵里，这一过程等价于对矩阵作初等行变换。

## 一、从三个例子看解的三种情形

**例 1（无解）**

$$
\begin{cases}
x+y+z=1,\\
x+y+z=2.
\end{cases}
$$

两式左边相同、右边不同，矛盾，故无解。几何上，平面 $x+y+z=1$ 与 $x+y+z=2$ 平行，不相交。

**例 2（唯一解）**

$$
\begin{cases}
x+y+z=3,\\
2x+y-z=2,\\
x-3y+z=-1.
\end{cases}
$$

用消元法可解得唯一一组解 $x=1,\ y=1,\ z=1$。几何上，三个平面交于一点 $(1,1,1)$。

**例 3（无穷多解）**

$$
\begin{cases}
x+y+z=1,\\
x+2y+3z=1.
\end{cases}
$$

消元得

$$
\begin{cases}
x=1+z,\\
y=-2z.
\end{cases}
$$

令 $z=k$（$k$ 任意），则 $x=1+k,\ y=-2k,\ z=k$ 都是解，故有无穷多组解。几何上，两个平面相交成一条直线

$$
L:\ \frac{x-1}{1}=\frac{y}{-2}=\frac{z}{1},
$$

这正是直线的参数方程。

三种情形——无解、唯一解、无穷多解——是线性方程组仅有的可能，本节要给出统一的判别方法。

## 二、克莱姆法则的局限

对 $n$ 个未知数、$n$ 个方程的方程组，若系数行列式 $D\neq 0$，则方程组有唯一解

$$
x_1=\frac{D_1}{D},\quad x_2=\frac{D_2}{D},\quad \dots,\quad x_n=\frac{D_n}{D},
$$

其中 $D_j$ 是把第 $j$ 列换成常数列所得的行列式。

使用克莱姆法则必须同时满足两个条件：

1. 方程个数等于未知量个数；
2. 系数行列式不等于零。

方程个数与未知量个数不等时法则根本用不上；个数相等但 $D=0$ 时，法则只告诉我们"不能唯一确定"，无法区分无解与无穷多解。实际计算中，算 $n+1$ 个 $n$ 阶行列式的代价也远高于消元。因此需要更一般的工具。

## 三、线性方程组与增广矩阵

设有 $n$ 个未知数、$m$ 个方程的线性方程组

$$
\begin{cases}
a_{11}x_1+a_{12}x_2+\cdots+a_{1n}x_n=b_1,\\
a_{21}x_1+a_{22}x_2+\cdots+a_{2n}x_n=b_2,\\
\qquad\cdots\\
a_{m1}x_1+a_{m2}x_2+\cdots+a_{mn}x_n=b_m.
\end{cases}\tag{1}
$$

若方程组有解，称它是**相容**的；若无解，称**不相容**。解的全体称为**解集**。要回答三个问题：

1. 方程组是否有解（存在性）？
2. 有解时解是否唯一？
3. 解不唯一时，如何描述整个解集？

**非齐次与齐次**：若 $\boldsymbol{b}=(b_1,b_2,\dots,b_m)^{T}\neq 0$，称 (1) 为**非齐次**线性方程组；若 $\boldsymbol{b}=0$，即

$$
\begin{cases}
a_{11}x_1+a_{12}x_2+\cdots+a_{1n}x_n=0,\\
a_{21}x_1+a_{22}x_2+\cdots+a_{2n}x_n=0,\\
\qquad\cdots\\
a_{m1}x_1+a_{m2}x_2+\cdots+a_{mn}x_n=0,
\end{cases}\tag{2}
$$

则称 (2) 为 (1) 对应的**齐次**线性方程组。

记

$$
A=\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & \ddots & \vdots\\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix},
\quad
X=\begin{pmatrix}x_1\\x_2\\\vdots\\x_n\end{pmatrix},
\quad
\boldsymbol{b}=\begin{pmatrix}b_1\\b_2\\\vdots\\b_m\end{pmatrix},
$$

分别称为**系数矩阵**、**未知量矩阵**、**常数列矩阵**，则 (1) 可写成

$$
AX=\boldsymbol{b}.
$$

把 $\boldsymbol{b}$ 添到 $A$ 的最后一列，得

$$
\tilde{A}=(A,\boldsymbol{b})=\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} & b_1\\
a_{21} & a_{22} & \cdots & a_{2n} & b_2\\
\vdots & \vdots & \ddots & \vdots & \vdots\\
a_{m1} & a_{m2} & \cdots & a_{mn} & b_m
\end{pmatrix},
$$

称为方程组 (1) 的**增广矩阵**。

**关键对应**：线性方程组 $AX=\boldsymbol{b}$ 与增广矩阵 $\tilde{A}$ 一一对应。于是对方程组的研究可以彻底转化为对矩阵的研究——这是线性代数中最基本、也最重要的一次抽象。

## 四、方程组的初等变换与高斯消元法

**定义** 线性方程组的**初等变换**指：

1. 互换两个方程的位置；
2. 用一个非零数乘某个方程的两边；
3. 把一个方程的两边同乘某常数后加到另一个方程上。

**性质 1.1** 对线性方程组施行初等变换，不改变它的解，即所得新方程组与原方程组**同解**。

三种变换都不改变"满足所有方程"这一条件：交换只是重排；乘非零数两边仍等价；把一方程的倍数加到另一方程，新方程是被加方程与原方程的线性组合，故原解仍满足新方程，反过来也可用逆变换退回。这三类变换恰好对应增广矩阵的三类初等行变换。

**高斯消元法** = 消元过程 + 回代过程：

- 消元：对增广矩阵作初等行变换，化为阶梯形矩阵，得到同解的阶梯形方程组；
- 回代：由阶梯形方程组自下而上逐个求出未知量。

**定理 1.1** 若增广矩阵 $\tilde{A}$ 经过一系列初等行变换变成 $\tilde{B}$，则分别以 $\tilde{A}$、$\tilde{B}$ 为增广矩阵的线性方程组同解。

**例 1** 解三元线性方程组

$$
\begin{cases}
3x_1+13x_2-6x_3=4,\\
x_1+2x_2+4x_3=1,\\
-x_1-x_2-7x_3=0.
\end{cases}
$$

解：写出增广矩阵并消元。先把首元为 $1$ 的方程换到第一行（$r_1\leftrightarrow r_2$）：

$$
\tilde{A}=\begin{pmatrix}
3 & 13 & -6 & 4\\
1 & 2 & 4 & 1\\
-1 & -1 & -7 & 0
\end{pmatrix}
\xrightarrow{r_1\leftrightarrow r_2}
\begin{pmatrix}
1 & 2 & 4 & 1\\
3 & 13 & -6 & 4\\
-1 & -1 & -7 & 0
\end{pmatrix}.
$$

用第一行消去第 1 列的其余元素（$r_2-3r_1$，$r_3+r_1$）：

$$
\xrightarrow[r_3+r_1]{r_2-3r_1}
\begin{pmatrix}
1 & 2 & 4 & 1\\
0 & 7 & -18 & 1\\
0 & 1 & -3 & 1
\end{pmatrix}.
$$

第二行首元为 $7$，直接除会产生分数，故先交换第 2、3 行，再用第 2 行消元：

$$
\xrightarrow{r_2\leftrightarrow r_3}
\begin{pmatrix}
1 & 2 & 4 & 1\\
0 & 1 & -3 & 1\\
0 & 7 & -18 & 1
\end{pmatrix}
\xrightarrow{r_3-7r_2}
\begin{pmatrix}
1 & 2 & 4 & 1\\
0 & 1 & -3 & 1\\
0 & 0 & 3 & -6
\end{pmatrix}.
$$

已得阶梯形。回代：由第三行 $3x_3=-6$ 得 $x_3=-2$；代入第二行 $x_2-3x_3=1$ 得 $x_2=1+3(-2)=-5$；代入第一行 $x_1+2x_2+4x_3=1$ 得 $x_1=1-2(-5)-4(-2)=19$。故

$$
x_1=19,\quad x_2=-5,\quad x_3=-2.
$$

**为什么先换行而不直接除**：若用 $r_2/7$ 把首元化为 $1$，后面全是分数，容易出错。先交换使首元为 $1$ 或绝对值较小的数，是手工计算的基本策略。

### 三个典型例子

**例 1.1（唯一解）**

$$
\begin{cases}
2x_1-x_2+3x_3=1,\\
4x_1+2x_2+5x_3=4,\\
2x_1+x_2+2x_3=5.
\end{cases}
$$

解：

$$
\tilde{A}=\begin{pmatrix}
2 & -1 & 3 & 1\\
4 & 2 & 5 & 4\\
2 & 1 & 2 & 5
\end{pmatrix}
\xrightarrow[r_3-r_1]{r_2-2r_1}
\begin{pmatrix}
2 & -1 & 3 & 1\\
0 & 4 & -1 & 2\\
0 & 2 & -1 & 4
\end{pmatrix}
\xrightarrow{r_2\leftrightarrow r_3}
\begin{pmatrix}
2 & -1 & 3 & 1\\
0 & 2 & -1 & 4\\
0 & 4 & -1 & 2
\end{pmatrix}
\xrightarrow{r_3-2r_2}
\begin{pmatrix}
2 & -1 & 3 & 1\\
0 & 2 & -1 & 4\\
0 & 0 & 1 & -6
\end{pmatrix}.
$$

同解方程组为

$$
\begin{cases}
2x_1-x_2+3x_3=1,\\
2x_2-x_3=4,\\
x_3=-6.
\end{cases}
$$

回代：$x_3=-6$，$x_2=\dfrac{4+x_3}{2}=-1$，$x_1=\dfrac{1+x_2-3x_3}{2}=\dfrac{1-1+18}{2}=9$。故

$$
x_1=9,\quad x_2=-1,\quad x_3=-6,
$$

原方程组有唯一解。

**例 1.2（无穷多解）**

$$
\begin{cases}
x_1+x_2+x_3+x_4+x_5=2,\\
2x_1+3x_2+x_3+x_4-3x_5=0,\\
x_1+2x_3+2x_4+6x_5=6,\\
4x_1+5x_2+3x_3+3x_4-x_5=4.
\end{cases}
$$

解：

$$
\tilde{A}=\begin{pmatrix}
1 & 1 & 1 & 1 & 1 & 2\\
2 & 3 & 1 & 1 & -3 & 0\\
1 & 0 & 2 & 2 & 6 & 6\\
4 & 5 & 3 & 3 & -1 & 4
\end{pmatrix}
\xrightarrow[r_3-r_1,\ r_4-4r_1]{r_2-2r_1}
\begin{pmatrix}
1 & 1 & 1 & 1 & 1 & 2\\
0 & 1 & -1 & -1 & -5 & -4\\
0 & -1 & 1 & 1 & 5 & 4\\
0 & 1 & -1 & -1 & -5 & -4
\end{pmatrix}.
$$

第 3、4 行分别是第 2 行的相反数与本身，用 $r_3+r_2$、$r_4-r_2$ 消去：

$$
\xrightarrow[r_4-r_2]{r_3+r_2}
\begin{pmatrix}
1 & 1 & 1 & 1 & 1 & 2\\
0 & 1 & -1 & -1 & -5 & -4\\
0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0 & 0
\end{pmatrix}.
$$

同解方程组为

$$
\begin{cases}
x_1+x_2+x_3+x_4+x_5=2,\\
x_2-x_3-x_4-5x_5=-4.
\end{cases}
$$

只有两个有效方程、五个未知量，故有无穷多解。取 $x_3,x_4,x_5$ 为自由变量，由第二式

$$
x_2=x_3+x_4+5x_5-4,
$$

代入第一式

$$
x_1=2-x_2-x_3-x_4-x_5=6-2x_3-2x_4-6x_5.
$$

故通解为

$$
(x_1,x_2,x_3,x_4,x_5)=(6-2s-2t-6u,\ s+t+5u-4,\ s,\ t,\ u),
$$

其中 $s,t,u$ 任意。**自由变量的个数 = 未知量个数 $-$ 有效方程个数**，这里是 $5-2=3$，与秩的公式一致。

**例 1.3（无解）**

$$
\begin{cases}
-2x_1+x_2+x_3=1,\\
x_1-2x_2+x_3=-2,\\
x_1+x_2-2x_3=4.
\end{cases}
$$

解：先把第 2 行的 $2$ 倍加到第 1 行（$r_1+2r_2$），同时把第 2、3 行都加到第 1 行上并写入第 3 行（$r_3+r_2+r_1$）：

$$
\tilde{A}=\begin{pmatrix}
-2 & 1 & 1 & 1\\
1 & -2 & 1 & -2\\
1 & 1 & -2 & 4
\end{pmatrix}
\xrightarrow[r_3+r_2+r_1]{r_1+2r_2}
\begin{pmatrix}
0 & -3 & 3 & -3\\
1 & -2 & 1 & -2\\
0 & 0 & 0 & 3
\end{pmatrix}
\xrightarrow{r_1\leftrightarrow r_2}
\begin{pmatrix}
1 & -2 & 1 & -2\\
0 & -3 & 3 & -3\\
0 & 0 & 0 & 3
\end{pmatrix}.
$$

最后一行为 $(0,0,0,3)$，对应方程 $0=3$，矛盾，故原方程组无解。注意此时系数矩阵的秩为 $2$，而增广矩阵的秩为 $3$——**秩不相等正是无解的标志**。

## 五、一般判别法

设 $\tilde{A}$ 经行变换化为阶梯形，且 $a'_{ij_i}\neq 0\ (i=1,\dots,r)$：

$$
\tilde{A}\ \sim\
\begin{pmatrix}
0 & \cdots & 0 & a'_{1j_1} & \cdots & \cdots & \cdots & \cdots & b'_1\\
0 & \cdots & 0 & 0 & \cdots & 0 & a'_{2j_2} & \cdots & b'_2\\
\vdots & & \vdots & \vdots & & \vdots & & \ddots & \vdots\\
0 & \cdots & 0 & 0 & \cdots & 0 & 0 & \cdots & a'_{rj_r}\ b'_r\\
0 & \cdots & 0 & 0 & \cdots & 0 & 0 & \cdots & 0\ \ b'_{r+1}\\
\vdots & & \vdots & \vdots & & \vdots & & & \vdots\\
0 & \cdots & 0 & 0 & \cdots & 0 & 0 & \cdots & 0\ \ 0
\end{pmatrix}.
$$

则

$$
r(A)=r,\qquad
r(\tilde{A})=\begin{cases}r, & b'_{r+1}=0,\\ r+1, & b'_{r+1}\neq 0.\end{cases}
$$

**定理 1.2** 线性方程组有解 $\iff b'_{r+1}=0\iff r(A)=r(\tilde{A})$。

**理解**：若 $b'_{r+1}\neq 0$，阶梯形中最后出现一行"系数全零、常数非零"，即 $0=b'_{r+1}$，矛盾；反之若 $b'_{r+1}=0$，所有方程都有解可回代。这里的 $b'_{r+1}$ 实际上就是增广矩阵比系数矩阵多出的那一"阶"。

**注意**：阶梯形中的全零行意味着原方程组中有多余方程，可由其他方程推出。化阶梯形的过程就是**消去多余方程**的过程。

当 $r(A)=r(\tilde{A})$ 时，解集分两种：

1. $r(A)=r(\tilde{A})=n$：方程组有**唯一解**。由阶梯形自下而上回代，先求 $x_n$，代入第 $n-1$ 个方程求 $x_{n-1}$，依此类推。
2. $r(A)=r(\tilde{A})=r<n$：方程组有**无穷多解**。阶梯形有 $r$ 个非零行，设第 $i$ 个非零行首非零元的列标为 $j_i$，把 $x_{j_1},x_{j_2},\dots,x_{j_r}$ 留在左边作"主变量"，其余 $x_k\ (k\neq j_i)$ 移到右边作**自由变量**，主变量由自由变量表示。

**自由变量个数** $=n-r$。这一公式在后面 4.6 节会用"基础解系"的语言重新解释。

## 六、齐次线性方程组

对齐次方程组 $AX=0$，常数项全为零，故 $r(A)=r(\tilde{A})$ 恒成立，方程组**永远有解**（至少有零解）。于是只剩两种情形：

$$
\begin{cases}
(1)\ AX=0\ \text{只有零解}\iff r(A)=n;\\
(2)\ AX=0\ \text{有非零解}\iff r(A)<n.
\end{cases}
$$

**推论 1** 当 $A$ 为 $n$ 阶方阵时，齐次方程组只有零解 $\iff\det(A)\neq 0$；有非零解 $\iff\det(A)=0$。

**推论 2** 当 $A$ 的行数小于列数（方程个数少于未知量个数）时，齐次方程组一定有非零解。因为 $r(A)\leq m<n$，秩不可能等于未知量个数。

**例** 解齐次线性方程组

$$
\begin{cases}
x_1+2x_2+x_3-x_4=0,\\
2x_1+4x_2-x_3-2x_4=0,\\
5x_1+10x_2+x_3-5x_4=0.
\end{cases}
$$

解：对系数矩阵作行变换：

$$
A=\begin{pmatrix}
1 & 2 & 1 & -1\\
2 & 4 & -1 & -2\\
5 & 10 & 1 & -5
\end{pmatrix}
\xrightarrow[r_3-5r_1]{r_2-2r_1}
\begin{pmatrix}
1 & 2 & 1 & -1\\
0 & 0 & -3 & 0\\
0 & 0 & -4 & 0
\end{pmatrix}
\xrightarrow[r_3-\frac43 r_2]{-\frac13 r_2}
\begin{pmatrix}
1 & 2 & 0 & -1\\
0 & 0 & 1 & 0\\
0 & 0 & 0 & 0
\end{pmatrix}.
$$

还原为同解方程组

$$
\begin{cases}
x_1+2x_2-x_4=0,\\
x_3=0,
\end{cases}
$$

即

$$
\begin{cases}
x_1=-2x_2+x_4,\\
x_3=0,
\end{cases}
$$

$x_2,x_4$ 为自由变量。令 $x_2=s,\ x_4=t$，通解为

$$
(x_1,x_2,x_3,x_4)=(-2s+t,\ s,\ 0,\ t)=s(-2,1,0,0)+t(1,0,0,1).
$$

这里 $r(A)=2<n=4$，自由变量 $4-2=2$ 个；两个特解 $(-2,1,0,0)$ 与 $(1,0,0,1)$ 的所有线性组合构成解集。

## 七、含参数方程组

**例** 实数 $\lambda$ 取何值时，线性方程组

$$
\begin{cases}
x_1+(\lambda^2+1)x_2+2x_3=\lambda,\\
\lambda x_1+\lambda x_2+(2\lambda+1)x_3=0,\\
x_1+(2\lambda+1)x_2+2x_3=2
\end{cases}
$$

无解？有唯一解？有无穷多解？有解时求出解。

解：对增广矩阵作 $r_3-r_1$、$r_2-\lambda r_1$：

$$
\tilde{A}=\begin{pmatrix}
1 & \lambda^2+1 & 2 & \lambda\\
\lambda & \lambda & 2\lambda+1 & 0\\
1 & 2\lambda+1 & 2 & 2
\end{pmatrix}
\xrightarrow[r_2-\lambda r_1]{r_3-r_1}
\begin{pmatrix}
1 & \lambda^2+1 & 2 & \lambda\\
0 & -\lambda^3 & 1 & -\lambda^2\\
0 & \lambda(2-\lambda) & 0 & 2-\lambda
\end{pmatrix}.
$$

第二个方程的首元 $-\lambda^3$、第三个方程的首元 $\lambda(2-\lambda)$ 是否为零，决定了能否继续除，因此必须按 $\lambda=0$、$\lambda=2$ 分段讨论。

**（1）$\lambda\neq 0$ 且 $\lambda\neq 2$**：两个首元都非零，可作 $r_3\times\dfrac{1}{\lambda(2-\lambda)}$、$r_2\times\left(-\dfrac{1}{\lambda^3}\right)$：

$$
\xrightarrow[r_2\times(-\frac{1}{\lambda^3})]{r_3\times\frac{1}{\lambda(2-\lambda)}}
\begin{pmatrix}
1 & \lambda^2+1 & 2 & \lambda\\
0 & 1 & -\frac{1}{\lambda^3} & \frac{1}{\lambda}\\
0 & 1 & 0 & \frac{1}{\lambda}
\end{pmatrix}
\xrightarrow{r_3-r_2}
\begin{pmatrix}
1 & \lambda^2+1 & 2 & \lambda\\
0 & 1 & -\frac{1}{\lambda^3} & \frac{1}{\lambda}\\
0 & 0 & \frac{1}{\lambda^3} & 0
\end{pmatrix}.
$$

由第三行 $x_3=0$，代入第二行 $x_2=\dfrac1\lambda$，再代入第一行

$$
x_1=\lambda-(\lambda^2+1)\cdot\frac1\lambda-0=-\frac1\lambda.
$$

故有唯一解

$$
\left(-\frac1\lambda,\ \frac1\lambda,\ 0\right).
$$

**（2）$\lambda=0$**：方程组变为

$$
\begin{cases}
x_1+x_2+2x_3=0,\\
x_3=0,\\
x_1+x_2+2x_3=2.
\end{cases}
$$

第一、三两式左边相同、右边相差 $2$，矛盾，无解。矩阵上：

$$
\tilde{A}=\begin{pmatrix}1 & 1 & 2 & 0\\0 & 0 & 1 & 0\\1 & 1 & 2 & 2\end{pmatrix}
\sim\begin{pmatrix}1 & 1 & 2 & 0\\0 & 0 & 1 & 0\\0 & 0 & 0 & 2\end{pmatrix},
$$

$r(A)=2\neq 3=r(\tilde{A})$。

**（3）$\lambda=2$**：方程组前两式与第三式出现重复，增广矩阵为

$$
\tilde{A}=\begin{pmatrix}1 & 5 & 2 & 2\\2 & 2 & 5 & 0\\1 & 5 & 2 & 2\end{pmatrix}
\xrightarrow[r_2-2r_1]{r_3-r_1}
\begin{pmatrix}1 & 5 & 2 & 2\\0 & -8 & 1 & -4\\0 & 0 & 0 & 0\end{pmatrix}.
$$

$r(A)=r(\tilde{A})=2<3$，有无穷多解。令自由变量 $x_3=t$，由第二行 $-8x_2+x_3=-4$ 得 $x_2=\dfrac{t}{8}+\dfrac12$，再由第一行

$$
x_1=2-5x_2-2x_3=-\frac{21}{8}t-\frac12.
$$

故通解为

$$
(x_1,x_2,x_3)=\left(-\frac{21}{8}t-\frac12,\ \frac{t}{8}+\frac12,\ t\right),\quad t\in\mathbb{R}.
$$

（课件此处把 $x_1$ 的常数项写成了 $+\frac12$，按回代应为 $-\frac12$，以本节结果为准。）

**方法二（克莱姆法则先行）**：本题方程个数等于未知量个数，可先算系数行列式。

$$
D=\begin{vmatrix}
1 & \lambda^2+1 & 2\\
\lambda & \lambda & 2\lambda+1\\
1 & 2\lambda+1 & 2
\end{vmatrix}
=\lambda^2(2-\lambda).
$$

当 $\lambda\neq 0$ 且 $\lambda\neq 2$ 时 $D\neq 0$，由克莱姆法则立即判定唯一解；再把 $\lambda=0$、$\lambda=2$ 分别代回原方程组单独讨论。这样分段更清楚，也避免了在含参数的矩阵上做除法。

**参数题的通用原则**：对含参数的矩阵作形如 $\dfrac{1}{f(\lambda)}r_i$ 的变换时，必须保证 $f(\lambda)\neq 0$；凡是可能为零的因式，都要先分离出来单独讨论，否则会丢解或凭空增解。

## 八、一个几何判别例子

三张平面两两相交，交线相互平行，它们的方程

$$
a_{i1}x_1+a_{i2}x_2+a_{i3}x_3=b_i\qquad (i=1,2,3)
$$

组成的方程组的系数矩阵与增广矩阵分别为 $A$ 与 $\bar{A}$，则（　）

A. $r(A)=2,\ r(\bar{A})=3$ B. $r(A)=2,\ r(\bar{A})=2$

C. $r(A)=1,\ r(\bar{A})=2$ D. $r(A)=1,\ r(\bar{A})=1$

**分析**：三张平面两两相交且交线互相平行，说明没有公共交点，故方程组**无解**，于是 $r(A)<r(\bar{A})$。另一方面，三条交线平行而不重合，三个法向量不能共线（否则平面平行），但可以共面，故 $r(A)=2$，从而 $r(\bar{A})=3$。选 **A**。

这题说明：秩的取值有明确的几何含义——$r(A)$ 反映法向量张成的维数，$r(A)$ 与 $r(\bar{A})$ 是否相等反映方程组是否相容。

## 课堂小结

- **三种解情形**：无解、唯一解、无穷多解，由 $r(A)$ 与 $r(\tilde{A})$ 的关系完全判定：

$$
r(A)<r(\tilde{A})\ \text{无解};\qquad
r(A)=r(\tilde{A})=n\ \text{唯一解};\qquad
r(A)=r(\tilde{A})=r<n\ \text{无穷多解}.
$$

- **同解变形**：方程组的初等变换与增广矩阵的初等行变换一一对应，这是"用矩阵解方程组"的合法性依据。
- **高斯消元**：消元化阶梯形，回代求未知量；先换行使首元为 $1$，可减少分数。
- **自由变量**：个数为 $n-r$；主变量由自由变量表示，通解写成自由变量的表达式。
- **齐次方程组**：必有解；只有零解 $\iff r(A)=n$；有非零解 $\iff r(A)<n$；方程少于未知量时必有非零解。
- **含参数**：先看哪些首元可能为零，按参数分段；除法前确认分母非零；也可先用克莱姆法则的 $D\neq 0$ 判定唯一解的范围。
- **易错点**：把"$r(A)=r(\tilde{A})$"漏写成只看 $r(A)$；回代时符号出错；参数题在除零处不讨论。

## 资料

- 课件原件：[4.1 消元法 (1).pptx](</course-materials/campus-linear-algebra-analytic-geometry/lectures/4.1%20%E6%B6%88%E5%85%83%E6%B3%95%20(1).pptx>)
