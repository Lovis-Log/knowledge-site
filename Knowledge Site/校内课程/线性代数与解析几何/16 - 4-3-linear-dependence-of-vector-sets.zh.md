---
slug: "4-3-linear-dependence-of-vector-sets"
title: "4.3 向量组的线性相关性"
summary: "向量组线性相关与线性无关的判定。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "4.3"
tags:
  - "线性代数"
---

线性表示回答"一个向量能否由一组向量拼出来"，线性相关回答"这组向量里有没有多余的"。两者最终都归结为解线性方程组，因而都可以用秩来判定。本节的定义、定理是第 4 章后续内容（基、秩、解的结构）的全部基础。

## 一、向量的线性表示

**定义 3.1** 设 $\alpha_1,\alpha_2,\dots,\alpha_m,\beta$ 都是 $n$ 维向量。若存在数 $k_1,k_2,\dots,k_m$，使得

$$
\beta=k_1\alpha_1+k_2\alpha_2+\cdots+k_m\alpha_m,
$$

则称 $\beta$ 可由 $\alpha_1,\alpha_2,\dots,\alpha_m$ **线性表示**，或称 $\beta$ 是 $\alpha_1,\alpha_2,\dots,\alpha_m$ 的一个**线性组合**，$k_1,k_2,\dots,k_m$ 称为**组合系数**。

**表示方式不一定唯一**。例如取

$$
\alpha_1=(1,0,0),\quad \alpha_2=(1,1,0),\quad \alpha_3=(0,1,0),\quad \beta=(2,2,0),
$$

则

$$
\beta=1\cdot\alpha_1+0\cdot\alpha_2+1\cdot\alpha_3
=0\cdot\alpha_1+2\cdot\alpha_2+0\cdot\alpha_3,
$$

两组系数都成立。原因在于 $\alpha_1,\alpha_2,\alpha_3$ 之间存在关系 $\alpha_1+\alpha_2-\alpha_3=0$，即这组向量"有多余的"，系数可以互相调配而不改变结果。

**基本单位向量**：设

$$
\varepsilon_1=(1,0,\dots,0),\quad
\varepsilon_2=(0,1,\dots,0),\quad \dots,\quad
\varepsilon_n=(0,0,\dots,1).
$$

$\mathbb{R}^{n}$ 中任一向量 $\alpha=(a_1,a_2,\dots,a_n)$ 都可由它们线性表示，且表示唯一：

$$
\alpha=a_1\varepsilon_1+a_2\varepsilon_2+\cdots+a_n\varepsilon_n.
$$

唯一的根源是 $\varepsilon_1,\dots,\varepsilon_n$ 之间没有任何线性关系，每个分量只能由对应的单位向量提供。

**例** 证明 $\alpha=(-1,1,5)$ 是 $\alpha_1=(1,2,3)$、$\alpha_2=(0,1,4)$、$\alpha_3=(2,3,6)$ 的线性组合。

证明：设 $\alpha=k_1\alpha_1+k_2\alpha_2+k_3\alpha_3$，即

$$
(-1,1,5)=k_1(1,2,3)+k_2(0,1,4)+k_3(2,3,6).
$$

比较分量得方程组

$$
\begin{cases}
k_1+2k_3=-1,\\
2k_1+k_2+3k_3=1,\\
3k_1+4k_2+6k_3=5.
\end{cases}
$$

解得 $k_1=1,\ k_2=2,\ k_3=-1$，故

$$
\alpha=\alpha_1+2\alpha_2-\alpha_3,
$$

且由后面的判别法知表示唯一。

### 线性表示就是解方程组

把 $k_1\alpha_1+\cdots+k_m\alpha_m=\beta$ 按分量写开，就是

$$
\begin{cases}
a_{11}k_1+a_{12}k_2+\cdots+a_{1m}k_m=b_1,\\
a_{21}k_1+a_{22}k_2+\cdots+a_{2m}k_m=b_2,\\
\qquad\cdots\\
a_{n1}k_1+a_{n2}k_2+\cdots+a_{nm}k_m=b_n.
\end{cases}
$$

