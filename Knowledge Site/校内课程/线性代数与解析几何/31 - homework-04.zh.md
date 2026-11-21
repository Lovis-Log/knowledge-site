---
slug: "homework-04"
title: "第 4 次作业（习题四）"
summary: "第 4 次作业 9 道题的题面与补充解答。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "homework"
displayNumber: "04"
tags:
  - "线性代数"
  - "解析几何"
sources:
  - kind: article
    title: "4.jpg，本次作业第 1—9 题"
    url: "https://drive.google.com/file/d/1CK6u8VVHsHkh0Zljr2ZXSFNd5LBx4wks/view?usp=drivesdk"
---

本次作业为滚动截图，含第 1—9 道主观题。解答均为新增，标注「补充解答」。



## 15.(1)

<!-- homework-topic: 分块对角矩阵的秩与逆 -->

计算矩阵的秩；若为满秩，求其逆矩阵：

$$
A=\begin{pmatrix}2&0&0\\0&2&-1\\0&3&5\end{pmatrix}.
$$

**补充解答**

**秩。** $A$ 是分块对角阵 $\begin{pmatrix}2&0\\0&B\end{pmatrix}$，$B=\begin{pmatrix}2&-1\\3&5\end{pmatrix}$。$|B|=2\cdot5-(-1)\cdot3=13\ne0$，故

$$
|A|=2\cdot13=26\ne0,
$$

从而 $A$ 满秩，$r(A)=3$。

**逆矩阵。** 分块对角阵的逆仍为分块对角阵，各块取逆：

$$
A^{-1}=\begin{pmatrix}\dfrac12&0\\[4pt]0&B^{-1}\end{pmatrix},\qquad
B^{-1}=\frac{1}{13}\begin{pmatrix}5&1\\-3&2\end{pmatrix},
$$

即

$$
A^{-1}=
\begin{pmatrix}
\dfrac12&0&0\\[4pt]
0&\dfrac{5}{13}&\dfrac{1}{13}\\[4pt]
0&-\dfrac{3}{13}&\dfrac{2}{13}
\end{pmatrix}.
$$

**验算**：左边 $A A^{-1}$ 的第一行为 $(2,0,0)\cdot A^{-1}=(1,0,0)$；第二行为 $(0,2,-1)$ 与各列作内积：第 1 列 $(0,\tfrac{5}{13},-\tfrac{3}{13})$ 给 $0+\tfrac{10}{13}+\tfrac{3}{13}=1$，第 2 列 $(0,\tfrac{1}{13},\tfrac{2}{13})$ 给 $\tfrac{2}{13}-\tfrac{2}{13}=0$，第 3 列 $(0,0,\cdot)$ 给 $-\tfrac{2}{13}+\tfrac{2}{13}=0$；第三行 $(0,3,5)$ 同理给出 $(0,0,1)$。故 $A A^{-1}=E$ ✓。

---

## 16.

<!-- homework-topic: 循环移位矩阵的逆 -->

求 $n$ 阶矩阵

$$
A=\begin{pmatrix}
0&a_1&0&\cdots&0\\
0&0&a_2&\cdots&0\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
0&0&0&\cdots&a_{n-1}\\
a_n&0&0&\cdots&0
\end{pmatrix}
$$

的逆矩阵。

**补充解答**

思路：$A$ 是「每行只有一个非零元」的循环移位结构，可以写成「对角阵 $\times$ 置换阵」，而置换阵的逆就是它的转置。

**第一步：分解。** 记 $D=\operatorname{diag}(a_1,a_2,\cdots,a_n)$，$P$ 为把第 $i+1$ 列的 1 移到第 $i$ 列（并把第 1 列移到第 $n$ 列）的置换阵，即

$$
P=\begin{pmatrix}
0&1&0&\cdots&0\\
0&0&1&\cdots&0\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
0&0&0&\cdots&1\\
1&0&0&\cdots&0
\end{pmatrix}.
$$

则 $A=DP$：$DP$ 的第 $i$ 行是 $a_i$ 乘 $P$ 的第 $i$ 行，即 $a_i$ 位于第 $i+1$ 列（$i<n$），第 $n$ 行是 $a_n$ 位于第 1 列，与 $A$ 完全一致。

