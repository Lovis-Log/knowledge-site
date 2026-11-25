---
slug: "homework-02"
title: "第 2 次作业（行列式的性质与计算）"
summary: "第 2 次作业 5 道题的题面与补充解答。"
updatedAt: "2026-11-25"
content_type: "reference"
group: "homework"
displayNumber: "02"
tags:
  - "线性代数"
  - "解析几何"
sources:
  - kind: article
    title: "2.jpg，本次作业第 1—5 题"
    url: "https://drive.google.com/file/d/1fpPLXO8zYVYQDnkF4olJUk4TtvJhrnHg/view?usp=drivesdk"
---

本次作业为一张整张滚动截图，含第 1—5 道主观题。教师未提供参考答案，解答一律标注「补充解答」。



## 题 11　利用行列式的性质计算

<!-- homework-topic: 利用行列式性质计算 -->

### 11.(2)

<!-- homework-topic: 四阶数字行列式的消元降阶 -->

$$
\begin{vmatrix}
1&2&3&4\\
3&6&12&5\\
0&1&3&5\\
0&4&7&9
\end{vmatrix}
$$

**补充解答**

第 2 行与第 1 行的前三个元素成 $3$ 倍关系，先消去第 2 行的首元：$r_2-3r_1=(0,0,3,-7)$。

$$
\begin{vmatrix}
1&2&3&4\\
3&6&12&5\\
0&1&3&5\\
0&4&7&9
\end{vmatrix}
=
\begin{vmatrix}
1&2&3&4\\
0&0&3&-7\\
0&1&3&5\\
0&4&7&9
\end{vmatrix}
$$

第一列只剩 $a_{11}=1$，按第一列展开：

$$
D=1\cdot(-1)^{1+1}\begin{vmatrix}
0&3&-7\\
1&3&5\\
4&7&9
\end{vmatrix}.
$$

对三阶行列式再按它的第一行展开（该行首元为 $0$）：

$$
\begin{aligned}
D&=0-3(1\cdot9-5\cdot4)+(-7)(1\cdot7-3\cdot4)\\
&=-3(9-20)-7(7-12)\\
&=33+35=68 .
\end{aligned}
$$

故 $D=68$。

**验算（直接展开）**：按原矩阵第一列展开，
$1\begin{vmatrix}6&12&5\\1&3&5\\4&7&9\end{vmatrix}-3\begin{vmatrix}2&3&4\\1&3&5\\4&7&9\end{vmatrix}=1\cdot59-3\cdot(-3)=68$，两法一致。

### 11.(5)

<!-- homework-topic: 副对角线为 a、其余为 x 的 n 阶行列式 -->

$$
D_n=\begin{vmatrix}
x&x&\cdots&x&a\\
x&x&\cdots&a&x\\
\vdots&\vdots&&\vdots&\vdots\\
x&a&\cdots&x&x\\
a&x&\cdots&x&x
\end{vmatrix}_n
$$

（除副对角线为 $a$ 外，其余元素全为 $x$。）

**补充解答**

思路：这副对角线结构只要把列反序，就变成「主对角线为 $a$、其余为 $x$」的熟悉形状。

**第一步：列反序。** 把第 $1$ 列与第 $n$ 列、第 $2$ 列与第 $n-1$ 列……首尾逐对对换，共作 $\lfloor n/2\rfloor$ 次列对换。每交换两列变号一次，所以符号因子是 $(-1)^{\lfloor n/2\rfloor}$。若把这套反序改写成"相邻两列逐步交换"，则共需 $1+2+\cdots+(n-1)=\frac{n(n-1)}{2}$ 次相邻对换；两种计数的奇偶性相同（$\lfloor n/2\rfloor\equiv \frac{n(n-1)}{2}\pmod 2$），因此都可写成同一个因子 $(-1)^{\frac{n(n-1)}{2}}$。故

$$
D_n=(-1)^{\frac{n(n-1)}{2}}\;
\begin{vmatrix}
a&x&\cdots&x\\
x&a&\cdots&x\\
\vdots&\vdots&\ddots&\vdots\\
x&x&\cdots&a
\end{vmatrix}.
$$

