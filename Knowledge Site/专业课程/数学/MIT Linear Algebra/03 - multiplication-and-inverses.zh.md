---
slug: "03-multiplication-and-inverses"
title: "矩阵乘法与逆矩阵：五种算法与 Gauss-Jordan"
summary: "矩阵乘法可以从元素、列、行、列乘行、分块五个角度看，答案相同；方阵可逆当且仅当不存在非零向量被它送到零；Gauss-Jordan 用增广矩阵一次求出逆。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "matrix-multiplication"
  - "inverse"
  - "gauss-jordan"
sources:
  - kind: "video"
    title: "Lecture 3: Multiplication and Inverse Matrices"
    url: "https://www.youtube.com/watch?v=FX4C-JpTFgY"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## 这一讲的两个主题

1. 矩阵乘法到底在做什么。它有五种等价算法，每种都重要。
2. 方阵的逆：什么时候存在，什么时候不存在，以及怎么求。

上一讲已经用过乘法，但只是「会算」。这一讲要把乘法拆开，看清它的结构，因为后面讲列空间、秩、$LU$ 分解时都要用到这些视角。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:08 | 矩阵乘法的规则 |
| 1:24 | $C_{ij}$ 是行与列的点积 |
| 4:57 | 矩形矩阵的乘法 |
| 7:09 | 第二种看法：$A$ 乘 $B$ 的各列 |
| 9:57 | 结果列是 $A$ 的列的组合 |
| 11:27 | 结果行是 $B$ 的行的组合 |
| 18:28 | 分块乘法 |
| 24:20 | 可逆与奇异 |
| 29:05 | 非零 $\mathbf{x}$ 使 $A\mathbf{x}=\mathbf{0}$ 则不可逆 |
| 30:02 | 列的组合为零则不可逆 |
| 36:07 | Gauss-Jordan：一次解 $n$ 个方程组 |
| 38:32 | 把 $A$ 化成单位矩阵 |
| 42:01 | 用老办法验证 |
| 46:12 | 求逆的完整流程 |

## 五种看法

设 $A$ 是 $m\times n$，$B$ 是 $n\times p$，$C=AB$ 是 $m\times p$。注意 $A$ 的列数必须等于 $B$ 的行数。

### 一、按元素：行点乘列

$C$ 的第 $i$ 行第 $j$ 列元素是

$$
C_{ij}=\sum_{k=1}^{n} A_{ik}B_{kj}.
$$

也就是「$A$ 的第 $i$ 行」与「$B$ 的第 $j$ 列」做点积。以 $C_{34}$ 为例：

$$
C_{34}=A_{31}B_{14}+A_{32}B_{24}+\cdots+A_{3n}B_{n4}.
$$

这是教科书的标准算法，计算时最常用。

### 二、按列：$C$ 的列是 $A$ 的列的线性组合

把 $B$ 看成 $p$ 个列向量并排：

$$
B=\begin{bmatrix}\mathbf{b}_1 & \mathbf{b}_2 & \cdots & \mathbf{b}_p\end{bmatrix}.
$$

那么

$$
C=\begin{bmatrix}A\mathbf{b}_1 & A\mathbf{b}_2 & \cdots & A\mathbf{b}_p\end{bmatrix}.
$$

因为 $A\mathbf{b}_j$ 是 $A$ 的列的线性组合，所以**$C$ 的每一列都是 $A$ 的列的组合**，组合系数来自 $B$ 的对应列。

### 三、按行：$C$ 的行是 $B$ 的行的线性组合

同样地，把 $A$ 看成 $m$ 个行向量：

$$
A=\begin{bmatrix}\mathbf{a}_1^T\\ \vdots\\ \mathbf{a}_m^T\end{bmatrix},
\qquad
C=\begin{bmatrix}\mathbf{a}_1^T B\\ \vdots\\ \mathbf{a}_m^T B\end{bmatrix}.
$$

每个 $\mathbf{a}_i^T B$ 是 $B$ 的行的线性组合，系数来自 $A$ 的第 $i$ 行。

