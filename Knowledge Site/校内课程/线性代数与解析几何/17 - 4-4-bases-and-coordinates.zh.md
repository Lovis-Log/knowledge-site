---
slug: "4-4-bases-and-coordinates"
title: "4.4 Rⁿ的基、向量在基下的坐标"
summary: "$\\mathbf{R}^n$ 的基、向量在基下的坐标与基变换。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "4.4"
tags:
  - "线性代数"
sources:
  - kind: article
    title: "4.4 Rⁿ的基、向量在基下的坐标 (1).pptx"
    url: "https://docs.google.com/presentation/d/1U3IjT-NAugyNKvO6gurF8uhkDeNAD6pd/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true"
---

同一栋楼可以用不同的坐标系测量，换一套坐标轴，点的"坐标"变了，点本身没变。向量空间也一样：选定一组基，每个向量就有了唯一的坐标；换一组基，坐标按一个可逆矩阵变换。本节把"基""坐标""过渡矩阵""坐标变换公式"这四件事说清楚。

## 一、基与坐标

**定义 4.1** 设 $\alpha_1,\alpha_2,\dots,\alpha_n$ 是 $\mathbb{R}^{n}$ 中的 $n$ 个向量，若满足

1. $\alpha_1,\alpha_2,\dots,\alpha_n$ **线性无关**；
2. $\mathbb{R}^{n}$ 中任一向量 $\alpha$ 都可由它们**唯一**线性表示：

$$
\alpha=x_1\alpha_1+x_2\alpha_2+\cdots+x_n\alpha_n,\tag{1}
$$

则称 $\alpha_1,\alpha_2,\dots,\alpha_n$ 为 $\mathbb{R}^{n}$ 的一组**基底**，简称**基**；$n$ 元有序数组 $(x_1,x_2,\dots,x_n)$ 称为向量 $\alpha$ 在基 $\alpha_1,\dots,\alpha_n$ 下的**坐标**。

两个条件缺一不可：只有无关性，表示可能不存在；只有可表示性，表示可能不唯一。二者合起来保证"每个向量都有且只有一组坐标"。

**例（标准基）** 取

$$
E=(\varepsilon_1,\varepsilon_2,\varepsilon_3)=\begin{pmatrix}1 & 0 & 0\\0 & 1 & 0\\0 & 0 & 1\end{pmatrix},
$$

其列向量组是 $\mathbb{R}^{3}$ 的一组基，称为**标准基**。对 $b=(2,3,7)^{T}$，

$$
b=2\varepsilon_1+3\varepsilon_2+7\varepsilon_3,
$$

故 $b$ 在标准基下的坐标就是 $(2,3,7)$。这也是为什么平时把向量写成一列数：默认用的就是标准基。

**例（另一组基）** 上三角矩阵

$$
A=(\alpha_1,\alpha_2,\alpha_3)=\begin{pmatrix}1 & 1 & 1\\0 & 1 & 1\\0 & 0 & 1\end{pmatrix}
$$

的列向量组也是 $\mathbb{R}^{3}$ 的一组基（上三角且对角元非零，行列式为 $1\neq 0$，三列线性无关）。同一个 $b=(2,3,7)^{T}$ 表示为

$$
\begin{pmatrix}2\\3\\7\end{pmatrix}
=(-1)\begin{pmatrix}1\\0\\0\end{pmatrix}+(-4)\begin{pmatrix}1\\1\\0\end{pmatrix}+7\begin{pmatrix}1\\1\\1\end{pmatrix}
=-\alpha_1-4\alpha_2+7\alpha_3,
$$

故 $b$ 在这组基下的坐标是 $(-1,-4,7)$。

**结论**：$\mathbb{R}^{n}$ 的基不唯一，同一个向量在不同基下的坐标不同。**向量本身是客观的，坐标依赖于基的选择。**

**$\mathbb{R}^{n}$ 中两组常用的基**：

