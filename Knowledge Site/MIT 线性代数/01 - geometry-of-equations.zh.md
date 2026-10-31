---
slug: "01-geometry-of-equations"
title: "线性方程组的三种视角：行、列与矩阵"
summary: "同一个方程组可以看成相交的直线、列向量的线性组合，或一个线性映射。列图像是能推广到任意维度的那个。"
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "column-picture"
  - "linear-combination"
sources:
  - kind: "video"
    title: "Lecture 1: The Geometry of Linear Equations"
    url: "https://www.youtube.com/watch?v=J7DzL2_Na80"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## 这一讲的主线

线性代数的根本问题是解线性方程组。Strang 用同一个 $2\times 2$ 例子，从三个角度反复看它：

1. **行图像**：一次看一个方程，每个方程是一条直线，解是交点。
2. **列图像**：一次看一列，解是「用多少倍各列相加能得到右端向量」。
3. **矩阵形式**：把整个系统写成 $A\mathbf{x}=\mathbf{b}$。

三者是同一件事的三种语言。行图像最直观，列图像最能推广，矩阵形式最适合计算。

## 例子与矩阵

取方程组

$$
\begin{aligned}
2x - y &= 0,\\
-x + 2y &= 3.
\end{aligned}
$$

系数矩阵、未知向量和右端向量分别是

$$
A=\begin{bmatrix}2 & -1\\ -1 & 2\end{bmatrix},\qquad
\mathbf{x}=\begin{bmatrix}x\\ y\end{bmatrix},\qquad
\mathbf{b}=\begin{bmatrix}0\\ 3\end{bmatrix}.
$$

于是方程组就是 $A\mathbf{x}=\mathbf{b}$。

## 行图像：两条直线的交点

第一个方程 $2x-y=0$ 过原点：取 $x=0$ 得 $y=0$，取 $x=1$ 得 $y=2$，两点确定直线。

第二个方程 $-x+2y=3$ 不过原点：取 $y=0$ 得 $x=-3$，取 $x=-1$ 得 $y=1$。

两条直线交于 $(1,2)$。代回检验：

$$
2(1)-2=0,\qquad -(1)+2(2)=3.
$$

行图像在二维里非常清楚。但到了三维，每个方程是一个平面，三个平面交于一点；再高维就连画都画不出来。**行图像好懂，但不好推广。**

## 列图像：列的线性组合

把方程组按列拆开：

$$
x\begin{bmatrix}2\\ -1\end{bmatrix}+y\begin{bmatrix}-1\\ 2\end{bmatrix}
=\begin{bmatrix}0\\ 3\end{bmatrix}.
$$

问题变成：用多少倍的列 1 加上多少倍的列 2，能得到 $\mathbf{b}$？

在这个例子里，答案已经知道了：$x=1,\ y=2$。验证：

$$
1\begin{bmatrix}2\\ -1\end{bmatrix}+2\begin{bmatrix}-1\\ 2\end{bmatrix}
=\begin{bmatrix}2-2\\ -1+4\end{bmatrix}
=\begin{bmatrix}0\\ 3\end{bmatrix}.
$$

几何上，从原点出发沿 $[2,-1]$ 走一份，再沿 $[-1,2]$ 走两份，终点正好是 $(0,3)$。这就是**线性组合**：把若干向量分别乘上系数再相加。Strang 说这是整门课最基本的运算。

### 「所有组合能到达哪里」

如果让 $x,y$ 取遍所有实数，这两个列向量的所有线性组合会填满整个平面。也就是说，对这个矩阵而言，**任何**右端向量 $\mathbf{b}$ 都能被表示出来。这个问题会在后面反复出现，它的名字叫「列空间是否等于整个空间」。

## 三维例子：平面与三列

$$
\begin{aligned}
2x-y &= 0,\\
-x+2y-z &= -1,\\
-3y+4z &= 4.
\end{aligned}
$$

矩阵与右端向量为

$$
A=\begin{bmatrix}
2 & -1 & 0\\
-1 & 2 & -1\\
0 & -3 & 4
\end{bmatrix},\qquad
\mathbf{b}=\begin{bmatrix}0\\ -1\\ 4\end{bmatrix}.
$$

### 行图像

每一行是一个平面：

- 第一行 $2x-y=0$ 与 $z$ 无关，是一个竖直的平面；
- 第二行 $-x+2y-z=-1$ 是另一个平面；
- 第三行 $-3y+4z=4$ 也是一个平面。

两个平面交于一条直线，第三个平面再与这条直线交于一点。三个平面「位置正常」时，交点唯一，就是方程组的解。

Strang 没有真的画出交点，因为三维图已经很难看清。他要说明的是：**行图像在三维里开始失效**。

### 列图像

把方程组写成三列的组合：

$$
x\begin{bmatrix}2\\ -1\\ 0\end{bmatrix}
+y\begin{bmatrix}-1\\ 2\\ -3\end{bmatrix}
+z\begin{bmatrix}0\\ -1\\ 4\end{bmatrix}
=\begin{bmatrix}0\\ -1\\ 4\end{bmatrix}.
$$