**第二步：求逆。** $|A|=(-1)^{n-1}a_1a_2\cdots a_n$（$P$ 对应一个 $n$ 轮换，符号 $(-1)^{n-1}$），故 $A$ 可逆当且仅当所有 $a_i\ne0$。此时

$$
A^{-1}=P^{-1}D^{-1}=P^{\mathrm T}D^{-1}.
$$

$P^{\mathrm T}$ 在 $(j+1,j)$（$j=1,\cdots,n-1$）与 $(1,n)$ 处为 1，再右乘 $D^{-1}$ 等于把第 $j$ 列整体除以 $a_j$。于是

$$
A^{-1}=
\begin{pmatrix}
0&0&\cdots&0&\dfrac{1}{a_n}\\[4pt]
\dfrac{1}{a_1}&0&\cdots&0&0\\[4pt]
0&\dfrac{1}{a_2}&\cdots&0&0\\
\vdots&\vdots&\ddots&\vdots&\vdots\\
0&0&\cdots&\dfrac{1}{a_{n-1}}&0
\end{pmatrix},
$$

即次对角线上依次为 $\frac{1}{a_1},\frac{1}{a_2},\cdots,\frac{1}{a_{n-1}}$，右上角为 $\frac{1}{a_n}$。

**验算（$n=4$）**：设 $a_i\ne0$，直接验证 $AA^{-1}=E$：第 1 行 $(0,a_1,0,0)$ 只与 $A^{-1}$ 的第 2 行 $(1/a_1,0,0,0)$ 相乘得 $1$，与其余行相乘得 $0$；第 4 行 $(a_4,0,0,0)$ 与第 1 行 $(0,0,0,1/a_4)$ 相乘得 $1$。其余同理 ✓。

---

## 17.

<!-- homework-topic: 解矩阵方程 AX=B（A 为上三角） -->

设

$$
A=\begin{pmatrix}
1&1&1&\cdots&1\\
0&1&1&\cdots&1\\
0&0&1&\cdots&1\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
0&0&0&\cdots&1
\end{pmatrix},\qquad
B=\begin{pmatrix}
2&1&0&\cdots&0\\
1&2&1&\cdots&0\\
0&1&2&\cdots&0\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
0&0&0&\cdots&2
\end{pmatrix},
$$

求矩阵 $X$，使 $A X=B$。

**补充解答**

**第一步：认出 $A^{-1}$。** 记 $N$ 为把每个元素上移一行、末行补零的移位阵（超对角线上全为 1）。则

$$
A=E+N+N^2+\cdots+N^{n-1},
$$

且 $N^n=0$。于是

$$
(E-N)A=(E-N)(E+N+\cdots+N^{n-1})=E-N^n=E,
$$

故 $A^{-1}=E-N$，即主对角线为 1、超对角线为 $-1$、其余为 0。

**第二步：解方程。** 由 $AX=B$ 得

$$
X=A^{-1}B=(E-N)B=B-NB .
$$

而 $NB$ 就是把 $B$ 的各行上移一行（$(NB)_{ij}=B_{i+1,j}$，末行为零）。所以 $X$ 的第 $i$ 行等于「$B$ 的第 $i$ 行减去第 $i+1$ 行」，末行仍是 $B$ 的末行。逐行算出（以 $n\ge4$ 为例）：

$$
X=\begin{pmatrix}
1&-1&-1&0&\cdots&0\\
1&1&-1&-1&\cdots&0\\
0&1&1&-1&\cdots&0\\
\vdots&\vdots&\vdots&\vdots&\ddots&\vdots\\
0&0&0&\cdots&1&2
\end{pmatrix},
$$

具体规律是：第 1 行为 $(1,-1,-1,0,\cdots,0)$；第 $i$ 行（$2\le i\le n-1$）在第 $i-1,i$ 列为 $1$、第 $i+1,i+2$ 列为 $-1$（仅保留未超过 $n$ 的列），其余为 $0$；第 $n$ 行为 $(0,\cdots,0,1,2)$。

**验算（$n=5$）**：得到的

$$
X=\begin{pmatrix}
1&-1&-1&0&0\\
1&1&-1&-1&0\\
0&1&1&-1&-1\\
0&0&1&1&-1\\
0&0&0&1&2
\end{pmatrix},
$$