写成矩阵形式：

$$
(\alpha_1,\alpha_2,\dots,\alpha_m)\begin{pmatrix}k_1\\k_2\\\vdots\\k_m\end{pmatrix}=\beta,
$$

其中 $\alpha_i$ 作为列向量排在第 $i$ 列。于是

> **线性表示问题 $\iff$ 线性方程组是否有解的问题。**

因此有判别法：

- $\beta$ 可由 $\alpha_1,\dots,\alpha_m$ 线性表示 $\iff$ 方程组有解 $\iff$

$$
r(\alpha_1,\alpha_2,\dots,\alpha_m)=r(\alpha_1,\alpha_2,\dots,\alpha_m,\beta);
$$

- 表示**唯一** $\iff$ 方程组有唯一解 $\iff$

$$
r(\alpha_1,\dots,\alpha_m,\beta)=r(\alpha_1,\dots,\alpha_m)=m.
$$

这里 $m$ 是向量的个数，也就是未知量的个数。若秩等于 $m$，系数矩阵的列向量线性无关，齐次部分只有零解，故解唯一。

**例** 设

$$
\alpha_1=(1,3,1)^{T},\quad \alpha_2=(-1,1,3)^{T},\quad \alpha_3=(-5,-4,3)^{T},\quad \beta=(2,-1,3)^{T},
$$

问 $\beta$ 可否由 $\alpha_1,\alpha_2,\alpha_3$ 线性表示？

解：把 $\alpha_1,\alpha_2,\alpha_3,\beta$ 按列排成矩阵，只用**行**变换化阶梯形（列变换会改变列之间的线性关系，不能用）：

$$
(\alpha_1,\alpha_2,\alpha_3,\beta)=\begin{pmatrix}
1 & -1 & -5 & 2\\
3 & 1 & -4 & -1\\
1 & 3 & 3 & 3
\end{pmatrix}
\xrightarrow[r_3-r_1]{r_2-3r_1}
\begin{pmatrix}
1 & -1 & -5 & 2\\
0 & 4 & 11 & -7\\
0 & 4 & 8 & 1
\end{pmatrix}
$$

$$
\xrightarrow{r_3-r_2}
\begin{pmatrix}
1 & -1 & -5 & 2\\
0 & 4 & 11 & -7\\
0 & 0 & -3 & 8
\end{pmatrix}.
$$

阶梯形有 3 个非零行，故

$$
r(\alpha_1,\alpha_2,\alpha_3)=r(\alpha_1,\alpha_2,\alpha_3,\beta)=3,
$$

$\beta$ 可被线性表示，且表示唯一。回代：由 $-3x_3=8$ 得 $x_3=-\dfrac83$；由 $4x_2+11x_3=-7$ 得

$$
x_2=\frac{-7+\frac{88}{3}}{4}=\frac{67}{12};
$$

由 $x_1-x_2-5x_3=2$ 得

$$
x_1=2+x_2+5x_3=2+\frac{67}{12}-\frac{40}{3}=-\frac{69}{12}.
$$

故

$$
\beta=-\frac{69}{12}\alpha_1+\frac{67}{12}\alpha_2-\frac83\alpha_3.
$$

（课件把 $x_2$ 写成了 $\frac{87}{12}$，按回代应为 $\frac{67}{12}$，代入验算可知后者正确。）

**注意**：判断线性表示时只能作行变换。因为行变换对应方程组的同解变形，不改变"列向量之间能否线性表示"这一事实；列变换相当于换未知量，会破坏原来的对应关系。

## 二、向量组之间的线性表示与等价

**定义 3.2** 若向量组 $A:\alpha_1,\alpha_2,\dots,\alpha_t$ 中每个向量 $\alpha_i$ 都可经向量组 $B:\beta_1,\beta_2,\dots,\beta_s$ 线性表示，则称向量组 $A$ 可以经向量组 $B$ **线性表出**。

**定义 3.3** 若向量组 $A$ 可经 $B$ 线性表出，且 $B$ 也可经 $A$ 线性表出，则称这两个向量组**等价**。

