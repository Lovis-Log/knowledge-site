---
slug: "16-least-squares"
title: "投影矩阵与最小二乘"
summary: "把投影矩阵算到底：用三个点求最佳直线，得到 C=2/3、D=1/2；并从几何与代数两侧证明 AᵀA 在列无关时可逆。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "least-squares"
  - "projection-matrix"
  - "normal-equations"
sources:
  - kind: "video"
    title: "16. Projection Matrices and Least Squares"
    url: "https://www.youtube.com/watch?v=osh80YCg_GM"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## 先用两个极端情形检验投影矩阵

$$
P=A(A^\top A)^{-1}A^\top .
$$

**情形一：$\mathbf{b}$ 已经在列空间中。** 此时 $\mathbf{b}=A\mathbf{x}$，代入：

$$
P\mathbf{b}=A(A^\top A)^{-1}A^\top A\mathbf{x}=A\mathbf{x}=\mathbf{b}.
$$

投影不动。

**情形二：$\mathbf{b}$ 垂直于列空间。** 此时 $\mathbf{b}\in N(A^\top)$，所以 $A^\top\mathbf{b}=\mathbf{0}$，于是 $P\mathbf{b}=\mathbf{0}$。

一般向量可以分解为

$$
\mathbf{b}=P\mathbf{b}+(I-P)\mathbf{b},
$$

第一部分在列空间中，第二部分垂直于列空间。$I-P$ 也是一个投影矩阵，它投影到列空间的正交补上。它同样对称、幂等：

$$
(I-P)^\top=I-P,\qquad (I-P)^2=I-P.
$$

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:07 | 回顾上一讲的投影公式 |
| 2:32 | 两个极端情形检验公式 |
| 7:44 | $I-P$ 也是投影矩阵 |
| 9:48 | 误差向量与投影向量的关系 |
| 11:11 | 三点拟合直线的矩阵 |
| 13:47 | 误差平方和作为度量 |
| 15:06 | 两张图：投影到列空间与拟合直线 |
| 23:13 | 正规方程的数值形式 |
| 24:32 | 对 $C$ 与 $D$ 分别求偏导 |
| 27:52 | 解出 $C=2/3$，$D=1/2$ |
| 30:13 | 误差向量与投影向量 |
| 31:58 | 误差与列空间正交 |
| 37:32 | 列无关保证 $A^{T}A$ 可逆 |
| 40:18 | 用点乘完成证明 |
| 43:01 | $A\mathbf{x}=0$ 推出 $\mathbf{x}=0$ |
| 46:23 | 正交单位向量与 $Q$ 的预告 |

## 最小二乘的数值计算

三个点 $(1,1),(2,2),(3,2)$，拟合直线 $b=C+Dt$。

$$
A=\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix},
\qquad
\mathbf{x}=\begin{bmatrix}C\\D\end{bmatrix},
\qquad
\mathbf{b}=\begin{bmatrix}1\\2\\2\end{bmatrix}.
$$

### 第一步：算 $A^\top A$ 与 $A^\top\mathbf{b}$

$$
A^\top A=
\begin{bmatrix}1&1&1\\1&2&3\end{bmatrix}
\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix}
=
\begin{bmatrix}3&6\\6&14\end{bmatrix}.
$$

$$
A^\top\mathbf{b}=
\begin{bmatrix}1&1&1\\1&2&3\end{bmatrix}
\begin{bmatrix}1\\2\\2\end{bmatrix}
=
\begin{bmatrix}5\\11\end{bmatrix}.
$$

### 第二步：解正规方程

$$
\begin{cases}
3C+6D=5,\\
6C+14D=11.
\end{cases}
$$

第一式乘 2：$6C+12D=10$。与第二式相减：

$$
2D=1\quad\Longrightarrow\quad D=\frac12.
$$

代回：$3C+3=5$，所以

$$
C=\frac23.
$$

最佳直线是

$$
b=\frac23+\frac12 t.
$$

### 第三步：投影向量与误差向量

$$
\mathbf{p}=A\hat{\mathbf{x}}=
\begin{bmatrix}
\frac23+\frac12\\
\frac23+1\\
\frac23+\frac32
\end{bmatrix}
=
\begin{bmatrix}7/6\\5/3\\13/6\end{bmatrix}.
$$

$$
\mathbf{e}=\mathbf{b}-\mathbf{p}=
\begin{bmatrix}1\\2\\2\end{bmatrix}
-
\begin{bmatrix}7/6\\5/3\\13/6\end{bmatrix}
=
\begin{bmatrix}-1/6\\1/3\\-1/6\end{bmatrix}.
$$

验证正交性：

$$
\mathbf{e}\cdot(1,1,1)=-\frac16+\frac13-\frac16=0,
$$

$$
\mathbf{e}\cdot(1,2,3)=-\frac16+\frac23-\frac12=0.
$$

误差向量与 $A$ 的两列都垂直，因此与整个列空间垂直。同时

