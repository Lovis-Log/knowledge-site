---
slug: "6-1-quadratic-forms-and-standard-forms"
title: "6.1 二次型及其标准形"
summary: "二次型的标准形，以及用正交变换化标准形。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "6.1"
tags:
  - "线性代数"
---

二次型讨论的对象是多元二次齐次函数。这类函数在物理、统计、规划和极值问题中经常出现；在三维几何中，一般的二次曲面方程就是三元二次函数，讨论二次型并把它化成标准形，正是给二次曲面分类的工具。

本章先建立二次型的矩阵表示，说明可逆线性替换对应矩阵的合同变换，再给出化标准形的两种方法：正交变换法与配方法，最后用惯性定理说明标准形中正、负系数的个数不变。

## 二次型的定义及矩阵表示

**定义 1.1** 含有 $n$ 个变量 $x_1,x_2,\dots,x_n$ 的二次齐次函数

$$
f(x_1,x_2,\dots,x_n)=\sum_{i=1}^{n}a_{ii}x_i^2+2\sum_{1\le i<j\le n}a_{ij}x_ix_j
$$

称为 **$n$ 元二次型**，简称二次型。当系数 $a_{ij}$ 全为实数时称为**实二次型**，全为复数时称为**复二次型**。本章只讨论实二次型。

### 写成对称的二重和

二次型中交叉项 $x_ix_j$（$i<j$）只出现一次，为了写成统一的二重和，把它的系数平均分给 $x_ix_j$ 与 $x_jx_i$，即令

$$
a_{ij}=a_{ji}\quad(i<j).
$$

于是

$$
f(x_1,\dots,x_n)=\sum_{i=1}^{n}\sum_{j=1}^{n}a_{ij}x_ix_j,
$$

其中 $a_{ij}=a_{ji}$。这一步不是形式上的修饰：它保证系数矩阵是对称矩阵，而对称矩阵才能用正交变换对角化。

### 矩阵形式

把上式按 $x_i$ 提取公因式：

$$
f=\sum_{i=1}^{n}x_i\left(\sum_{j=1}^{n}a_{ij}x_j\right)
=(x_1,x_2,\dots,x_n)
\begin{pmatrix}
a_{11}x_1+a_{12}x_2+\cdots+a_{1n}x_n\\
a_{21}x_1+a_{22}x_2+\cdots+a_{2n}x_n\\
\vdots\\
a_{n1}x_1+a_{n2}x_2+\cdots+a_{nn}x_n
\end{pmatrix}.
$$

记

$$
A=\begin{pmatrix}
a_{11}&a_{12}&\cdots&a_{1n}\\
a_{21}&a_{22}&\cdots&a_{2n}\\
\vdots&\vdots&&\vdots\\
a_{n1}&a_{n2}&\cdots&a_{nn}
\end{pmatrix},\qquad
X=\begin{pmatrix}x_1\\x_2\\\vdots\\x_n\end{pmatrix},
$$

其中 $a_{ij}=a_{ji}$，则

$$
f(x_1,x_2,\dots,x_n)=X^TAX.
$$

这就是二次型的**矩阵形式**。由此：

1. 实对称矩阵 $A$ 称为二次型 $f$ 的**矩阵**；
2. 二次型 $f$ 称为实对称矩阵 $A$ 的**二次型**；
3. $r(A)$ 称为二次型 $f$ 的**秩**。

二次型与实对称矩阵一一对应。讨论二次型的首要问题，是给定二次型能准确写出它的矩阵，反过来给定对称矩阵能写出以它为矩阵的二次型。关键之处在于**二次型的矩阵一定是对称矩阵**，所以交叉项系数必须一分为二。

**例 1** 设二次型

$$
f=x_1^2-x_2^2-2x_1x_2+x_1x_3+4x_2x_3,
$$

写出 $f$ 的矩阵。

**解** 将交叉项 $x_ix_j$ 的系数除以 $2$，平均分配给 $a_{ij}$ 与 $a_{ji}$。平方项系数直接放在对角线上：

$$
a_{11}=1,\quad a_{22}=-1,\quad a_{33}=0,
$$

$$
a_{12}=a_{21}=-1,\quad a_{13}=a_{31}=\frac12,\quad a_{23}=a_{32}=2.
$$

所以