向量组的等价满足反身性、对称性、传递性。它与矩阵等价（2.3 节）不是同一个概念：矩阵等价指经初等变换互化，向量组等价指能互相线性表示；但两者都由"秩"刻画（4.5 节）。

## 三、线性相关与线性无关

**定义 3.4** 设 $n$ 维向量组 $A:\alpha_1,\alpha_2,\dots,\alpha_m$。

1. 若存在**一组不全为零**的数 $k_1,k_2,\dots,k_m$，使得

$$
k_1\alpha_1+k_2\alpha_2+\cdots+k_m\alpha_m=0,
$$

则称向量组 $A$ **线性相关**；

2. 若

$$
k_1\alpha_1+k_2\alpha_2+\cdots+k_m\alpha_m=0
$$

当且仅当 $k_1=k_2=\cdots=k_m=0$ 时成立，则称向量组 $A$ **线性无关**。

直观理解：线性相关意味着"某个向量能由其余向量表示"，这组向量有冗余；线性无关意味着"谁也表示不了谁"，每个向量都贡献了新方向。

**由定义直接得到的性质**：

1. 两个非零向量 $\alpha_1,\alpha_2$ 线性相关 $\iff$ 存在 $k\neq 0$ 使 $\alpha_1=k\alpha_2$ $\iff$ $\alpha_1\parallel\alpha_2$ $\iff$ 对应分量成比例。
2. 含有零向量的向量组一定线性相关。因为取零向量前的系数为 $1$、其余为 $0$，就得到一组不全为零的系数使组合为零。

**例 1** 考察 $n$ 维向量组

$$
\varepsilon_1=(1,0,\dots,0),\quad \varepsilon_2=(0,1,\dots,0),\quad \dots,\quad \varepsilon_n=(0,0,\dots,1)
$$

的线性相关性。

解：设 $\lambda_1\varepsilon_1+\lambda_2\varepsilon_2+\cdots+\lambda_n\varepsilon_n=0$，即

$$
(\lambda_1,0,\dots,0)+(0,\lambda_2,\dots,0)+\cdots+(0,0,\dots,\lambda_n)
=(\lambda_1,\lambda_2,\dots,\lambda_n)=(0,0,\dots,0).
$$

故 $\lambda_1=\lambda_2=\cdots=\lambda_n=0$，$\varepsilon_1,\varepsilon_2,\dots,\varepsilon_n$ 线性无关。

**例 2** 讨论 $\alpha_1=(1,-1,1)$、$\alpha_2=(2,0,-2)$、$\alpha_3=(2,-1,0)$ 的线性相关性。

解：设 $\lambda_1\alpha_1+\lambda_2\alpha_2+\lambda_3\alpha_3=0$，按分量得

$$
\begin{cases}
\lambda_1+2\lambda_2+2\lambda_3=0,\\
-\lambda_1-\lambda_3=0,\\
\lambda_1-2\lambda_2=0.
\end{cases}
$$

由第三式 $\lambda_1=2\lambda_2$，由第二式 $\lambda_3=-\lambda_1=-2\lambda_2$，代入第一式得 $0=0$，说明有非零解。取 $\lambda_2=1$，得

$$
\lambda_1=2,\quad \lambda_2=1,\quad \lambda_3=-2,
$$

即 $2\alpha_1+\alpha_2-2\alpha_3=0$，故向量组线性相关。这里第三式并没有给出 $\lambda_3$ 的新限制，方程组"少了一个有效方程"，正是线性相关的表现。

### 秩判别法

把 $k_1\alpha_1+\cdots+k_m\alpha_m=0$ 看成以 $k_1,\dots,k_m$ 为未知量的**齐次**线性方程组，其系数矩阵的列就是各向量：

$$
(\alpha_1,\alpha_2,\dots,\alpha_m)\begin{pmatrix}k_1\\k_2\\\vdots\\k_m\end{pmatrix}=0.
$$

于是

$$
r(\alpha_1,\alpha_2,\dots,\alpha_m)=m
\iff \text{只有零解}
\iff \alpha_1,\dots,\alpha_m\ \text{线性无关},
$$