$$
\mathbf{p}\cdot\mathbf{e}
=\frac76\left(-\frac16\right)+\frac53\cdot\frac13+\frac{13}{6}\left(-\frac16\right)
=\frac{-7+20-13}{36}=0.
$$

### 两张图是同一件事

- **数据图**：三个点、一条直线、三段竖直误差。最小化 $e_1^2+e_2^2+e_3^2$。
- **向量图**：$\mathbf{b}$ 分解为列空间中的 $\mathbf{p}$ 与垂直于列空间的 $\mathbf{e}$。

$C,D$ 就是「用两列组合出 $\mathbf{p}$」的系数。两张图只是同一组数字的两种画法。

## 从微积分也能得到正规方程

最小化

$$
E(C,D)=(C+D-1)^2+(C+2D-2)^2+(C+3D-2)^2.
$$

对 $C$ 求偏导并令其为零：

$$
2(C+D-1)+2(C+2D-2)+2(C+3D-2)=0,
$$

化简得 $3C+6D=5$。

对 $D$ 求偏导并令其为零：

$$
2(C+D-1)\cdot1+2(C+2D-2)\cdot2+2(C+3D-2)\cdot3=0,
$$

化简得 $6C+14D=11$。

正是正规方程。平方的好处就在这里：求导后仍是线性的。

### 最小二乘的局限

如果某个点远离直线，它的误差被平方后会被极度放大，可能把整条线拉偏。统计学称这种点为**离群点**（outlier），并因此发展出稳健回归。最小二乘仍是最常用的方法，但不是唯一的方法。

## 证明：列无关时 $A^\top A$ 可逆

这是本章的核心事实，因为整个计算都依赖 $(A^\top A)^{-1}$ 存在。

设 $A$ 的列线性无关。要证 $A^\top A$ 可逆，只需证 $N(A^\top A)=\{\mathbf{0}\}$。

假设

$$
A^\top A\mathbf{x}=\mathbf{0}.
$$

两边左乘 $\mathbf{x}^\top$：

$$
\mathbf{x}^\top A^\top A\mathbf{x}=0.
$$

左边可以写成

$$
(A\mathbf{x})^\top(A\mathbf{x})=\|A\mathbf{x}\|^2.
$$

范数为零，故 $A\mathbf{x}=\mathbf{0}$。

由列线性无关，零空间中只有零向量，所以

$$
\mathbf{x}=\mathbf{0}.
$$

因此 $N(A^\top A)=\{\mathbf{0}\}$，$A^\top A$ 可逆。

### 反向

若列相关，存在非零 $\mathbf{x}$ 使 $A\mathbf{x}=\mathbf{0}$，于是 $A^\top A\mathbf{x}=\mathbf{0}$，不可逆。所以

$$
A^\top A\text{ 可逆}\iff A\text{ 的列线性无关}.
$$

## 数值例子回顾

对

$$
A=\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix},
$$

$$
A^\top A=\begin{bmatrix}3&6\\6&14\end{bmatrix},
\qquad
\det=3\cdot14-36=42-36=6\neq0.
$$

列 $(1,1,1)$ 与 $(1,2,3)$ 不成比例，确实无关。

## 本讲结论

- 投影把 $\mathbf{b}$ 分成列空间分量 $P\mathbf{b}$ 与正交分量 $(I-P)\mathbf{b}$。
- 最小二乘解由正规方程给出，几何上就是投影。
- 三点拟合得到 $b=2/3+t/2$，误差向量与列空间正交。
- 正规方程也可由对平方误差求偏导得到。
- $A^\top A$ 可逆当且仅当 $A$ 的列线性无关，证明只用 $N(A^\top A)=N(A)$。

## 理解检验

**1. 为什么 $I-P$ 也是投影矩阵？它投影到哪个空间？**

参考答案：验证两条性质：
$$
(I-P)^\top=I^\top-P^\top=I-P,
$$
$$
(I-P)^2=I-2P+P^2=I-2P+P=I-P,
$$
所以 $I-P$ 对称且幂等，是投影矩阵。

它投影到的空间是 $C(A)$ 的正交补，也就是左零空间 $N(A^\top)$。两点说明：对任意 $\mathbf{b}$，$(I-P)\mathbf{b}=\mathbf{b}-P\mathbf{b}$ 正是误差向量 $\mathbf{e}$，而前面已证 $\mathbf{e}\perp C(A)$；反过来，若 $\mathbf{b}\in C(A)$，则 $P\mathbf{b}=\mathbf{b}$，$(I-P)\mathbf{b}=\mathbf{0}$，说明 $I-P$ 把列空间整个压成零。于是
$$
\mathbf{b}=\underbrace{P\mathbf{b}}_{\in C(A)}+\underbrace{(I-P)\mathbf{b}}_{\in N(A^\top)}
$$
是 $\mathbf{b}$ 沿两个正交补子空间的分解。