1. 基本单位向量组 $\varepsilon_1=(1,0,\dots,0),\ \varepsilon_2=(0,1,\dots,0),\ \dots,\ \varepsilon_n=(0,0,\dots,1)$，称为**标准基**；
2. $\alpha_1=(1,0,\dots,0),\ \alpha_2=(1,1,0,\dots,0),\ \dots,\ \alpha_n=(1,1,\dots,1)$，也是基。这组向量按列排成的矩阵是主对角线及上方全为 $1$ 的上三角矩阵，行列式为 $1$，故列向量线性无关。

## 二、基变换与过渡矩阵

**定义 4.2** 设 $\alpha_1,\dots,\alpha_n$ 和 $\beta_1,\dots,\beta_n$ 是 $\mathbb{R}^{n}$ 的两组基。每个 $\beta_j$ 都可表示为 $\alpha_1,\dots,\alpha_n$ 的线性组合，设

$$
\begin{cases}
\beta_1=a_{11}\alpha_1+a_{21}\alpha_2+\cdots+a_{n1}\alpha_n,\\
\beta_2=a_{12}\alpha_1+a_{22}\alpha_2+\cdots+a_{n2}\alpha_n,\\
\qquad\cdots\\
\beta_n=a_{1n}\alpha_1+a_{2n}\alpha_2+\cdots+a_{nn}\alpha_n.
\end{cases}\tag{2}
$$

写成矩阵形式：

$$
(\beta_1,\beta_2,\dots,\beta_n)
=(\alpha_1,\alpha_2,\dots,\alpha_n)
\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{pmatrix}.\tag{2}'
$$

记

$$
A=\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{pmatrix},
$$

则

$$
(\beta_1,\beta_2,\dots,\beta_n)=(\alpha_1,\alpha_2,\dots,\alpha_n)A.\tag{2}''
$$