> **理解关键**："逐对对换"和"相邻对换"是两种不同的实现，不能把前者的次数直接说成后者的次数。首尾对换只需 $\lfloor n/2\rfloor$ 次；相邻对换要 $\frac{n(n-1)}{2}$ 次。这里两者奇偶相同，所以指数写成哪一个都不影响符号，但推导时要交代清楚。

记后一行列式为 $\Delta_n$，其矩阵为 $(a-x)E+xJ$，其中 $E$ 为 $n$ 阶单位矩阵、$J$ 为全 $1$ 矩阵。

**第二步：算 $\Delta_n$。** 每行元素之和都是 $a-x+nx=a+(n-1)x$。把第 $2,3,\cdots,n$ 行都加到第 $1$ 行，提出公因子：

$$
\Delta_n=\bigl(a+(n-1)x\bigr)
\begin{vmatrix}
1&1&\cdots&1\\
x&a&\cdots&x\\
\vdots&\vdots&\ddots&\vdots\\
x&x&\cdots&a
\end{vmatrix}.
$$

再把第 $1$ 行的 $x$ 倍从其余各行中减去（$r_i-xr_1$，$i\ge2$），得**上三角**行列式（除第一行外，只有主对角线上的 $a-x$ 非零）。

$$
\Delta_n=\bigl(a+(n-1)x\bigr)
\begin{vmatrix}
1&1&\cdots&1\\
0&a-x&\cdots&0\\
\vdots&\vdots&\ddots&\vdots\\
0&0&\cdots&a-x
\end{vmatrix}
=\bigl(a+(n-1)x\bigr)(a-x)^{n-1}.
$$

所以

$$
D_n=(-1)^{\frac{n(n-1)}{2}}\bigl(a+(n-1)x\bigr)(a-x)^{n-1}.
$$

**验算**：$n=2$ 时 $D_2=x^2-a^2$，公式给出 $(-1)^{1}(a+x)(a-x)=x^2-a^2$ ✓；$n=3$ 时公式给出 $-(a+2x)(a-x)^2=3ax^2-2x^3-a^3$，与直接展开一致 ✓。

**边界情形**：若 $a=x$，右侧含 $(a-x)^{n-1}$ 因子，$n\ge2$ 时行列式为 $0$；此时原矩阵每行元素全为 $x$，各行相同，确为零，结论不失效。

### 11.(6)

<!-- homework-topic: 首行与末列含 x 的 n 阶行列式 -->

$$
D_n=\begin{vmatrix}
x&x&\cdots&x&a\\
0&0&\cdots&a&x\\
\vdots&\vdots&&\vdots&\vdots\\
0&a&\cdots&0&x\\
a&0&\cdots&0&x
\end{vmatrix}_n
$$

**补充解答**

首行除最后一个元素 $a$ 外全为 $x$；第 $2$ 行到第 $n$ 行各有两个非零元：第 $i$ 行在第 $n+1-i$ 列取 $a$，在第 $n$ 列取 $x$。

按定义，只需统计全部元素非零的取法（列指标排列必须两两不同）。

**情形一：第 1 行取第 $n$ 列的 $a$。** 此时第 $2,\cdots,n$ 行不能再取第 $n$ 列，只能各取自己的 $a$，即第 $i$ 行取第 $n+1-i$ 列。列指标排列为 $(n,n-1,\cdots,2,1)$，是全反序排列，逆序数 $\frac{n(n-1)}{2}$，贡献

$$
(-1)^{\frac{n(n-1)}{2}}a^n .
$$

**情形二：第 1 行取第 $n+1-k$ 列的 $x$（$2\le k\le n$）。** 第 $k$ 行原本的 $a$ 正好在第 $n+1-k$ 列，这个位置已被第 1 行占用，所以第 $k$ 行只能改取第 $n$ 列的 $x$；反过来，第 $n$ 列也必须由第 $k$ 行来占，否则第 $k$ 行没有第二个非零元可取。其余各行（$i\ne1,k$）的 $a$ 在第 $n+1-i$ 列，仍未被占用，而它们的 $x$ 在第 $n$ 列已被第 $k$ 行占用，所以只能各取自己的 $a$。于是每一项都是 $a^{n-2}x^2$，共 $n-1$ 项（$k=2,\dots,n$ 各给一项）。这些取法对应的排列逆序数为

