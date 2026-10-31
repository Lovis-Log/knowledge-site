---
slug: "07-ax-equals-zero"
title: "解 Ax = 0：主元变量、自由变量与特殊解"
summary: "消元把矩阵化为阶梯形；主元列的个数就是秩 r，剩下 n-r 个自由变量。给每个自由变量取 1、其余取 0，就得到零空间的一组特殊解。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "nullspace"
  - "rank"
  - "rref"
  - "special-solutions"
sources:
  - kind: "video"
    title: "Lecture 7: Solving Ax = 0: Pivot Variables, Special Solutions"
    url: "https://www.youtube.com/watch?v=VqP2tREMvt0"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## 从定义到算法

上一讲定义了零空间 $N(A)=\{\mathbf{x}\mid A\mathbf{x}=\mathbf{0}\}$，但没有说怎么把它算出来。这一讲给出算法，核心是消元。

一个关键事实：**消元不改变零空间**。行交换、某行减去另一行的倍数，都是合法的方程变换，解集不变。但消元会改变列空间——这一点要记清楚。

## 例子：一个 $3\times4$ 矩阵

$$
A=
\begin{bmatrix}
1&2&2&2\\
2&4&6&8\\
3&6&8&10
\end{bmatrix}.
$$

先观察：

- 第二列是第一列的 $2$ 倍，不独立；
- 第三行是第一行与第二行之和，行之间也不独立。

这些都应该由消元自动发现。

### 消元

**第一步**：用第一个主元 $1$ 消去下方。

$$
\begin{aligned}
R_2 &\leftarrow R_2-2R_1=[0,0,2,4],\\
R_3 &\leftarrow R_3-3R_1=[0,0,2,4].
\end{aligned}
$$

**第二步**：第二列的主元位置是 $0$，下面也是 $0$，这一列没有主元。不停下，直接看第三列。

第三列在第二行的值是 $2$，这就是第二个主元。用 $R_3\leftarrow R_3-R_2$ 消去下方：

$$
R_3=[0,0,2,4]-[0,0,2,4]=[0,0,0,0].
$$

得到阶梯形

$$
U=
\begin{bmatrix}
1&2&2&2\\
0&0&2&4\\
0&0&0&0
\end{bmatrix}.
$$

一共只有 **两个主元**。这个数叫矩阵的**秩**：

$$
r=\text{主元个数}=2.
$$

第三行变成全零，说明原来的第三行是前两行的线性组合。

### 主元列与自由列

- 主元在第 1、3 列 → $x_1,x_3$ 是**主元变量**；
- 第 2、4 列没有主元 → $x_2,x_4$ 是**自由变量**。

自由变量的个数是

$$
n-r=4-2=2.
$$

「自由」的意思是：可以任意赋值，剩下的主元变量由方程唯一确定。

> **一句话总结：** 消元找到 $r$ 个真正独立的方程；剩下 $n-r$ 个方向可以自由选择，它们张成零空间。

## 特殊解：给自由变量取 1 和 0

### 第一个特殊解：$x_2=1,\ x_4=0$

$U\mathbf{x}=\mathbf{0}$ 写回方程：

$$
\begin{aligned}
x_1+2x_2+2x_3+2x_4 &= 0,\\
2x_3+4x_4 &= 0.
\end{aligned}
$$

代入 $x_2=1,\ x_4=0$：

第二式给出 $2x_3=0$，所以 $x_3=0$。

第一式给出 $x_1+2=0$，所以 $x_1=-2$。

$$
\mathbf{s}_1=\begin{bmatrix}-2\\1\\0\\0\end{bmatrix}.
$$

它说的正是「第二列是第 1 列的 2 倍」：$-2\mathbf{c}_1+\mathbf{c}_2=\mathbf{0}$。

### 第二个特殊解：$x_2=0,\ x_4=1$

第二式：$2x_3+4=0$，所以 $x_3=-2$。

第一式：$x_1+2(-2)+2(1)=0$，所以 $x_1=2$。

$$
\mathbf{s}_2=\begin{bmatrix}2\\0\\-2\\1\end{bmatrix}.
$$

验证它对应列的关系：

$$
2\mathbf{c}_1-2\mathbf{c}_3+\mathbf{c}_4=\mathbf{0}.
$$

### 整个零空间

$$
N(A)=\left\{c_1\begin{bmatrix}-2\\1\\0\\0\end{bmatrix}
+c_2\begin{bmatrix}2\\0\\-2\\1\end{bmatrix}
\ \middle|\ c_1,c_2\in R\right\}.
$$

这是 $R^4$ 中的一个二维子空间。两个特殊解就是它的一组基。

## 化简到最简行阶梯形 $R$

阶梯形 $U$ 已经够用，但还可以继续化简，得到**最简行阶梯形**（reduced row echelon form, rref）：

1. 用向上消元把主元上方的元素也清零；
2. 把每个主元除以自身，使主元变成 $1$。

对本例：

- $R_1\leftarrow R_1-R_2$：第一行变成 $[1,2,0,-2]$；
- $R_2\leftarrow R_2/2$：第二行变成 $[0,0,1,2]$。

$$
R=
\begin{bmatrix}
1&2&0&-2\\
0&0&1&2\\
0&0&0&0
\end{bmatrix}.
$$