**2. 用微积分对 $E(C,D)$ 求偏导，验证得到的是正规方程。**

参考答案：目标是
$$
E(C,D)=(C+D-1)^2+(C+2D-2)^2+(C+3D-2)^2 .
$$
对 $C$ 求偏导并令其为零：
$$
\frac{\partial E}{\partial C}=2\big[(C+D-1)+(C+2D-2)+(C+3D-2)\big]=0,
$$
括号内合并：$3C+6D-5=0$，即 $3C+6D=5$。

对 $D$ 求偏导并令其为零：
$$
\frac{\partial E}{\partial D}=2\big[(C+D-1)\cdot1+(C+2D-2)\cdot2+(C+3D-2)\cdot3\big]=0,
$$
展开合并：$6C+14D-11=0$，即 $6C+14D=11$。

两个方程正是
$$
\begin{bmatrix}3&6\\6&14\end{bmatrix}\begin{bmatrix}C\\D\end{bmatrix}
=\begin{bmatrix}5\\11\end{bmatrix}
\quad\Longleftrightarrow\quad
A^\top A\hat{\mathbf{x}}=A^\top\mathbf{b}.
$$
平方误差的好处就在这里：求导后仍是一次方程，所以最优点可以由线性方程组直接解出。

**3. 在三点例子中，验证 $\mathbf{p}\cdot\mathbf{e}=0$。**

参考答案：取
$$
\mathbf{p}=\begin{bmatrix}7/6\\5/3\\13/6\end{bmatrix},
\qquad
\mathbf{e}=\begin{bmatrix}-1/6\\1/3\\-1/6\end{bmatrix}.
$$
逐项相乘再相加：
$$
\mathbf{p}\cdot\mathbf{e}
=\frac76\left(-\frac16\right)+\frac53\cdot\frac13+\frac{13}{6}\left(-\frac16\right)
=-\frac{7}{36}+\frac{5}{9}-\frac{13}{36}.
$$
通分为分母 $36$：$-\frac{7}{36}+\frac{20}{36}-\frac{13}{36}=\frac{0}{36}=0$。

所以 $\mathbf{p}\perp\mathbf{e}$。这正是直角三角形：$\mathbf{b}=\mathbf{p}+\mathbf{e}$，且 $\|\mathbf{b}\|^2=\|\mathbf{p}\|^2+\|\mathbf{e}\|^2$，$\mathbf{p}$ 是 $\mathbf{b}$ 在列空间上的垂足。

**4. 证明 $N(A^\top A)=N(A)$，并说明每一步用到什么。**

参考答案：两个包含关系。

$N(A)\subseteq N(A^\top A)$：若 $A\mathbf{x}=\mathbf{0}$，两边左乘 $A^\top$ 得 $A^\top A\mathbf{x}=\mathbf{0}$。这一步只用到矩阵乘法与零向量的性质。

$N(A^\top A)\subseteq N(A)$：若 $A^\top A\mathbf{x}=\mathbf{0}$，左乘 $\mathbf{x}^\top$：
$$
0=\mathbf{x}^\top A^\top A\mathbf{x}=(A\mathbf{x})^\top(A\mathbf{x})=\|A\mathbf{x}\|^2 .
$$
这一步用到了 $\mathbf{x}^\top A^\top=(A\mathbf{x})^\top$。最后，范数平方为零当且仅当向量为零（正定性），所以 $A\mathbf{x}=\mathbf{0}$。

两向包含合起来即 $N(A^\top A)=N(A)$；维数相同，秩也相同。

**5. 如果三点是 $(1,1),(2,2),(3,3)$，最佳直线与误差分别是什么？**

参考答案：三点恰好落在 $b=t$ 上，所以最佳直线就是 $b=t$，即 $C=0,\ D=1$，误差为零。

用正规方程核对。此时
$$
A=\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix},
\qquad
\mathbf{b}=\begin{bmatrix}1\\2\\3\end{bmatrix},
$$
$$
A^\top A=\begin{bmatrix}3&6\\6&14\end{bmatrix},
\qquad
A^\top\mathbf{b}=\begin{bmatrix}1+2+3\\1+4+9\end{bmatrix}=\begin{bmatrix}6\\14\end{bmatrix}.
$$
解 $3C+6D=6$、$6C+14D=14$：第一式给 $C=2-2D$，代入第二式得 $12-12D+14D=14$，即 $2D=2$，$D=1$，从而 $C=0$。于是 $\mathbf{p}=A\hat{\mathbf{x}}=(1,2,3)^\top=\mathbf{b}$，误差 $\mathbf{e}=\mathbf{b}-\mathbf{p}=\mathbf{0}$，与「点在直线上」一致。

## 与前后课程的关系

上一讲建立了投影公式；这一讲完成数值计算并证明可逆性。下一讲换一组「最好的列」——正交单位向量，使投影与最小二乘的计算几乎不用求逆。