$$
\tau_k=2(n-k)+\binom{n-2}{2},
$$

其中 $2(n-k)$ 恒为偶数，因此各项符号相同，为 $(-1)^{\binom{n-2}{2}}$。

合并两类：

$$
D_n=(-1)^{\frac{n(n-1)}{2}}a^n+(n-1)(-1)^{\frac{(n-2)(n-3)}{2}}a^{n-2}x^{2}.
$$

> **理解关键**：分类的唯一标准是"第 1 行取什么"。第 1 行只有两种非零元：末列的 $a$ 或前 $n-1$ 列中的某个 $x$。取 $a$ 时所有行被迫取各自的 $a$，只有 1 项；取 $x$ 时，这个 $x$ 所在的列 $n+1-k$ 反过来锁定了第 $k$ 行必须取第 $n$ 列，其余行又被锁死，所以每个 $k$ 恰给 1 项，共 $n-1$ 项。两类互不重叠，也没有遗漏，这是本题计数不重不漏的原因。

**验算**：$n=3$ 时为 $-a^3+2ax^2$，与直接展开 $\begin{vmatrix}x&x&a\\0&a&x\\a&0&x\end{vmatrix}=x(ax)-x(-ax)+a(-a^2)=2ax^2-a^3$ 一致 ✓；$n=4$ 时为 $a^4-3a^2x^2$，与按列展开的结果一致 ✓。

---

## 题 12　证明下列等式

<!-- homework-topic: 证明两个行列式等式 -->

### 12.(2)

<!-- homework-topic: 三行循环和行列式的倍值等式 -->

$$
\begin{vmatrix}
x_1+y_1&x_2+y_2&x_3+y_3\\
y_1+z_1&y_2+z_2&y_3+z_3\\
z_1+x_1&z_2+x_2&z_3+x_3
\end{vmatrix}
=2\begin{vmatrix}
x_1&y_1&z_1\\
x_2&y_2&z_2\\
x_3&y_3&z_3
\end{vmatrix}.
$$

**补充解答**

记左边的行向量为 $r_1,r_2,r_3$，右边行列式对应的矩阵记为 $B=\begin{pmatrix}x_1&x_2&x_3\\y_1&y_2&y_3\\z_1&z_2&z_3\end{pmatrix}$（它是右式的转置，行列式相同）。

关键的观察是：把三行作如下的线性组合，恰好能「提取」出 $x,y,z$：

$$
\begin{aligned}
r_1-r_2+r_3&=(2x_1,2x_2,2x_3),\\
r_1+r_2-r_3&=(2y_1,2y_2,2y_3),\\
-r_1+r_2+r_3&=(2z_1,2z_2,2z_3).
\end{aligned}
$$

这三式逐项验证：以第一列为例，$(x_1+y_1)-(y_1+z_1)+(z_1+x_1)=2x_1$，其余两列同理；第二、三式亦同。

于是存在矩阵

$$
T=\begin{pmatrix}1&-1&1\\1&1&-1\\-1&1&1\end{pmatrix},\qquad \det T=4,
$$

使 $T\cdot L=2B$（$L$ 为左式矩阵）。两边取行列式：

$$
\det T\cdot\det L=\det(2B)=2^3\det B .
$$

即 $4\det L=8\det B$，故 $\det L=2\det B$，而 $\det B$ 正是右式行列式，等式得证。

（也可按列拆成 8 个行列式逐项讨论，但其中 6 个交叉项两两相消，写起来远比上面的行线性组合繁琐。）

### 12.(3)

<!-- homework-topic: 对角元为 a+j−1 的 n 阶行列式 -->

$$
\begin{vmatrix}
a&2&3&\cdots&n\\
1&a+1&3&\cdots&n\\
1&2&a+2&\cdots&n\\
\vdots&\vdots&\vdots&&\vdots\\
1&2&3&\cdots&a+n-1
\end{vmatrix}
=\left[a+\frac{(n-1)(n+2)}{2}\right](a-1)^{n-1}.
$$

**补充解答**

矩阵的特点是：第 $j$ 列除对角位置外都等于 $j$，而对角位置是 $a+j-1$（第 1 行对角元就是 $a$）。