$A$ 称为由基 $\alpha_1,\dots,\alpha_n$ 到基 $\beta_1,\dots,\beta_n$ 的**过渡矩阵**，(2)、(2$'$)、(2$''$) 称为**基变换公式**。

**关键读法**：过渡矩阵 $A$ 的第 $i$ **列**是基向量 $\beta_i$ 在基 $\alpha_1,\dots,\alpha_n$ 下的坐标，即

$$
\beta_i=a_{1i}\alpha_1+a_{2i}\alpha_2+\cdots+a_{ni}\alpha_n.
$$

注意行列的对应：$\beta_i$ 的坐标竖着写成一列，横着排成 $A$ 的第 $i$ 列。把"第 $i$ 个向量的坐标写成第 $i$ 列"是本节最容易出错的地方。

**从标准基出发时**：设 $A$ 是由标准基 $\varepsilon_1,\dots,\varepsilon_n$ 到基 $\alpha_1,\dots,\alpha_n$ 的过渡矩阵，则

$$
(\alpha_1,\alpha_2,\dots,\alpha_n)=(\varepsilon_1,\varepsilon_2,\dots,\varepsilon_n)A,
$$

而 $(\varepsilon_1,\dots,\varepsilon_n)=E$，故

$$
A=(\alpha_1,\alpha_2,\dots,\alpha_n),
$$

即标准基到 $\alpha$ 组的过渡矩阵就是把 $\alpha_i$ 按列排成的矩阵；若 $\alpha_i$ 写成行向量，则 $A=(\alpha_1^{T},\alpha_2^{T},\dots,\alpha_n^{T})$，同样按列排。

**过渡矩阵必可逆**。因为 $(\beta)=(\alpha)A$，两组都是基，$(\alpha)$ 与 $(\beta)$ 都是可逆矩阵（列向量线性无关的方阵），故

$$
A=(\alpha)^{-1}(\beta)
$$

是两个可逆矩阵之积，可逆。反过来，若 $A$ 可逆，$(\alpha)A$ 的列也线性无关，确实构成基。

## 三、坐标变换公式

设向量 $\alpha$ 在基 $\alpha_1,\dots,\alpha_n$ 下的坐标为 $x=(x_1,\dots,x_n)^{T}$，在基 $\beta_1,\dots,\beta_n$ 下的坐标为 $y=(y_1,\dots,y_n)^{T}$，则

$$
\alpha=x_1\alpha_1+\cdots+x_n\alpha_n
=(\alpha_1,\alpha_2,\dots,\alpha_n)\begin{pmatrix}x_1\\x_2\\\vdots\\x_n\end{pmatrix},\tag{3}
$$

$$
\alpha=y_1\beta_1+\cdots+y_n\beta_n
=(\beta_1,\beta_2,\dots,\beta_n)\begin{pmatrix}y_1\\y_2\\\vdots\\y_n\end{pmatrix}.\tag{4}
$$

又 $(\beta_1,\dots,\beta_n)=(\alpha_1,\dots,\alpha_n)A$，代入 (4) 并比较：

$$
(\alpha_1,\dots,\alpha_n)\begin{pmatrix}x_1\\\vdots\\x_n\end{pmatrix}
=(\alpha_1,\dots,\alpha_n)A\begin{pmatrix}y_1\\\vdots\\y_n\end{pmatrix}.
$$

由于 $\alpha$ 在基 $\alpha_1,\dots,\alpha_n$ 下的坐标唯一，故

$$
\begin{pmatrix}x_1\\\vdots\\x_n\end{pmatrix}
=A\begin{pmatrix}y_1\\\vdots\\y_n\end{pmatrix},\tag{5}
$$

或

$$
\begin{pmatrix}y_1\\\vdots\\y_n\end{pmatrix}
=A^{-1}\begin{pmatrix}x_1\\\vdots\\x_n\end{pmatrix}.\tag{6}
$$

(5)、(6) 称为**坐标变换公式**。

**定理 4.1** 设 $\mathbb{R}^{n}$ 中基 $\alpha_1,\dots,\alpha_n$ 到基 $\beta_1,\dots,\beta_n$ 的过渡矩阵为 $A$，则 $A$ 可逆；若向量 $\alpha$ 在这两组基下的坐标分别为 $x$ 与 $y$，则

$$
x=Ay,\qquad y=A^{-1}x.
$$

**记忆要点**：过渡矩阵是"新基用旧基表示"的系数矩阵，坐标变换则要用它的**逆**。方向相反，这是公式 (5)、(6) 中最容易搞反的地方。可以这样检查：若 $A=E$（两组基相同），则 $x=y$，公式应退化为恒等，符合。

## 四、坐标的计算

**例** 在 $\mathbb{R}^{3}$ 中，求向量 $\alpha=(4,12,6)$ 在基

$$
\alpha_1=(-2,1,3),\quad \alpha_2=(-1,0,1),\quad \alpha_3=(-2,-5,-1)
$$

下的坐标。

解：取标准基 $\varepsilon_1,\varepsilon_2,\varepsilon_3$，则 $\alpha$ 在标准基下的坐标为 $(4,12,6)^{T}$，且

$$
\begin{cases}
\alpha_1=-2\varepsilon_1+\varepsilon_2+3\varepsilon_3,\\
\alpha_2=-\varepsilon_1+\varepsilon_3,\\
\alpha_3=-2\varepsilon_1-5\varepsilon_2-\varepsilon_3.
\end{cases}
$$

于是由标准基到 $\alpha$ 组的过渡矩阵为

$$
A=\begin{pmatrix}
-2 & -1 & -2\\
1 & 0 & -5\\
3 & 1 & -1
\end{pmatrix}.
$$

设 $\alpha$ 在基 $\alpha_1,\alpha_2,\alpha_3$ 下的坐标为 $y=(y_1,y_2,y_3)^{T}$，由坐标变换公式 $y=A^{-1}x$：

$$
y=A^{-1}\begin{pmatrix}4\\12\\6\end{pmatrix}
=\begin{pmatrix}
\frac52 & -\frac32 & \frac52\\
-7 & 4 & -6\\
\frac12 & -\frac12 & \frac12
\end{pmatrix}
\begin{pmatrix}4\\12\\6\end{pmatrix}
=\begin{pmatrix}7\\-16\\-1\end{pmatrix}.
$$

故 $\alpha$ 在基 $\alpha_1,\alpha_2,\alpha_3$ 下的坐标为 $(7,-16,-1)$。

**验算**：$7\alpha_1-16\alpha_2-\alpha_3=(7\cdot(-2)+16+2,\ 7-0+5,\ 21-16+1)=(-14+16+2,\ 12,\ 6)=(4,12,6)$。✓

**为什么用 $A^{-1}x$ 而不是 $Ax$**：$A$ 的列是"新基在标准基下的坐标"，它把"新坐标"翻译成"标准坐标"，即 $x=Ay$；现在已知标准坐标 $x$ 求新坐标 $y$，自然要乘 $A^{-1}$。

## 五、求过渡矩阵

**例（重点掌握）** 在 $\mathbb{R}^{3}$ 中，求由基

$$
\alpha_1=(-3,1,-2),\quad \alpha_2=(1,-1,1),\quad \alpha_3=(2,3,-1)
$$

到基

$$
\beta_1=(1,1,1),\quad \beta_2=(1,2,3),\quad \beta_3=(2,0,1)
$$

的过渡矩阵。

**思路**：直接解"$\beta_i$ 用 $\alpha$ 组表示"要解三个三元方程组，计算量大。借助标准基可以绕开：设

$$
(\alpha_1,\alpha_2,\alpha_3)=(\varepsilon_1,\varepsilon_2,\varepsilon_3)A,\qquad
(\beta_1,\beta_2,\beta_3)=(\varepsilon_1,\varepsilon_2,\varepsilon_3)B,
$$

则

$$
(\beta_1,\beta_2,\beta_3)=(\varepsilon)A^{-1}B=(\alpha_1,\alpha_2,\alpha_3)(A^{-1}B),
$$

故所求过渡矩阵为 $A^{-1}B$。

**方法 1（先求逆再相乘）**：

$$
A=\begin{pmatrix}
-3 & 1 & 2\\
1 & -1 & 3\\
-2 & 1 & -1
\end{pmatrix},
\qquad
B=\begin{pmatrix}
1 & 1 & 2\\
1 & 2 & 0\\
1 & 3 & 1
\end{pmatrix}.
$$

计算得 $\lvert A\rvert=-1\neq 0$，$A$ 可逆，且

$$
A^{-1}B=\begin{pmatrix}
-6 & -19 & -1\\
-13 & -42 & -1\\
-2 & -7 & 0
\end{pmatrix}.
$$

**方法 2（行变换，避免单独求逆）**：对分块矩阵 $(A,B)$ 作初等行变换，把左块化为 $E$：

$$
(A,B)=\left(\begin{array}{ccc|ccc}
-3 & 1 & 2 & 1 & 1 & 2\\
1 & -1 & 3 & 1 & 2 & 0\\
-2 & 1 & -1 & 1 & 3 & 1
\end{array}\right)
\longrightarrow
\left(\begin{array}{ccc|ccc}
1 & 0 & 0 & -6 & -19 & -1\\
0 & 1 & 0 & -13 & -42 & -1\\
0 & 0 & 1 & -2 & -7 & 0
\end{array}\right).
$$

右块即 $A^{-1}B$。这与 2.5 节"$(A,E)\to(E,A^{-1})$"是同一手法：把 $B$ 一并带着变，就顺带算出了乘积。

**验算**：把 $A^{-1}B$ 的第 1 列 $(-6,-13,-2)^{T}$ 作为 $\beta_1$ 在 $\alpha$ 组下的坐标，

$$
-6\alpha_1-13\alpha_2-2\alpha_3
=(-6(-3)-13\cdot1-2\cdot2,\ -6+13-6,\ 12-13+2)
=(18-13-4,\ 1,\ 1)=(1,1,1)=\beta_1.
$$

✓ 其余两列同理。

## 六、综合例子：四维空间中的基变换与坐标

**例** 已知 $\mathbb{R}^{4}$ 中的基 $\alpha_{1},\alpha_{2},\alpha_{3},\alpha_{4}$ 和基 $\beta_{1},\beta_{2},\beta_{3},\beta_{4}$，向量 $\alpha$ 在基 $\alpha_{1},\alpha_{2},\alpha_{3},\alpha_{4}$ 下的坐标为

$$
(a_{1},a_{2},a_{3},a_{4})=(0,0,0,1),
$$

其中

$$
\begin{cases}
\alpha_{1}=(1,1,1,1),\\
\alpha_{2}=(1,1,-1,-1),\\
\alpha_{3}=(1,-1,1,-1),\\
\alpha_{4}=(1,-1,-1,1),
\end{cases}
\qquad
\begin{cases}
\beta_{1}=(1,1,0,1),\\
\beta_{2}=(2,1,3,1),\\
\beta_{3}=(1,1,0,0),\\
\beta_{4}=(0,1,-1,-1).
\end{cases}
$$

1. 求基 $\alpha_{1},\alpha_{2},\alpha_{3},\alpha_{4}$ 到基 $\beta_{1},\beta_{2},\beta_{3},\beta_{4}$ 的过渡矩阵；
2. 求向量 $\alpha$ 在基 $\beta_{1},\beta_{2},\beta_{3},\beta_{4}$ 下的坐标 $(b_{1},b_{2},b_{3},b_{4})$。

### 解

令

$$
A=(\alpha_{1}^{T},\alpha_{2}^{T},\alpha_{3}^{T},\alpha_{4}^{T})
=\begin{pmatrix}
1&1&1&1\\
1&1&-1&-1\\
1&-1&1&-1\\
1&-1&-1&1
\end{pmatrix},
$$

$$
B=(\beta_{1}^{T},\beta_{2}^{T},\beta_{3}^{T},\beta_{4}^{T})
=\begin{pmatrix}
1&2&1&0\\
1&1&1&1\\
0&3&0&-1\\
1&1&0&-1
\end{pmatrix}.
$$

这里 $A$、$B$ 的列分别是两组基向量在标准基下的坐标。

#### （1）求过渡矩阵

设基 $\alpha_{1},\dots,\alpha_{4}$ 到基 $\beta_{1},\dots,\beta_{4}$ 的过渡矩阵为 $X$，按定义

$$
(\beta_{1},\beta_{2},\beta_{3},\beta_{4})
=(\alpha_{1},\alpha_{2},\alpha_{3},\alpha_{4})X,
$$

即

$$
B=AX.
$$

因为 $\alpha_{1},\dots,\alpha_{4}$ 是基，$A$ 可逆，所以

$$
X=A^{-1}B.
$$

矩阵 $A$ 的列两两正交且长度平方为 $4$，故

$$
A^{-1}=\frac14 A^{T}=\frac14 A.
$$

于是

$$
X=A^{-1}B
=\frac14
\begin{pmatrix}
1&1&1&1\\
1&1&-1&-1\\
1&-1&1&-1\\
1&-1&-1&1
\end{pmatrix}
\begin{pmatrix}
1&2&1&0\\
1&1&1&1\\
0&3&0&-1\\
1&1&0&-1
\end{pmatrix}.
$$

计算乘积：

$$
X=\frac14
\begin{pmatrix}
3&7&2&-1\\
1&-1&2&3\\
-1&3&0&-1\\
1&-1&0&-1
\end{pmatrix}.
$$

**验算**：$X$ 的第 $j$ 列应是 $\beta_{j}$ 在 $\alpha$ 组下的坐标，即 $AX$ 的第 $j$ 列应等于 $\beta_{j}$。例如第 1 列 $x_{1}=\frac14(3,1,-1,1)^{T}$，

$$
Ax_{1}
=\frac14\begin{pmatrix}
1&1&1&1\\
1&1&-1&-1\\
1&-1&1&-1\\
1&-1&-1&1
\end{pmatrix}
\begin{pmatrix}3\\1\\-1\\1\end{pmatrix}
=\frac14\begin{pmatrix}4\\4\\0\\4\end{pmatrix}
=\begin{pmatrix}1\\1\\0\\1\end{pmatrix}
=\beta_{1}.
$$

其余三列同理，故 $AX=B$，过渡矩阵正确。

**读法**：$X$ 的第 $j$ 列就是 $\beta_{j}$ 在基 $\alpha_{1},\dots,\alpha_{4}$ 下的坐标。求过渡矩阵时，“新基用旧基表示”的系数按列排，不能按行排。

#### （2）求 $\alpha$ 在 $\beta$ 组下的坐标

已知 $\alpha$ 在 $\alpha$ 组下的坐标为 $a=(0,0,0,1)^{T}$，所以

$$
\alpha=(\alpha_{1},\alpha_{2},\alpha_{3},\alpha_{4})
\begin{pmatrix}0\\0\\0\\1\end{pmatrix}
=\alpha_{4}=(1,-1,-1,1)^{T}.
$$

设 $\alpha$ 在 $\beta$ 组下的坐标为 $b=(b_{1},b_{2},b_{3},b_{4})^{T}$，则

$$
\alpha=(\beta_{1},\beta_{2},\beta_{3},\beta_{4})b=Bb.
$$

两边左乘 $B^{-1}$：

$$
b=B^{-1}\alpha.
$$

先求 $B^{-1}$。计算得

$$
B^{-1}=
\begin{pmatrix}
-1&1&0&1\\[2pt]
-\dfrac12&\dfrac12&\dfrac12&0\\[4pt]
3&-2&-1&-1\\[2pt]
-\dfrac32&\dfrac32&\dfrac12&0
\end{pmatrix}.
$$

于是

$$
b=B^{-1}\alpha
=
\begin{pmatrix}
-1&1&0&1\\[2pt]
-\dfrac12&\dfrac12&\dfrac12&0\\[4pt]
3&-2&-1&-1\\[2pt]
-\dfrac32&\dfrac32&\dfrac12&0
\end{pmatrix}
\begin{pmatrix}1\\-1\\-1\\1\end{pmatrix}
=
\begin{pmatrix}
-1\\[2pt]
-\dfrac32\\[4pt]
5\\[2pt]
-\dfrac72
\end{pmatrix}.
$$

所以 $\alpha$ 在基 $\beta_{1},\beta_{2},\beta_{3},\beta_{4}$ 下的坐标为

$$
(b_{1},b_{2},b_{3},b_{4})
=\left(-1,-\frac32,5,-\frac72\right).
$$

**验算**：直接代回

$$
-\beta_{1}-\frac32\beta_{2}+5\beta_{3}-\frac72\beta_{4}
$$

的每一分量：

- 第 1 分量：$-1-\frac32\cdot2+5\cdot1-\frac72\cdot0=-1-3+5=1$；
- 第 2 分量：$-1-\frac32\cdot1+5\cdot1-\frac72\cdot1=-1-\frac32+5-\frac72=-1$；
- 第 3 分量：$-0-\frac32\cdot3+5\cdot0-\frac72\cdot(-1)=-\frac92+\frac72=-1$；
- 第 4 分量：$-1-\frac32\cdot1+5\cdot0-\frac72\cdot(-1)=-1-\frac32+\frac72=1$。

结果为 $(1,-1,-1,1)=\alpha$，坐标正确。

**与坐标变换公式的关系**：由 $B=AX$ 得 $A=BX^{-1}$。向量 $\alpha$ 在两组基下分别表示为 $Aa$ 与 $Bb$，故 $Aa=Bb$，即 $a=Xb$，所以

$$
b=X^{-1}a.
$$

也就是说，过渡矩阵 $X$ 把“$\beta$ 坐标”翻译成“$\alpha$ 坐标”；要从“$\alpha$ 坐标”求“$\beta$ 坐标”，应乘 $X^{-1}$。本题用 $b=B^{-1}\alpha$ 计算更直接，避免再求 $X^{-1}$。

## 七、几何例子：坐标轴旋转

在平面直角坐标系 $xoy$ 中，$i,j$ 是互相垂直的单位向量，构成 $\mathbb{R}^{2}$ 的一组基。把 $x$ 轴、$y$ 轴绕原点逆时针旋转角 $\theta$，坐标轴上的单位向量变为 $\varepsilon_1,\varepsilon_2$，它们也是 $\mathbb{R}^{2}$ 的一组基。由几何分解

$$
\varepsilon_1=\cos\theta\, i+\sin\theta\, j,\qquad
\varepsilon_2=-\sin\theta\, i+\cos\theta\, j,
$$

故

$$
(\varepsilon_1,\varepsilon_2)=(i,j)\begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix},
$$