$$
r(\alpha_1,\alpha_2,\dots,\alpha_m)<m
\iff \text{有非零解}
\iff \alpha_1,\dots,\alpha_m\ \text{线性相关}.
$$

用矩阵语言说：**一组线性无关的向量排成的矩阵，其秩恰好等于向量的个数。**

**例 1（用秩重做）** $(\varepsilon_1^{T},\varepsilon_2^{T},\dots,\varepsilon_n^{T})=E_n$，显然 $r(E_n)=n$，故 $\varepsilon_1,\dots,\varepsilon_n$ 线性无关。

**例 2（用秩重做）**

$$
(\alpha_1^{T},\alpha_2^{T},\alpha_3^{T})=\begin{pmatrix}
1 & 2 & 2\\
-1 & 0 & -1\\
1 & -2 & 0
\end{pmatrix}
\xrightarrow[r_3+r_2]{r_2+r_1}
\begin{pmatrix}
1 & 2 & 2\\
0 & 2 & 1\\
0 & -2 & -1
\end{pmatrix}
\xrightarrow{r_3+r_2}
\begin{pmatrix}
1 & 2 & 2\\
0 & 2 & 1\\
0 & 0 & 0
\end{pmatrix},
$$

故 $r=2<3$，向量组线性相关。与定义法结论一致，但不必解方程，计算更省。

**一个常用推论**：$\mathbb{R}^{n}$ 中任意 $m>n$ 个向量必线性相关。因为这 $m$ 个向量排成的矩阵只有 $n$ 行，秩 $r\leq n<m$。即"向量个数超过维数时必有冗余"。

## 四、三个基本定理

**定理 3.1** 向量组 $\alpha_1,\alpha_2,\dots,\alpha_m$ 线性相关的充要条件是：其中**至少有一个向量**可由其余向量线性表示。

**证明**：

充分性。设 $\alpha_1$ 可由其余向量表示：$\alpha_1=c_2\alpha_2+\cdots+c_m\alpha_m$，则

$$
-1\cdot\alpha_1+c_2\alpha_2+\cdots+c_m\alpha_m=0,
$$

系数 $-1,c_2,\dots,c_m$ 不全为零，故线性相关。

必要性。设存在不全为零的 $k_1,\dots,k_m$ 使 $k_1\alpha_1+\cdots+k_m\alpha_m=0$。不妨设 $k_1\neq 0$，则

$$
\alpha_1=\left(-\frac{k_2}{k_1}\right)\alpha_2+\left(-\frac{k_3}{k_1}\right)\alpha_3+\cdots+\left(-\frac{k_m}{k_1}\right)\alpha_m,
$$

即 $\alpha_1$ 可由其余向量表示。若 $k_1=0$，换一个系数非零的向量作同样的推导即可。

**定理 3.2**

- 若向量组中**部分向量线性相关**，则整个向量组**线性相关**；
- 若整个向量组**线性无关**，则**任意部分向量**都线性无关。

**证明**：设部分组 $\alpha_1,\dots,\alpha_k\ (k<m)$ 线性相关，则存在不全为零的 $c_1,\dots,c_k$ 使

$$
c_1\alpha_1+\cdots+c_k\alpha_k=0.
$$

两边补上零系数：

$$
c_1\alpha_1+\cdots+c_k\alpha_k+0\alpha_{k+1}+\cdots+0\alpha_m=0,
$$

系数 $c_1,\dots,c_k,0,\dots,0$ 仍不全为零，故整个向量组线性相关。后半句是前半句的逆否命题。

这条定理的实用形式是："整体无关 $\Rightarrow$ 部分无关"，"部分相关 $\Rightarrow$ 整体相关"。也就是说，向量组越长越容易相关，越短越容易无关。

**定理 3.3**

- 若 $n$ 维向量组线性无关，则在每个向量上**添加一个分量**得到的 $n+1$ 维向量组仍线性无关；
- 若 $n$ 维向量组线性相关，则每个向量都**减去一个分量**得到的 $n-1$ 维向量组仍线性相关。

简记为：**加长线性无关组仍无关，缩短线性相关组仍相关**。