**第一步：消去第一列。** 令 $r_1$ 为第一行，对 $i\ge2$ 作 $r_i-r_1$。第 $j$ 列（$j\ne1,i$）上两行都是 $j$，相减为 $0$；第 $1$ 列上 $r_i$ 是 $1$、$r_1$ 是 $a$，得 $1-a$；第 $i$ 列上 $r_i$ 是 $a+i-1$、$r_1$ 是 $i$，得 $a-1$。于是

$$
\begin{vmatrix}
a&2&3&\cdots&n\\
1-a&a-1&0&\cdots&0\\
1-a&0&a-1&\cdots&0\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
1-a&0&0&\cdots&a-1
\end{vmatrix}.
$$

**第二步：把 $1-a$ 消掉。** 作列变换 $C_1\leftarrow C_1+C_2+\cdots+C_n$。第 $i$ 行（$i\ge2$）的第一列变为 $(1-a)+(a-1)=0$，第一行变为

$$
a+2+3+\cdots+n=a+\Bigl(\frac{n(n+1)}{2}-1\Bigr)=a+\frac{(n-1)(n+2)}{2}.
$$

变换后是上三角行列式，对角元为上式与 $n-1$ 个 $a-1$，故

$$
D=\left[a+\frac{(n-1)(n+2)}{2}\right](a-1)^{n-1}.
$$

**验算**：$n=2$ 时左式为 $a(a+1)-2=a^2+a-2$，右式为 $(a+2)(a-1)=a^2+a-2$ ✓；$n=3$ 时右式为 $(a+5)(a-1)^2=a^3+3a^2-9a+5$，与直接展开一致 ✓。

---

## 题 14　计算下列行列式

<!-- homework-topic: 计算下列行列式 -->

### 14.(1)

<!-- homework-topic: 含单个非零元的四阶行列式 -->

$$
\begin{vmatrix}
7&49&1&1\\
0&20&0&0\\
-3&6&-1&5\\
-2&11&-3&1
\end{vmatrix}
$$

**补充解答**

第 2 行只有一个非零元 $20$（第 2 列），按第 2 行展开最省力，符号为 $(-1)^{2+2}=+1$：

$$
D=20\begin{vmatrix}
7&1&1\\
-3&-1&5\\
-2&-3&1
\end{vmatrix}.
$$

三阶行列式按第一行展开：

$$
\begin{aligned}
\begin{vmatrix}
7&1&1\\-3&-1&5\\-2&-3&1
\end{vmatrix}
={}&7\bigl((-1)\cdot1-5\cdot(-3)\bigr)\\
&-1\bigl((-3)\cdot1-5\cdot(-2)\bigr)\\
&+1\bigl((-3)(-3)-(-1)(-2)\bigr)\\
={}&7(14)-1(7)+1(7)=98 .
\end{aligned}
$$

故 $D=20\times98=1960$。

### 14.(3)

<!-- homework-topic: 主对角为 x、角上为 y 的 n 阶行列式 -->

$$
D_n=\begin{vmatrix}
x&0&0&\cdots&0&y\\
y&x&0&\cdots&0&0\\
0&y&x&\cdots&0&0\\
\vdots&\vdots&\vdots&\ddots&\vdots&\vdots\\
0&0&0&\cdots&x&0\\
0&0&0&\cdots&y&x
\end{vmatrix}_n
$$

**补充解答**

按第一行展开。该行只有 $a_{11}=x$ 与 $a_{1n}=y$ 两个非零元。

- $a_{11}$ 的余子式：划去第 $1$ 行、第 $1$ 列后，所得矩阵为下三角，主对角元全为 $x$，紧贴主对角线下方的元素全为 $y$。余子式为 $x^{n-1}$，这一项的符号为 $+1$，贡献 $x^n$。
- $a_{1n}$ 的余子式：划去第 1 行、第 $n$ 列后，第 2 行是 $(y,x,0,\dots,0)$，第 3 行是 $(0,y,x,\dots,0)$，依此类推，是**上三角**行列式，对角元全为 $y$，值为 $y^{n-1}$，符号 $(-1)^{1+n}$，贡献 $(-1)^{n+1}y^n$。

于是

$$
D_n=x^n+(-1)^{n+1}y^{n}.
$$

