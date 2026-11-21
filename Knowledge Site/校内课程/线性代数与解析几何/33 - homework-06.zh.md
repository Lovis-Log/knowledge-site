---
slug: "homework-06"
title: "第 6 次作业（线性方程组与向量组）"
summary: "第 6 次作业 8 道题的题面与补充解答。"
updatedAt: "2026-11-17"
content_type: "reference"
group: "homework"
displayNumber: "06"
tags:
  - "线性代数"
  - "解析几何"
sources:
  - kind: article
    title: "6.jpg，本次作业第 1—8 题"
    url: "https://drive.google.com/file/d/1PmNuamYKsG5CIToZEbKedAgLsgWc2XZu/view?usp=drivesdk"
---

本次作业为滚动截图，含第 1—8 道主观题。解答均为新增，标注「补充解答」。



## 1.(1)

<!-- homework-topic: 解五元近三角形线性方程组 -->

解线性方程组

$$
\begin{cases}
x_1+2x_2-5x_3+4x_4+x_5=4,\\
3x_1+7x_2-x_3-3x_4+2x_5=10,\\
-x_2-13x_3-2x_4+x_5=-14,\\
x_3-16x_4+2x_5=-11,\\
2x_4+5x_5=12 .
\end{cases}
$$

**补充解答**

方程组已是「近三角形」，用初等行变换自上而下消元即可。记第 $i$ 式为 $(i)$。

$(2)-3(1)$ 得

