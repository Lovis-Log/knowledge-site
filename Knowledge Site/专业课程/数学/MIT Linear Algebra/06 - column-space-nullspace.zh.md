---
slug: "06-column-space-nullspace"
title: "列空间与零空间：矩阵产生的两个子空间"
summary: "列空间回答「哪些 b 有解」，零空间回答「哪些 x 被送到零」。前者由列向量张成，后者由齐次方程的解组成；两者都是子空间，而 Ax=b 的解集不是。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "column-space"
  - "nullspace"
  - "subspace"
sources:
  - kind: "video"
    title: "Lecture 6: Column Space and Nullspace"
    url: "https://www.youtube.com/watch?v=8o5Cmfpeo6g"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## 从子空间的两个判据说起

一个集合要成为子空间，只需满足两条：

1. 对加法封闭：$v,w$ 在集合里，则 $v+w$ 也在；
2. 对数乘封闭：$v$ 在集合里，则 $cv$ 也在。

合起来就是：**对线性组合封闭**。另外，这两条自动保证零向量在集合里（取 $c=0$）。

在 $R^3$ 中，子空间只有四类：整个空间、过原点的平面、过原点的直线、只含零向量。

### 并集不是子空间，交集是

取一个过原点的平面 $P$ 和一条不在平面内的过原点直线 $L$。

- $P\cup L$ **不是**子空间：从平面上取一个向量，从直线上取一个向量，相加后通常既不在平面上也不在直线上。
- $P\cap L$ **是**子空间：在这个例子里交集只有零向量，而 $\{\mathbf{0}\}$ 本身是子空间。

一般地，两个子空间的交集一定是子空间。设 $S,T$ 是子空间，$v,w\in S\cap T$：

- $v+w\in S$（因为 $S$ 是子空间），$v+w\in T$（因为 $T$ 是子空间），所以 $v+w\in S\cap T$；
- $cv\in S$ 且 $cv\in T$，所以 $cv\in S\cap T$。

交集是「同时满足两组要求」的集合，要求越多，集合越小，但仍然保持封闭。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 2:04 | 三维中的平面与直线 |
| 4:50 | 并集：把平面与直线放在一起 |
| 6:14 | 并集是否仍是子空间 |
| 7:21 | 交集是子空间 |
| 9:45 | 交集的封闭性验证 |
| 12:46 | $R^4$ 中的子空间 |
| 16:19 | $A\mathbf{x}=\mathbf{b}$ 是否总有解 |
| 26:22 | 哪些列可以扔掉而列空间不变 |
| 29:12 | 零空间的定义 |
| 31:10 | 求 $A$ 的零空间 |
| 32:55 | 零空间是向量空间 |
| 37:53 | 两个解相加仍在零空间 |
| 43:53 | 子空间必须过原点 |

## 列空间：由列向量张成

取

$$
A=
\begin{bmatrix}
1&1&2\\
2&1&3\\
3&1&4\\
4&1&5
\end{bmatrix}.
$$

这是 $4\times3$ 矩阵，三列都是 $R^4$ 中的向量：

$$
\mathbf{c}_1=\begin{bmatrix}1\\2\\3\\4\end{bmatrix},\quad
\mathbf{c}_2=\begin{bmatrix}1\\1\\1\\1\end{bmatrix},\quad
\mathbf{c}_3=\begin{bmatrix}2\\3\\4\\5\end{bmatrix}.
$$

**列空间** $C(A)$ 是这三列的所有线性组合：

$$
C(A)=\{x_1\mathbf{c}_1+x_2\mathbf{c}_2+x_3\mathbf{c}_3\mid x_1,x_2,x_3\in R\}.
$$

它是 $R^4$ 的子空间。为什么不是整个 $R^4$？因为三个向量最多张成三维；事实上这里连三维都不到，注意

$$
\mathbf{c}_3=\mathbf{c}_1+\mathbf{c}_2,
$$

所以第三列没有带来新方向。列空间实际上是 $R^4$ 中的一个**二维子空间**（一个过原点的平面）。

> **一句话总结：** 列空间就是「所有可能的 $A\mathbf{x}$」构成的集合；它的维度由真正独立的列的个数决定。

### 与 $A\mathbf{x}=\mathbf{b}$ 的关系

这是本讲最重要的连接：

$$
A\mathbf{x}=\mathbf{b}\ \text{有解}
\iff
\mathbf{b}\in C(A).
$$

理由很直接：$A\mathbf{x}$ 按定义就是列的组合，系数是 $\mathbf{x}$ 的分量。所以：

- 若 $\mathbf{b}$ 是列的组合，那组系数就是一个解；
- 若 $\mathbf{b}$ 不是列的组合，就不存在解。