**验算**：$n=2$ 得 $x^2-y^2$ ✓；$n=3$ 得 $x^3+y^3=(x+y)(x^2-xy+y^2)$，与直接展开一致 ✓；$n=4$ 得 $x^4-y^4$ ✓。

**边界情形**：$x=y$ 时，$n$ 为偶数则公式给出 $D_n=0$，矩阵确实奇异（行向量满足交错和为零）；$n$ 为奇数则 $D_n=2x^n$。公式均自动给出，无需另议。

### 14.(4)

<!-- homework-topic: 三对角 x、y、z 行列式的递推与通项 -->

$$
D_n=\begin{vmatrix}
x&z&0&\cdots&0&0\\
y&x&z&\cdots&0&0\\
0&y&x&\cdots&0&0\\
\vdots&\vdots&\vdots&\ddots&\vdots&\vdots\\
0&0&0&\cdots&x&z\\
0&0&0&\cdots&y&x
\end{vmatrix}_n
$$

**补充解答**

按第一列展开。第一列只有 $a_{11}=x$ 与 $a_{21}=y$：

$$
D_n=xD_{n-1}+(-1)^{2+1}y\cdot(\text{划去第2行第1列后的 }n-1\text{ 阶余子式}).
$$

该余子式的第一行只有 $z$（原矩阵第 1 行第 2 列），其余列全为零，所以按它的第一行展开只剩 $zD_{n-2}$ 一项，于是

$$
D_n=xD_{n-1}-yz\,D_{n-2},\qquad D_1=x,\quad D_2=x^2-yz .
$$

> **理解关键**：删去第 $1$ 行、第 $1$ 列，立即得到同型的 $D_{n-1}$。删去第 $2$ 行、第 $1$ 列时，首行只剩第一个位置的 $z$，再沿首行展开，才恢复到同型的 $D_{n-2}$。$yz$ 前的负号来自第一次展开的 $(-1)^{2+1}$。

这是二阶线性递推，解出闭式：

$$
D_n=\sum_{k=0}^{\left\lfloor n/2\right\rfloor}(-1)^k\binom{n-k}{k}x^{\,n-2k}(yz)^{k}.
$$

（由 $\binom{n-k}{k}=\binom{n-1-k}{k}+\binom{n-1-k}{k-1}$ 对 $n$ 归纳即得。）

前几个值：$D_3=x(x^2-2yz)$，$D_4=x^4-3x^2yz+y^2z^2$，$D_5=x(x^2-yz)(x^2-3yz)$。

**边界情形**：$y=0$ 或 $z=0$ 时递推退化为 $D_n=xD_{n-1}$，闭式自动变成 $x^n$，与原矩阵成为三角阵相符。

---

## 题 18　解线性方程组

<!-- homework-topic: 解线性方程组 -->

### 18.(2)

<!-- homework-topic: 用消元法解四元线性方程组 -->

$$
\begin{cases}
3x_1+x_2+2x_3=0,\\
5x_2+x_3+4x_4=1,\\
4x_1+2x_3+x_4=0,\\
2x_1+x_2+x_4=1.
\end{cases}
$$

**补充解答**

四个方程可以「两两配对」消元，配对的理由是两式含有相同的未知量：第 1 式只含 $x_1,x_2,x_3$，可把 $x_2$ 用 $x_1,x_3$ 表示；第 4 式含 $x_1,x_2,x_4$，可把 $x_2$ 用 $x_1,x_4$ 表示。两式联立即消去 $x_2$，并把 $x_4$ 用 $x_1,x_3$ 表示。第 3 式只含 $x_1,x_3,x_4$，正好接上；第 2 式则用来定出最后一个关系。由第 1 式 $x_2=-3x_1-2x_3$；由第 4 式 $x_2=1-2x_1-x_4$。两式相等：

$$
-3x_1-2x_3=1-2x_1-x_4\;\Longrightarrow\; x_4=1+x_1+2x_3 .\tag{A}
$$

把 (A) 代入第 3 式：

$$
4x_1+2x_3+(1+x_1+2x_3)=0\;\Longrightarrow\;5x_1+4x_3=-1 .\tag{B}
$$

把 $x_2=1-2x_1-x_4$ 与 (A) 代入第 2 式：