$$
x_2+14x_3-15x_4-x_5=-2 .\tag{2'}
$$

$(3)+(2')$ 得

$$
x_3-17x_4=-16 .\tag{3'}
$$

把 $(4)$ 与 $(3')$ 相减：

$$
(x_3-16x_4+2x_5)-(x_3-17x_4)=-11-(-16)
\Longrightarrow x_4+2x_5=5 .\tag{4'}
$$

$(4')$ 与 $(5)$ 联立：

$$
\begin{cases}x_4+2x_5=5\\ 2x_4+5x_5=12\end{cases}
\Longrightarrow x_5=2,\quad x_4=1 .
$$

回代：由 $(4)$ 得 $x_3=-11+16x_4-2x_5=-11+16-4=1$；由 $(2')$ 得
$x_2=-2-14x_3+15x_4+x_5=-2-14+15+2=1$；由 $(1)$ 得
$x_1=4-2x_2+5x_3-4x_4-x_5=4-2+5-4-2=1$。

故

$$
(x_1,x_2,x_3,x_4,x_5)=(1,1,1,1,2).
$$

**验算（代回五式）**：$1+2-5+4+2=4$ ✓；$3+7-1-3+4=10$ ✓；$-1-13-2+2=-14$ ✓；$1-16+4=-11$ ✓；$2+10=12$ ✓。

**说明**：上面的消元只用了「某行减去另一行的倍数」，行列式不变，最终矩阵为上三角且对角元全为 $1$，故系数行列式 $|A|=1\ne0$，方程组有唯一解，回代过程中不会出现自由未知量。

---

## 2.

<!-- homework-topic: 将 β 表为 Hadamard 型向量组的组合 -->

设

$$
\boldsymbol\beta=(1,2,1,1),\quad
\boldsymbol\alpha_1=(1,1,1,1),\quad
\boldsymbol\alpha_2=(1,1,-1,-1),
$$
$$
\boldsymbol\alpha_3=(1,-1,1,-1),\quad
\boldsymbol\alpha_4=(1,-1,-1,1).
$$

将 $\boldsymbol\beta$ 表示为 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3,\boldsymbol\alpha_4$ 的线性组合。

**补充解答**

$\boldsymbol\alpha_i$ 是四维的 Hadamard 型向量组：两两正交，且每个的模都是 $2$。于是求系数不必解方程组，用内积即可「投影」出来。设 $\boldsymbol\beta=\sum c_i\boldsymbol\alpha_i$，两边与 $\boldsymbol\alpha_j$ 作内积，利用正交性得

$$
\boldsymbol\beta\cdot\boldsymbol\alpha_j=c_j\|\boldsymbol\alpha_j\|^2=4c_j .
$$

逐一计算内积：

$$
\boldsymbol\beta\cdot\boldsymbol\alpha_1=1+2+1+1=5,\quad
\boldsymbol\beta\cdot\boldsymbol\alpha_2=1+2-1-1=1,
$$
$$
\boldsymbol\beta\cdot\boldsymbol\alpha_3=1-2+1-1=-1,\quad
\boldsymbol\beta\cdot\boldsymbol\alpha_4=1-2-1+1=-1 .
$$

故

$$
c_1=\frac54,\quad c_2=\frac14,\quad c_3=-\frac14,\quad c_4=-\frac14,
$$

$$
\begin{aligned}
\boldsymbol\beta={}&\frac54\boldsymbol\alpha_1+\frac14\boldsymbol\alpha_2\\
&-\frac14\boldsymbol\alpha_3-\frac14\boldsymbol\alpha_4 .
\end{aligned}
$$

**验算**：右边第一个分量为 $\frac14(5+1-1-1)=1$，第二个为 $\frac14(5+1+1+1)=2$，第三个为 $\frac14(5-1-1+1)=1$，第四个为 $\frac14(5-1+1-1)=1$，恰为 $\boldsymbol\beta$ ✓。

---

## 3.

<!-- homework-topic: 判断四个三维向量的相关性与部分组无关性 -->

设

$$
\boldsymbol\alpha_1=(3,-1,1),\quad \boldsymbol\alpha_2=(1,1,2),\quad
\boldsymbol\alpha_3=(1,-3,-3),\quad \boldsymbol\alpha_4=(4,0,5).
$$

(1) 证明 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3,\boldsymbol\alpha_4$ 线性相关；
(2) 证明 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_4$ 线性无关。

**补充解答**

**(1)** 四个向量都是 $\mathbb{R}^3$ 中的向量。把 $n$ 个向量写成 $3\times4$ 矩阵（每个向量作一列），其秩不超过行数 $3$，而列数为 $4$，故列向量组必线性相关。

具体可见 $\boldsymbol\alpha_3=\boldsymbol\alpha_1-2\boldsymbol\alpha_2$：

$$
(3,-1,1)-2(1,1,2)=(1,-3,-3)=\boldsymbol\alpha_3 .
$$

非平凡的线性组合 $\boldsymbol\alpha_1-2\boldsymbol\alpha_2-\boldsymbol\alpha_3=\boldsymbol 0$ 已存在，故四个向量线性相关。

**(2)** 把三个向量作列排成方阵，算行列式：

$$
\begin{vmatrix}
3&1&4\\
-1&1&0\\
1&2&5
\end{vmatrix}
=3(5-0)-1(-5-0)+4(-2-1)=15+5-12=8\ne0 .
$$

行列式非零 $\iff$ 三列线性无关，故 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_4$ 线性无关。

**补充说明**：$\boldsymbol\alpha_4\notin\operatorname{span}\{\boldsymbol\alpha_1,\boldsymbol\alpha_2\}$（否则由 (1) 四个向量的秩只有 $2$），所以由相关组中挑出的这三个向量恰好构成该向量组的一个极大无关组，秩为 $3$。

---

## 4.

<!-- homework-topic: 证明 α₁、α₁+α₂、α₁+α₂+α₃ 无关 -->

设向量组 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3$ 线性无关。证明：向量组

$$
\boldsymbol\alpha_1,\ \boldsymbol\alpha_1+\boldsymbol\alpha_2,\ \boldsymbol\alpha_1+\boldsymbol\alpha_2+\boldsymbol\alpha_3
$$

也线性无关。

**补充解答**

设有数 $x_1,x_2,x_3$ 使

$$
\begin{aligned}
&x_1\boldsymbol\alpha_1+x_2(\boldsymbol\alpha_1+\boldsymbol\alpha_2)\\
&\quad+x_3(\boldsymbol\alpha_1+\boldsymbol\alpha_2+\boldsymbol\alpha_3)=\boldsymbol 0 .
\end{aligned}
$$

按 $\boldsymbol\alpha_i$ 合并同类项：

$$
(x_1+x_2+x_3)\boldsymbol\alpha_1+(x_2+x_3)\boldsymbol\alpha_2+x_3\boldsymbol\alpha_3=\boldsymbol 0 .
$$

已知 $\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3$ 线性无关，故三个系数全为零：

$$
x_3=0,\qquad x_2+x_3=0,\qquad x_1+x_2+x_3=0 .
$$

由第一式 $x_3=0$，代入第二式得 $x_2=0$，再代入第三式得 $x_1=0$。于是只有零解，向量组线性无关。

**另一种写法（矩阵角度）**：新组由旧组经过渡矩阵

$$
C=\begin{pmatrix}1&1&1\\0&1&1\\0&0&1\end{pmatrix}
$$

线性表示（$(\boldsymbol\beta_1,\boldsymbol\beta_2,\boldsymbol\beta_3)=(\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3)C$），而 $|C|=1\ne0$，故两组的秩相同，均为 $3$，新组也线性无关。

---

## 6.

<!-- homework-topic: 求两组基之间的过渡矩阵 -->

在 $\mathbb{R}^3$ 中，求由基

$$
\boldsymbol\alpha_1=(1,2,-1),\ \boldsymbol\alpha_2=(1,-1,1),\ \boldsymbol\alpha_3=(-1,2,1)
$$

到基

$$
\boldsymbol\beta_1=(2,0,1),\ \boldsymbol\beta_2=(0,1,-1),\ \boldsymbol\beta_3=(1,1,2)
$$

的过渡矩阵。

**补充解答**

过渡矩阵 $C$ 的定义是

$$
(\boldsymbol\beta_1,\boldsymbol\beta_2,\boldsymbol\beta_3)=(\boldsymbol\alpha_1,\boldsymbol\alpha_2,\boldsymbol\alpha_3)\,C,
$$

即 $C$ 的第 $j$ 列就是 $\boldsymbol\beta_j$ 在基 $\{\boldsymbol\alpha_i\}$ 下的坐标。记 $A,B$ 分别是以 $\boldsymbol\alpha_i$、$\boldsymbol\beta_j$ 为列的矩阵，则 $B=AC$，故 $C=A^{-1}B$。

$$
A=\begin{pmatrix}1&1&-1\\2&-1&2\\-1&1&1\end{pmatrix},\qquad
B=\begin{pmatrix}2&0&1\\0&1&-1\\1&1&2\end{pmatrix}.
$$

$|A|=-8\ne0$，$A$ 可逆：

$$
A^{-1}=\begin{pmatrix}\frac38&\frac14&-\frac18\\[3pt]\frac12&0&\frac12\\[3pt]-\frac18&\frac14&\frac38\end{pmatrix}.
$$

于是

$$
C=A^{-1}B=
\begin{pmatrix}
\dfrac58&\dfrac18&-\dfrac18\\[4pt]
\dfrac32&\dfrac12&\dfrac32\\[4pt]
\dfrac18&\dfrac58&\dfrac38
\end{pmatrix}.
$$

**验算**：取 $C$ 的第 1 列 $(\frac58,\frac32,\frac18)^{\mathrm T}$，按坐标组合
$\frac58\boldsymbol\alpha_1+\frac32\boldsymbol\alpha_2+\frac18\boldsymbol\alpha_3$
$=(\frac58+\frac32-\frac18,\ \frac54-\frac32+\frac14,\ -\frac58+\frac32+\frac18)=(2,0,1)=\boldsymbol\beta_1$ ✓；第 2、3 列同样可验证得到 $\boldsymbol\beta_2,\boldsymbol\beta_3$ ✓。

---

## 7.

<!-- homework-topic: 求过渡矩阵及向量在两组基下的坐标 -->

已知

$$
\boldsymbol\alpha_1=(1,0,0),\ \boldsymbol\alpha_2=(1,1,0),\ \boldsymbol\alpha_3=(1,1,1),
$$
$$
\boldsymbol\beta_1=(1,2,3),\ \boldsymbol\beta_2=(2,3,1),\ \boldsymbol\beta_3=(3,1,2)
$$

是 $\mathbb{R}^3$ 的两组基。

(1) 求由基 $\{\boldsymbol\alpha_i\}$ 到基 $\{\boldsymbol\beta_i\}$ 的过渡矩阵；
(2) 求向量 $\boldsymbol\alpha=(1,0,1)$ 在这两组基下的坐标。

**补充解答**

**(1)** 同第 6 题，$C=A^{-1}B$，其中

$$
A=\begin{pmatrix}1&1&1\\0&1&1\\0&0&1\end{pmatrix},\qquad
B=\begin{pmatrix}1&2&3\\2&3&1\\3&1&2\end{pmatrix}.
$$

$|A|=1$，且 $A^{-1}=\begin{pmatrix}1&-1&0\\0&1&-1\\0&0&1\end{pmatrix}$，故

$$
C=\begin{pmatrix}1&-1&0\\0&1&-1\\0&0&1\end{pmatrix}
\begin{pmatrix}1&2&3\\2&3&1\\3&1&2\end{pmatrix}
=\begin{pmatrix}-1&-1&2\\-1&2&-1\\3&1&2\end{pmatrix}.
$$

**(2)** $\boldsymbol\alpha$ 在基 $\{\boldsymbol\alpha_i\}$ 下的坐标 $x$ 满足 $Ax=(1,0,1)^{\mathrm T}$。由上三角结构直接回代：$x_3=1$，$x_2=0-x_3=-1$，$x_1=1-x_2-x_3=1+1-1=1$，即

$$
\boldsymbol\alpha=1\cdot\boldsymbol\alpha_1-1\cdot\boldsymbol\alpha_2+1\cdot\boldsymbol\alpha_3,\qquad
\text{坐标为 }(1,-1,1)^{\mathrm T}.
$$

在基 $\{\boldsymbol\beta_i\}$ 下的坐标 $y$ 满足 $By=(1,0,1)^{\mathrm T}$。解之得

$$
y=\left(\frac19,-\frac29,\frac49\right)^{\mathrm T}.
$$

**验算**：$\frac19\boldsymbol\beta_1-\frac29\boldsymbol\beta_2+\frac49\boldsymbol\beta_3
=\frac19\bigl[(1,2,3)-2(2,3,1)+4(3,1,2)\bigr]=\frac19(9,0,9)=(1,0,1)$ ✓。

**补充说明**：同一向量在两基下的坐标由 $y=C^{-1}x$ 联系，也可用上式直接验算 $C y=x$：$C(1/9,-2/9,4/9)^{\mathrm T}=(1,-1,1)^{\mathrm T}$ ✓。

---


## 8.

<!-- homework-topic: 求向量在给定基下的坐标 -->

在 $\mathbb{R}^3$ 中求向量 $\boldsymbol\alpha=(3,7,1)$ 在基

$$
\boldsymbol\alpha_1=(1,3,5),\quad \boldsymbol\alpha_2=(6,3,2),\quad \boldsymbol\alpha_3=(3,1,0)
$$

下的坐标。

**补充解答**

设坐标为 $(x_1,x_2,x_3)^{\mathrm T}$，即解方程组

$$
\begin{cases}
x_1+6x_2+3x_3=3,\\
3x_1+3x_2+x_3=7,\\
5x_1+2x_2=1 .
\end{cases}
$$

系数行列式按第 3 行展开：

$$
|A|=\begin{vmatrix}1&6&3\\3&3&1\\5&2&0\end{vmatrix}
=5(6\cdot1-3\cdot3)-2(1\cdot1-3\cdot3)=5(-3)-2(-8)=1\ne0,
$$

故坐标唯一存在。

由第 3 式 $x_2=\dfrac{1-5x_1}{2}$，代入第 1 式：

$$
x_1+3(1-5x_1)+3x_3=3\Longrightarrow -14x_1+3x_3=0\Longrightarrow x_3=\frac{14x_1}{3}.
$$

再把 $x_2,x_3$ 的表达式代入第 2 式并乘以 6：

$$
18x_1+9(1-5x_1)+28x_1=42\Longrightarrow x_1+9=42\Longrightarrow x_1=33 .
$$

于是

$$
x_2=\frac{1-165}{2}=-82,\qquad x_3=\frac{14\cdot33}{3}=154 .
$$

**验算**：$33\boldsymbol\alpha_1-82\boldsymbol\alpha_2+154\boldsymbol\alpha_3$
$=(33,99,165)-(492,246,164)+(462,154,0)=(3,7,1)$ ✓。

故所求坐标为

$$
(33,\,-82,\,154)^{\mathrm T}.
$$

---

## 9.

<!-- homework-topic: 求两组基下坐标相同的向量 -->

在 $\mathbb{R}^4$ 中找一个向量 $\boldsymbol\gamma$，使它在标准基 $\boldsymbol\varepsilon_1,\boldsymbol\varepsilon_2,\boldsymbol\varepsilon_3,\boldsymbol\varepsilon_4$ 和基

$$
\boldsymbol\beta_1=(2,1,-1,1),\ \boldsymbol\beta_2=(0,3,1,0),\
\boldsymbol\beta_3=(5,3,2,1),\ \boldsymbol\beta_4=(6,6,1,3)
$$

下有相同的坐标。

**补充解答**

设公共坐标为 $x=(x_1,x_2,x_3,x_4)^{\mathrm T}$。在标准基下 $\boldsymbol\gamma=\sum x_i\boldsymbol\varepsilon_i$，在 $\{\boldsymbol\beta_i\}$ 下 $\boldsymbol\gamma=\sum x_i\boldsymbol\beta_i$。两者相等：

$$
\sum_i x_i\boldsymbol\varepsilon_i=\sum_i x_i\boldsymbol\beta_i
\Longrightarrow (E-B)x=\boldsymbol 0,
$$

其中 $B$ 以 $\boldsymbol\beta_i$ 为列。故所求即 $E-B$ 的非零解。

$$
E-B=\begin{pmatrix}
-1&0&-5&-6\\
-1&-2&-3&-6\\
1&-1&-1&-1\\
-1&0&-1&-2
\end{pmatrix}.
$$

对这个矩阵作初等行变换（$r_4-r_1$，$r_2-r_1$，再消去第 3 行），可得行最简形

$$
\begin{pmatrix}
1&0&0&1\\
0&1&0&1\\
0&0&1&1\\
0&0&0&0
\end{pmatrix},
$$

故 $r(E-B)=3$，$|E-B|=0$，解空间是一维的，通解为

$$
x_1=x_2=x_3=-t,\qquad x_4=t .
$$

取 $t=1$ 得 $x=(-1,-1,-1,1)^{\mathrm T}$，于是

$$
\boldsymbol\gamma=-\boldsymbol\beta_1-\boldsymbol\beta_2-\boldsymbol\beta_3+\boldsymbol\beta_4 .
$$

**计算与验算**：

$$
\boldsymbol\gamma=-(2,1,-1,1)-(0,3,1,0)-(5,3,2,1)+(6,6,1,3)=(-1,-1,-1,1).
$$

它在标准基下的坐标显然是 $(-1,-1,-1,1)$；而在基 $\{\boldsymbol\beta_i\}$ 下的坐标也是 $(-1,-1,-1,1)$（上式就是按这些系数组合的），故坐标相同 ✓。

**说明**：$t\ne0$ 时 $t(-1,-1,-1,1)$ 都满足要求，题目只要求「找一个」，故取 $t=1$ 最简单。

---

## 易错点

1. 过渡矩阵的方向：$(\boldsymbol\beta_1,\cdots,\boldsymbol\beta_n)=(\boldsymbol\alpha_1,\cdots,\boldsymbol\alpha_n)C$，求 $C$ 要解 $AC=B$，写成 $C=BA^{-1}$ 就错了。
2. 向量在两组基下的坐标由 $y=C^{-1}x$ 联系，不要把 $C$ 直接作用在坐标上（方向反了）。
3. 证明「$\boldsymbol\alpha_1,\boldsymbol\alpha_1+\boldsymbol\alpha_2,\boldsymbol\alpha_1+\boldsymbol\alpha_2+\boldsymbol\alpha_3$ 无关」时，必须把组合系数化到 $\boldsymbol\alpha_i$ 的系数再比较，不能凭「看起来像三角形」直接下结论。
4. 求极大无关组时，题目若指定「包含某几个向量」，必须逐一检查这些向量是否真在组内且线性无关，不能只按秩的最大性挑选。
5. 找「两组基下坐标相同」的向量，本质是解 $(E-B)x=0$；只有当 $|E-B|=0$ 时才有非零解，若算出 $|E-B|\ne0$ 应立刻回查矩阵是否抄错。