用 $A$ 的第 1 行 $(1,1,1,1,1)$ 乘 $X$ 得 $(2,1,0,0,0)$，恰为 $B$ 的第 1 行；第 2 行 $(0,1,1,1,1)$ 乘 $X$ 得 $(1,2,1,0,0)$，恰为 $B$ 的第 2 行；末行 $(0,0,0,0,1)$ 乘 $X$ 得 $(0,0,0,1,2)$ ✓。

---

## 18.(1)

<!-- homework-topic: 用克拉默法则解三元线性方程组 -->

解线性方程组

$$
\begin{cases}
2x_1+3x_3=1,\\
3x_2-5x_3=-4,\\
-2x_1+3x_2+2x_3=4.
\end{cases}
$$

**补充解答**

系数行列式

$$
D=\begin{vmatrix}2&0&3\\0&3&-5\\-2&3&2\end{vmatrix}=2(6+15)-0+3(0+6)=60\ne0,
$$

故有唯一解。由第 1、2 式先解出 $x_1,x_3$ 关于 $x_2$ 的表达式并不方便，直接用 Cramer 法则：

$$
D_1=\begin{vmatrix}1&0&3\\-4&3&-5\\4&3&2\end{vmatrix}=1(6+15)-0+3(-12-12)=-51,
$$
$$
D_2=\begin{vmatrix}2&1&3\\0&-4&-5\\-2&4&2\end{vmatrix}=2(-8+20)-1(0-10)+3(0-8)=10,
$$
$$
D_3=\begin{vmatrix}2&0&1\\0&3&-4\\-2&3&4\end{vmatrix}=2(12+12)-0+1(0+6)=54 .
$$

于是

$$
x_1=-\frac{51}{60}=-\frac{17}{20},\qquad x_2=\frac{10}{60}=\frac16,\qquad x_3=\frac{54}{60}=\frac{9}{10}.
$$

**验算（代回）**：
$2(-\tfrac{17}{20})+3(\tfrac{9}{10})=-\tfrac{17}{10}+\tfrac{27}{10}=1$ ✓；
$3(\tfrac16)-5(\tfrac{9}{10})=\tfrac12-\tfrac92=-4$ ✓；
$-2(-\tfrac{17}{20})+3(\tfrac16)+2(\tfrac{9}{10})=\tfrac{17}{10}+\tfrac12+\tfrac95=4$ ✓。

---

## 19.(1)

<!-- homework-topic: 求 A⁻¹B（B 为 A 的行循环置换） -->

设

$$
A=\begin{pmatrix}1&2&-1\\3&4&-2\\5&-3&1\end{pmatrix},\qquad
B=\begin{pmatrix}3&4&-2\\5&-3&1\\1&2&-1\end{pmatrix},
$$

求 $A^{-1}B$。

**补充解答**

观察到 $B$ 的三行恰好是 $A$ 的第 2、3、1 行，即 $B=PA$，其中

$$
P=\begin{pmatrix}0&1&0\\0&0&1\\1&0&0\end{pmatrix}.
$$

但 $A^{-1}B=A^{-1}(PA)$ 一般**不等于** $P$（$A^{-1}$ 与 $P$ 不可交换），所以仍需实际计算。

**第一步：求 $A^{-1}$。** $|A|=1(-2)-2(-13)+(-1)(-29)=-2+26+29=1$，故 $A^{-1}$ 就是伴随矩阵。各代数余子式

$$
A_{11}=-2,\ A_{12}=-13,\ A_{13}=-29;\quad A_{21}=1,\ A_{22}=6,\ A_{23}=13;\quad A_{31}=0,\ A_{32}=-1,\ A_{33}=-2,
$$

转置得

$$
A^{-1}=\begin{pmatrix}-2&1&0\\-13&6&-1\\-29&13&-2\end{pmatrix}.
$$

**第二步：相乘。**

$$
A^{-1}B=
\begin{pmatrix}-2&1&0\\-13&6&-1\\-29&13&-2\end{pmatrix}
\begin{pmatrix}3&4&-2\\5&-3&1\\1&2&-1\end{pmatrix}
=\begin{pmatrix}-1&-11&5\\-10&-72&33\\-24&-159&73\end{pmatrix}.
$$