$$
A=\begin{pmatrix}
1&-1&\dfrac12\\[4pt]
-1&-1&2\\[4pt]
\dfrac12&2&0
\end{pmatrix}.
$$

**例 2** 将二次型 $f=x_1x_2+x_3x_4$ 写成矩阵形式。

**解** 这是四元二次型，没有平方项，两个交叉项的系数都是 $1$，各分一半给对应的对称位置：

$$
A=\begin{pmatrix}
0&\dfrac12&0&0\\[4pt]
\dfrac12&0&0&0\\[4pt]
0&0&0&\dfrac12\\[4pt]
0&0&\dfrac12&0
\end{pmatrix},\qquad
X=\begin{pmatrix}x_1\\x_2\\x_3\\x_4\end{pmatrix},
$$

$$
f=X^TAX
=(x_1,x_2,x_3,x_4)
\begin{pmatrix}
0&\dfrac12&0&0\\[4pt]
\dfrac12&0&0&0\\[4pt]
0&0&0&\dfrac12\\[4pt]
0&0&\dfrac12&0
\end{pmatrix}
\begin{pmatrix}x_1\\x_2\\x_3\\x_4\end{pmatrix}.
$$

**例 3** 设

$$
A=\begin{pmatrix}
1&-1&0\\
-1&0&1\\
0&1&-1
\end{pmatrix},
$$

写出以 $A$ 为矩阵的二次型。

**分析** $A$ 是三阶对称阵，对应三元二次型。把 $a_{ij}$ 与 $a_{ji}$ 合并成一项 $2a_{ij}x_ix_j$ 即可。

**解** 设 $X=(x_1,x_2,x_3)^T$，则

$$
f=X^TAX
=(x_1,x_2,x_3)
\begin{pmatrix}
1&-1&0\\
-1&0&1\\
0&1&-1
\end{pmatrix}
\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}
=x_1^2-2x_1x_2+2x_2x_3-x_3^2.
$$

注意 $a_{11}=1$、$a_{22}=0$、$a_{33}=-1$ 分别给出 $x_1^2$、缺失的 $x_2^2$ 与 $-x_3^2$；非对角元 $-1$ 给出 $-2x_1x_2$，$1$ 给出 $2x_2x_3$。

## 二次型的变换与合同

**定义 1.2** 对于线性替换 $X=CY$，如果系数矩阵 $C$ 可逆，则称该替换为**非退化线性替换**（或可逆线性替换）。如果 $C$ 是正交矩阵，则称 $X=CY$ 为**正交变换**。

正交变换是一类特殊的线性替换，它保持图形的形状和大小不变，例如旋转、轴对称以及它们的复合都是正交变换。这一点在解释二次曲面分类时很重要：正交变换只改变坐标轴的方向，不改变曲面的几何形状。

### 与基变换、坐标变换的联系

设 $n$ 维向量空间 $\mathbb R^n$ 有两组基

$$
\alpha_1,\alpha_2,\dots,\alpha_n;\qquad \beta_1,\beta_2,\dots,\beta_n,
$$

且

$$
(\beta_1,\beta_2,\dots,\beta_n)=(\alpha_1,\alpha_2,\dots,\alpha_n)C.
$$

若向量 $\xi$ 在基 $\alpha_1,\dots,\alpha_n$ 下的坐标为 $(x_1,\dots,x_n)^T$，在基 $\beta_1,\dots,\beta_n$ 下的坐标为 $(y_1,\dots,y_n)^T$，则

$$
\begin{pmatrix}x_1\\x_2\\\vdots\\x_n\end{pmatrix}
=C\begin{pmatrix}y_1\\y_2\\\vdots\\y_n\end{pmatrix},
$$

即 $X=CY$。所以变量的线性替换等价于基变换，$C$ 就是过渡矩阵。

**定义 1.3** 设 $A,B$ 是两个 $n$ 阶方阵，若存在可逆矩阵 $C$ 使

$$
C^TAC=B,
$$

则称 $A$ **合同**于 $B$，记作 $A\simeq B$。

矩阵合同与矩阵相似的定义很像，也是方阵之间的一种等价关系。

**合同的性质**：

1. 自反性：$A$ 合同于 $A$；
2. 对称性：$A$ 合同于 $B$，则 $B$ 合同于 $A$；
3. 传递性：$A$ 合同于 $B$，$B$ 合同于 $C$，则 $A$ 合同于 $C$。