$R$ 的结构非常规整：

- 主元行列交叉处是一个单位矩阵；
- 其余非零部分 $F$ 位于自由列；
- 下方是零行。

$$
R=\begin{bmatrix}I&F\\0&0\end{bmatrix},
\qquad
F=\begin{bmatrix}2&-2\\0&2\end{bmatrix}.
$$

### 从 $R$ 直接读出零空间

把 $R\mathbf{x}=\mathbf{0}$ 按块写：

$$
\begin{bmatrix}I&F\end{bmatrix}
\begin{bmatrix}\mathbf{x}_{\text{pivot}}\\ \mathbf{x}_{\text{free}}\end{bmatrix}
=\mathbf{0}.
$$

即

$$
\mathbf{x}_{\text{pivot}}+F\mathbf{x}_{\text{free}}=\mathbf{0}
\;\Longrightarrow\;
\mathbf{x}_{\text{pivot}}=-F\mathbf{x}_{\text{free}}.
$$

如果给自由变量取单位矩阵的值（第一个取 $1$、其余取 $0$，然后轮换），就得到**零空间矩阵**

$$
N=\begin{bmatrix}-F\\ I\end{bmatrix}
=
\begin{bmatrix}
-2&2\\
1&0\\
0&-2\\
0&1
\end{bmatrix}.
$$

两列正是前面求出的 $\mathbf{s}_1,\mathbf{s}_2$。所以「特殊解」不是技巧，而是把 $-F$ 搬到了主元变量的位置。

## 第二个例子：转置矩阵

取

$$
A^T=
\begin{bmatrix}
1&2&3\\
2&4&6\\
2&6&8\\
2&8&10
\end{bmatrix}.
$$

这是 $4\times3$，$x$ 只有三个分量。

预期：前两列独立，第三列等于前两列之和，所以秩仍然是 $2$，自由变量 $3-2=1$ 个。

### 消元

第一个主元 $1$：

$$
R_2-2R_1=[0,0,0],\quad
R_3-2R_1=[0,2,2],\quad
R_4-2R_1=[0,4,4].
$$

第二列的主元位置是 $0$，但下面有 $2$，于是交换第二、三行：

$$
\begin{bmatrix}
1&2&3\\
0&2&2\\
0&0&0\\
0&4&4
\end{bmatrix}.
$$

再用第二行消去第四行：$R_4-2R_2=[0,0,0]$。得到

$$
U=
\begin{bmatrix}
1&2&3\\
0&2&2\\
0&0&0\\
0&0&0
\end{bmatrix},
\qquad r=2.
$$

主元列是 1、2，自由列是 3。

### 零空间

令 $x_3=1$。第二式：

$$
2x_2+2=0 \;\Longrightarrow\; x_2=-1.
$$

第一式：

$$
x_1+2(-1)+3=0 \;\Longrightarrow\; x_1=-1.
$$

$$
N(A^T)=\left\{c\begin{bmatrix}-1\\-1\\1\end{bmatrix}\ \middle|\ c\in R\right\}.
$$

这是一条直线。

### 化简到 $R$

用第一行减去第二行，再把第二行除以 $2$：

$$
R=
\begin{bmatrix}
1&0&1\\
0&1&1\\
0&0&0\\
0&0&0
\end{bmatrix}
=\begin{bmatrix}I&F\\0&0\end{bmatrix},
\qquad
F=\begin{bmatrix}1\\1\end{bmatrix}.
$$

零空间矩阵是

$$
N=\begin{bmatrix}-F\\I\end{bmatrix}
=\begin{bmatrix}-1\\-1\\1\end{bmatrix}.
$$

## 秩的一个基本事实

$A$ 与 $A^T$ 的秩相同。本例中原来 $A$ 是 $3\times4$、秩 $2$；$A^T$ 是 $4\times3$、秩仍是 $2$。

秩等于主元个数，也等于列空间中独立方向的个数。这个数会在下一讲与四个基本子空间一起被完整解释。

## 本讲结论

- 消元不改变零空间，但会改变列空间。
- 秩 $r$ = 主元个数 = 主元列数。
- 自由变量有 $n-r$ 个；每个自由变量对应一个特殊解。
- 特殊解的做法：一个自由变量取 $1$，其余取 $0$，再回代求主元变量。
- 零空间是所有特殊解的线性组合，维数为 $n-r$。
- 最简行阶梯形 $R=[I\ F;0\ 0]$，零空间矩阵直接是 $[-F;I]$。
- $A$ 与 $A^T$ 的秩相同。

## 理解检验

1. 对第一个例子，写出秩、主元列、自由列，并解释第三行为什么会变成零行。
2. 用 $R$ 的块结构推导零空间矩阵 $[-F;I]$。
3. 第二个例子中，为什么交换行之后秩仍然是 $2$？
4. 如果 $A$ 是 $5\times7$ 且秩为 $3$，零空间的维数是多少？
5. 为什么「消元不改变零空间」但「消元改变列空间」？各举一个具体变化。

## 与前后课的关系

这一讲给出了零空间的完整算法。下一讲处理 $A\mathbf{x}=\mathbf{b}$：先用消元判断是否有解，再写出「特解 + 零空间」的全部解，并引出四个基本子空间。