### 四、列乘行：秩一矩阵之和

这是最容易被忽略、但结构最清楚的一种。若 $A$ 的列是 $\mathbf{a}_k$，$B$ 的行是 $\mathbf{b}_k^T$，则

$$
AB=\sum_{k=1}^{n}\mathbf{a}_k\mathbf{b}_k^T.
$$

每项 $\mathbf{a}_k\mathbf{b}_k^T$ 是「列乘行」，得到一个完整的 $m\times p$ 矩阵。

例子：

$$
\begin{bmatrix}2\\3\\4\end{bmatrix}
\begin{bmatrix}1 & 6\end{bmatrix}
=
\begin{bmatrix}
2 & 12\\
3 & 18\\
4 & 24
\end{bmatrix}.
$$

这个矩阵的每一列都是 $[2,3,4]^T$ 的倍数，每一行都是 $[1,6]$ 的倍数。它的行空间是一条线，列空间也是一条线——这是「秩一矩阵」的原型。

### 五、分块乘法

把 $A$ 和 $B$ 都切成四块：

$$
A=\begin{bmatrix}A_{11}&A_{12}\\A_{21}&A_{22}\end{bmatrix},
\qquad
B=\begin{bmatrix}B_{11}&B_{12}\\B_{21}&B_{22}\end{bmatrix}.
$$

则

$$
AB=
\begin{bmatrix}
A_{11}B_{11}+A_{12}B_{21} & A_{11}B_{12}+A_{12}B_{22}\\
A_{21}B_{11}+A_{22}B_{21} & A_{21}B_{12}+A_{22}B_{22}
\end{bmatrix}.
$$

规则和普通乘法一样，只是把标量换成块。五条路算出来的结果完全一致。

## 逆矩阵：方阵的核心问题

对 $n\times n$ 的方阵 $A$，最重要的问题是：**它可逆吗？**

如果存在 $A^{-1}$ 使得

$$
A^{-1}A=I,
$$

则称 $A$ 可逆（非奇异）。对方阵有一个不平凡的事实：**左逆也是右逆**，即 $A^{-1}A=I$ 蕴含 $AA^{-1}=I$。对长方形矩阵不成立，因为形状根本不允许。

### 奇异矩阵：列的组合能产生零

考虑

$$
A=\begin{bmatrix}1&3\\2&6\end{bmatrix}.
$$

两列 $[1,2]^T$ 与 $[3,6]^T$ 在同一条直线上，第二列是第一列的 3 倍。

**理由一（列图像）**：$A$ 乘任何矩阵，结果的列都是 $A$ 的列的组合，因此都落在同一条直线上。但单位矩阵 $I$ 的列 $[1,0]^T$、$[0,1]^T$ 不在那条线上。所以 $A$ 不可能乘出 $I$。

**理由二（零空间）**：存在非零向量

$$
\mathbf{x}=\begin{bmatrix}3\\-1\end{bmatrix},
\qquad
A\mathbf{x}=
\begin{bmatrix}1&3\\2&6\end{bmatrix}
\begin{bmatrix}3\\-1\end{bmatrix}
=
\begin{bmatrix}3-3\\6-6\end{bmatrix}
=
\begin{bmatrix}0\\0\end{bmatrix}.
$$

如果 $A^{-1}$ 存在，两边左乘 $A^{-1}$：

$$
A^{-1}A\mathbf{x}=A^{-1}\mathbf{0}
\;\Longrightarrow\;
\mathbf{x}=\mathbf{0}.
$$

但 $\mathbf{x}=[3,-1]^T$ 不是零向量，矛盾。所以 $A^{-1}$ 不存在。

> **一句话总结：** 方阵不可逆，等价于存在非零向量被它压成零；一旦信息被压掉，就没有矩阵能还原。

这个判据会在后面变成「零空间是否只有零向量」以及「行列式是否为零」。

## Gauss-Jordan：一次解 $n$ 个方程组

现在假设 $A$ 可逆。求 $A^{-1}$ 的关键观察是：把 $A^{-1}$ 按列看，第 $j$ 列满足