合同矩阵一定等价，也一定等秩，反之都不成立；但若两个矩阵不等秩，则一定不合同。

### 替换后矩阵为什么合同

设 $f(x_1,\dots,x_n)=X^TAX$，经可逆线性替换 $X=CY$ 变为

$$
f=CY^{T}A(CY)=Y^T(C^TAC)Y=Y^TBY,
$$

其中 $B=C^TAC$。因为 $A$ 对称，

$$
B^T=(C^TAC)^T=C^TA^TC=C^TAC=B,
$$

所以 $B$ 仍是对称矩阵，它是新二次型 $g(y_1,\dots,y_n)=Y^TBY$ 的矩阵。这说明：**经可逆线性替换后，二次型的矩阵与原矩阵合同**；也可以说，合同的矩阵是同一个二次型在不同变量（不同基）下的矩阵。

**定理 1.1** 经过非退化的线性替换之后，原二次型的矩阵合同于新二次型的矩阵。

### 实对称矩阵与对角矩阵合同

实对称矩阵不仅可以相似对角化，而且可以用**正交矩阵**对角化。设 $P$ 为正交矩阵，使

$$
P^{-1}AP=P^TAP=\Lambda,
$$

其中 $\Lambda$ 为对角矩阵。由于 $P^{-1}=P^T$，上式同时说明 $A$ 与 $\Lambda$ 既相似又合同。因此任意实二次型都可以通过适当的可逆线性替换化成只含平方项、不含混合项的形式，这就引出了标准形的概念。

## 化实二次型为标准形

**定义** 只含平方项的二次型

$$
\lambda_1y_1^2+\lambda_2y_2^2+\cdots+\lambda_ny_n^2
$$

称为 $n$ 元二次型的**标准形**。

需要回答两个问题：一般的二次型能否化成标准形？标准形是否唯一？

设线性替换为

$$
\begin{cases}
x_1=c_{11}y_1+c_{12}y_2+\cdots+c_{1n}y_n,\\
x_2=c_{21}y_1+c_{22}y_2+\cdots+c_{2n}y_n,\\
\quad\vdots\\
x_n=c_{n1}y_1+c_{n2}y_2+\cdots+c_{nn}y_n,
\end{cases}
$$

写成矩阵形式 $X=CY$，其中

$$
C=\begin{pmatrix}
c_{11}&c_{12}&\cdots&c_{1n}\\
c_{21}&c_{22}&\cdots&c_{2n}\\
\vdots&\vdots&&\vdots\\
c_{n1}&c_{n2}&\cdots&c_{nn}
\end{pmatrix}.
$$

$C$ 不唯一；当 $C$ 可逆时，$X=CY$ 是可逆线性替换。

代入二次型得

$$
f=Y^T(C^TAC)Y=Y^TBY.
$$

若 $B$ 为对角矩阵，则 $g(y_1,\dots,y_n)=Y^TBY$ 就是标准形。于是：

**二次型 $X^TAX$ 标准化的问题，等价于求一个对角矩阵 $B$，使 $A$ 合同于 $B$；也就是把二次型化成平方和的形式。**

由于

$$
r(A)=r(C^TAC)=r(B),
$$

而 $B$ 为对角矩阵，所以**二次型的秩等于其标准形中系数不为零的平方项的个数**，这一点在下面定理 1.5 中正式叙述。

任意实二次型都可通过可逆线性变换化为标准形，但 $n$ 元二次型的标准形不唯一，取决于所选变换矩阵 $C$。常用的有两种方法：

- 取 $C$ 为正交矩阵，此时 $A$ 正交相似（同时合同）于对角矩阵；
- 配方法。

### 方法一：用正交变换化标准形

对实二次型最实用的是正交变换法：所作的可逆线性替换中，矩阵 $C$ 不仅是可逆矩阵，还是正交矩阵。这样的正交矩阵存在，依据是实对称矩阵一定能正交对角化；要注意这种方法只适用于实二次型。

**定理 1.2** 设 $f(x_1,\dots,x_n)=X^TAX$ 为实二次型，则可作一个正交变换 $X=PY$，把 $f$ 化为标准形