对这个 $4\times3$ 矩阵，四个方程只有三个未知数，所以大多数 $\mathbf{b}$ 无解。但有解的 $\mathbf{b}$ 恰好构成列空间这个平面。

具体例子：

- $\mathbf{b}=[1,2,3,4]^T=\mathbf{c}_1$，解是 $(1,0,0)$；
- $\mathbf{b}=[1,1,1,1]^T=\mathbf{c}_2$，解是 $(0,1,0)$；
- 任意 $a\mathbf{c}_1+b\mathbf{c}_2$，解是 $(a,b,0)$。

## 零空间：被送到零的 $x$

同一个矩阵，换一个完全不同的子空间。**零空间** $N(A)$ 是所有满足

$$
A\mathbf{x}=\mathbf{0}
$$

的 $\mathbf{x}$ 组成的集合。

注意它装的是 $x$，不是 $b$。对这个 $4\times3$ 矩阵，$\mathbf{x}$ 有三个分量，所以 $N(A)$ 是 $R^3$ 的子空间。

### 求出这个例子的零空间

观察第三列等于前两列之和：

$$
\mathbf{c}_1+\mathbf{c}_2-\mathbf{c}_3=\mathbf{0}.
$$

所以

$$
\mathbf{x}=\begin{bmatrix}1\\1\\-1\end{bmatrix}
$$

是一个解。任何倍数也是解：

$$
N(A)=\left\{c\begin{bmatrix}1\\1\\-1\end{bmatrix}\ \middle|\ c\in R\right\}.
$$

几何上，这是 $R^3$ 中过原点的一条直线。

### 为什么零空间一定是子空间

设 $A\mathbf{v}=\mathbf{0}$，$A\mathbf{w}=\mathbf{0}$。则

$$
A(\mathbf{v}+\mathbf{w})=A\mathbf{v}+A\mathbf{w}=\mathbf{0}+\mathbf{0}=\mathbf{0},
$$

所以 $\mathbf{v}+\mathbf{w}$ 也在零空间。对数乘同理：

$$
A(c\mathbf{v})=cA\mathbf{v}=c\mathbf{0}=\mathbf{0}.
$$

这里用到矩阵乘法的分配律与数乘可交换。零空间因此对线性组合封闭，是子空间。

## 关键对比：$A\mathbf{x}=\mathbf{b}$ 的解集不是子空间

把右端换成 $\mathbf{b}=[1,2,3,4]^T$。它有一个解 $(1,0,0)$，还有另一个解 $(0,-1,1)$：

$$
0\cdot\mathbf{c}_1+(-1)\mathbf{c}_2+1\cdot\mathbf{c}_3
=-\mathbf{c}_2+\mathbf{c}_3
=\begin{bmatrix}1\\2\\3\\4\end{bmatrix}.
$$

但这个解集**不是**子空间，因为零向量不是解：$A\mathbf{0}=\mathbf{0}\neq\mathbf{b}$。

它的结构是「一个特解 + 零空间」：

$$
\mathbf{x}=
\begin{bmatrix}1\\0\\0\end{bmatrix}
+c\begin{bmatrix}1\\1\\-1\end{bmatrix}.
$$

几何上，这是 $R^3$ 中一条**不过原点**的直线。所有解构成零空间的一条平移，称为仿射集，而不是子空间。

> **补充：** 这也解释了为什么齐次方程 $A\mathbf{x}=\mathbf{0}$ 特别重要：只有它的解集包含原点，因而才可能是子空间；非齐次方程的解集是它的一次平移。

## 描述子空间的两种方式

这一讲给出了构造子空间的两种基本语言：

| 方式 | 例子 | 特征 |
| --- | --- | --- |
| 给出一组向量，取所有线性组合 | 列空间 | 「由内向外」张成 |
| 给出一组方程，取所有解 | 零空间 | 「由外向内」约束 |

- 列空间：告诉我几列，我取组合，得到一个子空间。
- 零空间：告诉我方程，我取解，得到一个子空间。

两种方式都会在后续课程中反复出现：列空间对应「像」，零空间对应「核」。

## 本讲结论

- 子空间对线性组合封闭，必含零向量。
- 两个子空间的交集仍是子空间；并集一般不是。
- 列空间 $C(A)$ 是列的所有组合，位于 $R^m$（$m$ 为行数）。
- $A\mathbf{x}=\mathbf{b}$ 有解当且仅当 $\mathbf{b}\in C(A)$。
- 零空间 $N(A)$ 是 $A\mathbf{x}=\mathbf{0}$ 的所有解，位于 $R^n$（$n$ 为列数）。
- 零空间是子空间；非齐次方程的解集不是，它是零空间的一次平移。
- 列数多于独立列数时，列空间维度下降；本例中第三列是前两列之和，列空间是二维的。

## 理解检验