**验算**：以第一行为例，$(-2)\cdot(3,4,-2)+1\cdot(5,-3,1)+0\cdot(1,2,-1)=(-6+5,\ -8-3,\ 4+1)=(-1,-11,5)$ ✓；再核 $A\cdot(A^{-1}B)=B$：$A$ 的第一行 $(1,2,-1)$ 与 $A^{-1}B$ 的第一列 $(-1,-10,-24)$ 相乘得 $-1-20+24=3$，正是 $B$ 的 $(1,1)$ 元 ✓。

---

## 21.

<!-- homework-topic: 分块上三角单位阵的逆 -->

求 $\begin{pmatrix}E_k&B\\0&E_l\end{pmatrix}$ 的逆矩阵，其中 $E_k,E_l$ 为单位阵，$B$ 为 $k\times l$ 矩阵。

**补充解答**

设 $X=\begin{pmatrix}X_{11}&X_{12}\\X_{21}&X_{22}\end{pmatrix}$ 为所求，按分块乘法：

$$
\begin{pmatrix}E_k&B\\0&E_l\end{pmatrix}
\begin{pmatrix}X_{11}&X_{12}\\X_{21}&X_{22}\end{pmatrix}
=
\begin{pmatrix}X_{11}+BX_{21}&X_{12}+BX_{22}\\X_{21}&X_{22}\end{pmatrix}.
$$

逐块对照单位阵的四块，得

$$
X_{11}+BX_{21}=E_k,\quad X_{12}+BX_{22}=0,\quad X_{21}=0,\quad X_{22}=E_l .
$$

由此 $X_{22}=E_l,\ X_{21}=0,\ X_{12}=-B,\ X_{11}=E_k$，即

$$
\begin{pmatrix}E_k&B\\0&E_l\end{pmatrix}^{-1}=\begin{pmatrix}E_k&-B\\0&E_l\end{pmatrix}.
$$

**验算**：
$\begin{pmatrix}E_k&B\\0&E_l\end{pmatrix}\begin{pmatrix}E_k&-B\\0&E_l\end{pmatrix}=\begin{pmatrix}E_k&-B+B\\0&E_l\end{pmatrix}=\begin{pmatrix}E_k&0\\0&E_l\end{pmatrix}=E_{k+l}$ ✓。

---

## 22.

<!-- homework-topic: 分块矩阵 (0 A; B C) 的逆 -->

设 $A,B,C$ 为同阶可逆方阵，求 $D=\begin{pmatrix}0&A\\B&C\end{pmatrix}$ 的逆矩阵。

**补充解答**

设 $D^{-1}=\begin{pmatrix}X_{11}&X_{12}\\X_{21}&X_{22}\end{pmatrix}$，按分块乘法展开 $DD^{-1}=E$：

$$
\begin{pmatrix}0&A\\B&C\end{pmatrix}
\begin{pmatrix}X_{11}&X_{12}\\X_{21}&X_{22}\end{pmatrix}
=\begin{pmatrix}AX_{21}&AX_{22}\\BX_{11}+CX_{21}&BX_{12}+CX_{22}\end{pmatrix}
=\begin{pmatrix}E&0\\0&E\end{pmatrix}.
$$

逐块求解：

- $AX_{21}=E\Rightarrow X_{21}=A^{-1}$；
- $AX_{22}=0\Rightarrow X_{22}=0$（$A$ 可逆）；
- $BX_{12}+CX_{22}=E\Rightarrow BX_{12}=E\Rightarrow X_{12}=B^{-1}$；
- $BX_{11}+CX_{21}=0\Rightarrow X_{11}=-B^{-1}CA^{-1}$。

于是

$$
D^{-1}=\begin{pmatrix}-B^{-1}CA^{-1}&B^{-1}\\A^{-1}&0\end{pmatrix}.
$$

**验算**：左乘回去，$(1,1)$ 块为 $A\cdot A^{-1}=E$；$(1,2)$ 块为 $A\cdot0=0$；$(2,1)$ 块为 $B(-B^{-1}CA^{-1})+C A^{-1}=0$；$(2,2)$ 块为 $B\cdot B^{-1}=E$ ✓。