$$
\lambda_1y_1^2+\lambda_2y_2^2+\cdots+\lambda_ny_n^2,
$$

其中 $\lambda_1,\lambda_2,\dots,\lambda_n$ 都是 $A$ 的特征值。

**例** 用正交变换化二次型

$$
f=2x_1^2+5x_2^2+5x_3^2+4x_1x_2-4x_1x_3-8x_2x_3
$$

为标准形。

**解** 二次型的矩阵为

$$
A=\begin{pmatrix}
2&2&-2\\
2&5&-4\\
-2&-4&5
\end{pmatrix}.
$$

求特征值：

$$
|\lambda E-A|=
\begin{vmatrix}
\lambda-2&-2&2\\
-2&\lambda-5&4\\
2&4&\lambda-5
\end{vmatrix}
=(\lambda-1)^2(\lambda-10),
$$

故特征值为

$$
\lambda_1=\lambda_2=1,\qquad \lambda_3=10.
$$

这里的行列式展开后是整系数三次多项式

$$
\lambda^3-12\lambda^2+21\lambda-10.
$$

首一整系数多项式若有有理根，则必为整数，且必为常数项 $-10$ 的因子。试 $\lambda=1$：

$$
1-12+21-10=0,
$$

所以 $\lambda-1$ 是一次因式；再用多项式除法或凑项分解，得

$$
\lambda^3-12\lambda^2+21\lambda-10=(\lambda-1)^2(\lambda-10).
$$

求三阶矩阵的特征值时，先试常数项的小因子（$\pm1,\pm2,\pm5,\pm10$）通常比直接展开更快。

对 $\lambda_1=\lambda_2=1$，解 $(E-A)X=0$，即

$$
\begin{pmatrix}
-1&-2&2\\
-2&-4&4\\
2&4&-4
\end{pmatrix}
\longrightarrow
\begin{pmatrix}
1&2&-2\\
0&0&0\\
0&0&0
\end{pmatrix}.
$$

同解方程组为 $x_1=-2x_2+2x_3$，$x_2,x_3$ 自由。取基础解系

$$
\xi_1=\begin{pmatrix}-2\\1\\0\end{pmatrix},\qquad
\xi_2=\begin{pmatrix}2\\0\\1\end{pmatrix}.
$$

**正交化**（同一重特征值内部需要正交化）：

$$
\beta_1=\xi_1=\begin{pmatrix}-2\\1\\0\end{pmatrix},
$$

$$
\beta_2=\xi_2-\frac{(\xi_2,\beta_1)}{(\beta_1,\beta_1)}\beta_1
=\begin{pmatrix}2\\0\\1\end{pmatrix}
-\frac{-4}{5}\begin{pmatrix}-2\\1\\0\end{pmatrix}
=\begin{pmatrix}\dfrac25\\[4pt]\dfrac45\\[4pt]1\end{pmatrix}.
$$

**单位化**：

$$
\eta_1=\frac{\beta_1}{|\beta_1|}
=\begin{pmatrix}-\dfrac{2}{\sqrt5}\\[4pt]\dfrac{1}{\sqrt5}\\[4pt]0\end{pmatrix},
\qquad
\eta_2=\frac{\beta_2}{|\beta_2|}
=\begin{pmatrix}\dfrac{2}{\sqrt{45}}\\[4pt]\dfrac{4}{\sqrt{45}}\\[4pt]\dfrac{5}{\sqrt{45}}\end{pmatrix}.
$$

这里 $|\beta_2|=\sqrt{\dfrac{4}{25}+\dfrac{16}{25}+1}=\dfrac{\sqrt{45}}{5}$，所以三个分量分别化为 $\dfrac{2}{\sqrt{45}}$、$\dfrac{4}{\sqrt{45}}$、$\dfrac{5}{\sqrt{45}}$。

对 $\lambda_3=10$，解 $(10E-A)X=0$：

$$
\begin{pmatrix}
8&-2&2\\
-2&5&4\\
2&4&5
\end{pmatrix}
\longrightarrow
\begin{pmatrix}
1&-\dfrac14&\dfrac14\\
0&1&1\\
0&0&0
\end{pmatrix},
$$

同解方程组为 $x_1=-\dfrac12x_3$，$x_2=-x_3$。取基础解系

$$
\xi_3=\begin{pmatrix}1\\2\\-2\end{pmatrix},
$$