注意到右端向量恰好等于第三列。所以取 $x=0,\ y=0,\ z=1$ 即可。代回：

$$
0\cdot\begin{bmatrix}2\\ -1\\ 0\end{bmatrix}
+0\cdot\begin{bmatrix}-1\\ 2\\ -3\end{bmatrix}
+1\cdot\begin{bmatrix}0\\ -1\\ 4\end{bmatrix}
=\begin{bmatrix}0\\ -1\\ 4\end{bmatrix}.
$$

解是 $(0,0,1)$。这个例子是特意构造的，好让答案一眼可见；真实问题要靠下一讲的消元法。

### 换一个右端向量

保持 $A$ 不变，把 $\mathbf{b}$ 换成前两列之和：

$$
\mathbf{b}'=\begin{bmatrix}2\\ -1\\ 0\end{bmatrix}+\begin{bmatrix}-1\\ 2\\ -3\end{bmatrix}
=\begin{bmatrix}1\\ 1\\ -3\end{bmatrix}.
$$

此时显然取 $x=1,\ y=1,\ z=0$。行图像上是三个新的平面交于新的一点；列图像上是同样的三列，换了一组系数。

**同一个矩阵，不同的 $\mathbf{b}$，就是不同的组合问题。**

## 核心问题：是否对每个 $\mathbf{b}$ 都有解

Strang 把这一讲的重心落在一个问题上：

> 对任意右端向量 $\mathbf{b}$，$A\mathbf{x}=\mathbf{b}$ 都有解吗？

用列图像翻译，就是：

> 这些列向量的所有线性组合，能否填满整个空间？

这两个问法完全等价，因为 $A\mathbf{x}$ 按定义就是「以 $\mathbf{x}$ 的分量为系数，对 $A$ 的列做线性组合」。

对这个 $3\times 3$ 例子，答案是肯定的，因为三列不共面，它们的组合能到达三维空间中的每一点。这样的矩阵叫**非奇异**或**可逆**矩阵。

### 什么时候会失败

如果三列都落在同一个平面里，它们的任何线性组合也都在那个平面里。此时：

- 落在平面内的 $\mathbf{b}$ 有解；
- 平面外的 $\mathbf{b}$ 无解。

最典型的退化情形是第三列等于前两列之和：它没有带来任何新方向。这样的矩阵是**奇异**的，不可逆。

同样的直觉可以推到九维：九个向量张成的组合可能填满九维空间，也可能只填满其中一个八维「平面」。随机选一个 $9\times 9$ 矩阵，几乎必然是满秩的；但如果第九列恰好等于第八列，就有一个方向永远到不了。

## 矩阵乘向量：两种算法，一个含义

最后 Strang 回到 $A\mathbf{x}$ 本身，用例子说明两种乘法：

$$
\begin{bmatrix}2 & 5\\ 1 & 3\end{bmatrix}
\begin{bmatrix}1\\ 2\end{bmatrix}
=?
$$

### 按列做：线性组合

$$
1\begin{bmatrix}2\\ 1\end{bmatrix}+2\begin{bmatrix}5\\ 3\end{bmatrix}
=\begin{bmatrix}2\\ 1\end{bmatrix}+\begin{bmatrix}10\\ 6\end{bmatrix}
=\begin{bmatrix}12\\ 7\end{bmatrix}.
$$

这正是列图像：$A\mathbf{x}$ 是 $A$ 的各列以 $\mathbf{x}$ 的分量为权重的线性组合。

### 按行做：点积

第一行与 $\mathbf{x}$ 做点积：

$$
2\cdot 1+5\cdot 2=12.
$$

第二行与 $\mathbf{x}$ 做点积：

$$
1\cdot 1+3\cdot 2=7.
$$

两种算法结果相同。Strang 的建议是：**计算时按行，理解时按列**。后面讲列空间、秩、四个基本子空间时，列的观点会成为主线。

## 本讲结论

- 解方程组有三种等价视角：行（直线/平面相交）、列（列的线性组合）、矩阵（$A\mathbf{x}=\mathbf{b}$）。
- 列图像是能推广到高维的那个视角。
- $A\mathbf{x}$ 的定义就是「$A$ 的列的线性组合」。
- 「对每个 $\mathbf{b}$ 都有解」等价于「列的组合填满整个空间」。
- 列向量共面（线性相关）时矩阵奇异，存在无法到达的 $\mathbf{b}$。
- 具体求解要靠下一讲的消元法，而不是靠观察。

## 理解检验

1. 对上面的 $2\times 2$ 例子，分别用行图像和列图像解释解 $(1,2)$ 的含义。
2. 为什么「三列共面」会导致有 $\mathbf{b}$ 无解？请用线性组合的语言回答。
3. 计算 $\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix}\begin{bmatrix}2\\ 1\end{bmatrix}$，并分别用按行、按列两种方式写出过程。
4. 随机 $9\times 9$ 矩阵几乎总是可逆的，这句话和「第九列等于第八列时不可逆」矛盾吗？

## 与前后课的关系

这一讲建立了语言：行、列、线性组合、奇异。下一讲用消元法给出系统求解的算法，并说明消元在什么情况下会失败——那正是矩阵奇异的计算表现。