**边界说明**：结论只用到 $A,B$ 可逆，$C$ 是否可逆不影响（它在公式中只以乘积 $CA^{-1}$ 出现）。

---

## 23.

<!-- homework-topic: 幂零矩阵下 (E−A)⁻¹ 的有限和 -->

如果 $A^k=0$（$k$ 为正整数），证明

$$
(E-A)^{-1}=E+A+A^2+\cdots+A^{k-1}.
$$

**补充解答**

记 $S=E+A+\cdots+A^{k-1}$。直接相乘，中间项全部相消：

$$
(E-A)S=E+A+\cdots+A^{k-1}-A-A^2-\cdots-A^{k}=E-A^k=E,
$$
$$
S(E-A)=E+A+\cdots+A^{k-1}-A-A^2-\cdots-A^{k}=E-A^k=E .
$$

两个方向都等于 $E$，按逆矩阵的定义（若存在 $S$ 使 $BS=SB=E$，则 $B$ 可逆且 $B^{-1}=S$），即得

$$
(E-A)^{-1}=S=E+A+A^2+\cdots+A^{k-1}.
$$

**说明**：这里不需要讨论 $E-A$ 是否奇异——上式已经构造出双侧逆，同时也就证明了 $E-A$ 可逆。幂零指数可以取最小的 $k$（此时 $A^{k-1}\ne0$），公式依然成立。

---

## 24.

<!-- homework-topic: 伴随矩阵行列式 |A*|=|A|^{n−1} -->

证明：$|A^*|=|A|^{n-1}$，其中 $A^*$ 为 $n$ 阶方阵 $A$ 的伴随矩阵。

**补充解答**

由伴随矩阵的基本关系 $AA^*=|A|E$，两边取行列式：

$$
|A|\,|A^*|=||A|E|=|A|^n .
$$

**情形一：$|A|\ne0$。** 两边除以 $|A|$ 即得 $|A^*|=|A|^{n-1}$。

**情形二：$|A|=0$。** 需单独论证 $|A^*|=0$（因不能除以零）。由 $AA^*=0$，$A^*$ 的每一列都属于 $A$ 的解空间 $\{\,x:Ax=0\,\}$，故

$$
r(A^*)\le n-r(A).
$$

- 若 $r(A)\le n-2$，则 $r(A^*)\le1$。当 $n\ge2$ 时 $r(A^*)<n$，故 $|A^*|=0=0^{n-1}$ ✓。
- 若 $r(A)=n-1$，则 $r(A^*)\le1$，同样 $|A^*|=0$（$n\ge2$ 时秩为 1 的矩阵行列式为零）✓。

两种情形合并即得 $|A^*|=|A|^{n-1}$ 对一切 $n\ge2$ 成立。

**补充说明**：也可以把 $|A^*|$ 看作矩阵元素的 $n^2$ 次多项式，它在 $|A|\ne0$ 的稠密开集上等于 $|A|^{n-1}$，而多项式在稠密集上相等即恒等，于是 $|A|=0$ 时等式自动成立。这条「连续性延拓」的思路与上面的秩讨论是等价的，前者更短，后者更符合课程内工具。

---

## 易错点

1. 分块矩阵求逆时，块的位置不能凭「对称感觉」填写；必须逐块乘出来对单位阵。22 题左乘时 $(2,1)$ 块是 $BX_{11}+CX_{21}$，不是 $X_{11}B+CX_{21}$。
2. $A^{-1}(PA)\ne P$：矩阵乘法不交换，19.(1) 若直接写 $P$ 就错了。
3. 16 题的逆在**次对角线**上，不在主对角线；同时别忘了可逆条件 $a_i\ne0$ 与 $|A|=(-1)^{n-1}a_1\cdots a_n$。
4. 23 题必须写「双侧」乘积都为 $E$，只证 $(E-A)S=E$ 还需说明 $S$ 与 $E-A$ 可交换（本题中 $S$ 是 $A$ 的多项式，显然可交换，但要写出来）。
5. 24 题在 $|A|=0$ 时不能沿用 $|A||A^*|=|A|^n$ 直接相除，必须用秩或连续性论证补上。