单位化得

$$
\eta_3=\frac{\xi_3}{|\xi_3|}
=\begin{pmatrix}\dfrac13\\[4pt]\dfrac23\\[4pt]-\dfrac23\end{pmatrix},\qquad |\xi_3|=3.
$$

于是正交矩阵

$$
P=(\eta_1,\eta_2,\eta_3)=
\begin{pmatrix}
-\dfrac{2}{\sqrt5}&\dfrac{2}{\sqrt{45}}&\dfrac13\\[8pt]
\dfrac{1}{\sqrt5}&\dfrac{4}{\sqrt{45}}&\dfrac23\\[8pt]
0&\dfrac{5}{\sqrt{45}}&-\dfrac23
\end{pmatrix},
$$

满足

$$
P^{-1}AP=P^TAP=
\begin{pmatrix}
1&0&0\\
0&1&0\\
0&0&10
\end{pmatrix}.
$$

令 $X=PY$，得 $f$ 的标准形

$$
f(y_1,y_2,y_3)=y_1^2+y_2^2+10y_3^2.
$$

**注** 正交变换不唯一（重特征值的特征子空间里可选不同正交基），但在不计对角元次序时，正交变换得到的标准形是唯一的：对角元只能是 $A$ 的全部特征值。

**思考** 二次方程

$$
2x^2+5y^2+5z^2+4xy-4xz-8yz=a^2
$$

表示空间中哪一类曲面？

由上题结果，通过正交变换 $(x,y,z)^T=P(u,v,w)^T$，方程变为

$$
u^2+v^2+10w^2=a^2,
$$

这是椭球面。正交变换保持图形的形状和大小不变，所以原方程表示的也是椭球面。这里默认 $a\ne0$；若 $a=0$，方程只有原点一个解，不是曲面。

### 方法二：用配方法化标准形

如果不要求正交变换，可以用一般的可逆线性变换把二次型化为标准形。这样得到的标准形与正交变换得到的可能不同，而且不唯一；但由惯性定理，正、负平方项的个数不变。

**例** 用配方法将二次型

$$
f(x_1,x_2,x_3)=2x_1x_2+3x_2x_3+4x_1x_3
$$

化为标准形。

**分析** 这个二次型只有交叉项，没有平方项，不能直接对某个变量配方。先用平方差公式造出平方项：令 $x_1=y_1+y_2$，$x_2=y_1-y_2$，则 $2x_1x_2=2(y_1^2-y_2^2)$，出现了一正一负两个平方项，再继续配方。

**解** 令

$$
\begin{cases}
x_1=y_1+y_2,\\
x_2=y_1-y_2,\\
x_3=y_3,
\end{cases}
\qquad
C_1=\begin{pmatrix}
1&1&0\\
1&-1&0\\
0&0&1
\end{pmatrix},
$$

则

$$
\begin{aligned}
f&=2(y_1+y_2)(y_1-y_2)+3(y_1-y_2)y_3+4(y_1+y_2)y_3\\
&=2y_1^2-2y_2^2+7y_1y_3+y_2y_3.
\end{aligned}
$$

对 $y_1$、$y_2$ 分别配方：

$$
\begin{aligned}
f&=2\left(y_1+\frac74y_3\right)^2-2\left(y_2-\frac14y_3\right)^2
-\frac{49}{8}y_3^2+\frac18y_3^2\\
&=2\left(y_1+\frac74y_3\right)^2-2\left(y_2-\frac14y_3\right)^2-6y_3^2.
\end{aligned}
$$

再令

$$
\begin{cases}
z_1=y_1+\dfrac74y_3,\\
z_2=y_2-\dfrac14y_3,\\
z_3=y_3,
\end{cases}
$$

则

$$
f=2z_1^2-2z_2^2-6z_3^2.
$$

把 $y$ 用 $z$ 表示：$y_1=z_1-\dfrac74z_3$，$y_2=z_2+\dfrac14z_3$，$y_3=z_3$。代回 $x$：

$$
\begin{cases}
x_1=y_1+y_2=z_1+z_2-\dfrac32z_3,\\[4pt]
x_2=y_1-y_2=z_1-z_2-2z_3,\\[4pt]
x_3=z_3.
\end{cases}
$$

所作可逆线性变换为 $X=CZ$，其中