**理解**：设 $\alpha_1,\dots,\alpha_m$ 无关。若加长后的向量组存在不全为零的系数使组合为零，那么只看前 $n$ 个分量，就得到原向量组的一组同样的零组合，与无关性矛盾。反之，若原向量组相关，缩短后若变成无关，则把缩短的组加长（补回分量）应仍无关，与"原组相关"矛盾。

### 例：由已知无关组构造新无关组

**例** 已知向量组 $\alpha_1,\alpha_2,\alpha_3$ 线性无关，且

$$
\beta_1=\alpha_1+\alpha_2,\quad \beta_2=\alpha_2+\alpha_3,\quad \beta_3=\alpha_3+\alpha_1,
$$

证明 $\beta_1,\beta_2,\beta_3$ 线性无关。

证明：设 $k_1\beta_1+k_2\beta_2+k_3\beta_3=0$，代入

$$
k_1(\alpha_1+\alpha_2)+k_2(\alpha_2+\alpha_3)+k_3(\alpha_3+\alpha_1)=0,
$$

按 $\alpha_i$ 整理：

$$
(k_1+k_3)\alpha_1+(k_1+k_2)\alpha_2+(k_2+k_3)\alpha_3=0.
$$

由于 $\alpha_1,\alpha_2,\alpha_3$ 线性无关，各系数必须为零：

$$
\begin{cases}
k_1+k_3=0,\\
k_1+k_2=0,\\
k_2+k_3=0.
\end{cases}
$$

其系数行列式

$$
\begin{vmatrix}
1 & 0 & 1\\
1 & 1 & 0\\
0 & 1 & 1
\end{vmatrix}=2\neq 0,
$$

故只有零解 $k_1=k_2=k_3=0$，所以 $\beta_1,\beta_2,\beta_3$ 线性无关。

**为什么这样做**：把 $\beta$ 组用 $\alpha$ 组的线性组合表示，就把"$\beta$ 组是否无关"转化为"一个以 $\beta$ 的系数矩阵为系数矩阵的齐次方程组是否只有零解"。只要该矩阵的行列式非零（或秩等于向量个数），结论立即成立。这是处理"由无关组线性组合得到新组"这类题的标准套路：**写出过渡矩阵，判断它是否可逆**。

## 课堂小结

- **线性表示**：$\beta=k_1\alpha_1+\cdots+k_m\alpha_m$，等价于方程组 $(\alpha_1,\dots,\alpha_m)x=\beta$ 有解；有解 $\iff r(\alpha_1,\dots,\alpha_m)=r(\alpha_1,\dots,\alpha_m,\beta)$；表示唯一 $\iff$ 该公共秩等于 $m$。
- **判断只能用行变换**，因为列变换会改变列向量间的线性关系。
- **线性相关**：存在不全为零的系数使组合为零，即组内有"多余"向量；**线性无关**：只有全零系数才能使组合为零。
- **秩判别**：$m$ 个向量无关 $\iff$ 它们排成的矩阵秩为 $m$；相关 $\iff$ 秩小于 $m$。由此得 $\mathbb{R}^{n}$ 中多于 $n$ 个向量必相关。
- **三条定理**：相关 $\iff$ 至少一个向量可由其余表示；部分相关则整体相关，整体无关则部分无关；无关组加长仍无关，相关组缩短仍相关。
- **典型方法**：判断相关性问题一律转化为齐次方程组或求秩；由无关组构造新组时，写出过渡矩阵并证其可逆。
- **易错点**：把"存在一组系数"与"任意系数"混淆；忘记"不全为零"这一条件；判断线性表示时误用列变换；表示唯一时漏掉"秩 $=m$"这一半。

## 资料

- 课件原件：[4.3 向量组的线性相关性 (1).pptx](</course-materials/campus-linear-algebra-analytic-geometry/lectures/4.3%20%E5%90%91%E9%87%8F%E7%BB%84%E7%9A%84%E7%BA%BF%E6%80%A7%E7%9B%B8%E5%85%B3%E6%80%A7%20(1).pptx>)