**1. 证明两个子空间的交集是子空间，并给出并集不是子空间的反例。**

参考答案：设 $S,T$ 是子空间，$\mathbf{v},\mathbf{w}\in S\cap T$。由 $S$ 是子空间，$\mathbf{v}+\mathbf{w}\in S$；由 $T$ 是子空间，$\mathbf{v}+\mathbf{w}\in T$，所以 $\mathbf{v}+\mathbf{w}\in S\cap T$。数乘同理：$c\mathbf{v}\in S$ 且 $c\mathbf{v}\in T$。封闭性成立，交集是子空间（空集情形另论，通常指非空交集）。
并集的反例：在 $R^3$ 中取平面 $P=\{(x,y,0)\}$ 与直线 $L=\{(0,0,z)\}$。$\mathbf{u}=(1,0,0)\in P$，$\mathbf{w}=(0,0,1)\in L$，但
$$
\mathbf{u}+\mathbf{w}=(1,0,1),
$$
它的第三个分量不为 $0$，所以不在 $P$；第一个分量不为 $0$，所以不在 $L$。加法把向量带出了并集，因此 $P\cup L$ 不是子空间。

**2. 为什么本例的列空间不是整个 $R^4$？用「三个向量最多张成几维」回答。**

参考答案：$A$ 是 $4\times3$，只有三个列向量，三个向量最多张成三维，永远到不了四维的 $R^4$。本例更弱：第三列等于前两列之和，$\mathbf{c}_3=\mathbf{c}_1+\mathbf{c}_2$，所以真正独立的方向只有两个，列空间是一个二维子空间（$R^4$ 中过原点的平面）。因此绝大多数 $\mathbf{b}\in R^4$ 落在平面外，对应的方程无解。

**3. 写出本例的零空间，并验证 $\mathbf{c}_1+\mathbf{c}_2-\mathbf{c}_3=\mathbf{0}$。**

参考答案：验证列的组合：
$$
\begin{bmatrix}1\\2\\3\\4\end{bmatrix}+\begin{bmatrix}1\\1\\1\\1\end{bmatrix}-\begin{bmatrix}2\\3\\4\\5\end{bmatrix}
=\begin{bmatrix}1+1-2\\2+1-3\\3+1-4\\4+1-5\end{bmatrix}
=\begin{bmatrix}0\\0\\0\\0\end{bmatrix}.
$$
所以 $\mathbf{x}=(1,1,-1)^T$ 满足 $A\mathbf{x}=\mathbf{0}$，任何倍数也满足。零空间是
$$
N(A)=\left\{c\begin{bmatrix}1\\1\\-1\end{bmatrix}\ \middle|\ c\in R\right\},
$$
即 $R^3$ 中过原点的一条直线。

**4. 为什么 $A\mathbf{x}=\mathbf{b}$（$\mathbf{b}\ne\mathbf{0}$）的解集不是子空间？**

参考答案：子空间必须含零向量，而 $A\mathbf{0}=\mathbf{0}\ne\mathbf{b}$，所以零向量不是解，解集不含原点，直接出局。也可以从封闭性看：若 $\mathbf{x}_1,\mathbf{x}_2$ 都是解，则
$$
A(\mathbf{x}_1+\mathbf{x}_2)=\mathbf{b}+\mathbf{b}=2\mathbf{b}\ne\mathbf{b}
$$
（因为 $\mathbf{b}\ne\mathbf{0}$），两个解相加不再是解。所以解集对加法也不封闭。它的真实结构是「特解 + 零空间」，即零空间的一次平移。

**5. 已知一个特解与零空间，如何写出全部解？**

参考答案：设 $\mathbf{x}_p$ 是一个特解，$N(A)$ 是零空间，则全部解为
$$
\mathbf{x}=\mathbf{x}_p+\mathbf{x}_n,\qquad \mathbf{x}_n\in N(A).
$$
两个方向都要验证：一方面，$A(\mathbf{x}_p+\mathbf{x}_n)=\mathbf{b}+\mathbf{0}=\mathbf{b}$，所以每个这样的向量都是解；另一方面，若 $\mathbf{x}$ 也是解，则 $A(\mathbf{x}-\mathbf{x}_p)=\mathbf{b}-\mathbf{b}=\mathbf{0}$，即 $\mathbf{x}-\mathbf{x}_p\in N(A)$，所以它一定写成这种形式，没有遗漏。在本例中就是
$$
\mathbf{x}=\begin{bmatrix}1\\0\\0\end{bmatrix}+c\begin{bmatrix}1\\1\\-1\end{bmatrix}.
$$

## 与前后课的关系

这一讲定义了矩阵的两个核心子空间。下一讲用消元系统地求出零空间：主元列与自由列的分工，会给出零空间的一组「特殊解」，并由此得到维数公式。