$$
A\,(A^{-1}\text{的第 }j\text{列})=\mathbf{e}_j,
$$

其中 $\mathbf{e}_j$ 是单位矩阵的第 $j$ 列。所以求逆等价于**同时解 $n$ 个右端不同的方程组**。

Gauss 只做前向消元，Jordan 多做一步：继续向上消元，直到左边变成单位矩阵。

### 例子

取

$$
A=\begin{bmatrix}1&3\\2&7\end{bmatrix}.
$$

构造增广矩阵 $[A\mid I]$：

$$
\left[\begin{array}{cc|cc}
1&3&1&0\\
2&7&0&1
\end{array}\right].
$$

**第一步**：第二行减去 2 倍第一行。

$$
\left[\begin{array}{cc|cc}
1&3&1&0\\
0&1&-2&1
\end{array}\right].
$$

这一步把左下角消成 0，得到上三角。Gauss 到这里就停。

**第二步**：第一行减去 3 倍第二行，把右上角也消成 0。

$$
\left[\begin{array}{cc|cc}
1&0&7&-3\\
0&1&-2&1
\end{array}\right].
$$

左边成了 $I$，右边就是

$$
A^{-1}=\begin{bmatrix}7&-3\\-2&1\end{bmatrix}.
$$

### 验证

$$
A^{-1}A=
\begin{bmatrix}7&-3\\-2&1\end{bmatrix}
\begin{bmatrix}1&3\\2&7\end{bmatrix}
=
\begin{bmatrix}
7-6 & 21-21\\
-2+2 & -6+7
\end{bmatrix}
=
\begin{bmatrix}1&0\\0&1\end{bmatrix}.
$$

### 为什么右边会变成逆

把每一步消元写成矩阵 $E_1,E_2,\dots$，合起来记为

$$
E=E_k\cdots E_2E_1.
$$

对增广矩阵左乘 $E$：

$$
E\,[A\mid I]=[EA\mid E].
$$

消元完成时 $EA=I$。由逆的定义，$E=A^{-1}$。于是右边

$$
E\,I=E=A^{-1}.
$$

这就是 Gauss-Jordan 的全部原理：**把 $A$ 化成 $I$ 的那串行操作，作用在 $I$ 上就得到 $A^{-1}$。**

## 本讲结论

- $AB$ 有五种算法：元素点积、按列、按行、列乘行求和、分块。结果相同。
- $C$ 的列是 $A$ 的列的组合；$C$ 的行是 $B$ 的行的组合。
- 列乘行得到一个秩一矩阵；$AB$ 是这些秩一矩阵之和。
- 方阵可逆等价于不存在非零 $\mathbf{x}$ 使 $A\mathbf{x}=\mathbf{0}$。
- 奇异矩阵的列共线（更一般地，线性相关），无法组合出单位矩阵的列。
- Gauss-Jordan 对 $[A\mid I]$ 做完整消元，左边化为 $I$ 时右边就是 $A^{-1}$。

## 理解检验

**1. 用元素公式写出 $C_{23}$ 的求和表达式，并说明 $A$、$B$ 的形状限制。**

参考答案：
$$
C_{23}=\sum_{k=1}^{n}A_{2k}B_{k3}=A_{21}B_{13}+A_{22}B_{23}+\cdots+A_{2n}B_{n3},
$$
即 $A$ 的第二行与 $B$ 的第三列做点积。形状限制：若 $A$ 是 $m\times n$、$B$ 是 $n\times p$，则 $C$ 是 $m\times p$。要能写出 $C_{23}$，必须 $m\ge2$、$p\ge3$；$A$ 的列数必须等于 $B$ 的行数 $n$，这是乘法有定义的唯一条件。

**2. 为什么 $C$ 的列一定是 $A$ 的列的组合？用「矩阵乘向量」的定义解释。**