$$
C=C_1C_2=
\begin{pmatrix}
1&1&-\dfrac32\\[4pt]
1&-1&-2\\[4pt]
0&0&1
\end{pmatrix},
\qquad |C|\ne0.
$$

直接验算 $C^TAC$（这里 $A$ 为原二次型的矩阵）可得

$$
A=\begin{pmatrix}
0&1&2\\
1&0&\dfrac32\\
2&\dfrac32&0
\end{pmatrix},
\qquad
C^TAC=
\begin{pmatrix}
2&0&0\\
0&-2&0\\
0&0&-6
\end{pmatrix},
$$

与配方结果一致。

## 实二次型的规范形

**定理 1.5** 设二次型 $f(x_1,\dots,x_n)$ 的矩阵 $A$ 的秩为 $r$，则化成标准形后，恰好有 $r$ 个平方项的系数不为零。因此，矩阵 $A$ 的秩也称为二次型 $f$ 的秩。

设实二次型 $f$ 的标准形中有 $r$ 个系数不为零的平方项，重新排列变量后，不妨设

$$
f=d_1y_1^2+d_2y_2^2+\cdots+d_py_p^2-d_{p+1}y_{p+1}^2-\cdots-d_ry_r^2,
$$

其中 $d_i>0$，$i=1,2,\dots,r$。令

$$
y_i=\frac{1}{\sqrt{d_i}}z_i\quad(i=1,2,\dots,r),\qquad
y_j=z_j\quad(j=r+1,\dots,n),
$$

则

$$
f=z_1^2+z_2^2+\cdots+z_p^2-z_{p+1}^2-\cdots-z_r^2.
$$

上式称为实二次型 $f$ 的**规范形**。规范形是唯一的。

**惯性定理** 任意一个二次型 $f(x_1,\dots,x_n)=X^TAX$，经过适当的非退化线性替换可以变成规范形，且规范形唯一。

（证明从略。）

规范形中系数为 $+1$ 的平方项个数称为**正惯性指数**，记为 $p$；系数为 $-1$ 的平方项个数称为**负惯性指数**，等于 $r-p$，其中 $r=r(A)$。

**推论** 用不同方法得到的二次型的标准形中，具有正（负）系数的平方项个数总相同。

也就是说，设 $n$ 元实二次型经两个不同的可逆线性变换 $X=C_1Y$、$Y=C_2Z$ 分别化成

$$
f=k_1y_1^2+k_2y_2^2+\cdots+k_ny_n^2,
$$

$$
f=l_1z_1^2+l_2z_2^2+\cdots+l_nz_n^2,
$$

则 $k_1,\dots,k_n$ 中正数、负数、零的个数分别与 $l_1,\dots,l_n$ 中正数、负数、零的个数相同。这正是标准形不唯一但规范形唯一的含义。

## 课堂小结

二次型是多元二次齐次函数，把它写成对称的二重和后得到矩阵形式 $f=X^TAX$，其中 $A$ 为实对称矩阵，且二次型与实对称矩阵一一对应；交叉项系数要一分为二放到对称位置，这是写矩阵时最容易出错的地方。可逆线性替换 $X=CY$ 把矩阵变为 $C^TAC$，所以二次型的化简就是合同变换：寻找可逆矩阵 $C$ 使 $A$ 合同于对角矩阵。正交变换法取 $C=P$ 为正交矩阵，此时 $P^TAP=\Lambda$，对角元就是 $A$ 的特征值，标准形在不计次序时唯一；步骤是求特征值、求特征向量、在同一重特征值内部施密特正交化、单位化、按列排成 $P$。配方法适用于不要求正交性的场合，通过凑平方逐步消去交叉项，所得标准形与正交变换的可能不同，也不唯一。无论用哪种方法，标准形中非零平方项的个数都等于 $r(A)$；再由惯性定理，正、负平方项的个数（正、负惯性指数）不变，规范形唯一。易错点：正交化只需在同一特征值内部进行；$P$ 的列要与对角元次序对应；配方法中变换矩阵是各步矩阵的乘积，次序不能颠倒。

## 资料

[课件原件：6.1二次型及其标准形 (1).pptx](<https://docs.google.com/presentation/d/1ev9NfKd3K-_B--DKK0LmxZCHjwjHOnrm/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true>)