过渡矩阵

$$
A=\begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix},
\qquad
A^{-1}=\begin{pmatrix}\cos\theta & \sin\theta\\ -\sin\theta & \cos\theta\end{pmatrix}.
$$

若向量 $\alpha$ 在旧基 $i,j$ 下的坐标为 $(x,y)$，在新基 $\varepsilon_1,\varepsilon_2$ 下的坐标为 $(x',y')$，则

$$
\begin{pmatrix}x'\\y'\end{pmatrix}
=A^{-1}\begin{pmatrix}x\\y\end{pmatrix}
=\begin{pmatrix}\cos\theta & \sin\theta\\ -\sin\theta & \cos\theta\end{pmatrix}
\begin{pmatrix}x\\y\end{pmatrix},
$$

即

$$
\begin{cases}
x'=x\cos\theta+y\sin\theta,\\
y'=-x\sin\theta+y\cos\theta.
\end{cases}
$$

这正是解析几何中"坐标轴旋转"的坐标变换公式。注意它和"向量旋转"的公式差一个符号方向：坐标轴逆时针转 $\theta$，相当于向量相对新轴顺时针转 $\theta$，所以矩阵里出现的是 $A^{-1}$ 而不是 $A$。

## 课堂小结

- **基**：$n$ 个向量线性无关且能表示空间中任一向量；$\mathbb{R}^{n}$ 的基不唯一，标准基是最方便的一组。
- **坐标**：向量在给定基下的表示系数，唯一；同一个向量换基后坐标改变。
- **过渡矩阵**：$(\beta_1,\dots,\beta_n)=(\alpha_1,\dots,\alpha_n)A$，$A$ 的第 $i$ 列是 $\beta_i$ 在 $\alpha$ 组下的坐标；$A$ 必可逆。
- **坐标变换**：$x=Ay$，$y=A^{-1}x$，其中 $x$ 是旧基坐标、$y$ 是新基坐标。过渡矩阵把新坐标翻译成旧坐标，求新坐标要乘 $A^{-1}$，方向不要搞反。
- **求过渡矩阵**：从标准基中转，$A^{-1}B$；实用算法是对 $(A,B)$ 作行变换化为 $(E,A^{-1}B)$。
- **应用**：坐标轴旋转的公式就是坐标变换公式的几何版本。
- **易错点**：把过渡矩阵的列写成行（$\beta_i$ 的坐标应竖排为第 $i$ 列）；坐标变换时误乘 $A$；忘记验证过渡矩阵可逆；把"向量坐标"与"向量本身"混为一谈。