参考答案：把 $B$ 按列拆成 $\mathbf{b}_1,\dots,\mathbf{b}_p$，则 $C$ 的第 $j$ 列就是 $A\mathbf{b}_j$。而矩阵乘向量的定义正是「以 $\mathbf{b}_j$ 的分量为权重，对 $A$ 的列做线性组合」：
$$
A\mathbf{b}_j=\sum_{k=1}^{n}b_{kj}\,\mathbf{a}_k .
$$
所以 $C$ 的每一列都落在 $A$ 的列张成的空间里，系数就是 $B$ 第 $j$ 列的那些数。这也解释了为什么 $C$ 的列数等于 $B$ 的列数、而每个列向量都由 $A$ 的列生成。

**3. 证明 $[2,3,4]^T[1,6]$ 的行空间是一条线、列空间也是一条线。**

参考答案：先算乘积：
$$
\begin{bmatrix}2\\3\\4\end{bmatrix}\begin{bmatrix}1&6\end{bmatrix}
=\begin{bmatrix}2&12\\3&18\\4&24\end{bmatrix}.
$$
列空间：第 1 列是 $[2,3,4]^T$，第 2 列是 $6[2,3,4]^T$，两列都是同一个向量的倍数，所以列空间是 $\operatorname{span}\{[2,3,4]^T\}$，一条过原点的直线。行空间：第一行是 $[2,12]=2[1,6]$，第二行是 $3[1,6]$，第三行是 $4[1,6]$，所以行空间是 $\operatorname{span}\{[1,6]\}$，也是一条线。两者维数都是 1，这正是秩一矩阵的特征：它把整个平面压到一条线上。

**4. 用零空间论证说明 $\begin{bmatrix}1&3\\2&6\end{bmatrix}$ 不可逆。**

参考答案：取非零向量 $\mathbf{x}=[3,-1]^T$，计算
$$
\begin{bmatrix}1&3\\2&6\end{bmatrix}\begin{bmatrix}3\\-1\end{bmatrix}
=\begin{bmatrix}3-3\\6-6\end{bmatrix}=\begin{bmatrix}0\\0\end{bmatrix}.
$$
若 $A^{-1}$ 存在，两边左乘 $A^{-1}$：
$$
A^{-1}A\mathbf{x}=A^{-1}\mathbf{0}\;\Longrightarrow\;\mathbf{x}=\mathbf{0},
$$
与 $\mathbf{x}\ne\mathbf{0}$ 矛盾。所以不存在逆矩阵。直观上，两个不同的输入（$\mathbf 0$ 与 $[3,-1]^T$）被映到同一个输出，信息已经丢失，无法唯一还原。

**5. 对 $A=\begin{bmatrix}1&3\\2&7\end{bmatrix}$ 完整执行 Gauss-Jordan，并验证结果。**

参考答案：从增广矩阵出发，
$$
\left[\begin{array}{cc|cc}1&3&1&0\\2&7&0&1\end{array}\right]
\xrightarrow{R_2-2R_1}
\left[\begin{array}{cc|cc}1&3&1&0\\0&1&-2&1\end{array}\right]
\xrightarrow{R_1-3R_2}
\left[\begin{array}{cc|cc}1&0&7&-3\\0&1&-2&1\end{array}\right].
$$
左边已是 $I$，所以 $A^{-1}=\begin{bmatrix}7&-3\\-2&1\end{bmatrix}$。验证：
$$
A^{-1}A=\begin{bmatrix}7&-3\\-2&1\end{bmatrix}\begin{bmatrix}1&3\\2&7\end{bmatrix}
=\begin{bmatrix}7-6&21-21\\-2+2&-6+7\end{bmatrix}
=\begin{bmatrix}1&0\\0&1\end{bmatrix}.
$$
原理是：把这串行操作记为 $E$，则 $E[A\mid I]=[EA\mid E]=[I\mid A^{-1}]$，所以右边的变化正是 $A^{-1}$ 本身。

## 与前后课的关系

这一讲把乘法与逆讲成了结构。下一讲把消元写成 $A=LU$，其中 $L$ 记录乘数、$U$ 是上三角；再往后，可逆性会被翻译成「主元个数」「行列式非零」「零空间只有零向量」等互相等价的条件。