$$
5(1-2x_1-x_4)+x_3+4x_4=1
\Longrightarrow -10x_1+x_3-x_4=-4
\Longrightarrow -10x_1+x_3-(1+x_1+2x_3)=-4,
$$

即 $11x_1+x_3=3$。与 (B) 联立：$x_3=3-11x_1$，代入 $5x_1+4(3-11x_1)=-1$，得 $-39x_1=-13$，故

$$
x_1=\frac13,\qquad x_2=\frac13,\qquad x_3=-\frac23,\qquad x_4=0 .
$$

**验算（代回原方程组）**：
$3\cdot\frac13+\frac13+2\cdot(-\frac23)=1+\frac13-\frac43=0$ ✓；
$5\cdot\frac13+(-\frac23)+0=1$ ✓；
$4\cdot\frac13+2\cdot(-\frac23)+0=0$ ✓；
$2\cdot\frac13+\frac13+0=1$ ✓。

---

## 题 20

<!-- homework-topic: 齐次方程组有非零解的 λ 值 -->

### 20.

<!-- homework-topic: 求使齐次方程组有非零解的 λ -->

问 $\lambda$ 取何值时，齐次线性方程组

$$
\begin{cases}
\lambda x_1+x_2+x_3=0,\\
x_1+\lambda x_2+2x_3=0,\\
\lambda^2x_1+x_2+\lambda x_3=0
\end{cases}
$$

有非零解。

**补充解答**

齐次方程组有非零解 $\iff$ 系数行列式为零。计算

$$
\begin{aligned}
D(\lambda)&=\begin{vmatrix}
\lambda&1&1\\
1&\lambda&2\\
\lambda^2&1&\lambda
\end{vmatrix}\\
&=\lambda(\lambda^2-2)-1(\lambda-2\lambda^2)+1(1-\lambda^3)\\
&=\lambda^3-2\lambda-\lambda+2\lambda^2+1-\lambda^3\\
&=2\lambda^2-3\lambda+1=(2\lambda-1)(\lambda-1).
\end{aligned}
$$

令 $D(\lambda)=0$，得

$$
\lambda=1\quad\text{或}\quad\lambda=\frac12 .
$$

> **理解关键**：对 $n$ 个方程、$n$ 个未知量的**齐次**方程组，"有非零解"与"$D=0$"是充要关系，不是"可能"：$D\ne0$ 时只有零解；$D=0$ 时必有非零解，而且解空间至少一维。因此这里只需解 $D(\lambda)=0$，不必再讨论 $D\ne0$ 的情形。求出 $\lambda$ 后代回，是为了确认两个临界值确实各自给出非零解，而不是增根。

两个值都确实使方程有非零解：

- $\lambda=1$：方程组化为 $x_1+x_2+x_3=0,\;x_1+x_2+2x_3=0,\;x_1+x_2+x_3=0$，由前两式得 $x_3=0,\;x_1=-x_2$，通解 $t(-1,1,0)^{\mathrm T}$；
- $\lambda=\tfrac12$：由第 1 式 $x_3=-\tfrac12x_1-x_2$，代入第 2 式得 $-\tfrac32x_2=0$，故 $x_2=0,\;x_3=-\tfrac12x_1$，通解 $t(2,0,-1)^{\mathrm T}$。

---

## 易错点

1. 11.(5)、(6) 这类「非主对角结构」的 $n$ 阶行列式，符号 $(-1)^{\frac{n(n-1)}{2}}$ 最容易漏；它等于首尾逐对对换次数 $\lfloor n/2\rfloor$ 的奇偶，也等于相邻对换次数 $\frac{n(n-1)}{2}$ 的奇偶。
2. 11.(6) 用定义计数时，必须论证「其余各行只能取自己的 $a$」，否则会漏项或多算项。
3. 12.(2) 拆成 8 项后，不要以为交叉项各自为零；它们只是两两相消。行列式对每一列确实可加，但要把 8 项全部合并后再判断。
4. 14.(4) 的递推是 $D_n=xD_{n-1}-yzD_{n-2}$，注意 $yz$ 前的负号，以及 $D_1=x,\ D_2=x^2-yz$ 这两个初值。
5. 齐次方程组「有非零解」只要求 $D=0$，不要顺手把 $D\neq0$ 的情形也写进答案。
