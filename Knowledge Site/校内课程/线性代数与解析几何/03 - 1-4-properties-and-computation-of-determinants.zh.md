---
slug: "1-4-properties-and-computation-of-determinants"
title: "1.4 n阶行列式的性质及计算"
summary: "行列式的性质，以及化为三角形行列式的计算方法。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "course"
displayNumber: "1.4"
tags:
  - "线性代数"
sources:
  - kind: article
    title: "1.4 n阶行列式的性质及计算.pptx"
    url: "https://docs.google.com/presentation/d/1SPT8NjxVQ7djlY9FVFE16M9XpZ8fiprv/edit?usp=drivesdk&ouid=109132636810390340175&rtpof=true&sd=true"
---

当 $n\ge 4$ 时，按定义展开 $n$ 阶行列式要处理 $n!$ 项，计算量迅速增大，实际上很难直接算。本节用行列式的性质把一般行列式化成三角形行列式，使计算变成“主对角线元素相乘”。性质本身不难，关键是记准每条性质改变了什么、不改变什么，并在具体行列式中看出该用哪一条。

## 一、行列式的性质

### 转置行列式与性质 4.1

记

$$
D=\begin{vmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{vmatrix},
$$

把 $D$ 的行与列按原顺序互换（第 1 行换成第 1 列，第 2 行换成第 2 列，依此类推），得到的行列式称为 $D$ 的**转置行列式**，记作

$$
D^{T}=\begin{vmatrix}
a_{11} & a_{21} & \cdots & a_{n1}\\
a_{12} & a_{22} & \cdots & a_{n2}\\
\vdots & \vdots & & \vdots\\
a_{1n} & a_{2n} & \cdots & a_{nn}
\end{vmatrix}.
$$

例如

$$
D=\begin{vmatrix}
1 & 2 & 3\\
4 & 5 & 6\\
7 & 8 & 9
\end{vmatrix},
\qquad
D^{T}=\begin{vmatrix}
1 & 4 & 7\\
2 & 5 & 8\\
3 & 6 & 9
\end{vmatrix}.
$$

**性质 4.1** 行列式与它的转置行列式相等，即

$$
D=D^{T}.
$$

证明的思路是看通项。令 $b_{ij}=a_{ji}$，则 $D^{T}$ 的通项为

$$
(-1)^{\tau(j_1j_2\cdots j_n)}b_{1j_1}b_{2j_2}\cdots b_{nj_n}
=(-1)^{\tau(j_1j_2\cdots j_n)}a_{j_11}a_{j_22}\cdots a_{j_nn}.
$$

把因子按行下标重新排列，正好得到 $D$ 的同一项；重排时行标与列标同时作同样的对换，两个排列的奇偶性相同，故符号也一致。于是两项相等，求和后 $D^{T}=D$。

> **补充证明**：设重排共用了 $M$ 次两因子互换。每互换一次，行标排列与列标排列各作一次对换。行标排列 $j_1j_2\cdots j_n$ 经这 $M$ 次对换化为自然排列，列标排列则由自然排列化为 $i_1i_2\cdots i_n$。由定理 2.2，两个排列的奇偶性都由 $M$ 的奇偶决定，所以
>
> $$(-1)^{\tau(j_1j_2\cdots j_n)}=(-1)^{\tau(i_1i_2\cdots i_n)}.$$
>
> 重排后的乘积恰为 $a_{i_11}a_{i_22}\cdots a_{i_nn}$，故 $D^{T}$ 的每一项都等于 $D$ 中列标排列为 $i_1i_2\cdots i_n$ 的对应项；逐项相等，求和后 $D^{T}=D$。

**性质 4.1 的意义**：行列式中行与列的地位完全对等。因此下面凡是对“行”成立的性质，对“列”也同样成立；证明时只需证行的情况。

### 性质 4.2：零行或零列

**性质 4.2** 如果行列式的某一行（列）元素全为零，则该行列式的值为零。

这是因为行列式的每一项都要从每一行取一个元素；零行只能取出 $0$，所以每一项都是 $0$。

### 性质 4.3：交换两行（列）变号

**性质 4.3** 任意交换两行（列），行列式的值变号。

记号 $r_i\leftrightarrow r_j$ 表示交换第 $i$ 行与第 $j$ 行，$c_i\leftrightarrow c_j$ 表示交换第 $i$ 列与第 $j$ 列。

例如

$$
\begin{vmatrix}
1 & 7 & 5\\
6 & 6 & 2\\
3 & 5 & 8
\end{vmatrix}
=-196,
\qquad
\begin{vmatrix}
1 & 7 & 5\\
3 & 5 & 8\\
6 & 6 & 2
\end{vmatrix}
=196.
$$

第二行与第三行交换后，值由 $-196$ 变为 $196$。

证明要回到定义：交换两行相当于在每一项的行下标排列中作一次对换。由“对换改变排列的奇偶性”，每一项都变号，故整个行列式变号。这个证明只需理解，计算时直接使用性质即可。

### 推论 4.1：两行（列）相同

**推论 4.1** 如果行列式有两行（列）完全相同，则此行列式为零。

证明：交换这两行，由性质 4.3 有 $D=-D$，所以 $2D=0$，即 $D=0$。

注意“两行相同”指对应位置的元素都相等，不是数值和相同。例如

$$
\begin{vmatrix}
a_{11} & a_{11} & a_{13} & a_{14}\\
a_{21} & a_{21} & a_{23} & a_{24}\\
a_{31} & a_{31} & a_{33} & a_{34}\\
a_{41} & a_{41} & a_{43} & a_{44}
\end{vmatrix}=0,
$$

第一列与第二列完全相同。同理，若第二、三行完全相同：

$$
\begin{vmatrix}
a_{11} & a_{12} & a_{13} & a_{14}\\
a_{21} & a_{22} & a_{23} & a_{24}\\
a_{21} & a_{22} & a_{23} & a_{24}\\
a_{41} & a_{42} & a_{43} & a_{44}
\end{vmatrix}=0.
$$

### 性质 4.4：线性性

**性质 4.4** 行列式具有线性性。

**(1) 按一行（列）拆开。** 若某一行（列）的每个元素都是两个数之和，则行列式可按该行（列）拆成两个行列式之和。以第 $i$ 行为例：

$$
\begin{vmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
\vdots & \vdots & & \vdots\\
b_1+c_1 & b_2+c_2 & \cdots & b_n+c_n\\
\vdots & \vdots & & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{vmatrix}
=
\begin{vmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
\vdots & \vdots & & \vdots\\
b_1 & b_2 & \cdots & b_n\\
\vdots & \vdots & & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{vmatrix}
+
\begin{vmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
\vdots & \vdots & & \vdots\\
c_1 & c_2 & \cdots & c_n\\
\vdots & \vdots & & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{vmatrix}.
$$

对列也有同样的拆分。直接按定义把每一项拆开即可证明。

**(2) 提取公因数。** 某一行（列）的所有元素都乘以同一个数 $k$，等于用 $k$ 乘以整个行列式：

$$
\begin{vmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
\vdots & \vdots & & \vdots\\
ka_{i1} & ka_{i2} & \cdots & ka_{in}\\
\vdots & \vdots & & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{vmatrix}
=
k\begin{vmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
\vdots & \vdots & & \vdots\\
a_{i1} & a_{i2} & \cdots & a_{in}\\
\vdots & \vdots & & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{vmatrix}.
$$

从第 $i$ 行提取公因子 $k$，记作 $r_i\div k$；从第 $i$ 列提取，记作 $c_i\div k$。

**容易用错的地方**：线性性只允许“一次拆一行（列）”。例如

$$
\begin{vmatrix}
a+x & b+y\\
c+z & d+w
\end{vmatrix}
\ne
\begin{vmatrix}
a & b\\
c & d
\end{vmatrix}
+
\begin{vmatrix}
x & y\\
z & w
\end{vmatrix}.
$$

正确做法是先拆第一行：

$$
\begin{vmatrix}
a+x & b+y\\
c+z & d+w
\end{vmatrix}
=
\begin{vmatrix}
a & b\\
c+z & d+w
\end{vmatrix}
+
\begin{vmatrix}
x & y\\
c+z & d+w
\end{vmatrix},
$$

再分别拆第二行，共得到四个行列式：

$$
=
\begin{vmatrix}
a & b\\
c & d
\end{vmatrix}
+
\begin{vmatrix}
a & b\\
z & w
\end{vmatrix}
+
\begin{vmatrix}
x & y\\
c & d
\end{vmatrix}
+
\begin{vmatrix}
x & y\\
z & w
\end{vmatrix}.
$$

### 推论 4.2：两行（列）成比例

**推论 4.2** 行列式中如果有两行（列）元素成比例，则此行列式为零。

证明：设第 $j$ 行是第 $i$ 行的 $k$ 倍。由性质 4.4(2) 从第 $j$ 行提出 $k$，第 $j$ 行就变成第 $i$ 行；再由推论 4.1，两行相同，行列式为零：

$$
\begin{vmatrix}
\vdots & \vdots & & \vdots\\
a_{i1} & a_{i2} & \cdots & a_{in}\\
\vdots & \vdots & & \vdots\\
ka_{i1} & ka_{i2} & \cdots & ka_{in}\\
\vdots & \vdots & & \vdots
\end{vmatrix}
=
k\begin{vmatrix}
\vdots & \vdots & & \vdots\\
a_{i1} & a_{i2} & \cdots & a_{in}\\
\vdots & \vdots & & \vdots\\
a_{i1} & a_{i2} & \cdots & a_{in}\\
\vdots & \vdots & & \vdots
\end{vmatrix}
=0.
$$

例如

$$
\begin{vmatrix}
1 & 2 & 4 & 5\\
23 & 35 & 66 & 37\\
3 & 6 & 12 & 15\\
49 & 34 & 35 & 35
\end{vmatrix}=0,
$$

因为第三行是第一行的 $3$ 倍。又如

$$
\begin{vmatrix}
0 & 4 & 0\\
1 & 2 & 3\\
0 & -1 & 0
\end{vmatrix}=0,
$$

第一列与第三列成比例。

### 推论 4.3：倍加变换

**推论 4.3** 把行列式某一行（列）的各元素乘以同一数，然后加到另一行（列）对应的元素上，行列式的值不变。

证明：以“第 $i$ 行的 $k$ 倍加到第 $j$ 行”为例。由性质 4.4(1) 拆开：

$$
\begin{vmatrix}
\vdots & \vdots & & \vdots\\
a_{i1} & a_{i2} & \cdots & a_{in}\\
\vdots & \vdots & & \vdots\\
a_{j1}+ka_{i1} & a_{j2}+ka_{i2} & \cdots & a_{jn}+ka_{in}\\
\vdots & \vdots & & \vdots
\end{vmatrix}
=
\begin{vmatrix}
\vdots & \vdots & & \vdots\\
a_{i1} & a_{i2} & \cdots & a_{in}\\
\vdots & \vdots & & \vdots\\
a_{j1} & a_{j2} & \cdots & a_{jn}\\
\vdots & \vdots & & \vdots
\end{vmatrix}
+
\begin{vmatrix}
\vdots & \vdots & & \vdots\\
a_{i1} & a_{i2} & \cdots & a_{in}\\
\vdots & \vdots & & \vdots\\
ka_{i1} & ka_{i2} & \cdots & ka_{in}\\
\vdots & \vdots & & \vdots
\end{vmatrix}.
$$

第二个行列式的第 $j$ 行是第 $i$ 行的 $k$ 倍，由推论 4.2 为零，所以值不变。记作 $r_j+kr_i$（或 $c_j+kc_i$）。

### 记号汇总

1. 交换第 $i$ 行与第 $j$ 行：$r_i\leftrightarrow r_j$；交换第 $i$ 列与第 $j$ 列：$c_i\leftrightarrow c_j$。
2. 从第 $i$ 行提取公因子 $k$：$r_i\div k$；从第 $i$ 列提取：$c_i\div k$。
3. 以 $k$ 乘第 $j$ 行加到第 $i$ 行：$r_i+kr_j$；以 $k$ 乘第 $j$ 列加到第 $i$ 列：$c_i+kc_j$。

## 二、行列式的计算

三角形行列式的值等于主对角线上各元素的乘积：

$$
\begin{vmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
0 & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & \ddots & \vdots\\
0 & 0 & \cdots & a_{nn}
\end{vmatrix}
=
\begin{vmatrix}
a_{11} & 0 & \cdots & 0\\
a_{21} & a_{22} & \cdots & 0\\
\vdots & \vdots & \ddots & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{vmatrix}
=a_{11}a_{22}\cdots a_{nn}.
$$

所以计算一般行列式时，常多次使用性质把它化为上三角形或下三角形行列式。

### 化上三角形的操作

先看低阶例子。

**(1)**

$$
\begin{vmatrix}
1 & 2\\
3 & 3
\end{vmatrix}
\xrightarrow{r_2-3r_1}
\begin{vmatrix}
1 & 2\\
0 & -3
\end{vmatrix}
=1\times(-3)=-3.
$$

**(2)** 第一列第一个元素为 $0$，先交换两行，注意行列式变号：

$$
\begin{vmatrix}
0 & 2\\
1 & 3
\end{vmatrix}
\xrightarrow{r_1\leftrightarrow r_2}
-\begin{vmatrix}
1 & 3\\
0 & 2
\end{vmatrix}
=-1\times 2=-2.
$$

**(3)** 第一行第一列元素非零，不必换行：

$$
D=\begin{vmatrix}
1 & -1 & 0\\
0 & -1 & -1\\
-1 & 2 & -1
\end{vmatrix}
\xrightarrow{r_3+r_1}
\begin{vmatrix}
1 & -1 & 0\\
0 & -1 & -1\\
0 & 1 & -1
\end{vmatrix}
\xrightarrow{r_3+r_2}
\begin{vmatrix}
1 & -1 & 0\\
0 & -1 & -1\\
0 & 0 & -2
\end{vmatrix}
=1\times(-1)\times(-2)=2.
$$

**(4)** 第一行第一列元素为 $0$，必须换行。与第二行换、与第三行换都可以，结果相同。

**法 1**：与第二行交换：

$$
D=\begin{vmatrix}
0 & -1 & -1\\
1 & -1 & 0\\
-1 & 2 & -1
\end{vmatrix}
\xrightarrow{r_1\leftrightarrow r_2}
-\begin{vmatrix}
1 & -1 & 0\\
0 & -1 & -1\\
-1 & 2 & -1
\end{vmatrix}
\xrightarrow{r_3+r_1}
-\begin{vmatrix}
1 & -1 & 0\\
0 & -1 & -1\\
0 & 1 & -1
\end{vmatrix}
\xrightarrow{r_3+r_2}
-\begin{vmatrix}
1 & -1 & 0\\
0 & -1 & -1\\
0 & 0 & -2
\end{vmatrix}.
$$

所以

$$
D=-1\times(-1)\times(-2)=-2.
$$

**法 2**：与第三行交换：

$$
D=\begin{vmatrix}
0 & -1 & -1\\
1 & -1 & 0\\
-1 & 2 & -1
\end{vmatrix}
\xrightarrow{r_1\leftrightarrow r_3}
-\begin{vmatrix}
-1 & 2 & -1\\
1 & -1 & 0\\
0 & -1 & -1
\end{vmatrix}
\xrightarrow{r_2+r_1}
-\begin{vmatrix}
-1 & 2 & -1\\
0 & 1 & -1\\
0 & -1 & -1
\end{vmatrix}
\xrightarrow{r_3+r_2}
-\begin{vmatrix}
-1 & 2 & -1\\
0 & 1 & -1\\
0 & 0 & -2
\end{vmatrix}.
$$

所以

$$
D=-(-1)\times 1\times(-2)=-2.
$$

两法结果相同。换行时要注意两点：

1. 换上去的行数字尽量简单，尽量选绝对值较小、又不会马上产生分数的行；
2. 每交换一次两行，行列式外要添一个负号。

### 化上三角形的一般步骤

1. 若第一列第一个元素为 $0$，先把第一行与其他行交换，使第一列第一个元素不为 $0$（换行时行列式变号，记 $r_i\leftrightarrow r_j$）。
2. 把第一行分别乘以适当的数加到其余各行，使第一列除第一个元素外全为 $0$（记 $r_j+kr_1$）。
3. 对去掉第一行、第一列后余下的低一阶行列式重复同样的做法，直到化为上三角形行列式；此时主对角线元素的乘积就是行列式的值。

若第一列第一个元素本来不为 $0$，就不换行；处理低一阶行列式时方法完全相同。

### 四阶行列式

**例** 计算

$$
D=\begin{vmatrix}
0 & -1 & -1 & 2\\
1 & -1 & 0 & 2\\
-1 & 2 & -1 & 0\\
2 & 1 & 1 & 0
\end{vmatrix}.
$$

第一行第一列元素为 $0$，先交换第一、二行：

$$
D=-\begin{vmatrix}
1 & -1 & 0 & 2\\
0 & -1 & -1 & 2\\
-1 & 2 & -1 & 0\\
2 & 1 & 1 & 0
\end{vmatrix}.
$$

用第一行消去第三、四行的第一个元素：

$$
D=-\begin{vmatrix}
1 & -1 & 0 & 2\\
0 & -1 & -1 & 2\\
0 & 1 & -1 & 2\\
0 & 3 & 1 & -4
\end{vmatrix}.
$$

第二行乘以 $-1$ 可使首个非零元变成 $1$；同时把第三行除以 $-2$、第四行除以 $2$，为下一步消元作准备。三次行变换分别使行列式乘以 $-1$、$-\frac12$、$\frac12$，合起来乘以 $\frac14$，即新行列式是原行列式的 $\frac14$。还原原行列式要乘 $4$；再连同换行留下的负号，得

$$
D=-4\begin{vmatrix}
1 & -1 & 0 & 2\\
0 & 1 & 1 & -2\\
0 & 0 & 1 & -2\\
0 & 0 & -1 & 1
\end{vmatrix}.
$$

再用第三行消去第四行的第三个元素：

$$
D=-4\begin{vmatrix}
1 & -1 & 0 & 2\\
0 & 1 & 1 & -2\\
0 & 0 & 1 & -2\\
0 & 0 & 0 & -1
\end{vmatrix}
=-4\times 1\times 1\times 1\times(-1)=4.
$$

这里的外系数 $-4$ 容易漏掉：交换两行贡献一个负号，第二行乘 $-1$ 又贡献一个负号；第三、四行分别除以 $-2$ 和 $2$，对应乘数 $-\frac12$ 与 $\frac12$，合起来是 $-\frac14$。四项相乘为

$$
(-1)\times(-1)\times\left(-\frac12\right)\times\frac12=-\frac14,
$$

故还原原行列式时外面要乘 $-4$。做这类题时，最好每一步都把外系数写在等号旁边。

### 化下三角形

也可以把行列式化为下三角形，此时一般作列变换：

1. 若第一行第一个元素为 $0$，先把第一列与其他列交换，使第一行第一个元素不为 $0$（换列变号，记 $c_i\leftrightarrow c_j$）；
2. 把第一列分别乘以适当的数加到其余各列，使第一行除第一个元素外全为 $0$（记 $c_j+kc_1$）；
3. 对余下的低一阶行列式重复，直到化为下三角形，主对角线元素乘积即为值。

例如对上面的三阶行列式

$$
D=\begin{vmatrix}
0 & -1 & -1\\
1 & -1 & 0\\
-1 & 2 & -1
\end{vmatrix},
$$

交换第一、三列：

$$
D=-\begin{vmatrix}
-1 & -1 & 0\\
0 & -1 & 1\\
-1 & 2 & -1
\end{vmatrix}.
$$

用第一列消去第一行其余元素：

$$
D=-\begin{vmatrix}
-1 & 0 & 0\\
0 & -1 & 1\\
-1 & 3 & -1
\end{vmatrix}
\xrightarrow{c_3+c_2}
-\begin{vmatrix}
-1 & 0 & 0\\
0 & -1 & 0\\
-1 & 3 & 2
\end{vmatrix}
=-(-1)(-1)(2)=-2.
$$

答案与前面相同。

化为上三角形不一定只能用行变换，化为下三角形也不一定只能用列变换；两种过程都可以把行变换与列变换结合使用，看哪一边更简便。

### 先看结构再动手

**例** 计算

$$
D=\begin{vmatrix}
2 & 1 & 4 & 1\\
3 & -1 & 2 & 1\\
1 & 2 & 3 & 2\\
5 & 0 & 6 & 2
\end{vmatrix}.
$$

第一行第一列元素不为 $0$，但第一列的数相对较大。观察各列，第二列的绝对值整体较小，于是交换第一、二列：

$$
D=-\begin{vmatrix}
1 & 2 & 4 & 1\\
-1 & 3 & 2 & 1\\
2 & 1 & 3 & 2\\
0 & 5 & 6 & 2
\end{vmatrix}.
$$

用第一行消去第一列其余元素：

$$
D=-\begin{vmatrix}
1 & 2 & 4 & 1\\
0 & 5 & 6 & 2\\
0 & -3 & -5 & 0\\
0 & 5 & 6 & 2
\end{vmatrix}.
$$

此时第二行与第四行完全相同，由推论 4.1，行列式为 $0$，故 $D=0$。

这说明化三角形的过程中不必机械地一路算到底；一旦出现两行（列）相同或成比例，应立即用推论判断，比继续消元更快。

### 各行（列）元素之和为定数

**例** 计算

$$
D=\begin{vmatrix}
3 & 2 & 2 & 2\\
2 & 3 & 2 & 2\\
2 & 2 & 3 & 2\\
2 & 2 & 2 & 3
\end{vmatrix}.
$$

每一行的元素之和都是 $9$。把第 2、3、4 列全加到第 1 列：

$$
D=\begin{vmatrix}
9 & 2 & 2 & 2\\
9 & 3 & 2 & 2\\
9 & 2 & 3 & 2\\
9 & 2 & 2 & 3
\end{vmatrix}.
$$

从第一列提出公因子 $9$，再用第一行消去其余各行的第一个元素：

$$
D=9\begin{vmatrix}
1 & 2 & 2 & 2\\
1 & 3 & 2 & 2\\
1 & 2 & 3 & 2\\
1 & 2 & 2 & 3
\end{vmatrix}
=9\begin{vmatrix}
1 & 2 & 2 & 2\\
0 & 1 & 0 & 0\\
0 & 0 & 1 & 0\\
0 & 0 & 0 & 1
\end{vmatrix}
=9.
$$

关键动机：各行元素之和相同，说明“把各列加到第一列”后第一列会变成同一个数，从而可以提出公因子并制造大量零。

**同类的一般情形**：

$$
D_n=\begin{vmatrix}
a & b & \cdots & b\\
b & a & \cdots & b\\
\vdots & \vdots & \ddots & \vdots\\
b & b & \cdots & a
\end{vmatrix}.
$$

把第 $2,3,\dots,n$ 列都加到第 1 列，第一列全为 $a+(n-1)b$；提出这个公因子后，再用第 2 行至第 $n$ 行分别减去第 1 行，得到上三角行列式：

$$
D_n=
\begin{vmatrix}
a+(n-1)b & b & \cdots & b\\
0 & a-b & \cdots & 0\\
\vdots & \vdots & \ddots & \vdots\\
0 & 0 & \cdots & a-b
\end{vmatrix}
=[a+(n-1)b](a-b)^{n-1}.
$$

这个结果要记住。当 $a=b$ 时，$D_n=0$，与“所有行相同”一致；当 $a+(n-1)b=0$ 时，第一列被消成零，行列式也为零，这是另一个临界情形。

### 逐行作差

**例** 计算

$$
D=\begin{vmatrix}
a & b & c & d\\
a & a+b & a+b+c & a+b+c+d\\
a & 2a+b & 3a+2b+c & 4a+3b+2c+d\\
a & 3a+b & 6a+3b+c & 10a+6b+3c+d
\end{vmatrix}.
$$

从最后一行开始，逐行减去前一行：

$$
D=\begin{vmatrix}
a & b & c & d\\
0 & a & a+b & a+b+c\\
0 & a & 2a+b & 3a+2b+c\\
0 & a & 3a+b & 6a+3b+c
\end{vmatrix}.
$$

再对下三行重复“后行减前行”：

$$
D=\begin{vmatrix}
a & b & c & d\\
0 & a & a+b & a+b+c\\
0 & 0 & a & 2a+b\\
0 & 0 & a & 3a+b
\end{vmatrix}
=\begin{vmatrix}
a & b & c & d\\
0 & a & a+b & a+b+c\\
0 & 0 & a & 2a+b\\
0 & 0 & 0 & a
\end{vmatrix}=a^4.
$$

为什么从最后一行开始：每一行都是前一行的“累积和”，后行减前行正好把累积部分消掉，露出下一层系数。若从上往下减，新的行会破坏下一行的结构，反而更繁。

### 利用对角线外的统一结构

**例** 计算 $n$ 阶行列式

$$
D=\begin{vmatrix}
1 & 1 & 1 & \cdots & 1\\
2 & 2 & 0 & \cdots & 0\\
4 & 0 & 3 & \cdots & 0\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
2^{n-1} & 0 & 0 & \cdots & n
\end{vmatrix}.
$$

第一行全为 $1$，其余各行除第一个元素和对角线元素外全为 $0$。用第 $i$ 行（$i=2,3,\dots,n$）消去第一行第 $i$ 列的元素：作

$$
r_1-\frac{1}{i}r_i,\qquad i=2,3,\dots,n.
$$

第 $i$ 行第 $i$ 列的元素为 $i$，乘以 $\frac1i$ 后正好是 $1$，于是第一行除第一个元素外全变为 $0$：

$$
D=\begin{vmatrix}
1-\displaystyle\sum_{i=2}^{n}\frac{1}{i}2^{i-1} & 0 & 0 & \cdots & 0\\
2 & 2 & 0 & \cdots & 0\\
4 & 0 & 3 & \cdots & 0\\
\vdots & \vdots & \vdots & \ddots & \vdots\\
2^{n-1} & 0 & 0 & \cdots & n
\end{vmatrix}.
$$

这是下三角形行列式，故

$$
D=\left(1-\sum_{i=2}^{n}\frac{2^{i-1}}{i}\right)\cdot 2\cdot 3\cdots n
=\left(1-\sum_{i=2}^{n}\frac{2^{i-1}}{i}\right)n!.
$$

注意到 $\sum_{i=2}^n \frac{2^{i-1}}{i}$ 的第一项是 $\frac{2}{2}=1$，与前面的 $1$ 相消，所以还可写成

$$
D=-\sum_{i=3}^{n}\frac{2^{i-1}}{i}\,n!.
$$

例如 $n=5$ 时，

$$
D=-\left(\frac{4}{3}+\frac{8}{4}+\frac{16}{5}\right)\cdot120
=-\left(\frac{4}{3}+2+\frac{16}{5}\right)\cdot120=-784.
$$

### 解方程

**例** 解方程

$$
\begin{vmatrix}
a_1 & a_2 & a_3 & \cdots & a_{n-1} & a_n\\
a_1 & a_1+a_2-x & a_3 & \cdots & a_{n-1} & a_n\\
a_1 & a_2 & a_2+a_3-x & \cdots & a_{n-1} & a_n\\
\vdots & \vdots & \vdots & \ddots & \vdots & \vdots\\
a_1 & a_2 & a_3 & \cdots & a_{n-2}+a_{n-1}-x & a_n\\
a_1 & a_2 & a_3 & \cdots & a_{n-1} & a_{n-1}+a_n-x
\end{vmatrix}=0.
$$

先求行列式。每一行只有主对角线上的元素与第一行不同，把第 $2,3,\dots,n$ 行分别减去第一行：

$$
D=\begin{vmatrix}
a_1 & a_2 & a_3 & \cdots & a_{n-1} & a_n\\
0 & a_1-x & 0 & \cdots & 0 & 0\\
0 & 0 & a_2-x & \cdots & 0 & 0\\
\vdots & \vdots & \vdots & \ddots & \vdots & \vdots\\
0 & 0 & 0 & \cdots & a_{n-2}-x & 0\\
0 & 0 & 0 & \cdots & 0 & a_{n-1}-x
\end{vmatrix}.
$$

这是上三角形行列式，故

$$
D=a_1(a_1-x)(a_2-x)\cdots(a_{n-1}-x)=0.
$$

若 $a_1\ne 0$，解为

$$
x=a_1,\ a_2,\ \dots,\ a_{n-1},
$$

共 $n-1$ 个根。注意条件 $a_1\ne 0$：若 $a_1=0$，则 $D$ 恒等于 $0$，方程对任意 $x$ 都成立，不再只有这 $n-1$ 个根。

### 思考题：$abcd=1$

**例** 已知 $abcd=1$，计算

$$
D=\begin{vmatrix}
a^2+\dfrac{1}{a^2} & a & \dfrac{1}{a} & 1\\[6pt]
b^2+\dfrac{1}{b^2} & b & \dfrac{1}{b} & 1\\[6pt]
c^2+\dfrac{1}{c^2} & c & \dfrac{1}{c} & 1\\[6pt]
d^2+\dfrac{1}{d^2} & d & \dfrac{1}{d} & 1
\end{vmatrix}.
$$

第一列是两项之和，按性质 4.4(1) 拆成两个行列式：

$$
D=
\begin{vmatrix}
a^2 & a & \dfrac1a & 1\\[6pt]
b^2 & b & \dfrac1b & 1\\[6pt]
c^2 & c & \dfrac1c & 1\\[6pt]
d^2 & d & \dfrac1d & 1
\end{vmatrix}
+
\begin{vmatrix}
\dfrac{1}{a^2} & a & \dfrac1a & 1\\[6pt]
\dfrac{1}{b^2} & b & \dfrac1b & 1\\[6pt]
\dfrac{1}{c^2} & c & \dfrac1c & 1\\[6pt]
\dfrac{1}{d^2} & d & \dfrac1d & 1
\end{vmatrix}.
$$

第一个行列式从第 1、2、3、4 行分别提出 $a,b,c,d$，得

$$
abcd\,
\begin{vmatrix}
a & 1 & \dfrac{1}{a^2} & \dfrac1a\\[6pt]
b & 1 & \dfrac{1}{b^2} & \dfrac1b\\[6pt]
c & 1 & \dfrac{1}{c^2} & \dfrac1c\\[6pt]
d & 1 & \dfrac{1}{d^2} & \dfrac1d
\end{vmatrix}
=abcd\,\Delta,
$$

其中记

$$
\Delta=
\begin{vmatrix}
a & 1 & \dfrac{1}{a^2} & \dfrac1a\\[6pt]
b & 1 & \dfrac{1}{b^2} & \dfrac1b\\[6pt]
c & 1 & \dfrac{1}{c^2} & \dfrac1c\\[6pt]
d & 1 & \dfrac{1}{d^2} & \dfrac1d
\end{vmatrix}.
$$

第二个行列式的列依次为 $\left(\frac1{a^2},a,\frac1a,1\right)$。把列作置换

$$
(1\ 3\ 4\ 2),
$$

即把第 1 列移到第 3 列、第 3 列移到第 4 列、第 4 列移到第 2 列、第 2 列移到第 1 列，得到列顺序 $\left(a,1,\frac1{a^2},\frac1a\right)$，正好是 $\Delta$ 的列。这个置换是 4-循环，属于奇置换，故第二个行列式等于 $-\Delta$。于是

$$
D=abcd\,\Delta-\Delta=(abcd-1)\Delta.
$$

已知 $abcd=1$，所以

$$
D=0.
$$

这个解法的关键不是硬算四阶行列式，而是利用“第一列拆开后，两个行列式只差一个列置换”的对称性；条件 $abcd=1$ 正好让两个系数相消。

### 补充：带分数系数的四阶行列式

**例** 计算

$$
D=\begin{vmatrix}
3 & -1 & 5 & 4\\
1 & 2 & 6 & 2\\
2 & \frac12 & 0 & -3\\
1 & \frac16 & 2 & \frac23
\end{vmatrix}.
$$

先清除第三、四行的分数：第三行乘以 $2$，第四行乘以 $6$，行列式外乘 $\frac12\cdot\frac16=\frac1{12}$：

$$
D=\frac1{12}\begin{vmatrix}
3 & -1 & 5 & 4\\
1 & 2 & 6 & 2\\
4 & 1 & 0 & -6\\
6 & 1 & 12 & 4
\end{vmatrix}.
$$

交换第一、二行，使第一列出现 $1$，外添负号：

$$
D=-\frac1{12}\begin{vmatrix}
1 & 2 & 6 & 2\\
3 & -1 & 5 & 4\\
4 & 1 & 0 & -6\\
6 & 1 & 12 & 4
\end{vmatrix}.
$$

用第一行消去第一列其余元素：作 $r_2-3r_1$、$r_3-4r_1$、$r_4-6r_1$：

$$
D=-\frac1{12}\begin{vmatrix}
1 & 2 & 6 & 2\\
0 & -7 & -13 & -2\\
0 & -7 & -24 & -14\\
0 & -11 & -24 & -8
\end{vmatrix}.
$$

按第一列展开，化为三阶行列式：

$$
D=-\frac1{12}\begin{vmatrix}
-7 & -13 & -2\\
-7 & -24 & -14\\
-11 & -24 & -8
\end{vmatrix}.
$$

计算三阶行列式：

$$
\begin{aligned}
\begin{vmatrix}
-7 & -13 & -2\\
-7 & -24 & -14\\
-11 & -24 & -8
\end{vmatrix}
&=-7\big[(-24)(-8)-(-14)(-24)\big]\\
&\quad-(-13)\big[(-7)(-8)-(-14)(-11)\big]\\
&\quad+(-2)\big[(-7)(-24)-(-24)(-11)\big]\\
&=-7(192-336)+13(56-154)-2(168-264)\\
&=1008-1274+192=-74.
\end{aligned}
$$

所以

$$
D=-\frac1{12}\times(-74)=\frac{37}{6}.
$$

这个例子说明：系数出现分数时，先把某几行的分母清掉，把问题化成整数行列式；清分数时提出来的因子要记在行列式外，最后一起还原。

## 课堂小结

- **基本性质与推论**：转置不变；零行（列）为零；交换两行（列）变号；两行（列）相同为零；一行（列）可拆成两个行列式之和、公因子可提取；两行（列）成比例为零；倍加变换不改值。
- **行与列地位对等**：每条对行成立的性质，对列也成立。
- **计算主线**：用倍加变换把主对角线下方（或上方）逐列消成零，化为三角形行列式，再把主对角线元素相乘。
- **换行、换列必须变号**；提取公因子时，外系数要一直保留，直到最后一步。
- **先看结构再动手**：各行和相同可把各列加到第一列；出现两行相同或成比例应立即判零；逐行作差适合“累积和”型行列式。
- **常见结果**：对角线为 $a$、其余为 $b$ 的 $n$ 阶行列式等于 $[a+(n-1)b](a-b)^{n-1}$；$abcd=1$ 的对称四阶行列式可用拆分加列置换化为 $(abcd-1)\Delta$。
- **易错点**：拆分行列式时一次拆两行；换行后忘记添负号；提取公因子后外系数丢失；把“两行成比例”误判为“两行元素和相等”。
